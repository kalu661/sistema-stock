import { useState } from 'react';
// import { Spinner } from 'react-bootstrap';
import ProducTable from '../components/TablaProductos';
import TecnicTable from '../components/TablaTecnicos';
import RetiroTable from '../components/TablaRetiro';
import StockTable from '../components/TablaInventario';
import SalidaTable from '../components/TablaSalida';
import DevolucionTable from '../components/TablaDevolucion';
import IngeTabla from '../components/TablaIngenieria';

const PanelTabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  return (
    <div className="tabs">
      <div className="tab-buttons">
        <button
          className={`tab-button ${
            activeTab === 1 ? 'active' : ''
          } btn btn-outline-danger`}
          onClick={() => handleTabClick(1)}
        >
          Nombre de productos
        </button>
        <button
          className={`tab-button ${
            activeTab === 2 ? 'active' : ''
          } btn btn-outline-danger`}
          onClick={() => handleTabClick(2)}
        >
          Nombre de Tecnicos
        </button>
        <button
          className={`tab-button ${
            activeTab === 3 ? 'active' : ''
          } btn btn-outline-danger`}
          onClick={() => handleTabClick(3)}
        >
          Entrada de Inventario
        </button>
        <button
          className={`tab-button ${
            activeTab === 4 ? 'active' : ''
          } btn btn-outline-danger`}
          onClick={() => handleTabClick(4)}
        >
          Salida Tecnicos
        </button>
        <button
          className={`tab-button ${
            activeTab === 7 ? 'active' : ''
          } btn btn-outline-danger`}
          onClick={() => handleTabClick(7)}
        >
          Salida Ingenieria
        </button>
        <button
          className={`tab-button ${
            activeTab === 5 ? 'active' : ''
          } btn btn-outline-danger`}
          onClick={() => handleTabClick(5)}
        >
          Devolucion General
        </button>
        <button
          className={`tab-button ${
            activeTab === 6 ? 'active' : ''
          } btn btn-outline-danger`}
          onClick={() => handleTabClick(6)}
        >
          Retiro Tecnicos
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 1 && <ProducTable />}
        {activeTab === 2 && <TecnicTable />}
        {activeTab === 3 && <StockTable />}
        {activeTab === 4 && <SalidaTable />}
        {activeTab === 5 && <DevolucionTable />}
        {activeTab === 6 && <RetiroTable />}
        {activeTab === 7 && <IngeTabla />}
      </div>
    </div>
  );
};
export default PanelTabs;
