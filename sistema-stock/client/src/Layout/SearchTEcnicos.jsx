import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/SearchTecn.css';

function TecnicoSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tecnicos, setTecnicos] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [selectedLastName, setSelectedLastName] = useState('');
  const [showSearch, setShowSearch] = useState(true);

  useEffect(() => {
    fetchTecnicos();
  }, []);

  const fetchTecnicos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/tecnicos`);
      setTecnicos(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNameSelect = (name, lastname) => {
    setSelectedName(name);
    setSelectedLastName(lastname);
    setShowSearch(false);
  };

  const handleEdit = () => {
    setSelectedName('');
    setSelectedLastName('');
    setShowSearch(true);
  };

  return (
    <div>
      {showSearch && (
        <div>
          <h3>Buscar Técnicos</h3>
          <input
            type="text"
            placeholder="Buscar por nombre o apellido"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <ul>
            {tecnicos
              .filter(
                (tecnico) =>
                  tecnico.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  tecnico.lastname
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .map((tecnico, index) => (
                <li
                  key={index}
                  onClick={() =>
                    handleNameSelect(tecnico.name, tecnico.lastname)
                  }
                >
                  {tecnico.name} {tecnico.lastname}
                </li>
              ))}
          </ul>
        </div>
      )}
      {!showSearch && (
        <div>
          <p className="name_select">
            Nombre seleccionado: {selectedName} {selectedLastName}
          </p>
          <button className="btn btn-warning" onClick={handleEdit}>
            Editar
          </button>
          {/* Aquí puedes agregar los campos adicionales al formulario */}
        </div>
      )}
    </div>
  );
}

export default TecnicoSearch;
