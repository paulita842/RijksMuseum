"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";

import Layout from "@/components/Layout";

const Login = () => {
  const [email, setEmail] = useState("prueba@correo.com");
  const [password, setPassword] = useState("123456");

  const router = useRouter();

  const handleLogin = (event) => {
    event.preventDefault();

    localStorage.setItem("email", email);

    router.push("/user");
  };
  return (
    <Layout>
      <h1 className="text-2xl text-white font-light text-center">Login</h1>
      <div className="flex justify-center mt-5 ">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={handleLogin}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm  font-bold mb-2"
                htmlFor="email"
              >
                Email
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email Usuario"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm  font-bold mb-2"
                htmlFor="password"
              >
                Password
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password Usuario"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <button
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
