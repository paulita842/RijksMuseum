// localStorage.js

// Función para guardar los favoritos en localStorage
export const saveFavoritesToLocalStorage = (favoritos) => {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
};

// Función para obtener los favoritos de localStorage
export const getFavoritesFromLocalStorage = () => {
  const favoritosJSON = localStorage.getItem("favoritos");
  return favoritosJSON ? JSON.parse(favoritosJSON) : [];
};
