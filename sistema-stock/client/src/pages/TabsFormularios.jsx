import { useState } from 'react';
import ProductForm from '../components/FormProductos';
import TecnicoForm from '../components/FormTecnicos';
import StockForm from '../components/FormEntrada';
import RetiroForm from '../components/FormRetiro';
import { IngForm } from '../components/FormIngenieria';
import { DevolucionForm } from '../components/FormDevolucion';
import SalidaTec from '../components/FormSalida';

const FormTabs = () => {
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
        {activeTab === 1 && <ProductForm />}
        {activeTab === 2 && <TecnicoForm />}
        {activeTab === 3 && <StockForm />}
        {activeTab === 4 && <SalidaTec />}
        {activeTab === 5 && <DevolucionForm />}
        {activeTab === 6 && <RetiroForm />}
        {activeTab === 7 && <IngForm />}
      </div>
    </div>
  );
};
export default FormTabs;
