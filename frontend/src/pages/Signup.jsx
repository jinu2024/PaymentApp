import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import {InputBox} from "../components/InputBox";
import {Button} from "../components/Button";
import { useState } from "react";
import {BottomWarning} from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";




export function Signup(){

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg w-80 h-max p-2 text-center bg-white px-4">
        <Heading label ={"Sign up"}/>
        <SubHeading info = {"Enter your information to create an account"}/>
        <InputBox onChange={e => {
          setFirstName(e.target.value);
        }}  placeholder={"Gojo"} label={"First Name"} />
        <InputBox onChange={e => {
          setLastName(e.target.value);
        }}  placeholder={"Satoru"} label={"Last Name"} />
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }}  placeholder={"champion@gmail.com"} label={"Email"} />
        <InputBox onChange={e => {
          setPassword(e.target.value);
        }}  placeholder={"xyz"} label={"Password"} />

        <div className="pt-5">
          <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              username,
              firstName,
              lastName,
              password
            });
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
          }} label={"Sign up"} />
        </div>

        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>

        </div>
        </div>
    </div>
}