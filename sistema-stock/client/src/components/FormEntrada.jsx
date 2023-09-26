import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const StockForm = () => {
  const [productos, setProductos] = useState([]);
  const [productoId, setProductoId] = useState('');
  const [nombreProducto, setNombreProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState('');
  const [codigo_barra, setCodigo_barra] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/productos').then((response) => {
      setProductos(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productoId, cantidad, fecha, codigo_barra);

    // Hacer la solicitud para almacenar el stock
    axios
      .post('http://localhost:3000/api/Stocktb', {
        producto: nombreProducto,
        cantidad,
        fecha,
        codigo_barra,
      })
      .then((response) => {
        // Manejar la respuesta exitosa aquí, si es necesario
        console.log('Stock almacenado con éxito:', response.data);
        setNombreProducto('');
        setCantidad('');
        setFecha('');
        setCodigo_barra('');
        alert('Producto ingresado correctamente');
      })
      .catch((error) => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error al almacenar el stock:', error);
        console.log(setProductoId);
        // Puedes mostrar un mensaje de error al usuario aquí si lo deseas
      });
  };

  return (
    <div>
      <Form>
        <h2>Entrada de productos</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Producto</Form.Label>
          <Form.Select
            onChange={(e) => {
              setNombreProducto(e.target.options[e.target.selectedIndex].text);
            }}
          >
            <option>Seleccione un producto</option>
            {productos.map((producto) => (
              <option key={producto.id} value={producto.nombre_producto}>
                {producto.nombre_producto}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Cantidad</Form.Label>
          <Form.Control
            type="number"
            placeholder="Cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            type="date"
            placeholder="Fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Codigo de barra</Form.Label>
          <Form.Control
            type="number"
            placeholder="Codigo de barra"
            value={codigo_barra}
            onChange={(e) => setCodigo_barra(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Ingresar
        </Button>
      </Form>
    </div>
  );
};

export default StockForm;
