import React, { useState } from "react";
import "./NewLinkForm.css";

import { useHttpClient } from "../../hooks/http-hook";

export default function NewLinkForm({ id, platform, status, link, removeLink, platforms, changeLinkPlatform, changeLinkText, fetchUserLinks }) {

  const { sendRequest } = useHttpClient();

  const [linkPlatform, setLinkPlatform] = useState(platform);
  const [linkText, setLinkText] = useState(link);

  const handleChangePlatform = (e) => {
    setLinkPlatform(e.target.value);
    changeLinkPlatform(e.target.value, id);
  }

  const handleChangeLinkText = (e) => {
    setLinkText(e.target.value);
    changeLinkText(e.target.value, id);
  }


  const updateLinkDetails = async () => {
    try {
      let responseData = await sendRequest(`https://devlinks-nodejs.onrender.com/api/users/update-link-details/${id}`,
      "PATCH",
      JSON.stringify({ 
        newPlatform: linkPlatform,
        newLinkText: linkText
       }),
       {
        "Content-type": "application/json"
       }
      );

      if(responseData['updated']) fetchUserLinks();
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div className="accordion-item new-link-form__container">
      <h2 className="accordion-header" id="headingOne">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#accordion-${id}`}
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          Link #{id}
        </button>
        <small className="text-muted" onClick={() => removeLink(id)}>
          Remove
        </small>
      </h2>
      <div
        id={`accordion-${id}`}
        className="accordion-collapse collapse"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Platform
            </label>
            <select className="form-select" aria-label="Default select example" value={linkPlatform} onChange={handleChangePlatform}>
              <option defaultValue>Open this select menu</option>
              {platforms.map(platform => <option key={platform._id} value={platform.platform}>{platform.platform}</option>)}
            </select>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">
              Link
            </label>
            <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
            <i className='bx bx-link'></i>
            </span>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput2"
                value={linkText}
                placeholder="https://github.com/bassil-97"
                onChange={handleChangeLinkText}
              />
            </div>
            <small id="emailHelp" className="form-text text-muted">(Include https:// in the beginning of your link)</small>
          </div>
          <button className="btn btn-primary" disabled={status === 'hidden'} onClick={updateLinkDetails}>Update</button>
        </div>
      </div>
    </div>
  );
}
