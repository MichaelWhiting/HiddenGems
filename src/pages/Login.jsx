import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null); // New state to hold error information

  const userId = useSelector((state) => state.userId);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const bodyObj = {
      email,
      password,
    };

    try {
      const res = await axios.post("/login", bodyObj);

      if (res.data.success) {
        dispatch({
          type: "USER_AUTH",
          payload: res.data.userId,
        });
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message); // Set error state with the error message from the server
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const bodyObj = {
      email,
      password,
      firstName,
      lastName,
    };

    try {
      const res = await axios.post("/register", bodyObj);

      if (res.data.success) {
        handleLogin(e);
      }
    } catch (error) {
      setError(error.response.data.message); // Set error state with the error message from the server
    }
  };

  const sessionCheck = async () => {
    try {
      const res = await axios.get("/session-check");

      if (res.data.success) {
        dispatch({
          type: "USER_AUTH",
          payload: res.data.userId,
        });
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
  };

  useEffect(() => {
    sessionCheck();
  }, []);

  return (
    <>
      <h1>Hidden Gems</h1>
      <h2>{isLogin ? "Login" : "Create Account"}</h2>

      {!userId && (
        <form onSubmit={isLogin ? handleLogin : handleRegister} id="key">
          {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message if exists */}
          <div>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!isLogin && (
            <>
              <div>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}
          <div>
            <input
              className="Login"
              type="submit"
              value={isLogin ? "Login" : "Register"}
            />
            <label onClick={(e) => setIsLogin(!isLogin)}>
              {isLogin ? "Register Here" : "Login Here"}
            </label>
          </div>
        </form>
      )}
    </>
  );
}

export default Login;
