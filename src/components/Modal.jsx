import React from "react";

const Modal = ({ showModal, setShowModal, children }) => {
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
            {children}

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
