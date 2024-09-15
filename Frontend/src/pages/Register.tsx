import React, { useState, ChangeEvent, FormEvent } from "react";


import AuthForm from "../components/AuthForm";
import { UseAuth } from "../hook/Auth";

const Register = () => {
    const { Register } = UseAuth()
    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Đăng Ký</h2>
            <AuthForm onSubmit={Register} />
        </div>
    );
};

export default Register;