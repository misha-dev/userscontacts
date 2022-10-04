import { useFormik } from "formik";

import { GradientHeader } from "../Headers/GradientHeader/GradientHeader";

import cl from "./Login.module.scss";
import { LoginButton } from "./LoginButton/LoginButton";

export const Login = () => {
  interface ILoginFormik {
    name: string;
    username: string;
    email: string;
    password: string;
  }
  const formik = useFormik<ILoginFormik>({
    initialValues: { name: "", username: "", email: "", password: "" },
    onSubmit: (values) => {
      alert(values);
    },
  });
  return (
    <div className={cl.mainWrapper}>
      <div className={cl.logoSection}>k</div>
      <div className={cl.loginSection}>
        <div className={cl.loginButtons}>
          <GradientHeader text="Register Here" />
          <form className={cl.loginForm} onSubmit={formik.handleSubmit}>
            <LoginButton type="text" value={formik.values.name} onChange={formik.handleChange} text="NAME" />
            <LoginButton type="text" onChange={formik.handleChange} value={formik.values.username} text="Username" />
            <LoginButton type="email" onChange={formik.handleChange} value={formik.values.email} text="Email" />
            <LoginButton type="password" onChange={formik.handleChange} value={formik.values.password} text="Password" />
          </form>
        </div>
      </div>
    </div>
  );
};
