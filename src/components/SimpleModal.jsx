import React from "react";

const SimpleModal = ({
  children,
  containerStyles,
}) => {

  return (
    <>
      <div
        className={`overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none${
          containerStyles || "p-3 justify-center items-center flex "
        }`}
      >
        {children}
      </div>
      <div className="opacity-75 fixed inset-0 z-40 bg-white"></div>
    </>
  );
};

export default SimpleModal;
