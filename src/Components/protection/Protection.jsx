import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protection({ children }) {
  console.log("wraperr");
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) return navigate("/login");
  }, []);

  return <>{children}</>;
}

export default Protection;
