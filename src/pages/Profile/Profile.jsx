import React from "react";
import "./Profile.css";

import Cookies from "universal-cookie";
import { useHttpClient } from "../../hooks/http-hook";

import SimpleSnackbar from "../../components/Snackbar/Snackbar";

export default function Profile({ firstName, lastName, email, userId, setFirstName, setLastName }) {
  
  const cookies = new Cookies();
  const { sendRequest } = useHttpClient();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const updateUserDetails = async () => {
    try {
      let responseData = await sendRequest(`https://devlinks-nodejs.onrender.com/api/users/update-user-info/${userId}`,
      "PATCH",
      JSON.stringify({
        firstName,
        lastName,
      }),
      {
        "Content-type": "application/json"
      }
      );

      if(responseData) {
        handleClick();
        cookies.set("userInfo", { firstName: firstName, lastName: lastName, email: email}, { path: "/" });
      }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="user-profile__container">
      <SimpleSnackbar open={open} handleClose={handleClose} />
      <div className="mb-5">
        <h3 className="fw-bold mb-2">Profile Details</h3>
        <small className="text-muted">
          Add your details to create a personal touch to your profile.
        </small>
      </div>
      <div className="user-profile__form">
        <div className="row mb-3">
          <label htmlFor="firstName" className="col-sm-4 col-form-label">
            First Name
          </label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="lastName" className="col-sm-4 col-form-label">
            Last Name
          </label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
        </div>
        
        <button className="btn btn-primary" onClick={updateUserDetails}>Update</button>
      </div>
    </div>
  );
}
