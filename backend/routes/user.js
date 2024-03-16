const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();

const signUpSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

router.post("/signup", async (req, res) => {
    const { success } = signUpSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Incorrect inputs"
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    });

    if (existingUser) {
        return res.status(400).json({
            message: "Email already taken"
        });
    }

    const user = await User.create(req.body)
    await Account.create({
        userId: user._id,
        balance: (1 + Math.random() * 10000).toFixed(2)
    })

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    });
});

const signInSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

router.post("/signin", async (req, res) => {
    const { success } = signInSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Incorrect input"
        });
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        });
        return;
    }

    res.status(404).json({
        message: "User not found"
    });
});

const updateUserSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateUserSchema.safeParse(req.body);

    if (!success) {
        res.status(403).json({
            message: "Error while updating information"
        });
    } else {
        await User.findOneAndUpdate({ _id: req.userId }, req.body);
        res.json({ message: "User updated successfully" });
    }
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: { $regex: filter }
        }, {
            lastName: { $regex: filter }
        }]
    });

    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});

module.exports = router;
