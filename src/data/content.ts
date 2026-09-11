/**
 * Conteúdo editável do portfólio.
 *
 * O conteúdo dos casos de uso, habilidades técnicas, testes e limitações foi
 * extraído dos artefatos reais do estágio (pasta "estágio banca final" no
 * Google Drive da aluna: especificações de caso de uso, relatório de estágio,
 * diagramas UML e capturas de tela do sistema rodando). Itens ainda marcados
 * com `PLACEHOLDER_ETAPA1` seguem pendentes de confirmação com a aluna.
 */

export const siteMeta = {
  studentName: 'Juliana Furlan Costa',
  course: 'Ciência da Computação',
  institution: 'Centro Universitário Filadélfia (UniFil)',
  city: 'Londrina',
  role: 'Estudante de Ciência da Computação',
  company: 'UniFil',
  internshipModality: 'Estágio obrigatório · 3º ano · 20h semanais',
  systemName: 'Sistema de Reserva de Salas',
  systemSummary:
    'Sistema que possibilita aos funcionários da UniFil realizarem reservas em espaços institucionais, com usuários comuns, gestores que aprovam ou rejeitam solicitações e administradores que cadastram usuários e salas.',
  contactEmail: 'julianafurlancosta@edu.unifil.br',
  githubUrl: 'https://github.com/JulianaFurlan',
  youtubeUrl: 'https://youtu.be/7CQIV7AGwR4',
  youtubeVideoId: '7CQIV7AGwR4',
} as const;

export type NavItem = {
  id: string;
  label: string;
};

export const navItems: NavItem[] = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'casos-de-uso', label: 'Casos de uso' },
  { id: 'demonstracao', label: 'Demonstração' },
  { id: 'entregas', label: 'Entregas' },
  { id: 'testes', label: 'Testes' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'contato', label: 'Contato' },
];

export type Pillar = {
  id: string;
  title: string;
  description: string;
};

export const aboutPillars: Pillar[] = [
  {
    id: 'planejamento',
    title: 'Planejamento',
    description:
      'Levantamento de requisitos e modelagem UML completa (casos de uso, classes, DER, sequência, estado e implantação) antes do desenvolvimento.',
  },
  {
    id: 'desenvolvimento',
    title: 'Desenvolvimento',
    description: 'Sistema full-stack com back-end em Java/Spring Boot, front-end em React e banco de dados MySQL.',
  },
  {
    id: 'validacao',
    title: 'Validação',
    description: 'Testes manuais de ponta a ponta do sistema em execução, cobrindo os fluxos de todos os perfis de usuário.',
  },
];

export type UseCaseStatus = 'concluido' | 'em-andamento';

export type ArtifactRef = {
  category: string;
  slug: string;
  label: string;
};

export type UseCase = {
  id: string;
  name: string;
  actors: string[];
  objective: string;
  mainFlow: string[];
  status: UseCaseStatus;
  screenRefs?: ArtifactRef[];
  diagramRef?: ArtifactRef;
  source: {
    flow: string;
    actors: string;
  };
};

/**
 * Os 6 casos de uso do sistema, na ordem em que aparecem no Diagrama de Caso
 * de Uso e no Relatório de Estágio (seção "Diagrama de Caso de Uso").
 * Fluxo principal condensado a partir do "Fluxo Básico de Eventos" de cada
 * Especificação de Caso de Uso. Status "concluído" reflete que a
 * funcionalidade está implementada (há tela e, na maioria dos casos,
 * diagrama de sequência reais) — não é um veredito de cobertura de testes.
 */
