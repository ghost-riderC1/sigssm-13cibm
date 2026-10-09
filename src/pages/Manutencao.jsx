import React, { useState } from 'react';
import {
    Wrench,
    Search,
    Filter,
    Plus,
    Settings,
    FileText
} from 'lucide-react';
import { ordesServicoMock } from '../data/mockData';
import './Manutencao.css';

const Manutencao = () => {
    const [activeTab, setActiveTab] = useState('todas');

    return (
        <div className="manutencao-page animate-fade-in">
            <header className="page-header flex-between">
                <div>
                    <h1 className="text-gradient">Gestão de Manutenção</h1>
                    <p className="text-muted">Controle de Ordens de Serviço (OS), Oficinas e Custos</p>
                </div>
                <button className="btn-primary" style={{ backgroundColor: '#f59e0b' }}>
                    <Plus size={20} />
                    Abrir Nova OS
                </button>
            </header>

            <div className="glass-panel main-panel">
                <div className="panel-controls flex-between">
                    <div className="tabs">
                        <button
                            className={`tab-btn ${activeTab === 'todas' ? 'active' : ''}`}
                            onClick={() => setActiveTab('todas')}
                        >
                            Todas as OS ({ordesServicoMock.length})
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'abertas' ? 'active' : ''}`}
                            onClick={() => setActiveTab('abertas')}
                        >
                            Em Andamento
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'concluidas' ? 'active' : ''}`}
                            onClick={() => setActiveTab('concluidas')}
                        >
                            Concluídas
                        </button>
                    </div>

                    <div className="actions">
                        <div className="search-box">
                            <Search size={18} />
                            <input type="text" placeholder="Buscar Nº OS, Viatura..." />
                        </div>
                        <button className="btn-icon">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Nº OS / Data</th>
                                <th>Viatura</th>
                                <th>Tipo</th>
                                <th>Oficina</th>
                                <th>Status</th>
                                <th>Valor Aprovado</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordesServicoMock.map((os) => (
                                <tr key={os.id} style={{ cursor: 'pointer' }}>
                                    <td>
                                        <div className="flex-center">
                                            <FileText size={16} className="text-muted mr-1" />
                                            <div>
                                                <strong>{os.id}</strong>
                                                <span className="sub-text d-block">{os.dataAbertura}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="font-medium">{os.viatura}</span>
                                    </td>
                                    <td>
                                        <span className="badge-outline">{os.tipo}</span>
                                    </td>
                                    <td>{os.oficina}</td>
                                    <td>
                                        <span className={`status-badge status-${os.status === 'Concluída' ? 'operante' : 'manutencao'}`}>
                                            {os.status}
                                        </span>
                                    </td>
                                    <td>
                                        R$ {os.valorAprovado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td>
                                        <button className="btn-icon-small" title="Processar OS">
                                            <Settings size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Manutencao;
