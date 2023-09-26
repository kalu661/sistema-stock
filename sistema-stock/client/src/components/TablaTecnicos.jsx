import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';

const TecnicTable = () => {
  const [tecnicos, setTecnicos] = useState([]);

  useEffect(() => {
    const fetchTecnicos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tecnicos');
        setTecnicos(response.data);
      } catch (error) {
        console.error('Error fetching tecnicos:', error);
      }
    };
    fetchTecnicos();
  }, []);

  const data = tecnicos.map((tecnico) => ({
    name: {
      firstName: tecnico.name,
      lastName: tecnico.lastname,
      state: tecnico.estado,
    },
  }));

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name.firstName',
        header: 'Nombre',
        size: 150,
      },
      {
        accessorKey: 'name.lastName',
        header: 'Apellido',
        size: 150,
      },
      {
        accessorKey: 'name.state',
        header: 'Estado',
        size: 200,
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnResizing
      enableGrouping
    />
  );
};

export default TecnicTable;
