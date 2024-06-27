import "server-only";

import axios, { type AxiosResponse } from "axios";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { type IPAPIResponse } from "@/types/ip-api";

export const getIP = () => {
  const forwaredFor = headers().get("x-forwarded-for");
  const realIp = headers().get("x-real-ip");

  if (forwaredFor) {
    return forwaredFor.split(",")[0]?.trim() ?? "0.0.0.0";
  }

  if (realIp) return realIp;

  return "0.0.0.0";
};

export const getUserAgent = () => {
  return userAgent({
    headers: headers(),
  });
};

export const getUserCountry = async (ip: string) => {
  const response = await axios.get(`http://ip-api.com/json/${ip}`);

  const { data } = response as AxiosResponse<IPAPIResponse>;

  return data;
};
