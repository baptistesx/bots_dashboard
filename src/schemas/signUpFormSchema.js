import * as yup from "yup";

const signUpFormSchema = yup
  .object({
    name: yup.string().max(255).required("Name is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: yup.string().min(6).max(255).required("Password is required"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match")
      .required("Password confirmation is required"),
  })
  .required();

export default signUpFormSchema;
