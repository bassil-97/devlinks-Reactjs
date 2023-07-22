import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

import Cookies from "universal-cookie";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useHttpClient } from "../../hooks/http-hook";

export default function Login() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const { sendRequest, isLoading, error } = useHttpClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserSignup = async (e) => {
    e.preventDefault();

    try {
      let responseData = await sendRequest(
        "https://devlinks-nodejs.onrender.com/api/users/login",
        "POST",
        JSON.stringify({
          email,
          password,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      if (responseData) {
        cookies.set("TOKEN", responseData.token, {
          path: "/",
        });
        cookies.set("userId", responseData.id, {
          path: "/",
        });
        cookies.set(
          "userInfo",
          {
            firstName: responseData.firstName,
            lastName: responseData.lastName,
            email: responseData.email,
          },
          { path: "/" }
        );
        navigate("/home/links");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-form__container">
      <div className="container">
        <h4 className="fw-bold mb-4">Login to your account</h4>
        <form onSubmit={handleUserSignup}>
          <div className="form-group mb-3">
            <label htmlFor="userEmail">Email</label>
            <input
              type="email"
              placeholder="name@exmaple.com"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="userEmail">Password</label>
            <input
              type="password"
              value={password}
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className="btn btn-primary me-2" type="submit">
              {!isLoading ? "Login" : "Logging in..."}
            </button>
            <small>
              Don't have an account ? | <Link to={"/"}>Sign up</Link>
            </small>
          </div>
        </form>
        <div className="d-flex algin-items-center justify-content-center w-100 mt-4">
          {isLoading && <LoadingSpinner />}
          {error && (
            <div className="alert alert-danger w-100 text-center" role="alert">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
