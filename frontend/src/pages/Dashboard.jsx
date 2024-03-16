import { useState, useEffect } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard = () => {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/account/balance');
                setBalance(response.data.balance);
                console.log(response.data.balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };
    
        fetchData();
    }, []);

    return (
        <div className="p-6 bg-gray-100">
            <AppBar />
            <div className="mt-6 rounded-lg shadow-lg bg-white p-6 h-screen">
                <Balance amount={balance} />
                <Users />
            </div>
        </div>
    );
};
