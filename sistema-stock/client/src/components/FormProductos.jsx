import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [productos, setProductos] = useState([]);
  const [nombre_producto, setNombre_producto] = useState('');
  const [editing, setEditing] = useState(false);
  const [id_producto, setProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editing) {
      // Edit product
      try {
        await axios.put(`http://localhost:3000/api/productos/${id_producto}`, {
          nombre_producto,
        });
        setNombre_producto('');
        setProductId(null);
        setEditing(false);
        fetchProducts();
      } catch (error) {
        console.error('Error editing product:', error);
      }
    } else {
      // Create product
      try {
        await axios.post('http://localhost:3000/api/productos', {
          nombre_producto,
        });
        setNombre_producto('');
        fetchProducts();
      } catch (error) {
        console.error('Error creating product:', error);
      }
    }
  };

  const handleEdit = (product) => {
    setNombre_producto(product.nombre_producto);
    setProductId(product.id_producto);
    setEditing(true);
  };

  const handleDelete = async (id_producto) => {
    try {
      await axios.delete(`http://localhost:3000/api/productos/${id_producto}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Agregar un Producto </h2>
        <input
          type="text"
          value={nombre_producto}
          onChange={(e) => setNombre_producto(e.target.value)}
          placeholder="Nombre Producto"
          required
        />
        <button type="submit" className="btn btn-outline-success">
          {editing ? 'Actualizar' : 'Añadir'}
        </button>
        <ul>
          {productos.map((productos) => (
            <li key={productos.id_producto}>
              {productos.nombre_producto}
              <button
                className="btn btn-outline-warning"
                onClick={() => handleEdit(productos)}
              >
                Editar
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => handleDelete(productos.id_producto)}
              >
                Borrar
              </button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default ProductForm;
