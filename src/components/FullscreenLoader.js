import React from "react";

export const FullscreenLoader = () => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-grow text-primary loading-in-center"
        role="status"
        style={{ width: "5rem", height: "5rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
