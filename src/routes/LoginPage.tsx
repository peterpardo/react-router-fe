import React, { useState } from "react";
import { useLoginMutation } from "../services/authApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../store/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [formState, setFormState] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const result = await login(formState).unwrap();
      dispatch(setCredentials(result.user));
      navigate("/");
    } catch (error) {
      setMessage(error.data.message);
    }
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
      <button type="button" onClick={handleSubmit} disabled={isLoading}>
        Login
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
