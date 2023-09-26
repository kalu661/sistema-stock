import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

function StockForm() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [productos, setProductos] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]); // Nuevo estado para almacenar los productos agregados

  useEffect(() => {
    fetchTecnicos();
  }, []);

  const fetchTecnicos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/productos`);
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const handleProductChange = (e) => {
    const productId = parseInt(e.target.value);
    setSelectedProduct(
      productos.find((producto) => producto.id_producto === productId)
    );
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddProduct = () => {
    if (selectedProduct && quantity > 0) {
      // Verificar que se haya seleccionado un producto y se haya ingresado una cantidad válida
      const newProduct = {
        ...selectedProduct,
        quantity,
      };
      setAddedProducts([...addedProducts, newProduct]);
      setSelectedProduct(null);
      setQuantity(0);
    }
  };

  return (
    <div>
      <Form>
        <h4>Ingreso de Stock</h4>
        <Form.Group>
          <Form.Label>Producto:</Form.Label>
          <Form.Control as="select" onChange={handleProductChange}>
            <option value="">Seleccione un producto</option>
            {productos.map((producto) => (
              <option key={producto.id_producto} value={producto.id_producto}>
                {producto.nombre_producto}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        {selectedProduct && (
          <Form.Group>
            <Form.Label>Cantidad:</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </Form.Group>
        )}
      </Form>
      <Button variant="primary" onClick={handleAddProduct}>
        Agregar Producto
      </Button>

      {/* Mostrar los productos agregados */}
      <h4>Productos agregados:</h4>
      <ul>
        {addedProducts.map((product, index) => (
          <li key={index}>
            Producto: {product.nombre_producto}, Cantidad: {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockForm;
