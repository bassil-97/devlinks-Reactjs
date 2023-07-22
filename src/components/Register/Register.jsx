import React, { useState } from "react";
import "./Register.css";

import { useHttpClient } from "../../hooks/http-hook";
import { Link } from "react-router-dom";

export default function Register() {
  const { sendRequest, error } = useHttpClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleUserSignup = async (e) => {
    e.preventDefault();

    try {
      await sendRequest(
        "https://devlinks-nodejs.onrender.com/api/users/register",
        "POST",
        JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register-form__container">
      <div className="container">
        <h4 className="fw-bold mb-4">Create new account</h4>
        <form onSubmit={handleUserSignup}>
          <div className="form-group mb-3">
            <label htmlFor="userEmail">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
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
          <div className="form-group mb-3">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              placeholder="John"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <button className="btn btn-primary me-2" type="submit">
              Sign Up
            </button>
            <small>
              Already have an account ? | <Link to={"/login"}>Login</Link>
            </small>
          </div>
        </form>
        <div className="d-flex algin-items-center justify-content-center w-100 mt-4">
         
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