export const useCases: UseCase[] = [
  {
    id: 'solicitar-reserva',
    name: 'Solicitar Reserva',
    actors: ['Usuário'],
    objective: 'Permitir que o usuário solicite o agendamento de um espaço institucional.',
    mainFlow: [
      'Usuário acessa "Solicitar Reserva" no menu lateral',
      'Sistema busca as salas disponíveis e apresenta o formulário',
      'Usuário preenche dados pessoais e informações da reserva',
      'Sistema valida os dados e a disponibilidade da sala no horário',
      'Sistema registra a solicitação e exibe confirmação',
    ],
    status: 'concluido',
    screenRefs: [{ category: 'telas', slug: 'tela-de-solicitar-reservas', label: 'Tela de Solicitar Reservas' }],
    diagramRef: {
      category: 'diagramas',
      slug: 'diagrama-de-sequencia-solicitar-reservas',
      label: 'Diagrama de Sequência — Solicitar Reservas',
    },
    source: {
      flow: 'Especificação de Caso de Uso: Solicitar Reserva — Fluxo Básico de Eventos',
      actors: 'Diagrama de Caso de Uso (Caso de Uso.png) e Especificação de Caso de Uso: Solicitar Reserva',
    },
  },
  {
    id: 'ver-solicitacoes',
    name: 'Ver Solicitações',
    actors: ['Usuário'],
    objective: 'Permitir que o usuário acompanhe, edite ou cancele suas próprias reservas em "Meus Pedidos".',
    mainFlow: [
      'Usuário acessa "Meus Pedidos" no menu lateral',
      'Sistema busca todas as solicitações do usuário autenticado',
      'Sistema organiza as solicitações por status (em análise, aprovadas, finalizadas)',
      'Usuário pode editar uma solicitação ainda não processada',
      'Usuário pode cancelar uma solicitação pendente',
    ],
    status: 'concluido',
    screenRefs: [{ category: 'telas', slug: 'tela-de-ver-meus-pedidos', label: 'Tela de Ver Meus Pedidos' }],
    diagramRef: {
      category: 'diagramas',
      slug: 'diagrama-de-sequencia-ver-solicitacoes',
      label: 'Diagrama de Sequência — Ver Solicitações',
    },
    source: {
      flow: 'Especificação de Caso de Uso: Ver Solicitações — Fluxo Básico de Eventos',
      actors: 'Diagrama de Caso de Uso (Caso de Uso.png) e Especificação de Caso de Uso: Ver Solicitações',
    },
  },
  {
    id: 'consultar-disponibilidade',
    name: 'Consultar Disponibilidade',
    actors: ['Usuário', 'Gestor', 'Administrador'],
    objective: 'Permitir checar a ocupação atualizada das salas para orientar o planejamento de uma reserva.',
    mainFlow: [
      'Usuário acessa "Disponibilidade" no menu lateral',
      'Sistema busca as salas cadastradas e as reservas aprovadas para a data atual',
      'Sistema organiza as salas por bloco, com status, capacidade, recursos e horários ocupados',
      'Usuário seleciona uma sala disponível e confirma o horário no modal de reserva rápida',
      'Sistema navega para "Solicitar Reserva" com sala, data e horário pré-preenchidos',
    ],
    status: 'concluido',
    screenRefs: [
      { category: 'telas', slug: 'tela-de-consultar-disponibilidade', label: 'Tela de Consultar Disponibilidade' },
    ],
    source: {
      flow: 'Especificação de Caso de Uso: Consultar Disponibilidade — Fluxo Básico de Eventos',
      actors: 'Diagrama de Caso de Uso (Caso de Uso.png) e Especificação de Caso de Uso: Consultar Disponibilidade',
    },
  },
  {
    id: 'gerenciar-solicitacoes',
    name: 'Gerenciar Solicitações',
    actors: ['Gestor', 'Administrador'],
    objective: 'Permitir que gestores e administradores aprovem ou rejeitem as solicitações de reserva.',
    mainFlow: [
      'Gestor ou administrador acessa "Gerenciar Reservas" no menu lateral',
      'Sistema lista as solicitações pendentes, ordenadas por data e horário',
      'Gestor analisa a solicitação e escolhe aprovar ou rejeitar',
      'Sistema verifica conflito de horário antes de confirmar a aprovação',
      'Sistema atualiza o status da reserva e notifica o solicitante por e-mail',
    ],
    status: 'concluido',
    screenRefs: [
      { category: 'telas', slug: 'tela-de-gerenciar-solicitacoes', label: 'Tela de Gerenciar Solicitações' },
    ],
    diagramRef: {
      category: 'diagramas',
      slug: 'diagrama-de-sequencia-gerenciar-solicitacoes',
      label: 'Diagrama de Sequência — Gerenciar Solicitações',
    },
    source: {
      flow: 'Especificação de Caso de Uso: Gerenciar Solicitações — Fluxo Básico de Eventos',
      actors: 'Diagrama de Caso de Uso (Caso de Uso.png) e Especificação de Caso de Uso: Gerenciar Solicitações',
    },
  },
  {
    id: 'cadastrar-salas',
    name: 'Cadastrar Salas',
    actors: ['Administrador'],
    objective: 'Permitir que o administrador cadastre e mantenha os espaços institucionais disponíveis para reserva.',
    mainFlow: [
      'Administrador acessa "Gerenciar Salas" no menu lateral',
      'Sistema exibe a listagem de salas cadastradas',
      'Administrador cadastra, edita ou altera o status de uma sala (ativa, inativa ou em manutenção)',
      'Sistema impede a exclusão de salas com reservas associadas sem confirmação',
      'Sistema atualiza a listagem e exibe confirmação',
    ],
    status: 'concluido',
    screenRefs: [{ category: 'telas', slug: 'tela-de-gerenciar-salas', label: 'Tela de Gerenciar Salas' }],
    diagramRef: {
      category: 'diagramas',
      slug: 'diagrama-de-sequencia-cadastrar-salas',
      label: 'Diagrama de Sequência — Cadastrar Salas',
    },
    source: {
      flow: 'Diagrama de Sequência — Cadastrar Salas (não há especificação textual dedicada para este caso de uso)',
      actors: 'Diagrama de Caso de Uso (Caso de Uso.png)',
    },
  },
  {
    id: 'cadastrar-usuarios',
    name: 'Cadastrar Usuários',
    actors: ['Administrador'],
    objective: 'Permitir que o administrador cadastre, edite e controle o acesso dos usuários do sistema.',
    mainFlow: [
      'Administrador acessa "Gerenciar Usuários" no menu lateral',
      'Sistema exibe a listagem de usuários cadastrados',
      'Administrador cadastra, edita, ativa/desativa ou reseta a senha de um usuário',
      'Sistema impede a exclusão de usuários com reservas no histórico',
      'Sistema envia as credenciais por e-mail e atualiza a listagem',
    ],
    status: 'concluido',
    screenRefs: [{ category: 'telas', slug: 'tela-de-gerenciar-usuarios', label: 'Tela de Gerenciar Usuários' }],
    diagramRef: {
      category: 'diagramas',
      slug: 'diagrama-de-sequencia-cadastrar-usuarios',
      label: 'Diagrama de Sequência — Cadastrar Usuários',
    },
    source: {
      flow: 'Especificação de Caso de Uso: Cadastrar Usuários — Fluxo Básico de Eventos',
      actors: 'Diagrama de Caso de Uso (Caso de Uso.png) e Especificação de Caso de Uso: Cadastrar Usuários',
    },
  },
];

