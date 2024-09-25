import React, { useState, ChangeEvent, FormEvent } from "react";
import { UseAuth } from "../hook/Auth";
import RegisterForm from "../components/Form/RegisterForm";

const Register = () => {
    const { Register } = UseAuth()
    return (
        <div className="flex justify-center">
            <h2 className="text-2xl font-bold mb-6"></h2>
            <RegisterForm onSubmit={Register} />
        </div>
    );
};

export default Register;