import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

export const DevolucionForm = () => {
  const [tecnicos, setTecnicos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [encargado, setEncargado] = useState('');
  const [nombreProducto, setNombreProducto] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [date, setDate] = useState(null);
  const [descripcion, setDescription] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/productos').then((response) => {
      setProductos(response.data);
    });
    axios.get('http://localhost:3000/api/tecnicos').then((response) => {
      setTecnicos(response.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/api/devolucion', {
        encargado: encargado,
        producto: nombreProducto,
        cantidad: cantidad,
        fecha: date,
        descripcion: descripcion,
      })
      .then((response) => {
        // Manejar la respuesta exitosa aquí, si es necesario
        console.log('Retiro almacenado con éxito:', response.data);
        setNombreProducto('');
        setEncargado('');
        setCantidad('');
        setDate('');
        setDescription('');
        alert('Retiro ingresado correctamente');
      })
      .catch((error) => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error al almacenar el retiro:', error);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h3>Ingreso de Devolucion</h3>
        <Form.Group>
          <Form.Label>Personal Encargado:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre y Apellido"
            value={encargado}
            onChange={(e) => setEncargado(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Producto</Form.Label>
          <Form.Select
            onChange={(e) => {
              setNombreProducto(e.target.options[e.target.selectedIndex].text); // Cambia el nombre de la variable a "producto"
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
