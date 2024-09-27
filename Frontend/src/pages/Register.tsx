import React, { useState, ChangeEvent, FormEvent } from "react";

import AuthForm from "../components/Form/RegiterForm";
import { UseAuth } from "../hook/Auth";

const Register = () => {
    const { Register } = UseAuth()
    return (
        <div className="flex justify-center">
            <AuthForm onSubmit={Register} />
        </div>
    );
};

export default Register;