import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Viaturas from './pages/Viaturas';
import ViaturaDetalhe from './pages/ViaturaDetalhe';
import ViaturaForm from './pages/ViaturaForm';
import Manutencao from './pages/Manutencao';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="viaturas" element={<Viaturas />} />
          <Route path="viaturas/nova" element={<ViaturaForm />} />
          <Route path="viaturas/:id/editar" element={<ViaturaForm />} />
          <Route path="viaturas/:id" element={<ViaturaDetalhe />} />
          <Route path="manutencao" element={<Manutencao />} />
          {/* Add more routes here like /epi, /almoxarifado */}
          <Route path="*" element={
            <div className="animate-fade-in">
              <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', marginTop: '20px' }}>
                <h2>Módulo em Desenvolvimento</h2>
                <p className="text-muted">Esta funcionalidade estará disponível em breve.</p>
              </div>
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
