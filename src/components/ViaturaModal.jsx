import React from 'react';
import {
    X, Truck, MapPin, Calendar, Hash, FileText,
    Camera, Wrench, AlertTriangle, CheckCircle
} from 'lucide-react';
import './ViaturaModal.css';

const getStatusColor = (situacao) => {
    const norm = situacao.toLowerCase();
    if (['disponível', 'operacional', 'em deslocamento'].includes(norm)) return 'success';
    if (['baixada', 'inativa'].includes(norm)) return 'danger';
    return 'warning'; // aguardando peça, em manutenção, oficina, autorização
};

const ViaturaModal = ({ viatura, onClose }) => {
    if (!viatura) return null;

    return (
        <div className="modal-overlay animate-fade-in" onClick={onClose}>
            <div className="side-panel show glass-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <div className="panel-title">
                        <div className={`v-icon-large bg-${getStatusColor(viatura.situacao)}`}>
                            <Truck size={24} color="#fff" />
                        </div>
                        <div>
                            <h2>{viatura.prefixo}</h2>
                            <span className="text-muted">{viatura.tipo} • {viatura.placa}</span>
                        </div>
                    </div>
                    <button className="btn-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="panel-content">
                    {/* Status Alert Banner se necessário */}
                    {getStatusColor(viatura.situacao) !== 'success' && (
                        <div className={`alert-banner banner-${getStatusColor(viatura.situacao)}`}>
                            {getStatusColor(viatura.situacao) === 'danger' ? <AlertTriangle size={20} /> : <Wrench size={20} />}
                            <div>
                                <strong>Atenção:</strong> Viatura no status "{viatura.situacao}"
                                {viatura.diasBaixada > 0 && ` há ${viatura.diasBaixada} dias.`}
                            </div>
                        </div>
                    )}

                    {getStatusColor(viatura.situacao) === 'success' && (
                        <div className="alert-banner banner-success">
                            <CheckCircle size={20} />
                            <div>Viatura {viatura.situacao}. Pronta para emprego.</div>
                        </div>
                    )}

                    <div className="info-group">
                        <h3>Identificação</h3>
                        <div className="data-grid">
                            <div className="data-item">
                                <label>Prefixo</label>
                                <p>{viatura.prefixo}</p>
                            </div>
                            <div className="data-item">
                                <label>Placa</label>
                                <p>{viatura.placa}</p>
                            </div>
                            <div className="data-item">
                                <label>Marca / Modelo</label>
                                <p>{viatura.marca} {viatura.modelo}</p>
                            </div>
                            <div className="data-item">
                                <label>Ano</label>
                                <p>{viatura.ano}</p>
                            </div>
                            <div className="data-item">
                                <label>Chassi</label>
                                <p className="monospace">{viatura.chassi}</p>
                            </div>
                            <div className="data-item">
                                <label>RENAVAM</label>
                                <p className="monospace">{viatura.renavam}</p>
                            </div>
                            <div className="data-item">
                                <label>Hodômetro</label>
                                <p>{viatura.quilometragem.toLocaleString('pt-BR')} km</p>
                            </div>
                        </div>
                    </div>

                    <div className="info-group">
                        <h3>Lotação e Operacional</h3>
                        <div className="data-grid">
                            <div className="data-item">
                                <label>Unidade</label>
                                <p>{viatura.unidade}</p>
                            </div>
                            <div className="data-item">
                                <label>Subunidade/Setor</label>
                                <p>{viatura.subunidade}</p>
                            </div>
                            <div className="data-item">
                                <label>Cidade</label>
                                <p>{viatura.cidade}</p>
                            </div>
                            <div className="data-item full-width">
                                <label>Localização Atual</label>
                                <p className="flex-center">
                                    <MapPin size={16} className="text-secondary mr-1" />
                                    {viatura.localizacao}
                                </p>
                            </div>
                            <div className="data-item">
                                <label>Responsável</label>
                                <p>{viatura.responsavel}</p>
                            </div>
                        </div>
                    </div>

                    <div className="info-group">
                        <h3>Gestão e Histórico</h3>
                        <div className="data-grid">
                            <div className="data-item">
                                <label>Data de Cadastro</label>
                                <p className="flex-center"><Calendar size={14} className="mr-1" /> {viatura.dataCadastro}</p>
                            </div>
                            <div className="data-item">
                                <label>Histórico OS</label>
                                <p><a href="#" className="link-primary">{viatura.historicoCount} Registros</a></p>
                            </div>
                            <div className="data-item full-width">
                                <label>Observações</label>
                                <div className="obs-box">
                                    {viatura.observacoes || "Nenhuma observação registrada."}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="media-group">
                        <button className="btn-outline">
                            <Camera size={18} /> Ver Fotos ({viatura.fotos.length})
                        </button>
                        <button className="btn-outline">
                            <FileText size={18} /> Documentos ({viatura.documentos})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViaturaModal;
