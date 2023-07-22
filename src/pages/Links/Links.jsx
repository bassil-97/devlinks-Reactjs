import React from "react";
import "./Links.css";

import AddNewLink from "../../components/AddNewLink/AddNewLink";
import NewLinkForm from "../../components/NewLinkForm/NewLinkForm";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function Links({
  handleAddNewLink,
  links,
  platforms,
  handleRemoveNewLink,
  handleChangeLinkPlatform,
  handleChangeLinkText,
  handleSaveChanges,
  fetchUserLinks,
  isLoading
}) {
  return (
    <div className="user-links__container">
      <div className="mb-4">
        <h3 className="fw-bold mb-2">Customize your links</h3>
        <small className="text-muted">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </small>
      </div>
      <AddNewLink click={handleAddNewLink} />
      <div className="user-links__list accordion mt-4" id="accordionExample">
        {isLoading && <LoadingSpinner />}
        {!isLoading && links.length > 0 ? (
          links?.map((link) => (
            <NewLinkForm
              key={link._id}
              {...link}
              platforms={platforms}
              removeLink={handleRemoveNewLink}
              changeLinkPlatform={handleChangeLinkPlatform}
              changeLinkText={handleChangeLinkText}
              fetchUserLinks={fetchUserLinks}
            />
          ))
        ) : (
          <p className="text-center fw-bold mt-5">
            Don't have links yet? start adding some
          </p>
        )}
      </div>
      <hr />
      <div className="w-100 d-flex justify-content-end">
        <button className="save-users-links__btn" type="button" onClick={handleSaveChanges} disabled={!links.length}>
          Save
        </button>
      </div>
    </div>
  );
}
