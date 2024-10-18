import React, { useState, ChangeEvent, FormEvent } from "react";
import '../css/Login.css'

import AuthForm from "../components/Form/LoginForm";
import { UseAuth } from "../hook/Auth";

import Footer from "../components/client/Footer";
import Header from "../components/client/Home/Header/Header";

const Login = () => {
    const { Login } = UseAuth()
    const [isMobile, setMobile] = useState<boolean>(false);
    return (
        <>
            <Header isMobile={isMobile} />
            <div className="flex justify-center  py-28 h-screen bgr">
                <AuthForm onSubmit={Login} />
            </div>
            <Footer />
        </>
    );
};

export default Login;