export const demoContent = {
  description: 'Demonstração do funcionamento do Sistema de Reserva de Salas UniFil.',
  watchOnYoutubeLabel: 'Assistir no YouTube',
};

export type DeliveryFileKind = 'image' | 'pdf' | 'doc' | 'sensitive';

export type DeliveryFile = {
  id: string;
  kind: DeliveryFileKind;
  /** Caminho da imagem em resolução cheia (lightbox). Só para kind 'image' | 'pdf'. */
  path?: string;
  /** Miniatura otimizada (~480px, WebP) usada nos cards e mini cards. */
  thumbPath?: string;
  alt?: string;
  /** Rótulo do tipo de arquivo, exibido em cards sem imagem (ex.: "PDF", "DOCX"). */
  fileTypeLabel?: string;
};

export type DeliveryItem = {
  id: string;
  title: string;
  description?: string;
  files: DeliveryFile[];
};

export type DeliveryCategory = {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  items: DeliveryItem[];
};

// PLACEHOLDER_ETAPA1 — categorias e itens de exemplo; serão substituídos pela
// estrutura real definida a partir dos artefatos entregues (Etapa 3).
export const deliveryCategories: DeliveryCategory[] = [
  {
    id: 'cronograma',
    slug: 'cronograma',
    name: 'Cronograma',
    description: 'Planejamento das atividades do estágio ao longo do período.',
    icon: 'CalendarDays',
    items: [],
  },
  {
    id: 'diagramas',
    slug: 'diagramas',
    name: 'Diagramas',
    description: 'Diagramas de caso de uso, classes e fluxo do sistema.',
    icon: 'Workflow',
    items: [
      {
        id: 'caso-de-uso',
        title: 'Diagrama de Caso de Uso',
        files: [{ id: 'caso-de-uso-img', kind: 'image', path: '/entregas/diagramas/caso-de-uso.png', thumbPath: '/entregas/diagramas/caso-de-uso-thumb.webp' }],
      },
      {
        id: 'der',
        title: 'Diagrama de Entidade e Relacionamento (DER)',
        files: [{ id: 'der-img', kind: 'image', path: '/entregas/diagramas/der.png', thumbPath: '/entregas/diagramas/der-thumb.webp' }],
      },
      {
        id: 'diagrama-de-classe',
        title: 'Diagrama de Classe',
        files: [{ id: 'diagrama-de-classe-img', kind: 'image', path: '/entregas/diagramas/diagrama-de-classe.png', thumbPath: '/entregas/diagramas/diagrama-de-classe-thumb.webp' }],
      },
      {
        id: 'diagrama-de-sequencia-solicitar-reservas',
        title: 'Diagrama de Sequência — Solicitar Reservas',
        files: [{ id: 'diagrama-de-sequencia-solicitar-reservas-img', kind: 'image', path: '/entregas/diagramas/diagrama-de-sequencia-solicitar-reservas.png', thumbPath: '/entregas/diagramas/diagrama-de-sequencia-solicitar-reservas-thumb.webp' }],
      },
      {
        id: 'diagrama-de-sequencia-ver-solicitacoes',
        title: 'Diagrama de Sequência — Ver Solicitações',
        files: [{ id: 'diagrama-de-sequencia-ver-solicitacoes-img', kind: 'image', path: '/entregas/diagramas/diagrama-de-sequencia-ver-solicitacoes.png', thumbPath: '/entregas/diagramas/diagrama-de-sequencia-ver-solicitacoes-thumb.webp' }],
      },
      {
        id: 'diagrama-de-sequencia-gerenciar-solicitacoes',
        title: 'Diagrama de Sequência — Gerenciar Solicitações',
        files: [{ id: 'diagrama-de-sequencia-gerenciar-solicitacoes-img', kind: 'image', path: '/entregas/diagramas/diagrama-de-sequencia-gerenciar-solicitacoes.png', thumbPath: '/entregas/diagramas/diagrama-de-sequencia-gerenciar-solicitacoes-thumb.webp' }],
      },
      {
        id: 'diagrama-de-sequencia-cadastrar-salas',
        title: 'Diagrama de Sequência — Cadastrar Salas',
        files: [{ id: 'diagrama-de-sequencia-cadastrar-salas-img', kind: 'image', path: '/entregas/diagramas/diagrama-de-sequencia-cadastrar-salas.png', thumbPath: '/entregas/diagramas/diagrama-de-sequencia-cadastrar-salas-thumb.webp' }],
      },
      {
        id: 'diagrama-de-sequencia-cadastrar-usuarios',
        title: 'Diagrama de Sequência — Cadastrar Usuários',
        files: [{ id: 'diagrama-de-sequencia-cadastrar-usuarios-img', kind: 'image', path: '/entregas/diagramas/diagrama-de-sequencia-cadastrar-usuarios.png', thumbPath: '/entregas/diagramas/diagrama-de-sequencia-cadastrar-usuarios-thumb.webp' }],
      },
    ],
  },
  {
    id: 'documentos',
    slug: 'documentos',
    name: 'Documentos',
    description: 'Documentação de requisitos e demais registros do projeto.',
    icon: 'FileText',
    // Documentos de texto — apresentados como cards informativos (sem prévia de
    // imagem), conforme a seção 6 do briefing. Nenhum é sensível: são
    // especificações técnicas e o relatório de estágio, escritos pela própria aluna.
    items: [
      {
        id: 'relatorio-de-estagio',
        title: 'Relatório de Estágio',
        files: [{ id: 'relatorio-de-estagio-doc', kind: 'doc', fileTypeLabel: 'DOCX' }],
      },
      {
        id: 'especificacao-solicitar-reserva',
        title: 'Especificação de Caso de Uso: Solicitar Reserva',
        files: [{ id: 'especificacao-solicitar-reserva-doc', kind: 'doc', fileTypeLabel: 'DOCX' }],
      },
      {
        id: 'especificacao-ver-solicitacoes',
        title: 'Especificação de Caso de Uso: Ver Solicitações',
        files: [{ id: 'especificacao-ver-solicitacoes-doc', kind: 'doc', fileTypeLabel: 'DOCX' }],
      },
      {
        id: 'especificacao-consultar-disponibilidade',
        title: 'Especificação de Caso de Uso: Consultar Disponibilidade',
        files: [{ id: 'especificacao-consultar-disponibilidade-doc', kind: 'doc', fileTypeLabel: 'Google Docs' }],
      },
      {
        id: 'especificacao-gerenciar-solicitacoes',
        title: 'Especificação de Caso de Uso: Gerenciar Solicitações',
        files: [{ id: 'especificacao-gerenciar-solicitacoes-doc', kind: 'doc', fileTypeLabel: 'Google Docs' }],
      },
      {
        id: 'especificacao-cadastrar-usuarios',
        title: 'Especificação de Caso de Uso: Cadastrar Usuários',
        files: [{ id: 'especificacao-cadastrar-usuarios-doc', kind: 'doc', fileTypeLabel: 'Google Docs' }],
      },
    ],
  },
  {
    id: 'telas',
    slug: 'telas',
    name: 'Telas',
    description: 'Capturas das principais telas do sistema desenvolvido.',
    icon: 'MonitorSmartphone',
    items: [
      {
        id: 'tela-de-login',
        title: 'Tela de Login',
        files: [
          { id: 'tela-de-login-img', kind: 'image', path: '/entregas/telas/tela-de-login.png', thumbPath: '/entregas/telas/tela-de-login-thumb.webp' },
        ],
      },
      {
        id: 'tela-de-solicitar-reservas',
        title: 'Tela de Solicitar Reservas',
        files: [
          { id: 'tela-de-solicitar-reservas-img', kind: 'image', path: '/entregas/telas/tela-de-solicitar-reservas.png', thumbPath: '/entregas/telas/tela-de-solicitar-reservas-thumb.webp' },
        ],
      },
      {
        id: 'tela-de-ver-meus-pedidos',
        title: 'Tela de Ver Meus Pedidos',
        files: [
          { id: 'tela-de-ver-meus-pedidos-img', kind: 'image', path: '/entregas/telas/tela-de-ver-meus-pedidos.png', thumbPath: '/entregas/telas/tela-de-ver-meus-pedidos-thumb.webp' },
        ],
      },
      {
        id: 'tela-de-consultar-disponibilidade',
        title: 'Tela de Consultar Disponibilidade',
        files: [
          { id: 'tela-de-consultar-disponibilidade-img', kind: 'image', path: '/entregas/telas/tela-de-consultar-disponibilidade.png', thumbPath: '/entregas/telas/tela-de-consultar-disponibilidade-thumb.webp' },
        ],
      },
      {
        id: 'tela-de-gerenciar-solicitacoes',
        title: 'Tela de Gerenciar Solicitações',
        files: [
          { id: 'tela-de-gerenciar-solicitacoes-img', kind: 'image', path: '/entregas/telas/tela-de-gerenciar-solicitacoes.png', thumbPath: '/entregas/telas/tela-de-gerenciar-solicitacoes-thumb.webp' },
        ],
      },
      {
        id: 'tela-de-gerenciar-salas',
        title: 'Tela de Gerenciar Salas',
        files: [
          { id: 'tela-de-gerenciar-salas-img', kind: 'image', path: '/entregas/telas/tela-de-gerenciar-salas.png', thumbPath: '/entregas/telas/tela-de-gerenciar-salas-thumb.webp' },
        ],
      },
      {
        id: 'tela-de-gerenciar-usuarios',
        title: 'Tela de Gerenciar Usuários',
        files: [
          { id: 'tela-de-gerenciar-usuarios-img', kind: 'image', path: '/entregas/telas/tela-de-gerenciar-usuarios.png', thumbPath: '/entregas/telas/tela-de-gerenciar-usuarios-thumb.webp' },
        ],
      },
      {
        id: 'tela-de-alterar-senha',
        title: 'Tela de Alterar Senha',
        files: [
          { id: 'tela-de-alterar-senha-img', kind: 'image', path: '/entregas/telas/tela-de-alterar-senha.png', thumbPath: '/entregas/telas/tela-de-alterar-senha-thumb.webp' },
        ],
      },
    ],
  },
  {
    id: 'termos',
    slug: 'termos',
    name: 'Termos',
    description: 'Termos e formulários relacionados ao estágio.',
    icon: 'ScrollText',
    items: [],
  },
  {
    id: 'workflows',
    slug: 'workflows',
    name: 'Workflows',
    description: 'Fluxos de trabalho e processos mapeados durante o estágio.',
    icon: 'Waypoints',
    items: [],
  },
];

