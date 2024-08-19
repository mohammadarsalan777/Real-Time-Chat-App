import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { SnackbarProvider, useSnackbar } from 'notistack'
import axios from 'axios'




const Register = () => {

    const navigate = useNavigate()

    const { enqueueSnackbar } = useSnackbar()
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""

    })

    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const show = showPassword ? "text" : "password"

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.username === '' || formData.email === '' || formData.password === '') {
            enqueueSnackbar("Each field is required", { variant: "error" })
            return false
        }

        else if (!formData.username.includes('@')) {
            enqueueSnackbar("Enter a valid Username. It should contain '@'", { variant: "warning" })
            return false
        }
        else if (!formData.username.length > 5) {
            enqueueSnackbar("Username should contain more than 7 characters", { variant: "warning" })
            return false
        }

        else if (!formData.email.includes('@') || !formData.email.includes('.')) {
            enqueueSnackbar("Enter a valid Email", { variant: "warning" })
            return false
        }

        else if (formData.password.length < 8) {
            enqueueSnackbar("Password should contain more than 7 character", { variant: "warning" })
            return false
        }

        else if (formData.password !== formData.confirmPassword) {
            enqueueSnackbar("Password and Confirm Password should be same", { variant: "warning" })
            return false
        }

        try {
            console.log(formData)
            await axios.post(`http://localhost:5000/api/real-time-chat-app/auth/login/register`, formData)
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {

                        enqueueSnackbar("User have been registered successfully", { variant: "success" })
                        setFormData({
                            username: "",
                            email: "",
                            password: "",
                            confirmPassword: ""
                        })
                        localStorage.setItem('chatsapp-user', JSON.stringify(res.data))
                        navigate('/')
                        return true
                    } else {
                        enqueueSnackbar(`${res.message}`, { variant: "error" })
                    }
                })
                .catch((err) => {
                    enqueueSnackbar(`${err}`, { variant: "error" })
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
        <SnackbarProvider maxSnack={3} >
            <div className="md:flex md:justify-center md:align-middle py-5  m-auto h-[100vh]  ">

                <form className="  md:w-[30%] p-10 bg-[#030712] rounded-xl  shadow-xl" onSubmit={(e) => handleSubmit(e)}>
                    <div className="text-center">


                        <img src={logo} className="h-[5rem] md:ml-24 ml-[4.5rem]" alt="Logo" />

                        <h1 className=" text-4xl my-2 mt-4  font-semibold">ChatsApp</h1>
                    </div>
                    <div className="text-center">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={(e) => handleChange(e)}
                            className="my-3 h-12 md:w-[80%] w-full bg-gray-900 border px-3 rounded-md "

                        />
                    </div>

                    <div className="text-center">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={(e) => handleChange(e)}
                            className="my-3 h-12 md:w-[80%] w-full bg-gray-900 border px-3 rounded-md "

                        />
                    </div>

                    <div className="text-center">
                        <input
                            type={show}
                            name="password"
                            placeholder="Password"
                            onChange={(e) => handleChange(e)}
                            className="my-3 h-12 md:w-[80%] w-full bg-gray-900 border px-3 rounded-md "

                        />

                    </div>

                    <div className="text-center">
                        <input
                            type={show}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={(e) => handleChange(e)}
                            className="my-3 h-12 md:w-[80%] w-full bg-gray-900 border px-3 rounded-md "

                        />

                    </div>

                    <div className="text-center">

                        <button className="bg-[#0738dc] mt-2 mb-1 text-center w-[80%] text-white h-12 px-8 font-bold cursor-pointer rounded-md text-base uppercase hover:bg-[#05289c] hover:text-black shadow-2xl" type="submit">Create User</button>
                        <span className="block font-medium text-slate-500 my-2 ">
                            Already have account ? <Link className="text-[#0738dc]" to={"/login"}>Login</Link>
                        </span>
                    </div>
                </form>

            </div >
        </SnackbarProvider>
    );
};

export default Register;
