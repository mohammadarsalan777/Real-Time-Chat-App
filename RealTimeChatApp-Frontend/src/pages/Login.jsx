import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { SnackbarProvider, useSnackbar } from 'notistack'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()

    const { enqueueSnackbar } = useSnackbar()
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })


    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const show = showPassword ? "text" : "password"

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.username === '' || formData.password === '') {
            enqueueSnackbar("Each field is required", { variant: "error" })
            return false
        }

        else if (!formData.username.includes('@')) {
            enqueueSnackbar("Enter a valid Username. It should contain '@'", { variant: "warning" })
            return false
        }



        try {
            console.log(formData)
            await axios.post(`http://localhost:5000/api/real-time-chat-app/auth/login/login`, formData)
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        enqueueSnackbar("Logged in successfully", { variant: "success" })
                        setFormData({
                            username: "",
                            password: "",
                        })
                        navigate('/')
                        return true
                    } else {
                        enqueueSnackbar(`${res.status} Invalid username or password`, { variant: "error" })
                        return false
                    }
                })
                .catch((err) => {
                    enqueueSnackbar(` Error (${err}):: Invalid username or password`, { variant: "error" })
                    console.log(err)
                    return false
                })
        } catch (error) {
            enqueueSnackbar("Internal server error", { variant: "error" })
            console.log(error)
            return false
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    return (

        <div className="md:flex md:justify-center items-center  md:align-middle py-5  m-auto h-[100vh] ">

            <form className="  md:w-[30%] p-10 bg-[#030712] md:h-[80vh] rounded-xl shadow-" onSubmit={(e) => handleSubmit(e)}>
                <div className="text-center">


                    <img src={logo} className="h-[5rem] md:ml-24 ml-[4.5rem]" alt="Logo" />

                    <h1 className=" text-4xl my-2 mt-4  font-semibold">ChatsApp</h1>
                </div>
                <div className=" ">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        defaultValue={formData.username}
                        onChange={(e) => handleChange(e)}
                        className="my-3 h-12 md:w-[80%] w-full bg-gray-900 border px-3 rounded-md "

                    />
                </div>

                <div className="relative my-3">
                    <input
                        type={show}
                        name="password"
                        placeholder="Password"
                        defaultValue={formData.password}
                        onChange={(e) => handleChange(e)}
                        className="h-12 md:w-[80%] w-full bg-gray-900 border px-3 rounded-md pr-16"
                    />
                    <span
                        onClick={handleShowPassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </span>
                </div>


                <div className="text-center">
                    <button className="bg-[#0738dc] mt-2 mb-1 text-center w-[80%] text-white h-12 px-8 font-bold cursor-pointer rounded-md text-base uppercase hover:bg-[#05289c]  shadow-2xl" type="submit">Login</button>
                    <span className="block font-medium text-slate-500 my-2 ">
                        Create a new   <Link className="text-[#0738dc]" to={"/register"}>account</Link>?
                    </span>
                </div>
            </form>

        </div >

    )
}

export default Login
