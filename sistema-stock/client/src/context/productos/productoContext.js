import { useState, useContext } from 'react';

// Contexto que contiene el nombre_producto
const ProductContext = createContext('');

// Componente que proporciona el contexto
export default function ProductProvider({ children }) {
  const [nombre_producto, setNombreProducto] = useState('');

  // Llamamos a la API para obtener el nombre_producto
  async function fetchNombreProducto() {
    const response = await fetch('https://localhost:4000/api/productos');
    const data = await response.json();
    setNombreProducto(data.nombre_producto);
  }

  // Inicializamos el nombre_producto
  fetchNombreProducto();

  // Devolvemos el valor del contexto
  return (
    <ProductContext.Provider value={nombre_producto}>
      {children}
    </ProductContext.Provider>
  );
}
