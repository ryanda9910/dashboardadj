import React,{useEffect} from "react";
import Router from "next/router";


export default function Index() {
  useEffect(() => {
    if (localStorage.getItem('userId')===null) {
      Router.push("/admin/login");
    } else {
      Router.push("/admin/user");
    }
  }, []);
  return null
}


