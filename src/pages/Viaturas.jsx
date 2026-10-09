import React, { useState } from 'react';
import {
    Truck,
    Search,
    Filter,
    Plus,
    MapPin,
    Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useViaturas } from '../hooks/useViaturas';
import './Viaturas.css';

const Viaturas = () => {
    const [activeTab, setActiveTab] = useState('todas');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { viaturas, loading } = useViaturas();

    const filteredViaturas = viaturas.filter(v => {
        // Basic search filtering
        const matchesSearch = (v.prefixo?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (v.placa?.toLowerCase() || '').includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        // Tab filtering
        if (activeTab === 'operantes') return ['Operacional', 'Disponível', 'Em deslocamento'].includes(v.situacao);
        if (activeTab === 'manutencao') return !['Operacional', 'Disponível', 'Em deslocamento'].includes(v.situacao);
        return true;
    });

    const getBadgeClass = (situacao) => {
        const s = (situacao || '').toLowerCase();
        if (['disponível', 'operacional', 'em deslocamento'].includes(s)) return 'status-operante';
        if (['baixada', 'inativa'].includes(s)) return 'status-baixada';
        return 'status-manutencao';
    };

    return (
        <div className="viaturas-page animate-fade-in">
            <header className="page-header flex-between">
                <div>
                    <h1 className="text-gradient">Gestão de Viaturas</h1>
                    <p className="text-muted">Cadastro completo, controle de frota e status operacional</p>
                </div>
                <button className="btn-primary" onClick={() => navigate('/viaturas/nova')}>
                    <Plus size={20} />
                    Nova Viatura
                </button>
            </header>

            <div className="glass-panel main-panel">
                <div className="panel-controls flex-between">
                    <div className="tabs">
                        <button
                            className={`tab-btn ${activeTab === 'todas' ? 'active' : ''}`}
                            onClick={() => setActiveTab('todas')}
                        >
                            Todas ({viaturas.length})
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'operantes' ? 'active' : ''}`}
                            onClick={() => setActiveTab('operantes')}
                        >
                            Operacionais ({viaturas.filter(v => ['Operacional', 'Disponível', 'Em deslocamento'].includes(v.situacao)).length})
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'manutencao' ? 'active' : ''}`}
                            onClick={() => setActiveTab('manutencao')}
                        >
                            Fora de Operação ({viaturas.filter(v => !['Operacional', 'Disponível', 'Em deslocamento'].includes(v.situacao)).length})
                        </button>
                    </div>

                    <div className="actions">
                        <div className="search-box">
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Buscar prefixo ou placa..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
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
                                <th>Prefixo / Tipo</th>
                                <th>Status</th>
                                <th>Responsável</th>
                                <th>Localização Atual</th>
                                <th>Odômetro</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>Carregando viaturas do banco de dados...</td></tr>
                            ) : filteredViaturas.map((v) => (
                                <tr key={v.id} onClick={() => navigate(`/viaturas/${v.id}`)} style={{ cursor: 'pointer' }}>
                                    <td>
                                        <div className="prefix-col">
                                            <div className="v-icon">
                                                <Truck size={16} />
                                            </div>
                                            <div>
                                                <strong>{v.prefixo}</strong>
                                                <span className="sub-text d-block">{v.placa} • {v.tipo}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${getBadgeClass(v.situacao)}`}>
                                            {v.situacao}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="font-medium">{v.responsavel || 'N/A'}</span>
                                    </td>
                                    <td>
                                        <div className="flex-center">
                                            <MapPin size={14} className="mr-1 text-secondary" />
                                            <span className="sub-text" style={{ fontSize: '0.875rem' }}>{v.localizacao}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {Number(v.quilometragem || 0).toLocaleString('pt-BR')} km
                                    </td>
                                    <td>
                                        <button
                                            className="btn-icon-small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/viaturas/${v.id}`);
                                            }}
                                            title="Abrir Histórico Completo Ficha da Viatura"
                                        >
                                            <Info size={18} />
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

export default Viaturas;
