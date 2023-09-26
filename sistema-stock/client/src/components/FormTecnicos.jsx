import { useState, useEffect } from 'react';
import axios from 'axios';

const TecnicoForm = () => {
  const [tecnicos, setTecnicos] = useState([]);
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [editing, setEditing] = useState(false);
  const [id_tecnico, setId_tecnico] = useState(null);

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const fetchTechnicians = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tecnicos');
      setTecnicos(response.data);
    } catch (error) {
      console.error('Error fetching tecnicos:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editing) {
      // Edit technician
      try {
        await axios.put(`http://localhost:3000/api/tecnicos/${id_tecnico}`, {
          name,
          lastname,
        });
        setName('');
        setLastName('');
        setId_tecnico(null);
        setEditing(false);
        fetchTechnicians();
      } catch (error) {
        console.error('Error editing technician:', error);
      }
    } else {
      // Crear tecnicos
      try {
        await axios.post('http://localhost:3000/api/tecnicos', {
          name,
          lastname,
        });
        setName('');
        setLastName('');
        fetchTechnicians();
      } catch (error) {
        console.error('Error creating tecnicos:', error);
      }
    }
  };

  const handleEdit = (tecnicos) => {
    setName(tecnicos.name);
    setLastName(tecnicos.lastname);
    setId_tecnico(tecnicos.id_tecnico);
    setEditing(true);
  };

  const handleDelete = async (id_tecnico) => {
    try {
      await axios.delete(`http://localhost:3000/api/tecnicos/${id_tecnico}`);
      fetchTechnicians();
    } catch (error) {
      console.error('Error deleting tecnicos:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Agregar Tecnicos</h2>
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
        />
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Apellido"
          required
        />
        <button className="btn btn-outline-success" type="submit">
          {editing ? 'Actualizar' : 'Agregar'}
        </button>
        <ul>
          {tecnicos.map((tecnicos) => (
            <li key={tecnicos.id_tecnico}>
              {tecnicos.name} {tecnicos.lastname}
              <button
                className="btn btn-outline-warning"
                onClick={() => handleEdit(tecnicos)}
              >
                Editar
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => handleDelete(tecnicos.id_tecnico)}
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

export default TecnicoForm;