export type TestRecord = {
  id: string;
  name: string;
  type: string;
  status: 'realizado' | 'documentado';
  note?: string;
};

/**
 * Testes manuais de ponta a ponta, realizados com o sistema em execução real
 * (front-end e back-end ativos, banco de dados real). Não há suíte de testes
 * automatizados nem pipeline de integração contínua no projeto.
 */
export const testRecords: TestRecord[] = [
  {
    id: 'teste-erro-conexao-login',
    name: 'Erro de conexão no login',
    type: 'Manual',
    status: 'realizado',
    note: 'Mensagem diferenciada entre credenciais inválidas e falha de conexão com o servidor.',
  },
  {
    id: 'teste-login',
    name: 'Login com usuário real',
    type: 'Manual',
    status: 'realizado',
    note: 'Autenticação validada contra o back-end real, com perfil administrador.',
  },
  {
    id: 'teste-responsividade',
    name: 'Responsividade (mobile, tablet, desktop)',
    type: 'Manual',
    status: 'realizado',
    note: 'Sidebar, tabelas e grids se adaptam corretamente em 390px, 768px e 1440px.',
  },
  {
    id: 'teste-solicitar-reserva',
    name: 'Solicitar reserva',
    type: 'Manual',
    status: 'realizado',
    note: 'Bloqueio de data passada e fluxo completo de solicitação confirmados.',
  },
  {
    id: 'teste-aprovar-rejeitar',
    name: 'Aprovar/rejeitar reserva (gestor)',
    type: 'Manual',
    status: 'realizado',
    note: 'Inclui rejeição com motivo obrigatório.',
  },
  {
    id: 'teste-conflito-horario',
    name: 'Conflito de horário na aprovação',
    type: 'Manual',
    status: 'realizado',
    note: 'Aviso de conflito exibido; confirmação fica desabilitada até o conflito ser resolvido.',
  },
  {
    id: 'teste-editar-reserva-sala-indisponivel',
    name: 'Editar reserva que perdeu a sala',
    type: 'Manual',
    status: 'realizado',
    note: 'Sistema detecta que a sala foi reservada por outra pessoa e limpa o campo automaticamente, com aviso.',
  },
  {
    id: 'teste-cancelar-reserva',
    name: 'Cancelar reserva',
    type: 'Manual',
    status: 'realizado',
    note: 'Cancelamento reflete na listagem imediatamente.',
  },
  {
    id: 'teste-excluir-sala',
    name: 'Excluir sala com dupla confirmação',
    type: 'Manual',
    status: 'realizado',
  },
  {
    id: 'teste-status-sala-reserva-futura',
    name: 'Alterar status de sala com reserva futura aprovada',
    type: 'Manual',
    status: 'realizado',
    note: 'Aviso exibido corretamente antes da alteração.',
  },
  {
    id: 'teste-excluir-usuario-com-reservas',
    name: 'Excluir usuário com reservas no histórico',
    type: 'Manual',
    status: 'realizado',
    note: 'Bloqueado corretamente pelo back-end (ver limitação sobre o texto da mensagem de erro).',
  },
  {
    id: 'teste-acesso-nao-autenticado',
    name: 'Acesso não autenticado a rota administrativa',
    type: 'Manual',
    status: 'realizado',
    note: 'Redireciona corretamente para a tela de login.',
  },
  {
    id: 'teste-backend-offline-navegacao',
    name: 'Back-end indisponível durante a navegação',
    type: 'Manual',
    status: 'realizado',
    note: 'Exibe aviso de erro sem quebrar a tela; interface continua utilizável.',
  },
];

