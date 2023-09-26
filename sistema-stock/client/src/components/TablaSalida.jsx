import { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';

const StockTable = () => {
  const [salida, setSalida] = useState([]);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/salidas');
        setSalida(response.data);
      } catch (error) {
        console.error('Error fetching salida:', error);
      }
    };
    fetchStock();
  }, []);

  const transformedData = useMemo(() => {
    return salida.map((salidas) => ({
      encargado: salidas.conductor_tec,
      apoyo_tec: salidas.apoyo_tec,
      cantidadInsumos: salidas.cant_insumos,
      productos: salidas.productos,
      fecha: salidas.fecha,
      descripcion: salidas.descripcion,
    }));
  }, [salida]);

  const columns = useMemo(
    () => [
      {
        header: 'Tec Conductor',
        accessorKey: 'encargado',
      },
      {
        header: 'Tec Apoyo',
        accessorKey: 'apoyo_tec',
      },
      {
        header: 'Cantidad Insumos',
        accessorKey: 'cantidadInsumos',
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
    <div>
      <MaterialReactTable
        columns={columns}
        data={transformedData}
        enableColumnResizing
        initialState={{
          density: 'compact',
          sorting: [{ id: 'nombre_producto', desc: false }],
        }}
        muiToolbarAlertBannerChipProps={{ color: 'primary' }}
        muiTableContainerProps={{ sx: { maxHeight: 700 } }}
      />
    </div>
  );
};

export default StockTable;
