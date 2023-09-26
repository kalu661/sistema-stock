import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

function RetiroTable() {
  const [tecnicos, setTecnicos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [nombreTecnico, setNombreTecnico] = useState('');
  const [nombreProducto, setNombreProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha_hora, setFecha_hora] = useState(''); // Aquí almacenaremos fecha y hora
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/productos').then((response) => {
      setProductos(response.data);
    });
    axios.get('http://localhost:3000/api/tecnicos').then((response) => {
      setTecnicos(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtenemos la fecha actual
    const currentDate = new Date();

    // Formateamos la fecha actual como "YYYY-MM-DD"
    const formattedDate = currentDate.toISOString().split('T')[0];

    // Combinamos la fecha formateada con la hora ingresada
    const combinedDateTime = `${formattedDate} ${fecha_hora}`;

    console.log(
      nombreProducto,
      cantidad,
      nombreTecnico,
      combinedDateTime,
      descripcion
    );

    // Hacer la solicitud para almacenar el retiro
    axios
      .post('http://localhost:3000/api/retiro', {
        producto: nombreProducto,
        cantidad,
        tecnico: nombreTecnico,
        fecha_hora, // Almacenamos fecha y hora combinadas
        descripcion,
      })
      .then((response) => {
        // Manejar la respuesta exitosa aquí, si es necesario
        console.log('Retiro almacenado con éxito:', response.data);
        setNombreProducto('');
        setNombreTecnico('');
        setCantidad('');
        setFecha_hora('');
        setDescripcion('');
        alert('Retiro ingresado correctamente');
      })
      .catch((error) => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error al almacenar el retiro:', error);
      });
  };

  return (
    <div>
      <Form>
        <h2>Ingreso de Retiro</h2>
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
          <Form.Label>Técnico</Form.Label>
          <Form.Select
            onChange={(e) => {
              setNombreTecnico(e.target.options[e.target.selectedIndex].text);
            }}
          >
            <option>Seleccione un Técnico</option>
            {tecnicos.map((tecnico) => (
              <option key={tecnico.id} value={tecnico.name}>
                {tecnico.name}, {tecnico.lastname}
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
          <Form.Label>Fecha y Hora</Form.Label>
          <Form.Control
            type="date" // Usamos un input de fecha y hora
            value={fecha_hora}
            onChange={(e) => setFecha_hora(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Descripción:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Button variant="success" type="submit" onClick={handleSubmit}>
            Enviar Formulario
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default RetiroTable;
