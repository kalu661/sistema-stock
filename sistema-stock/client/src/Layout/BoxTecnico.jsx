import { useState } from 'react';
import axios from 'axios';
import TecnicoSearch from './SearchTEcnicos';

function TecnicoBox() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/', {
        name,
        lastname,
      });
      alert('Datos guardados exitosamente');
      setName('');
      setLastname('');
    } catch (error) {
      console.error(error);
      alert('Ha ocurrido un error al guardar los datos');
    }
  };
  return (
    <div>
      <input type="checkbox" onChange={toggleForm} checked={showForm} />
      {showForm && (
        <form onSubmit={handleSubmit}>
          <TecnicoSearch />
        </form>
      )}
    </div>
  );
}

export default TecnicoBox;
