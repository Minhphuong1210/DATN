import React, { useState, ChangeEvent, FormEvent } from "react";


import AuthForm from "../components/Form/LoginForm";
import { UseAuth } from "../hook/Auth";

const Login = () => {
    const { Login } = UseAuth()
    return (
        <div className="flex justify-center">
            <AuthForm onSubmit={Login} />
        </div>
      
    );
};

export default Login;