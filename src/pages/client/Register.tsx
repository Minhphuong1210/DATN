
import { UseAuth } from "../../hook/Auth";
import RegiterForm from "../../components/Form/RegiterForm";

// const userSchema = Joi.object({
//   email: Joi.string().required().email({ tlds: false }),
//   password: Joi.string().required().min(6),
// });

const Register = () => {

  const { Register } = UseAuth();
  return (
    <>
      <RegiterForm onSubmit={Register} />
    </>
  );
};
export default Register;
