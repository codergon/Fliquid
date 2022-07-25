import { useEffect } from "react";

const shortenAddr = (address: string, start = 6, end = 4) =>
  address.substring(0, start) +
  "..." +
  address.substring(address.length - end, address.length);

const thousandify = (x: number, dp = 6) => {
  if (x.toString().includes(".")) {
    const y = x.toString().split(".");
    return dp === 0
      ? y[0]?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : y[0]?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
          "." +
          y[1]?.toString().substring(0, dp);
  } else {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export { shortenAddr, thousandify };
