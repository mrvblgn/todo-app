import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Giriş Yap</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Email</label>
          <input className="input" {...formRegister("email")} />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label className="label">Şifre</label>
          <input className="input" type="password" {...formRegister("password")} />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button className="btn btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
};

export default Login;