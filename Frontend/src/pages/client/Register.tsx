// import { useForm } from "react-hook-form";
// import Joi from "joi";

// import { useNavigate } from "react-router-dom";
// import { User } from "../../interfaces/User";
// import instance from "../../Api";
// import { UseAuth } from "../../hook/Auth";
// import RegiterForm from "../../components/Form/RegiterForm";

// // const userSchema = Joi.object({
// //   email: Joi.string().required().email({ tlds: false }),
// //   password: Joi.string().required().min(6),
// // });

// const Register = () => {


//   const { Register } = UseAuth();
//   return (
//     <>
//       <RegiterForm onSubmit={Register} />
//     </>
//   );
// };
// export default Register;

//   const onSubmit = async (user: User) => {
//     console.log(user);

//     try {
//       const data = await instance.post("/register", user);
//       console.log(data);
//       navigate("/login");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
//         <h1 className="text-center text-4xl mt-10 font-bold">Register</h1>
//         <div className="mb-5">
//           <label
//             className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
//             htmlFor="title"
//           >
//             email
//           </label>
//           <input
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             type="email"
//             placeholder="email..."
//             id="title"
//             {...register("email", { required: true })}
//           />
//           {errors.email && (
//             <span className="text-danger">This field is required</span>
//           )}
//         </div>
//         <div className="form-group">
//           <label
//             className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
//             htmlFor="price"
//           >
//             Password
//           </label>
//           <input
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             type="number"
//             placeholder="password..."
//             id="price"
//             {...register("password", { required: true, minLength: 6 })}
//           />
//           {errors.password && (
//             <span className="text-danger">This field is required</span>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="btn btn-primary w-100 mt-10 mb-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;

