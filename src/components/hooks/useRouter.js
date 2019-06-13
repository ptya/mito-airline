import { useContext } from "react";
import { __RouterContext } from "react-router-dom";

export default function useRouter() {
  console.log("hey");
  return useContext(__RouterContext);
}
