import { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';

const DevolucionTable = () => {
  const [devolucion, setDevolucion] = useState([]);
  const [devoluciones, setDevoluciones] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchDevo = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/devolucion'
        );
        setDevolucion(response.data);
        setTableData(response.data);
      } catch (error) {
        console.error('Error fetching salida:', error);
      }
    };
    fetchDevo();
  }, []);

  const transformedData = useMemo(() => {
    return devolucion.map((devoluciones) => ({
      encargado: devoluciones.encargado,
      producto: devoluciones.producto,
      cantidad: devoluciones.cantidad,
      fecha: devoluciones.fecha,
      descripcion: devoluciones.descripcion,
    }));
  }, [devolucion]);

  const columns = useMemo(
    () => [
      {
        header: 'Encargado',
        accessorKey: 'encargado',
      },
      {
        header: 'Producto Devuelto',
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
        header: 'Fecha Devolucion',
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

export default DevolucionTable;
