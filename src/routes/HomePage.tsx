import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1 className="font-bold">Home Page</h1>
      <AuthStatus />
      <Link to="/login">Login Page</Link>
    </div>
  );
}

function AuthStatus() {
  const authState = useSelector((state: RootState) => state.auth);

  if (!authState.isLoggedIn) {
    return <div>You are not Logged in</div>;
  } else {
    return <div>Hello! {authState.email}</div>;
  }
}
