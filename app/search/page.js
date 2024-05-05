"use client";
import React, { useState, useEffect } from "react";
import fetch from "node-fetch";
import Select from "react-select";

//@LocalStorage
import { saveFavoritesToLocalStorage } from "@/utils/utils";

//@Components
import Layout from "@/components/Layout";

const SearchScreen = () => {
  const [nombreArtista, setNombreArtista] = useState("");
  const [obras, setObras] = useState([]);
  const [error, setError] = useState(null);
  const [artistas, setArtistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const fetchArtistas = async () => {
      try {
        const response = await fetch(
          "https://www.rijksmuseum.nl/api/nl/collection?key=KHn4xrLx"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos de los artistas");
        }
        const data = await response.json();
        const artistasOptions = data.artObjects.map((obra) => ({
          value: obra.principalOrFirstMaker,
          label: obra.principalOrFirstMaker,
        }));
        setArtistas(artistasOptions);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setError("Error al obtener los datos de los artistas");
      }
    };

    fetchArtistas();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://www.rijksmuseum.nl/api/nl/collection?key=KHn4xrLx&involvedMaker=${nombreArtista}`
      );
      if (!response.ok) {
        throw new Error(
          "Error al obtener los datos de las obras de arte del artista"
        );
      }
      const data = await response.json();
      console.log("DATA", data);
      setObras(data.artObjects);
    } catch (error) {
      console.error("Error:", error);
      setError("Error al realizar la búsqueda de obras de arte");
    }
  };

  const handleAddToFavorites = (obra) => {
    const isAlreadyFavorited = favoritos.some(
      (favObra) => favObra.id === obra.id
    );

    if (!isAlreadyFavorited) {
      const newFavorites = [...favoritos, obra];
      setFavoritos(newFavorites);
      saveFavoritesToLocalStorage(newFavorites);
    } else {
      alert("Esta obra ya está en tu lista de favoritos");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light mb-6">Explora Rijks</h1>
      <div>
        {loading ? (
          <p className="text-2xl text-gray-800 font-light">
            Cargando artistas...
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <Select
              options={artistas}
              onChange={(selectedOption) =>
                setNombreArtista(selectedOption.value)
              }
              placeholder="Seleccione un artista"
              className="xl:w-2/5 focus:shadow-outline text-lg"
            />
            <button
              type="submit"
              className="bg-gray-800 xl:w-2/5 mt-5 p-2 text-white uppercase hover:bg-gray-900 rounded"
            >
              Buscar Obras de Arte
            </button>
          </form>
        )}
        {error && <p>{error}</p>}

        {!loading ? (
          <div>
            <h2 className="text-2xl text-gray-800 text-center uppercase mt-20">
              Obras de Arte
            </h2>
            <table className="table-auto shadow-md mt-10 min-w-full xl:w-full text-xl ">
              <thead className="bg-gray-800">
                <tr className="bg-pink">
                  <th className="py-2 text-white w-20">Nombre del Artista</th>
                  <th className="py-2 text-white w-20">Título de la obra</th>
                  <th className="py-2 text-white w-20">Imagen de la obra</th>
                  <th className="py-2 text-white w-20">Link</th>
                  <th className="py-2 text-white w-20">Acción</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {obras.map((obra) => (
                  <tr key={obra.id}>
                    <td className="border px-4 py-2">
                      {obra.principalOrFirstMaker}
                    </td>
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
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleAddToFavorites(obra)}
                        className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded "
                      >
                        ❤ Me gusta
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          " "
        )}
      </div>
    </Layout>
  );
};

export default SearchScreen;
