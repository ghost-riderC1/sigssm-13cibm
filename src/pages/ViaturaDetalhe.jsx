import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Truck, Calendar, MapPin,
    Activity, FileText, Wrench, DollarSign,
    Clock, CheckCircle, AlertTriangle
} from 'lucide-react';
import { viaturasMock, timelineMock, ordesServicoMock } from '../data/mockData';
import './ViaturaDetalhe.css';

const ViaturaDetalhe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('resumo');

    // fallback to AR-02 as it has rich mock data if id isn't match
    const viatura = viaturasMock.find(v => v.id === id) || viaturasMock[3];
    const timeline = timelineMock[viatura.id] || [];
    const osList = ordesServicoMock.filter(os => os.viatura === viatura.id);

    const getStatusColor = (situacao) => {
        const norm = situacao.toLowerCase();
        if (['disponível', 'operacional', 'em deslocamento'].includes(norm)) return 'success';
        if (['baixada', 'inativa'].includes(norm)) return 'danger';
        return 'warning';
    };

    const statusColor = getStatusColor(viatura.situacao);

    return (
        <div className="viatura-detalhe-page animate-fade-in">
            <div className="back-nav" onClick={() => navigate('/viaturas')}>
                <ArrowLeft size={20} />
                <span>Voltar para Viaturas</span>
            </div>

            <header className="detalhe-header glass-panel">
                <div className="header-main">
                    <div className={`v-icon-huge bg-${statusColor}`}>
                        <Truck size={40} color="#fff" />
                    </div>
                    <div className="header-info">
                        <h1 className="text-gradient">{viatura.prefixo}</h1>
                        <p className="text-muted">{viatura.marca} {viatura.modelo} • Placa: {viatura.placa}</p>
                    </div>
                    <div className="header-status">
                        <button className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.875rem', marginBottom: '8px' }} onClick={() => navigate(`/viaturas/${viatura.id}/editar`)}>
                            Editar Cadastro
                        </button>
                        <span className={`status-badge status-${statusColor} badge-large`}>
                            {viatura.situacao}
                        </span>
                        {viatura.diasBaixada > 0 && (
                            <div className="dias-baixada bg-danger">
                                🔴 BAIXADA HÁ {viatura.diasBaixada} DIAS
                            </div>
                        )}
                    </div>
                </div>

                <nav className="detalhe-tabs">
                    {['resumo', 'manutencoes', 'baixas', 'pecas', 'custos', 'documentos', 'timeline'].map(tab => (
                        <button
                            key={tab}
                            className={`d-tab-btn ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </nav>
            </header>

            <div className="detalhe-content">
                {activeTab === 'resumo' && (
                    <div className="tab-resumo-grid">
                        <div className="info-card glass-panel">
                            <h3>Informações Principais</h3>
                            <div className="info-grid">
                                <div className="info-item"><label>Ano</label><span>{viatura.ano}</span></div>
                                <div className="info-item"><label>Chassi</label><span className="monospace">{viatura.chassi}</span></div>
                                <div className="info-item"><label>RENAVAM</label><span className="monospace">{viatura.renavam}</span></div>
                                <div className="info-item"><label>Hodômetro</label><span>{viatura.quilometragem.toLocaleString('pt-BR')} km</span></div>
                                <div className="info-item"><label>Unidade</label><span>{viatura.unidade} / {viatura.subunidade}</span></div>
                                <div className="info-item"><label>Responsável</label><span>{viatura.responsavel}</span></div>
                                <div className="info-item"><label>Localização Atual</label><span>{viatura.localizacao}</span></div>
                            </div>
                            <div className="actions-mt">
                                {statusColor === 'success' ? (
                                    <button className="btn-danger w-100">Registrar Baixa (Preencher Formulário de Falha)</button>
                                ) : (
                                    <button className="btn-success w-100">Retornar à Operação (Preencher Solução e OS)</button>
                                )}
                            </div>
                        </div>

                        <div className="indicadores-col">
                            <div className="kpi-card glass-panel">
                                <Clock size={24} className="text-warning mb-1" />
                                <label>Tempo Médio de Baixa</label>
                                <h2>{viatura.tempoMedioBaixada} dias</h2>
                            </div>
                            <div className="kpi-card glass-panel">
                                <AlertTriangle size={24} className="text-danger mb-1" />
                                <label>Quantidade de Baixas</label>
                                <h2>{viatura.quantidadeBaixas}</h2>
                            </div>
                            <div className="kpi-card glass-panel">
                                <DollarSign size={24} className="text-success mb-1" />
                                <label>Custo Acumulado</label>
                                <h2>R$ {viatura.custoTotal.toLocaleString('pt-BR')}</h2>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'timeline' && (
                    <div className="glass-panel p-24">
                        <h3>Linha do Tempo (Timeline)</h3>
                        <div className="timeline-container">
                            {timeline.map((event, idx) => (
                                <div className="timeline-item" key={idx}>
                                    <div className="timeline-date">{event.data}</div>
                                    <div className={`timeline-marker bg-${event.color}`}></div>
                                    <div className="timeline-content">
                                        <h4>{event.tipo}</h4>
                                        <p>{event.descricao}</p>
                                    </div>
                                </div>
                            ))}
                            {timeline.length === 0 && <p className="text-muted">Nenhum evento registrado.</p>}
                        </div>
                    </div>
                )}

                {activeTab === 'manutencoes' && (
                    <div className="glass-panel p-24">
                        <div className="flex-between mb-3">
                            <h3>Todas as Ordens de Serviço</h3>
                            <button className="btn-primary">Criar OS para esta Viatura</button>
                        </div>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Nº OS</th>
                                    <th>Data</th>
                                    <th>Tipo</th>
                                    <th>Oficina</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {osList.map(os => (
                                    <tr key={os.id}>
                                        <td><strong>{os.id}</strong></td>
                                        <td>{os.dataAbertura}</td>
                                        <td>{os.tipo}</td>
                                        <td>{os.oficina}</td>
                                        <td>{os.status}</td>
                                    </tr>
                                ))}
                                {osList.length === 0 && (
                                    <tr><td colSpan="5" className="text-center">Nenhuma OS registrada.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Outras abas (Baixas, Pecas, Custos, Documentos) agiriam como placeholders neste protótipo visual */}
                {['baixas', 'pecas', 'custos', 'documentos'].includes(activeTab) && (
                    <div className="glass-panel p-24 text-center">
                        <Wrench size={48} className="text-muted mx-auto mb-2 opacity-50" />
                        <h3>Aba em Construção</h3>
                        <p className="text-muted">A estrutura visual para a aba "{activeTab}" está reservada.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViaturaDetalhe;
