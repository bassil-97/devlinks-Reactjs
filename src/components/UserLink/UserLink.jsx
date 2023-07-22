import React from "react";
import { Link } from "react-router-dom";
import "./UserLink.css";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PLATFORMS_THEMES = {
  Github: "#191919",
  Youtube: "#ef383a",
  Linkedin: "#2d69ff",
};

const PLATFORMS_ICONS = {
  Github: "bx bxl-github",
  Youtube: "bx bxl-youtube",
  Linkedin: "bx bxl-linkedin-square",
};

export default function UserLink({ platform, link }) {
  return (
    <div
      className="user-link"
      style={{ backgroundColor: PLATFORMS_THEMES[platform] }}
    >
      <div className="d-flex align-items-center justify-content-center gap-3">
        <i className={PLATFORMS_ICONS[platform]}></i>
        <small>{platform}</small>
      </div>
      <Link to={link} target="blank">
        <ArrowForwardIcon sx={{ color: "white", fontSize: "1.3rem" }} />
      </Link>
    </div>
  );
}
