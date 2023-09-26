import { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';

const RetiroTable = () => {
  const [retiro, setRetiro] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchDevo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/retiro');
        setRetiro(response.data);
        setTableData(response.data);
      } catch (error) {
        console.error('Error fetching salida:', error);
      }
    };
    fetchDevo();
  }, []);

  const transformedData = useMemo(() => {
    return retiro.map((retiros) => ({
      producto: retiros.producto,
      cantidad: retiros.cantidad,
      tecnico: retiros.tecnico,
      fecha_hora: retiros.fecha_hora,
      descripcion: retiros.descripcion,
    }));
  }, [retiro]);

  const columns = useMemo(
    () => [
      {
        header: 'Producto',
        accessorKey: 'producto',
      },
      {
        header: 'Cantidad',
        accessorKey: 'cantidad',
      },
      {
        header: 'Tecnico',
        accessorKey: 'tecnico',
      },
      {
        header: 'Descripcion',
        accessorKey: 'descripcion',
      },
      {
        header: 'Fecha Salida',
        accessorKey: 'fecha_hora',
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={transformedData}
      enableColumnResizing
      muiToolbarAlertBannerChipProps={{ color: 'danger' }}
      muiTableContainerProps={{ sx: { maxHeight: 700 } }}
    />
  );
};

export default RetiroTable;
