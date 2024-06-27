import "server-only";

import { headers } from "next/headers";
import { userAgent } from "next/server";

export const getIP = () => {
  const forwaredFor = headers().get("x-forwarded-for");
  const realIp = headers().get("x-real-ip");

  if (forwaredFor) {
    return forwaredFor.split(",")[0]?.trim() ?? "127.0.0.1";
  }

  if (realIp) return realIp;

  return "127.0.0.1";
};

export const getUserAgent = () => {
  return userAgent({
    headers: headers(),
  });
};
