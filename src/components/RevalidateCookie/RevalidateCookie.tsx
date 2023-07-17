"use client";

import { FC, useEffect } from "react";
import Cookies from "universal-cookie";

const RevalidateCookie: FC = () => {
  useEffect(() => {
    const cookies = new Cookies();
    cookies.set("isClient", "true", {
      expires: new Date(new Date().getTime() + 60000),
    });

    setInterval(() => {
      cookies.set("isClient", "true", {
        expires: new Date(new Date().getTime() + 60000),
      });
    }, 60000);
  }, []);

  return null;
};

export default RevalidateCookie;
