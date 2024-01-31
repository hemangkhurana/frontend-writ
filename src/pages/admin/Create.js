import React, { useRef, useState } from "react";
import { ReactDOM } from "react";
export const Create = () => {
  const [view, setView] = useRef(null);
  useState(async () => {
    const a = await fetch("http:localhost:8000/admin/login/");
    setView(a);
  });
  return <div>Admin Panel</div>;
};