export const limitations: string[] = [
  'Não há suíte de testes automatizados nem integração contínua — a verificação é manual, feita com o sistema em execução.',
  'A API retorna uma mensagem com erro de digitação em português ao bloquear a exclusão de usuário com reservas no histórico (correção pendente no back-end).',
  'A validação de e-mail inválido no cadastro de usuário usa a mensagem nativa do navegador, em inglês, fora do padrão visual do restante do sistema.',
];

export type Learning = {
  id: string;
  title: string;
  description: string;
};

export const learnings: Learning[] = [
  {
    id: 'aprendizado-modelagem',
    title: 'Modelagem antes de codar',
    description:
      'Planejar o sistema com UML completo — casos de uso, classes, DER, sequência, estado e implantação — antes de iniciar o desenvolvimento.',
  },
  {
    id: 'aprendizado-resiliencia',
    title: 'Tratamento de erros e resiliência',
    description:
      'Diferenciar falha de conexão de credencial inválida e manter a interface utilizável mesmo com o back-end fora do ar.',
  },
  {
    id: 'aprendizado-regras-negocio',
    title: 'Regras de negócio com integridade de dados',
    description:
      'Implementar validações como conflito de horário na aprovação e bloqueio de exclusão de usuários com reservas vinculadas.',
  },
];

export type SkillItem = {
  name: string;
  track: 'hard' | 'soft';
};

// Stack técnica confirmada no Relatório de Estágio (seção "Recursos e Ambiente
// de Desenvolvimento"). Habilidades comportamentais são autoavaliação da
// aluna — PLACEHOLDER_ETAPA1 caso ela prefira ajustar a lista.
export const skills: SkillItem[] = [
  { name: 'Java', track: 'hard' },
  { name: 'Spring Boot', track: 'hard' },
  { name: 'React', track: 'hard' },
  { name: 'JavaScript', track: 'hard' },
  { name: 'MySQL', track: 'hard' },
  { name: 'REST API', track: 'hard' },
  { name: 'UML', track: 'hard' },
  { name: 'Git', track: 'hard' },
  { name: 'Comunicação', track: 'soft' },
  { name: 'Trabalho em equipe', track: 'soft' },
  { name: 'Organização', track: 'soft' },
  { name: 'Proatividade', track: 'soft' },
  { name: 'Resolução de problemas', track: 'soft' },
  { name: 'Adaptabilidade', track: 'soft' },
];
