import React from 'react'
import { useForm } from 'react-hook-form';
import { UseAuth } from '../../hook/Auth';

type AuthFormProps = {
    onSubmit: (data: any) => void
}
const RegiterForm = ({ onSubmit }: AuthFormProps) => {

    const { handleSubmit, register } = useForm();
    return (
        <div>
            <div >
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <h1>Register</h1>
                    <div className="form-group">
                        <label htmlFor="title">email</label>
                        <input
                            className="form-control"
                            type="email"
                            placeholder="email..."
                            id="title"
                            {...register("email", { required: true })}
                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Password</label>
                        <input
                            className="form-control"
                            type="number"
                            placeholder="password..."
                            id="price"
                            {...register("password", { required: true, minLength: 6 })}
                        />

                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RegiterForm