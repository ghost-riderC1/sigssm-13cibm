import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, X, Truck } from 'lucide-react';
import { useViaturas } from '../hooks/useViaturas';
import './ViaturaForm.css';

const ViaturaForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const { viaturas, addViatura, updateViatura } = useViaturas();
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        prefixo: '',
        placa: '',
        tipo: '',
        marca: '',
        modelo: '',
        ano: '',
        chassi: '',
        renavam: '',
        quilometragem: '',
        unidade: 'COMANDO REGIONAL II',
        subunidade: '13ª CIBM',
        cidade: 'Lucas do Rio Verde',
        situacao: 'Disponível',
        responsavel: '',
        observacoes: '',
    });

    useEffect(() => {
        if (isEditing && viaturas.length > 0) {
            const viatura = viaturas.find(v => v.id === id);
            if (viatura) {
                setFormData({ ...viatura });
            }
        }
    }, [id, isEditing, viaturas]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            if (isEditing) {
                const result = await updateViatura(id, formData);
                if (result.success) {
                    alert('Viatura salva no banco de dados com sucesso!');
                    navigate(`/viaturas/${id}`);
                } else {
                    alert('Erro ao atualizar: ' + result.error.message);
                }
            } else {
                // Prepare some defaults if omitted
                const payload = {
                    ...formData,
                    quilometragem: Number(formData.quilometragem || 0)
                };
                const result = await addViatura(payload);
                if (result.success) {
                    alert('Nova Viatura inserida no banco da nuvem!');
                    navigate('/viaturas');
                } else {
                    alert('Erro ao criar: ' + result.error.message);
                }
            }
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="viatura-form-page animate-fade-in">
            <div className="back-nav" onClick={() => navigate(-1)}>
                <ArrowLeft size={20} />
                <span>Voltar</span>
            </div>

            <header className="page-header mt-3">
                <div className="flex-center gap-3">
                    <div className="v-icon-huge bg-info" style={{ width: '60px', height: '60px' }}>
                        <Truck size={30} color="#fff" />
                    </div>
                    <div>
                        <h1 className="text-gradient">
                            {isEditing ? `Editar Viatura: ${formData.prefixo}` : 'Cadastrar Nova Viatura'}
                        </h1>
                        <p className="text-muted">Preencha os dados do veículo operacional ou administrativo do SIGSSM</p>
                    </div>
                </div>
            </header>

            <form className="form-container glass-panel" onSubmit={handleSubmit}>
                <div className="form-section">
                    <h3>Identificação do Veículo</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Prefixo (Ex: ABT-21) <span className="req">*</span></label>
                            <input type="text" name="prefixo" value={formData.prefixo} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Placa <span className="req">*</span></label>
                            <input type="text" name="placa" value={formData.placa} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Tipo (Ex: Auto Bomba Tanque) <span className="req">*</span></label>
                            <input type="text" name="tipo" value={formData.tipo} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Status Operacional Inicial <span className="req">*</span></label>
                            <select name="situacao" value={formData.situacao} onChange={handleChange} required>
                                <option value="Disponível">Disponível</option>
                                <option value="Operacional">Operacional</option>
                                <option value="Em deslocamento">Em deslocamento</option>
                                <option value="Em manutenção">Em manutenção</option>
                                <option value="Em oficina">Em oficina</option>
                                <option value="Baixada">Baixada</option>
                                <option value="Inativa">Inativa</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Dados Técnicos e Chassi</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Marca</label>
                            <input type="text" name="marca" value={formData.marca} onChange={handleChange} placeholder="Ex: Volkswagen" />
                        </div>
                        <div className="form-group">
                            <label>Modelo</label>
                            <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} placeholder="Ex: Constellation 17.280" />
                        </div>
                        <div className="form-group">
                            <label>Ano do Veículo</label>
                            <input type="text" name="ano" value={formData.ano} onChange={handleChange} placeholder="Ex: 2019" />
                        </div>
                        <div className="form-group">
                            <label>Hodômetro Atual (Km)</label>
                            <input type="number" name="quilometragem" value={formData.quilometragem} onChange={handleChange} placeholder="0" />
                        </div>
                        <div className="form-group">
                            <label>Chassi</label>
                            <input type="text" name="chassi" value={formData.chassi} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>RENAVAM</label>
                            <input type="text" name="renavam" value={formData.renavam} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Alocação e Lotação</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Unidade Regional</label>
                            <input type="text" name="unidade" value={formData.unidade} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Subunidade / Setor</label>
                            <input type="text" name="subunidade" value={formData.subunidade} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Cidade Atuação</label>
                            <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Militar Responsável Carga</label>
                            <input type="text" name="responsavel" value={formData.responsavel} onChange={handleChange} placeholder="Ex: 3º Sgt Padrão" />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Observações</h3>
                    <div className="form-group full-width">
                        <textarea
                            name="observacoes"
                            value={formData.observacoes}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Detalhes adicionais sobre a entrega, carroceria ou estado físico do veículo..."
                        ></textarea>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={() => navigate(-1)} disabled={isSaving}>
                        <X size={20} /> Cancelar
                    </button>
                    <button type="submit" className="btn-success" disabled={isSaving}>
                        <Save size={20} /> {isSaving ? 'Gravando no Supabase...' : (isEditing ? 'Salvar Alterações' : 'Concluir Cadastro')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ViaturaForm;
