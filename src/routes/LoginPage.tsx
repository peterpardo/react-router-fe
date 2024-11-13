import React, { useState } from "react";
import { useLoginMutation } from "../services/authApiSlice";

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [formState, setFormState] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    console.log("submit");
    console.log(formState);
  };
  const handleChange = (
    e: React.FormEvent<HTMLInputElement>,
    field: string
  ) => {
    const target = e.target as HTMLInputElement;
    setFormState((prevState) => ({
      ...prevState,
      [field]: target.value,
    }));
  };

  return (
    <div>
      <h1>Login Page</h1>
      <label>Email</label>
      <input
        type="email"
        name="email"
        onChange={(e) => handleChange(e, "email")}
      />
      <br />
      <label>Password</label>
      <input
        type="password"
        name="password"
        onChange={(e) => handleChange(e, "password")}
      />
      <button type="button" onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
