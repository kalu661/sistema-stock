import { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';

const IngeTabla = () => {
  const [ingenieria, setIngenieria] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchDevo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/inge');
        setIngenieria(response.data);
        setTableData(response.data);
      } catch (error) {
        console.error('Error fetching salida:', error);
      }
    };
    fetchDevo();
  }, []);

  const transformedData = useMemo(() => {
    return ingenieria.map((ingenierias) => ({
      ingeniero: ingenierias.ingeniero,
      producto: ingenierias.producto,
      cantidad: ingenierias.cantidad,
      descripcion: ingenierias.descripcion,
      fecha: ingenierias.fecha,
    }));
  }, [ingenieria]);

  const columns = useMemo(
    () => [
      {
        header: 'Ingeniero',
        accessorKey: 'ingeniero',
      },
      {
        header: 'Producto Salida',
        accessorKey: 'producto',
      },
      {
        header: 'Cantidad',
        accessorKey: 'cantidad',
      },
      {
        header: 'Descripcion',
        accessorKey: 'descripcion',
      },
      {
        header: 'Fecha Salida',
        accessorKey: 'fecha',
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={transformedData}
      enableColumnResizing
      initialState={{
        density: 'compact',
        pagination: { pageIndex: 0, pageSize: 20 },
        sorting: [{ id: 'nombre_producto', desc: false }],
      }}
      muiToolbarAlertBannerChipProps={{ color: 'primary' }}
      muiTableContainerProps={{ sx: { maxHeight: 700 } }}
    />
  );
};

export default IngeTabla;
