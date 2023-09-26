import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

export const IngForm = () => {
  const [productos, setProductos] = useState([]);
  const [ingeniero, setIngeniero] = useState('');
  const [nombreProducto, setNombreProducto] = useState('');
  const [cantidad, setCantidad] = useState(0);

  const [fecha, setFecha] = useState(null);
  const [descripcion, setDescription] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/productos');
        setProductos(response.data);
      } catch (error) {
        console.error('Error fetching productos:', error);
      }
    };
    fetchProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construye el objeto con los datos del formulario
    const formData = {
      ingeniero: ingeniero,
      producto: nombreProducto,
      cantidad: cantidad,
      descripcion: descripcion,
      fecha: fecha,
    };

    try {
      // Realiza una solicitud POST a la API de devolución
      const response = await axios.post(
        'http://localhost:3000/api/inge/',
        formData
      );
      console.log('Datos enviados con éxito:', response.data);
      // Puedes realizar alguna acción adicional después de enviar los datos, si es necesario.
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h3>Salida de Ingeniería</h3>
        <Form.Group>
          <Form.Label>Ingeniero:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre y Apellido"
            value={ingeniero}
            onChange={(e) => setIngeniero(e.target.value)}
          />
        </Form.Group>
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
        <Form.Group>
          <Form.Label>Descripción:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={descripcion}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="btn btn-success">
          Enviar Formulario
        </Button>
      </Form>
    </>
  );
};
