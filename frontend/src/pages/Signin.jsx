import { useState } from "react";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";

export function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="flex justify-center bg-slate-300 h-screen">
        <div className=" flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 pt-2 h-max px-4 text-center">
                <Heading label={"Sign In"} />
                <SubHeading info={"Enter your credentials to access your account"} />
                <InputBox label={"Email"} onChange={e => setUsername(e.target.value)} />
                <InputBox label={"Password"} onChange={e => setPassword(e.target.value)} />

                <div className="pt-5">
                    <Button label={"Sign In"} onClick={async () => {
                
                            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                username,
                                password
                            });
                            localStorage.setItem("token", response.data.token);
                            navigate("/dashboard");
                       
                    }} />
                </div>

                <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
            </div>
        </div>
        </div>
    );
}
