"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

//@LocalStorage
import { getFavoritesFromLocalStorage } from "@/utils/utils";

//@Components
import Layout from "@/components/Layout";

const User = () => {
  const [email, setEmail] = useState("");
  const [favoritos, setFavoritos] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);
  }, []);

  useEffect(() => {
    const storedFavorites = getFavoritesFromLocalStorage();
    setFavoritos(storedFavorites);
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Perfil de Usuario</h1>
      <h2 className="text-blue-800 text-2lg mt-10 font-semibold ">
        ¡Bienvenido, {email}!
      </h2>

      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
          <tr>
            <th className="w-1/5 py-2  text-white">Nombre del Artista</th>
            <th className="w-1/5 py-2  text-white">Título de la obra</th>
            <th className="w-1/5 py-2  text-white">Imagen de la obra</th>
            <th className="w-1/5 py-2  text-white">Link</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {favoritos.map((obra) => (
            <tr key={obra.id}>
              <td className="border px-4 py-2">{obra.principalOrFirstMaker}</td>
              <td className="border px-4 py-2">{obra.title}</td>
              <td className="border px-4 py-2">
                <img
                  src={obra.webImage.url}
                  alt={obra.title}
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </td>
              <td className="border px-4 py-2">
                <a
                  href={obra.links.web}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver más
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default User;
