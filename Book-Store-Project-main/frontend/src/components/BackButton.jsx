import React from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className="flex items-center text-blue-500">
      <MdArrowBack className="mr-2" /> Back
    </button>
  );
};

export default BackButton;
