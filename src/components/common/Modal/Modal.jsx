import React, { useState } from 'react';

const Modal = ({ showModal, func, children }) => {
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            {children}
            <button onClick={func} className="mt-4 p-2 bg-blue-500 text-white rounded">
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;