import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import LoginForm from './Login';
import PanelTable from './TabTablas';
import FormTabs from './TabsFormularios';

export default function RoutesMain() {
  const rutaServidor = ''; //*Pruebas
  // const rutaServidor = '/sistema-stock'; //* Produccion
  return (
    <div className="container mt-5">
      <Routes>
        <Route path={rutaServidor + '/home'} element={<Home />} />
        <Route path={rutaServidor + '/panel'} element={<PanelTable />} />
        <Route path={rutaServidor + '/form'} element={<FormTabs />} />
        <Route exact path={rutaServidor + '/Login'} element={<LoginForm />} />
      </Routes>
    </div>
  );
}
