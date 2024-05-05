"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

//@Components
import Layout from "@/components/Layout";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);

  return null;
};

export default Home;
