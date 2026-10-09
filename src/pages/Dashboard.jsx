import React from 'react';
import {
    Truck,
    Wrench,
    ShieldAlert,
    PackageSearch,
    ArrowUpRight,
    ArrowDownRight,
    AlertTriangle,
    Clock,
    DollarSign,
    FileText
} from 'lucide-react';
import { indicadoresPrincipais } from '../data/mockData';
import './Dashboard.css';

const StatCard = ({ title, value, subtitle, icon: Icon, colorClass }) => (
    <div className="stat-card glass-panel">
        <div className="stat-header">
            <div>
                <p className="stat-title">{title}</p>
                <h3 className="stat-value">{value}</h3>
            </div>
            <div className={`stat-icon-wrapper ${colorClass}`}>
                <Icon size={24} />
            </div>
        </div>
        <div className="stat-footer">
            <span className="stat-compare">{subtitle}</span>
        </div>
    </div>
);

const Dashboard = () => {
    const { viaturas, manutencao, epi, almoxarifado } = indicadoresPrincipais;

    return (
        <div className="dashboard-page animate-fade-in">
            <header className="page-header">
                <div>
                    <h1 className="text-gradient">Painel de Comando</h1>
                    <p className="text-muted">Sistema de Gestão da Seção de Suprimento e Manutenção - 13ªCIBM - João Alfaro Duarte</p>
                </div>
            </header>

            {/* KPI Cards Principais */}
            <div className="stats-grid">
                <StatCard
                    title="Viaturas Disponíveis"
                    value={`${viaturas.disponiveis} / ${viaturas.disponiveis + viaturas.baixadas + viaturas.manutencao}`}
                    subtitle={`${viaturas.baixadas} baixadas | ${viaturas.manutencao} oficinas`}
                    icon={Truck}
                    colorClass="icon-success"
                />
                <StatCard
                    title="Manutenções Pendentes"
                    value={manutencao.pendentes}
                    subtitle={`Gasto mensal: R$ ${manutencao.gastoMensal.toLocaleString('pt-BR')}`}
                    icon={Wrench}
                    colorClass="icon-warning"
                />
                <StatCard
                    title="Alertas de EPI"
                    value={epi.vencendo}
                    subtitle="Itens próximos ao vencimento"
                    icon={ShieldAlert}
                    colorClass="icon-danger"
                />
                <StatCard
                    title="Abaixo do Estoque"
                    value={almoxarifado.abaixoEstoqueMin}
                    subtitle={`${almoxarifado.comprasEmAndamento} compras em andamento`}
                    icon={PackageSearch}
                    colorClass="icon-info"
                />
            </div>

            <div className="dashboard-content dashboard-complex">
                {/* Painel de Viaturas Críticas */}
                <div className="glass-panel alerts-panel">
                    <div className="panel-header">
                        <h3><AlertTriangle size={20} className="text-danger inline-icon" /> Atenção: Frota Baixada</h3>
                    </div>
                    <div className="activity-list">
                        <div className="alert-item">
                            <div className="alert-badge bg-danger">{viaturas.maiorTempoBaixada.dias} dias</div>
                            <div className="activity-details">
                                <p className="activity-text">Viatura <strong>{viaturas.maiorTempoBaixada.id}</strong></p>
                                <span className="activity-time text-danger">Baixada há mais tempo (Aguardando Peça)</span>
                            </div>
                        </div>
                        <div className="alert-item">
                            <div className="alert-badge bg-warning"><DollarSign size={14} /></div>
                            <div className="activity-details">
                                <p className="activity-text">Viatura <strong>{viaturas.maiorCusto.id}</strong></p>
                                <span className="activity-time">Maior custo histórico: R$ {viaturas.maiorCusto.valor.toLocaleString('pt-BR')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resumo de Respostas Rápidas */}
                <div className="glass-panel quick-answers">
                    <div className="panel-header">
                        <h3>Indicadores Rápidos</h3>
                    </div>
                    <ul className="answers-list">
                        <li>
                            <span className="q-label">Gasto no período:</span>
                            <strong className="text-primary">R$ {manutencao.gastoMensal.toLocaleString('pt-BR')}</strong>
                        </li>
                        <li>
                            <span className="q-label">Oficinas prestando serviço:</span>
                            <strong>{manutencao.oficinasAtivas} ativas</strong>
                        </li>
                        <li>
                            <span className="q-label">Orçamentos em pesquisa:</span>
                            <strong>3 (Peças tratorizadas, Combustível, EPI)</strong>
                        </li>
                        <li>
                            <span className="q-label">Documentos p/ Validação:</span>
                            <strong className="text-warning">5 Notas Fiscais pendentes</strong>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
