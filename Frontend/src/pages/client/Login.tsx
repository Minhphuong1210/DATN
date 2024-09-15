import Joi from "joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { User } from "../../interfaces/User";
import instance from "../../Api";

const userSchema = Joi.object({
  email: Joi.string().required().email({ tlds: false }),
  password: Joi.string().required().min(6),
});

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = (user: User) => {
    (async () => {
      const { data } = await instance.post("/login", user);
      console.log(data);
      if (data.user) {
        sessionStorage.setItem("accessToken", data.accessToken);
        const isConfirm = confirm("Register successfuly");
        if (isConfirm) {
          navigate("/");
        }
      }
    })();
  };
  return (
    <div className="">
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center text-4xl mt-10 font-bold" >Login</h1>
        <div className="mb-5">
          <label
            className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
            htmlFor="title"
          >
            email
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="email"
            placeholder="name@gmail.com"
            id="title"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="form-group">
          <label
            className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
            htmlFor="title"
          >
            Password
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500l"
            type="number"
            placeholder="password..."
            id="price"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <button className="btn btn-primary mt-10 mb-10 w-100 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Submit</button>
      </form>
    </div>
  )
}