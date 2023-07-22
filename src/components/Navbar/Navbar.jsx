import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

import { NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";

import Cookies from "universal-cookie";

import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {
  const cookies = new Cookies();
  const userId = cookies.get("userId");
  const navigate = useNavigate();

  const handleLogout = () => {
    cookies.remove("TOKEN", { path: "/" });
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg w-100 mb-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">
          devlinks
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({isActive}) => isActive ? "active-nav-link" : "nav-link"} aria-current="page" to="/home/links">
              <i className='bx bx-link' ></i>
                Links
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive}) => isActive ? "active-nav-link" : "nav-link"} to="/home/profile">
              <i className='bx bx-user-circle'></i>
                Profile Details
              </NavLink>
            </li>
          </ul>
          <div className="d-flex gap-2">
          <NavLink className="btn preview-profile__btn" to={`/preview/${userId}`}>
              Preview
            </NavLink>
            <IconButton onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </nav>
  );
}
