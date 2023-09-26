import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';

const TecnicTable = () => {
  const [productos, setProductos] = useState([]);

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

  const data = productos.map((productos) => ({
    name: {
      producto: productos.nombre_producto,
    },
  }));

  const columns = useMemo(
    () => [
      {
        header: 'Nombre de Producto',
        accessorKey: 'name.producto',
        size: 10,
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnResizing
      initialState={{
        density: 'compact',
        pagination: { pageIndex: 0, pageSize: 20 },
      }}
      muiToolbarAlertBannerChipProps={{ color: 'primary' }}
      muiTableContainerProps={{ sx: { maxHeight: 700 } }}
    />
  );
};

export default TecnicTable;
