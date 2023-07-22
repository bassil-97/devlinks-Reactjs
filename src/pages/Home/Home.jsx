import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./Home.css";
// import uuid from 'react-uuid';

import Cookies from "universal-cookie";

import Navbar from "../../components/Navbar/Navbar";
import Links from "../Links/Links";
import Phone from "../../components/phone/Phone";
import Profile from "../Profile/Profile";

import { useHttpClient } from "../../hooks/http-hook";

export default function Home() {
  const cookies = new Cookies();
  const userId = cookies.get("userId");
  const userInfo = cookies.get("userInfo");
  const { sendRequest, isLoading } = useHttpClient();

  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [userEmail, setUserEmail] = useState(userInfo.email);
  const [platforms, setPlatforms] = useState([]);
  const [links, setLinks] = useState([]);
  // const [userDetails, setUserDetails] = useState([]);
  const [id, setId] = useState(1);
  const [showLinkSkeleton, setShowLinkSkeleton] = useState(false);

  const fetchPlatforms = async () => {
    try {
      let responseData = await sendRequest(
        `https://devlinks-nodejs.onrender.com/api/platforms/`
      );
      setPlatforms(responseData["platforms"]);
    } catch (err) {
      console.log(err);
    }
  };

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

  const saveUserLinks = async () => {
    try {
      let responseData = await sendRequest(
        `https://devlinks-nodejs.onrender.com/api/users/save-links/${userId}`,
        "POST",
        JSON.stringify({
          links: links,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      fetchUserLinks();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPlatforms();
    fetchUserLinks();
  }, []);

  const handleAddNewLink = () => {
    setShowLinkSkeleton(true);
    setLinks([...links, { id: id, platform: "", link: "", status: "hidden" }]);
    setId((prev) => prev + 1);
  };

  const handleRemoveNewLink = async (linkId) => {
    setShowLinkSkeleton(false);
    const linkWithIdIndex = links.findIndex((link) => link.id === linkId);
    let link;

    if(linkWithIdIndex > -1) link = links[linkWithIdIndex];

    if(link.status === 'hidden') {
      links.splice(linkWithIdIndex, 1);
      setLinks([...links]);
    } else {
      try {
        let responseData = await sendRequest(`https://devlinks-nodejs.onrender.com/api/users/delete-link/${linkId}`,
        "DELETE",
        JSON.stringify({
          user: userId
        }),
        {
          "Content-Type": "application/json",
        }
        );
  
        fetchUserLinks();
      } catch(err) {
        console.log(err);
      }
    }
  };

  const handleChangeLinkPlatform = (newPlatform, linkId) => {
    const linkWithIdIndex = links.findIndex((link) => link.id === linkId);

    if (linkWithIdIndex > -1) {
      links[linkWithIdIndex].platform = newPlatform;
      links[linkWithIdIndex].status = "active";
    }
  };

  const handleChangeLinkText = (linkText, linkId) => {
    const linkWithIdIndex = links.findIndex((link) => link.id === linkId);

    if (linkWithIdIndex > -1) {
      links[linkWithIdIndex].link = linkText;
    }
  };

  const handleSaveChanges = () => {
    setShowLinkSkeleton(false);
    // setLinks([...links]);
    saveUserLinks();
  };

  return (
    <div className="links-page__container mt-4">
      <Navbar />
      <div className="row w-100 d-flex justify-content-between">
        <div className="col-md-5 col-xs-12 d-flex align-items-center justify-content-center bg-white rounded">
          <Phone
            links={links}
            showLinkSkeleton={showLinkSkeleton}
            firstName={firstName}
            lastName={lastName}
            userEmail={userEmail}
            isLoading={isLoading}
          />
        </div>
        <div className="col-md-6 col-xs-12 bg-white rounded">
          <Routes>
            <Route
              exact
              index
              path="/links"
              element={
                <Links
                  links={links}
                  platforms={platforms}
                  handleAddNewLink={handleAddNewLink}
                  handleRemoveNewLink={handleRemoveNewLink}
                  handleChangeLinkPlatform={handleChangeLinkPlatform}
                  handleChangeLinkText={handleChangeLinkText}
                  handleSaveChanges={handleSaveChanges}
                  fetchUserLinks={fetchUserLinks}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  firstName={firstName}
                  lastName={lastName}
                  email={userEmail}
                  userId={userId}
                  setFirstName={setFirstName}
                  setLastName={setLastName}
                  setUserEmail={setUserEmail}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
