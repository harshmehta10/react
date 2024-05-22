import React from "react";

export const Modal = ({ closeModal }) => {
  return (
    <div>
      <div onClick={() => closeModal()}>
        <p className="close">&times;</p>
      </div>
    </div>
  );
};
