import { useForm } from "react-hook-form";
import Joi from "joi";

import { useNavigate } from "react-router-dom";
import { User } from "../../interfaces/User";
import instance from "../../Api";

const userSchema = Joi.object({
  email: Joi.string().required().email({ tlds: false }),
  password: Joi.string().required().min(6),
});

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = async (user: User) => {
    console.log(user);
    
    try {
      const data = await instance.post("/register", user);
      console.log(data)
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
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
          {errors.email && (
            <span className="text-danger">This field is required</span>
          )}
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
          {errors.password && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
