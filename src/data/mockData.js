// Dados simulados para responder às métricas exigidas
export const viaturasMock = [
    {
        id: 'ABT-21',
        prefixo: 'ABT-21',
        placa: 'QQA-1234',
        tipo: 'Auto Bomba Tanque',
        marca: 'Volkswagen',
        modelo: 'Constellation 17.280',
        ano: '2019',
        chassi: '9BWZZZ41ZLT029384',
        renavam: '1234567890',
        quilometragem: 45210,
        unidade: 'COMANDO REGIONAL II',
        subunidade: '13ª CIBM',
        cidade: 'Lucas do Rio Verde',
        localizacao: 'Garagem Principal - 13ª CIBM',
        responsavel: 'Sgt. Padrão',
        situacao: 'Operacional',
        dataCadastro: '10/01/2020',
        observacoes: 'Viatura principal de combate a incêndio.',
        fotos: ['/placeholder-truck.jpg'],
        documentos: 2,
        diasBaixada: 0,
        custoTotal: 15400.00,
        ultimaRevisao: '15/09/2026',
        historicoCount: 12,
        tempoMedioBaixada: 3.5,
        quantidadeBaixas: 4
    },
    {
        id: 'UR-14',
        prefixo: 'UR-14',
        placa: 'RRA-9876',
        tipo: 'Unidade de Resgate',
        marca: 'Mercedes-Benz',
        modelo: 'Sprinter 416',
        ano: '2021',
        chassi: '8MBZZZ90ZLT029311',
        renavam: '0987654321',
        quilometragem: 82500,
        unidade: 'COMANDO REGIONAL II',
        subunidade: '13ª CIBM',
        cidade: 'Lucas do Rio Verde',
        localizacao: 'Pátio Operacional',
        responsavel: 'Cb. Silva',
        situacao: 'Disponível',
        dataCadastro: '05/03/2021',
        observacoes: 'Viatura padrão de resgate e APH.',
        fotos: [],
        documentos: 5,
        diasBaixada: 0,
        custoTotal: 8200.00,
        ultimaRevisao: '20/08/2026',
        historicoCount: 34,
        tempoMedioBaixada: 2.1,
        quantidadeBaixas: 7
    },
    {
        id: 'AS-05',
        prefixo: 'AS-05',
        placa: 'PPA-5555',
        tipo: 'Auto Salvamento',
        marca: 'Ford',
        modelo: 'Ranger 4x4',
        ano: '2018',
        chassi: '9BFZZZ80ZLT029333',
        renavam: '1122334455',
        quilometragem: 112000,
        unidade: 'COMANDO REGIONAL II',
        subunidade: '13ª CIBM',
        cidade: 'Lucas do Rio Verde',
        localizacao: 'Oficina Central Diesel',
        responsavel: 'Ten. Mendes',
        situacao: 'Em manutenção',
        dataCadastro: '15/04/2018',
        observacoes: 'Vazamento no sistema hidráulico.',
        fotos: [],
        documentos: 1,
        diasBaixada: 5,
        custoTotal: 22100.00,
        ultimaRevisao: '01/10/2026',
        historicoCount: 8,
        tempoMedioBaixada: 5.0,
        quantidadeBaixas: 2
    },
    {
        id: 'AR-02',
        prefixo: 'AR-02',
        placa: 'OZA-1111',
        tipo: 'Auto Rápido',
        marca: 'Renault',
        modelo: 'Duster',
        ano: '2016',
        chassi: '9RNZZZ70ZLT029444',
        renavam: '5544332211',
        quilometragem: 180000,
        unidade: 'COMANDO REGIONAL II',
        subunidade: '13ª CIBM',
        cidade: 'Lucas do Rio Verde',
        localizacao: 'Pátio de Manutenção',
        responsavel: 'Sgt. Padrão',
        situacao: 'Baixada',
        dataCadastro: '10/02/2016',
        observacoes: 'Fundiu motor - aguardando substituição de bloco. Processo licitatório finalizado.',
        fotos: [],
        documentos: 8,
        diasBaixada: 17, // "BAIXADA HÁ 17 DIAS" (Exemplo do usuário)
        custoTotal: 45000.00,
        ultimaRevisao: 'Aguardando Peça',
        historicoCount: 41,
        tempoMedioBaixada: 10.5,
        quantidadeBaixas: 12
    },
];

export const timelineMock = {
    'AR-02': [
        { data: '10/09/2026', tipo: 'Revisão', descricao: 'Revisão preventiva periódica', color: 'success' },
        { data: '15/09/2026', tipo: 'Baixa', descricao: 'Baixa por problema mecânico - Motor fundido', color: 'danger' },
        { data: '16/09/2026', tipo: 'Remoção', descricao: 'Enviada à oficina central via guincho', color: 'warning' },
        { data: '18/09/2026', tipo: 'Orçamento', descricao: 'Orçamento diagnóstico recebido (R$ 18.500)', color: 'info' },
        { data: '20/09/2026', tipo: 'Status', descricao: 'Aguardando envio de peça da fábrica', color: 'warning' },
    ]
};

export const ordesServicoMock = [
    {
        id: 'OS-2026-1002',
        viatura: 'AR-02',
        tipo: 'Mecânica',
        dataAbertura: '16/09/2026',
        problema: 'Motor fundiu em deslocamento',
        diagnostico: 'Trava de cilindro - Necessário retífica e troca de bloco',
        oficina: 'Oficina Central Diesel',
        cidade: 'Lucas do Rio Verde',
        responsavel: 'Ten. Mendes',
        status: 'Em Orçamento',
        orcamentoInicial: 18500.00,
        valorAprovado: 0,
        valorFinal: 0,
        pecas: ['Bloco do motor', 'Kit pistão', 'Jogo de juntas'],
        servicos: ['Retífica completa', 'Mão de obra substituição']
    },
    {
        id: 'OS-2026-1004',
        viatura: 'AS-05',
        tipo: 'Preventiva',
        dataAbertura: '01/10/2026',
        problema: 'Revisão de 110.000 km',
        diagnostico: 'Checagem padrão ok. Identificado vazamento leve de fluido.',
        oficina: 'Concessionária Ford',
        cidade: 'Sorriso',
        responsavel: 'Sgt. Padrão',
        status: 'Concluída',
        orcamentoInicial: 1540.00,
        valorAprovado: 1540.00,
        valorFinal: 1540.00,
        pecas: ['Filtro de óleo', 'Filtro de ar', 'Óleo Sintético 5W30'],
        servicos: ['Revisão padrão concessionária', 'Limpeza de bicos']
    }
];

export const indicadoresPrincipais = {
    viaturas: {
        disponiveis: 12,
        baixadas: 3,
        manutencao: 2,
        maiorCusto: { id: 'AR-02', valor: 45000.00 },
        maiorTempoBaixada: { id: 'AR-02', dias: 17 }
    },
    manutencao: {
        pendentes: 8,
        gastoMensal: 12500.00,
        oficinasAtivas: 3
    },
    epi: {
        vencendo: 4,
        alocados: 124,
        estoque: 15
    },
    almoxarifado: {
        abaixoEstoqueMin: 7,
        comprasEmAndamento: 3
    }
};
