import React, { useState, ChangeEvent, FormEvent } from "react";

import AuthForm from "../components/Form/RegiterForm";
import { UseAuth } from "../hook/Auth";

import Footer from "../components/client/Footer";
import Header from "../components/client/Home/Header/Header";

const Register = () => {
    const { Register } = UseAuth()
    const [isMobile, setMobile] = useState<boolean>(false);
    return (
        <>
            <Header isMobile={isMobile} />
            <div className="flex justify-center bgr py-5">
                <AuthForm onSubmit={Register} />
            </div>
            <Footer />
        </>
    );
};

export default Register;