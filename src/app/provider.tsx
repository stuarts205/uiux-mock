"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { set } from "date-fns";

const Provider = ({ children }: any) => {
  const [userDetail, setUserDetail] = useState();

  useEffect(() => {
    createNewUser();
  }, []);

  const createNewUser = async () => {
    const result = await axios.post("/api/user", {});
    setUserDetail(result.data);
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
};

export default Provider;
