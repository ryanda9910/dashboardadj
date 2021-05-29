import React,{useEffect} from "react";
import Router from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../module/firebase';

export default function Index() {
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      Router.push("/admin/login");
    } else {
      Router.push("/admin/user");
    }
  }, [user]);
  return <div/>
}


