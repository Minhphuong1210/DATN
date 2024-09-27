import React, { useState, ChangeEvent, FormEvent } from "react";
import '../css/Login.css'

import AuthForm from "../components/Form/LoginForm";
import { UseAuth } from "../hook/Auth";

const Login = () => {
    const { Login } = UseAuth()
    return (
        <div className="flex justify-center  py-28 h-screen bgr">
            <AuthForm onSubmit={Login} />
        </div>

    );
};

export default Login;