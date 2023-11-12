import React from 'react';

function CustomDialog({ isOpen, title, message, onConfirm, onCancel }) {
  return (
    <div>
      {/* Overlay Background */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 ${isOpen ? 'block' : 'hidden'}`}
      ></div>

      {/* Dialog Content */}
      <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="p-8 bg-white rounded shadow-md custom-dialog">
          <h2 className="mb-4 text-2xl">{title}</h2>
          <p>{message}</p>
          <div className="flex justify-end mt-4">
            <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600" onClick={onConfirm}>
              Confirm
            </button>
            <button className="px-4 py-2 ml-4 text-white bg-red-500 rounded hover:bg-red-600" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomDialog;
