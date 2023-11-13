import React, { useState } from "react";
import { axiosInstance } from "../context/AuthContext";

const CreateNewGallery = ({ onCancel }) => {
  const [displayName, setDisplayName] = useState("");
  const [technicalContactEmail, setTechnicalContactEmail] = useState("");
  const [technicalContactPhone, setTechnicalContactPhone] = useState("");
  const [error, setError] = useState(null);

  const validateForm = () => {
    if (!displayName || !technicalContactEmail || !technicalContactPhone) {
      setError("All fields are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    const formData = {
      displayName,
      technicalContactEmail,
      technicalContactPhone,
    };
  
    try {
      const response = await axiosInstance.post("/gallery", formData);
  
      if (response.status === 201) {
        window.location.reload();
      } else {
        console.error("Gallery setup failed");
      }
    } catch (error) {
      console.error("Error sending data to the backend", error);
    }
  };
  

  return (
    <div className="max-w-lg w-96 mb-12 p-6 mx-auto bg-neutral-50 mt-8 rounded-md drop-shadow shadow-xl">
      <div className="flex justify-end">
        <button
          className="text-gray-700 hover:text-red-500"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
      <h2 className="mb-4 text-2xl font-semibold">Setup New Gallery</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="displayName" className="block text-gray-700">
            Gallery Name:
          </label>
          <input
            type="text"
            id="displayName"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="technicalContactEmail" className="block text-gray-700">
            Technical Contact Email:
          </label>
          <input
            type="email"
            id="technicalContactEmail"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={technicalContactEmail}
            onChange={(e) => setTechnicalContactEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="technicalContactPhone" className="block text-gray-700">
            Technical Contact Phone:
          </label>
          <input
            type="tel"
            id="technicalContactPhone"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={technicalContactPhone}
            onChange={(e) => setTechnicalContactPhone(e.target.value)}
          />
        </div>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNewGallery;
