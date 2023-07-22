import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Preview.css";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import SimpleSnackbar from "../../components/Snackbar/Snackbar";
import UserLink from "../../components/UserLink/UserLink";
import { useHttpClient } from "../../hooks/http-hook";

export default function Preview() {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const { userId } = useParams();

  const { sendRequest, isLoading } = useHttpClient();

  const [links, setLinks] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [open, setOpen] = useState(false);

  const fetchUserLinks = async () => {
    try {
      let responseData = await sendRequest(
        `https://devlinks-nodejs.onrender.com/api/users/get-user-links/${userId}`
      );
      setLinks([...responseData["links"]]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserDetails = async () => {
    try {
      let responseData = await sendRequest(
        `https://devlinks-nodejs.onrender.com/api/users/get-user-details/${userId}`
      );
      
      console.log(responseData);
      setUserInfo(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  const generateProfileLink = () => {
    let previewLink = `https://devs-link.netlify.app/preview/${userId}`;
    navigator.clipboard.writeText(previewLink);
    setOpen(true);
  };

  useEffect(() => {
    fetchUserLinks();
    fetchUserDetails();
  }, []);

  return (
    <>
      {open && (
        <SimpleSnackbar
          open={open}
          handleClose={() => setOpen(false)}
          message={"Link copied to clipboard!"}
        />
      )}

      <div className="profile-preview__container">
        <div className="preview-background"></div>
        <header className="preview-header">
          {token && (
            <>
              <Link to="/home/links" className="btn-outline-primary btn">
                Back to Editor
              </Link>
              <button className="btn-primary btn" onClick={generateProfileLink}>
                Share Link
              </button>
            </>
          )}
          {!token && (
            <>
              <h5 className="mb-0 fw-bold">DevLinks</h5>
              <Link to="/" className="btn-primary btn">
                Create your profile now
              </Link>
            </>
          )}
        </header>
        <div className="user-profile">
          <div className="user-avatar mb-1">
            <img
              width="98"
              height="98"
              src="https://img.icons8.com/fluency/98/person-male.png"
              alt="person-male"
            />
          </div>
          <div className="user-details mt-4">
            <h4 className="fw-bold">{userInfo?.firstName} {userInfo?.lastName}</h4>
            <small className="text-muted">{userInfo?.email}</small>
          </div>
          <div className="user-links__list w-100">
            {isLoading && <LoadingSpinner />}
            {!isLoading &&
              links
                ?.filter((link) => link.status === "active")
                .map((link) => <UserLink key={link.id} {...link} />)}
          </div>
        </div>
      </div>
    </>
  );
}
