import React, { useEffect, useState } from "react";
import {
  useCheckSessionQuery,
  useLoginMutation,
} from "../services/authApiSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../store/authSlice";
import Loading from "../components/Loading";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { data, isLoading: isCheckSessionQueryLoading } = useCheckSessionQuery(
    {}
  );
  const [formState, setFormState] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("");

  const from = location.state?.from?.pathname || "/home";

  useEffect(() => {
    if (data) {
      setCredentials(data);
      navigate("/home", { replace: true });
    }
  }, [from, data, dispatch, navigate]);

  if (isCheckSessionQueryLoading) {
    return <Loading />;
  }

  const handleSubmit = async () => {
    try {
      const result = await login(formState).unwrap();
      dispatch(setCredentials(result.user));
      navigate(from, { replace: true });
    } catch (error) {
      const apiError = error as { status: number; data: { message: string } };
      setMessage(apiError?.data?.message || "An unexpected error occurred.");
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
