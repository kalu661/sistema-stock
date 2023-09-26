import { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css'; // Importa el CSS

import '../styles/FormSalida.css';

function SalidaTec() {
  const [conductorTec, setConductorTec] = useState('');
  const [tecnicoApoyo, setTecnicoApoyo] = useState('');
  const [cant_insumos, setCantidadInsumos] = useState(0);
  const [fecha, setFecha] = useState(new Date()); // Inicializa con la fecha actual
  const [descripcion, setDescripcion] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [tecnicoNombre, setTecnicoNombre] = useState('');
  const [tecnicoApellido, setTecnicoApellido] = useState('');
  const [tecnicoNombre2, setTecnicoNombre2] = useState('');
  const [tecnicoApellido2, setTecnicoApellido2] = useState('');

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(conductorTec, tecnicoApoyo, tecnicoApoyo, fecha, descripcion);

    // Hacer la solicitud para almacenar el stock
    axios
      .post('http://localhost:3000/api/salidas', {
        conductor_tec: `${tecnicoNombre} ${tecnicoApellido}`,
        apoyo_tec: `${tecnicoNombre2} ${tecnicoApellido2}`,
        cant_insumos,
        fecha,
        descripcion,
      })
      .then((response) => {
        // Manejar la respuesta exitosa aquí, si es necesario
        console.log('Salida almacenado con éxito:', response.data);
        setConductorTec('');
        setTecnicoApoyo('');
        setTecnicoNombre2('');
        setTecnicoApellido2('');
        setDescripcion('');
        setTecnicoNombre('');
        setTecnicoApellido('');
        alert('Salida almacenado con éxito');
      })
      .catch((error) => {
        console.error('Error al almacenar la Salida:', error);
      });
  };
  const showFormLabel = showForm ? 'Sí' : 'No';

  return (
    <div>
      <Form>
        <h2>Salida de Tecnicos con Insumos</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Técnico Conductor</Form.Label>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Nombre del Técnico"
              value={tecnicoNombre}
              onChange={(e) => setTecnicoNombre(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Apellido del Técnico"
              value={tecnicoApellido}
              onChange={(e) => setTecnicoApellido(e.target.value)}
            />
          </Form.Group>
        </Form.Group>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={toggleForm}
            checked={showForm}
            id="flexSwitchCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Compañero ({showFormLabel})
          </label>
          <br />
          {showForm && (
            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Técnico Apoyo</Form.Label>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Nombre del Técnico"
                  value={tecnicoNombre2}
                  onChange={(e) => setTecnicoNombre2(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Apellido del Técnico"
                  value={tecnicoApellido2}
                  onChange={(e) => setTecnicoApellido2(e.target.value)}
                />
              </Form.Group>
            </Form.Group>
          )}
        </div>
        <Form.Group className="mb-3" controlId="formBasicNumber">
          <Form.Label>Cantidad de Insumos</Form.Label>
          <Form.Control
            type="number"
            value={cant_insumos}
            onChange={(e) => setCantidadInsumos(e.target.value)}
            required
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
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </Form.Group>
        <Button
          className="btn btn-success"
          type="submit"
          onClick={handleSubmit}
        >
          Enviar Formulario
        </Button>
      </Form>
    </div>
  );
}

export default SalidaTec;
