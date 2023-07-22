import React from "react";
import "./Phone.css";

import UserLink from "../UserLink/UserLink";
import UserSkeleton from "../Skeleton/Skeleton";
import LinkSkeleton from "../Skeleton/LinkSkeleton";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Phone({
  links,
  showLinkSkeleton,
  firstName,
  lastName,
  userEmail,
  isLoading,
}) {
  return (
    <div className="phone-container">
      <div className="user-avatar mb-4">
        <img
          width="98"
          height="98"
          src="https://img.icons8.com/fluency/98/person-male.png"
          alt="person-male"
        />
      </div>
      {!firstName && !lastName && !userEmail && <UserSkeleton />}
      {firstName && lastName && (
        <h6 className="text-capitalize fw-bold mb-2">
          {firstName} {lastName}
        </h6>
      )}
      {userEmail && <small className="text-muted">{userEmail}</small>}
      <div className="user-links__list w-100 mt-5">
        {!isLoading &&
          links
            ?.filter((link) => link.status === "active")
            .map((link) => <UserLink key={link.id} {...link} />)}
        {showLinkSkeleton && <LinkSkeleton />}
        {isLoading && <LoadingSpinner />}
      </div>
    </div>
  );
}
