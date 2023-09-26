import { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';

const StockTable = () => {
  const [stock, setStock] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchDevo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/stocktb');
        setStock(response.data);
        setTableData(response.data);
      } catch (error) {
        console.error('Error fetching salida:', error);
      }
    };
    fetchDevo();
  }, []);

  const transformedData = useMemo(() => {
    return stock.map((stocks) => ({
      producto: stocks.producto,
      cantidad: stocks.cantidad,
      fecha: stocks.fecha,
      codigo_barra: stocks.codigo_barra,
    }));
  }, [stock]);

  const columns = useMemo(() => [
    {
      header: 'Producto',
      accessorKey: 'producto',
    },
    {
      header: 'Cantidad',
      accessorKey: 'cantidad',
    },
    {
      header: 'Fecha Ingreso',
      accessorKey: 'fecha',
    },
    {
      header: 'Codigo de Barras',
      accessorKey: 'codigo_barra',
    },
  ]);

  return (
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
  );
};

export default StockTable;
