import type { Frente } from "@/lib/financasCalculo";
import type { IconName } from "@/components/Icons";

export interface SlideStat {
  label: string;
  value: string;
}

export interface SlideQuadrant {
  title: string;
  color: "blue" | "red" | "orange" | "ink";
  items: string[];
}

export interface TimelineItem {
  label: string;
  title: string;
  description: string;
  icone?: IconName;
}

export interface GalleryImage {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  position?: string;
}

export interface PartnerItem {
  logo: string;
  nome: string;
  blurb: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  initials: string;
  color: string;
  status: "atual" | "futuro";
}

export interface ProcessStep {
  title: string;
  description: string;
  icone?: IconName;
}

export interface ProfileSection {
  heading: string;
  items: string[];
}

export interface PersonProfile {
  name: string;
  role: string;
  photo?: string;
  status: "atual" | "futuro";
  headline: string;
  formacao: string[];
  sections: ProfileSection[];
  tags?: string[];
}

export interface OrgChartNode {
  title: string;
  subtitle?: string;
}

export interface OrgChartData {
  root: OrgChartNode;
  children: OrgChartNode[];
}

export type SlideLayout =
  | "cover"
  | "toc"
  | "split"
  | "overlay"
  | "stat-grid"
  | "quadrant"
  | "timeline"
  | "gallery"
  | "partners"
  | "team-grid"
  | "profile"
  | "process"
  | "orgchart"
  | "table"
  | "quote"
  | "finance"
  | "closing";

export interface Slide {
  layout: SlideLayout;
  chapterIndex: number;
  chapterTitle: string;
  kicker?: string;
  title: string;
  paragraphs?: string[];
  image?: GalleryImage;
  imageSide?: "left" | "right";
  accent?: "blue" | "red" | "orange" | "ink";
  stats?: SlideStat[];
  quadrants?: SlideQuadrant[];
  timeline?: TimelineItem[];
  images?: GalleryImage[];
  partners?: PartnerItem[];
  team?: TeamMember[];
  profile?: PersonProfile;
  process?: ProcessStep[];
  orgchart?: OrgChartData;
  tableHead?: string[];
  tableRows?: string[][];
  quote?: { text: string; author: string; photo?: string };
  financeView?: "overview" | "table";
  frentes?: Frente[];
}

export const CAPITULOS: { titulo: string; icone: IconName }[] = [
  { titulo: "Análise de Oportunidade", icone: "target" },
  { titulo: "Conceito", icone: "puzzle" },
  { titulo: "Mercado e Competidores", icone: "globe" },
  { titulo: "Equipe de Gestão", icone: "users" },
  { titulo: "Produtos e Serviços", icone: "book" },
  { titulo: "Estrutura e Operações", icone: "shield" },
  { titulo: "Marketing e Vendas", icone: "chat" },
  { titulo: "Estratégia de Crescimento", icone: "medal" },
  { titulo: "Finanças", icone: "file" },
];

export const APRESENTACAO_SLIDES: Slide[] = [
  {
    layout: "cover",
    chapterIndex: 0,
    chapterTitle: "Capa",
    kicker: "Documento interno · Promise Education Group",
    title: "Plano de Negócio",
    paragraphs: [
      "A Promise integra quatro frentes complementares em um único ecossistema educacional: Schools, Learners, Professionals e Global. Esta apresentação reúne a análise de oportunidade, o modelo de negócio, a operação, a estratégia de crescimento e a projeção financeira que sustentam essa proposta.",
    ],
  },
  {
    layout: "toc",
    chapterIndex: 0,
    chapterTitle: "Sumário",
    kicker: "Sumário",
    title: "Os nove capítulos do plano",
  },

  // ==========================================================================
  // CAPÍTULO 1 — ANÁLISE DE OPORTUNIDADE
  // ==========================================================================
  {
    layout: "split",
    chapterIndex: 1,
    chapterTitle: CAPITULOS[0].titulo,
    kicker: "Capítulo 01 · Análise de Oportunidade",
    title: "Quem a Promise atende, e por que agora",
    image: { src: "/assets/hero-home.jpg", alt: "Estudante em aula de inglês" },
    imageSide: "right",
    accent: "blue",
    paragraphs: [
      "A Promise atende três públicos com uma mesma proposta de fundo. Escolas privadas, sobretudo cristãs e clássicas, que precisam estruturar ou revisar seus programas de inglês. Famílias e estudantes, incluindo o crescente público de homeschooling, em busca de uma trajetória de inglês com certificação internacional. Professores, coordenadores e gestores educacionais em busca de formação continuada e reconhecimento profissional.",
      "O momento favorece essa proposta. Escolas cristãs continuam sendo abertas em todo o Brasil e a maioria não sabe estruturar um departamento de inglês. O homeschooling cresce e amadurece, criando demanda por validação acadêmica reconhecida. O ensino de inglês migrou para o formato online, o que favorece diretamente o modelo da Promise.",
    ],
  },
  {
    layout: "stat-grid",
    chapterIndex: 1,
    chapterTitle: CAPITULOS[0].titulo,
    kicker: "Capítulo 01 · Análise de Oportunidade",
    title: "Tamanho e crescimento do mercado",
    paragraphs: [
      "São dois mercados diferentes, e a diferença importa. O mercado de ensino de idiomas é o de cursos e escolas de inglês, dentro do Brasil, comprado por famílias e por escolas: é a base das frentes Schools e Learners. O mercado de educação internacional é o de intercâmbio e mobilidade para o exterior, comprado por quem já decidiu estudar fora do país: é a porta de entrada da frente Global. A Promise atua nos dois, mas com produtos e concorrentes distintos em cada um.",
      "A educação básica brasileira soma cerca de 46 milhões de matrículas, das quais aproximadamente 9,3 milhões na rede privada, base direta de Schools. O homeschooling ainda é um nicho menor e difícil de dimensionar: o MEC estima cerca de 17 mil famílias e 35 mil estudantes, enquanto a ANED, associação do setor, fala em números bem maiores, o que sinaliza um mercado em expansão e ainda sem medição oficial consolidada.",
    ],
    stats: [
      { label: "Matrículas na educação básica, 2025", value: "46 mi" },
      { label: "Matrículas na rede privada, 2025", value: "≈ 9,3 mi" },
      { label: "Intercâmbio (educação internacional), 2025", value: "R$ 7 bi · +27,3%" },
      { label: "Homeschooling, estimativa MEC", value: "17 mil famílias" },
    ],
  },
  {
    layout: "table",
    chapterIndex: 1,
    chapterTitle: CAPITULOS[0].titulo,
    kicker: "Capítulo 01 · Análise de Oportunidade",
    title: "Fontes dos números citados",
    tableHead: ["Dado", "Fonte"],
    tableRows: [
      ["Matrículas na educação básica e na rede privada, 2025", "Inep, Censo Escolar da Educação Básica 2025"],
      ["Mercado de intercâmbio, R$ 7 bi e +27,3% em 2025", "Belta (Associação Brasileira de Agências de Intercâmbio), Pesquisa Nacional Selo Belta 2026"],
      ["Homeschooling, 17 mil famílias e 35 mil estudantes", "Estimativa oficial mais citada, atribuída ao MEC; associações do setor, como a ANED, reportam números maiores"],
    ],
    paragraphs: [
      "Todos os demais números financeiros desta apresentação, como margens, payback e projeção de cinco anos, são premissas internas da Promise, não estatísticas de mercado, e estão sinalizados como tal ao longo do documento.",
    ],
  },
  {
    layout: "split",
    chapterIndex: 1,
    chapterTitle: CAPITULOS[0].titulo,
    kicker: "Capítulo 01 · Análise de Oportunidade",
    title: "Capital, margens e retorno esperado",
    image: { src: "/assets/schools-authority.jpg", alt: "Consultoria educacional em escola parceira" },
    imageSide: "left",
    accent: "orange",
    paragraphs: [
      "O modelo prioriza serviços de consultoria, formação e aulas, o que exige menor investimento em ativos físicos. As estimativas iniciais de margem bruta variam por frente: 60% a 75% em Schools, 50% a 65% em Learners, 65% a 80% em Professionals e 25% a 45% em Global, cujos custos de terceiros como transporte e hospedagem reduzem a margem. A meta consolidada é uma margem bruta próxima de 60%.",
      "As estimativas de ponto de equilíbrio e retorno ainda variam entre as análises internas da Promise, entre 6 e 18 meses para o breakeven e entre 12 e 24 meses para a recuperação total do capital investido. Essa faixa será refinada no capítulo de Finanças, à medida que os primeiros resultados reais da operação forem registrados.",
    ],
    stats: [
      { label: "Margem bruta · Schools", value: "60–75%" },
      { label: "Margem bruta · Learners", value: "50–65%" },
      { label: "Margem bruta · Professionals", value: "65–80%" },
      { label: "Margem bruta · Global", value: "25–45%" },
    ],
  },
  {
    layout: "split",
    chapterIndex: 1,
    chapterTitle: CAPITULOS[0].titulo,
    kicker: "Capítulo 01 · Análise de Oportunidade",
    title: "Barreiras de entrada e concorrentes-chave",
    image: { src: "/assets/learners-turmas.jpg", alt: "Turma de alunos em aula de inglês" },
    imageSide: "right",
    accent: "red",
    paragraphs: [
      "O público de homeschooling precisa de validação de alguém já bem inserido nesse mercado, o que exige tempo de relacionamento e prova social antes da conversão. Cursos de inglês, por outro lado, são mais fáceis de vender, mas também podem ser cancelados com a mesma facilidade, o que exige atenção constante à retenção.",
      "O mercado é fragmentado. Redes tradicionais como Wizard, Fisk, CCAA, CNA e Cultura Inglesa disputam o ensino presencial de inglês, enquanto plataformas online como Open English, EF English Live, Cambly, Wise Up e Duolingo concorrem pelo mesmo público no formato digital. Em educação internacional e certificações, Cambridge e instituições associadas concentram a propriedade intelectual dos exames. A Promise não disputa diretamente com nenhum desses grupos: seu diferencial está em integrar consultoria escolar, formação profissional, inglês e internacionalização em uma única proposta.",
    ],
  },

  // ==========================================================================
  // CAPÍTULO 2 — CONCEITO
  // ==========================================================================
  {
    layout: "split",
    chapterIndex: 2,
    chapterTitle: CAPITULOS[1].titulo,
    kicker: "Capítulo 02 · Conceito",
    title: "O que é a Promise",
    image: { src: "/assets/hero-quemsomos.jpg", alt: "Promise Education Group" },
    imageSide: "left",
    accent: "blue",
    paragraphs: [
      "A Promise Education Group é uma empresa de educação voltada à formação integral e à internacionalização educacional. Atende escolas, famílias homeschoolers, estudantes, professores e gestores por meio de quatro frentes: estruturação de programas de inglês e internacionalização escolar, ensino de inglês e preparação para certificações Cambridge, formação e desenvolvimento profissional de educadores, e experiências educacionais internacionais.",
      "Seu objetivo é desenvolver pessoas e instituições com excelência, propósito e uma perspectiva cristã, ampliando oportunidades acadêmicas e a capacidade de atuar em um mundo globalizado.",
    ],
  },
  {
    layout: "overlay",
    chapterIndex: 2,
    chapterTitle: CAPITULOS[1].titulo,
    kicker: "Capítulo 02 · Conceito",
    title: "Missão e visão",
    image: { src: "/assets/global-hero.jpg", alt: "Internacionalização educacional" },
    accent: "blue",
    paragraphs: [
      "Expandir os horizontes de escolas, famílias homeschooling, educadores e estudantes por meio da internacionalização educacional de excelência, formando cidadãos preparados para impactar o mundo com competência, propósito e cosmovisão cristã.",
      "Ser o principal ecossistema cristão de internacionalização educacional da América Latina.",
    ],
    stats: [
      { label: "Missão", value: "Formação integral e internacionalização" },
      { label: "Visão", value: "Referência cristã na América Latina" },
    ],
  },
  {
    layout: "quote",
    chapterIndex: 2,
    chapterTitle: CAPITULOS[1].titulo,
    kicker: "Capítulo 02 · Conceito",
    title: "Uma convicção pessoal e profissional",
    quote: {
      text: "Para mim, excelência acadêmica e fé caminham juntas. Não é só uma convicção profissional, é pessoal: a mesma fé que orienta minha vida em casa, com a minha família, orienta cada decisão da Promise no trabalho com escolas, famílias homeschooling e alunos.",
      author: "Calebe Braga, fundador da Promise",
      photo: "/assets/calebe-familia.jpg",
    },
    paragraphs: [
      "O diferencial estrutural da Promise é o Promise Excellence Framework™, a metodologia própria que integra as quatro frentes em um único ecossistema, apoiada em valores como excelência, propósito, cosmovisão cristã, desenvolvimento integral, autonomia e visão global.",
    ],
  },
  {
    layout: "split",
    chapterIndex: 2,
    chapterTitle: CAPITULOS[1].titulo,
    kicker: "Capítulo 02 · Conceito",
    title: "Estrutura legal e onde a Promise atua",
    image: { src: "/assets/homeschool-pai-mae.jpg", alt: "Aula online de inglês em casa" },
    imageSide: "right",
    accent: "ink",
    paragraphs: [
      "A Promise é uma empresa. Learners é uma operação 100% online; Schools pode ser online ou presencial conforme o plano fechado com cada escola. Em nenhum dos dois casos há sede física própria voltada ao atendimento, o que mantém a estrutura de custos enxuta e permite atender famílias e escolas em qualquer região do Brasil.",
      "Como o modelo ainda é novo, a Promise não possui um histórico extenso de métricas. A prioridade atual é consolidar as quatro frentes e construir esse histórico a partir dos próximos ciclos.",
    ],
  },

  // ==========================================================================
  // CAPÍTULO 3 — MERCADO E COMPETIDORES
  // ==========================================================================
  {
    layout: "split",
    chapterIndex: 3,
    chapterTitle: CAPITULOS[2].titulo,
    kicker: "Capítulo 03 · Mercado e Competidores",
    title: "Como o mercado está estruturado",
    image: { src: "/assets/schools-global-bridge.jpg", alt: "Conexão entre educação local e internacional" },
    imageSide: "left",
    accent: "orange",
    paragraphs: [
      "O mercado se divide por tipo de oferta: cursos de inglês, certificações internacionais, consultoria educacional, formação docente, programas de High School americano e intercâmbios. Divide-se também por perfil de cliente: escolas privadas, sobretudo cristãs e bilíngues; famílias e estudantes, incluindo homeschoolers; e professores, coordenadores e gestores. Geograficamente, a expectativa é encontrar uma parcela relevante de clientes no interior de estados brasileiros em crescimento.",
      "As tendências reforçam a oportunidade. O inglês migrou para o formato online. Escolas cristãs continuam sendo abertas por todo o país sem saber estruturar seus departamentos de inglês. O homeschooling cresce ao mesmo tempo em que precisa de mais estrutura e validação acadêmica.",
    ],
  },
  {
    layout: "gallery",
    chapterIndex: 3,
    chapterTitle: CAPITULOS[2].titulo,
    kicker: "Capítulo 03 · Mercado e Competidores",
    title: "Quem compra, e por quê",
    images: [
      { src: "/assets/card-schools.jpg", alt: "Schools" },
      { src: "/assets/card-learners.jpg", alt: "Learners" },
      { src: "/assets/card-professionals.jpg", alt: "Professionals" },
    ],
    paragraphs: [
      "Escolas privadas cristãs ou clássicas, de pequeno a grande porte, compõem o comprador típico da frente Schools, com decisão de mantenedores, diretores e coordenadores pedagógicos motivados por diferenciação institucional. Learners atende famílias de classe média e média-alta, incluindo homeschoolers, que valorizam inglês, certificação Cambridge e uma trajetória acadêmica internacional para os filhos. Em Professionals, quem compra são os próprios professores, coordenadores e gestores, investindo na carreira.",
    ],
  },
  {
    layout: "quote",
    chapterIndex: 3,
    chapterTitle: CAPITULOS[2].titulo,
    kicker: "Capítulo 03 · Mercado e Competidores",
    title: "A lacuna que a Promise preenche",
    quote: {
      text: "Escolas, famílias e profissionais encontram materiais, cursos, certificações, plataformas e intercâmbios separadamente. Poucas soluções integram ensino de inglês, currículo, formação profissional, certificação, internacionalização e cosmovisão cristã em uma única trajetória coerente.",
      author: "Diagnóstico de mercado, Promise Education Group",
    },
    paragraphs: [
      "Os fatores que mais influenciam a decisão de compra confirmam essa leitura: confiança e credibilidade, qualidade e resultados comprovados, alinhamento de valores, indicação e reputação. O preço aparece como fator relevante, mas raramente como o principal critério.",
    ],
  },
  {
    layout: "table",
    chapterIndex: 3,
    chapterTitle: CAPITULOS[2].titulo,
    kicker: "Capítulo 03 · Mercado e Competidores",
    title: "Concorrência: quem disputa cada frente",
    tableHead: ["Frente", "Concorrentes diretos e indiretos"],
    tableRows: [
      ["Schools", "Consultorias educacionais e sistemas de ensino bilíngue; indiretamente, Cultura Inglesa, CNA, Wizard, CCAA e Fisk"],
      ["Learners", "Escolas presenciais de inglês e plataformas online como Open English, EF English Live, Cambly, Wise Up, Fluency Academy e Duolingo, além de aulas particulares avulsas"],
      ["Professionals", "Centros de preparação para TKT, CELTA e DELTA, e a própria Cambridge"],
      ["Global", "Agências de intercâmbio e consultorias de educação internacional"],
    ],
    paragraphs: [
      "Concorrentes maiores como CNA+, Cultura Inglesa e Wizard, ligada à Pearson, têm vantagem clara em escala, estrutura gerencial, marca e orçamento de marketing. A Cultura Inglesa atua há mais de 90 anos combinando ensino, certificações e formação docente. No formato digital, plataformas como Open English e EF English Live já dominam a aula online em escala latino-americana, e apps como Duolingo capturam o usuário de autoestudo antes mesmo de ele considerar um curso pago.",
    ],
  },
  {
    layout: "split",
    chapterIndex: 3,
    chapterTitle: CAPITULOS[2].titulo,
    kicker: "Capítulo 03 · Mercado e Competidores",
    title: "A vantagem competitiva da Promise",
    image: { src: "/assets/bolsa-estudos.jpg", alt: "Aluna em ambiente de estudo internacional" },
    imageSide: "right",
    accent: "blue",
    paragraphs: [
      "A Promise concorre pela integração dos seus serviços, um terreno em que a escala das redes maiores pesa menos. Enquanto os concorrentes oferecem cursos, consultoria ou intercâmbios isoladamente, a Promise une estruturação escolar, formação profissional, ensino de inglês e internacionalização em um único ecossistema, sob uma cosmovisão cristã que a coloca em um nicho pouco disputado.",
      "A menor escala inicial funciona como vantagem de agilidade e proximidade. A Promise adapta currículos, materiais e formações com uma velocidade que estruturas maiores não conseguem replicar, enquanto constrói marca, parcerias e escala ao longo do tempo.",
    ],
  },

  // ==========================================================================
  // CAPÍTULO 4 — EQUIPE DE GESTÃO
  // ==========================================================================
  {
    layout: "orgchart",
    chapterIndex: 4,
    chapterTitle: CAPITULOS[3].titulo,
    kicker: "Capítulo 04 · Equipe de Gestão",
    title: "A estrutura funcional hoje",
    accent: "blue",
    orgchart: {
      root: { title: "Direção Executiva", subtitle: "Calebe Braga · gestão estratégica das quatro frentes" },
      children: [
        { title: "Parceiros de Marketing", subtitle: "Comunicação e geração de demanda" },
        { title: "Parceiros Administrativos", subtitle: "Processos, contratos e suporte" },
        { title: "Parceiros Pedagógicos", subtitle: "Currículo e metodologia" },
        { title: "Professores", subtitle: "Entrega das aulas, sobretudo em Learners" },
      ],
    },
    paragraphs: [
      "A Promise opera hoje com uma estrutura funcional enxuta. As áreas administrativa, comercial, técnico-pedagógica e financeira ainda são parcialmente centralizadas na liderança, com apoio pontual de profissionais e parceiros externos, à medida que cada frente ganha volume suficiente para justificar uma posição dedicada.",
    ],
  },
  {
    layout: "profile",
    chapterIndex: 4,
    chapterTitle: CAPITULOS[3].titulo,
    kicker: "Capítulo 04 · Equipe de Gestão",
    title: "Calebe Braga",
    accent: "blue",
    profile: {
      name: "Calebe Braga",
      role: "CEO e Diretor Pedagógico da Promise",
      photo: "/assets/calebe-familia.jpg",
      status: "atual",
      headline: "Educador, gestor acadêmico e consultor educacional, com mais de 14 anos de atuação no ensino de língua inglesa e no desenvolvimento de projetos educacionais.",
      formacao: ["Letras Inglês", "Marketing", "Pós-graduação em Christian Classical Education", "Estudos em Teologia"],
      sections: [
        {
          heading: "Trajetória profissional",
          items: [
            "Fundador e CEO da Promise Education Group",
            "Coordenador do departamento internacional da Cidade Viva Academy",
            "Experiência com o sistema de exames Cambridge English do Pre A1 Starters ao C1 Advanced, incluindo avaliação, aplicação e certificação internacional",
          ],
        },
        {
          heading: "Autoria de currículo",
          items: [
            "Coautor, ao lado de Rita, dos currículos de inglês Paideia e Oikos, do sistema de ensino Cidade Viva Education",
            "Autor da coleção To the Nations, currículo próprio da Promise para o infantil e os anos iniciais do Fundamental",
          ],
        },
      ],
      tags: ["Centro Preparatório Oficial Cambridge", "CELTA (Cambridge)", "14+ anos de atuação"],
    },
  },
  {
    layout: "profile",
    chapterIndex: 4,
    chapterTitle: CAPITULOS[3].titulo,
    kicker: "Capítulo 04 · Equipe de Gestão",
    title: "Renato Silva de Assis",
    accent: "orange",
    profile: {
      name: "Renato Silva de Assis",
      role: "Consultor Organizacional da Promise",
      photo: "/assets/renato-assis.jpg",
      status: "atual",
      headline: "Transformar dados em inteligência para apoiar decisões estratégicas é o propósito que orienta minha trajetória profissional.",
      formacao: ["Economista", "Mestre em Economia (UFRN)", "Graduado em Ciência de Dados para Negócios (UFPB)"],
      sections: [
        {
          heading: "Trajetória em pesquisa e políticas públicas",
          items: [
            "Supervisor Técnico Regional do DIEESE por 16 anos: coordenação de pesquisas, estudos socioeconômicos, diagnósticos estratégicos e assessoria técnica para negociações coletivas, mercado de trabalho e formulação de políticas públicas",
            "Técnico de Projetos desde outubro de 2024: observatórios socioeconômicos em parceria com governos estaduais, com indicadores e análises para decisões baseadas em evidências",
          ],
        },
        {
          heading: "Trajetória em sistemas de ensino",
          items: [
            "Gerente Administrativo do Sistema Educacional Cidade Viva Education, de agosto de 2024 a junho de 2026: estruturação das áreas administrativa, financeira, comercial, tecnológica e logística",
            "Atualmente, Consultor Organizacional na área de Dados e Business Intelligence da Cidade Viva Education: responsável pela infraestrutura tecnológica do sistema, pela gestão e governança de dados, por dashboards e indicadores de gestão, e pela automação de processos administrativos e financeiros",
            "Consultor Organizacional da We Make (wemake.tec.br), editora cristã de currículo de tecnologia e cultura maker para escolas confessionais: estruturação das áreas administrativa, financeira e comercial, além de autor e revisor do material didático do sistema",
          ],
        },
        {
          heading: "Empreendedorismo e atuação na Promise",
          items: [
            "Fundador da Arkos Intelligence: Business Intelligence, Analytics e Inteligência Artificial para apoio à gestão, com foco em planejamento estratégico e em sistemas que integram dados, automatizam processos e transformam dados em inteligência para decisão",
            "Pesquisador, professor, consultor e palestrante ao longo da carreira",
            "Consultor Organizacional da Promise, responsável pela implantação administrativa e tecnológica do sistema, pela estruturação do plano de negócio, do modelo financeiro e da governança de dados",
          ],
        },
      ],
      tags: [
        "Inteligência Estratégica",
        "Planejamento Estratégico",
        "Ciência de Dados",
        "Business Intelligence",
        "Inteligência Artificial",
        "Gestão por Processos",
        "Transformação Digital",
        "Governança de Dados",
        "Gestão Educacional",
      ],
    },
  },
  {
    layout: "team-grid",
    chapterIndex: 4,
    chapterTitle: CAPITULOS[3].titulo,
    kicker: "Capítulo 04 · Equipe de Gestão",
    title: "Para onde a equipe cresce",
    team: [
      {
        name: "Equipe docente",
        role: "4 professores pré-contratados",
        initials: "4P",
        color: "var(--blue)",
        status: "atual",
        bio: "Execução pedagógica: aulas, acompanhamento de alunos e registro de progresso.",
      },
      {
        name: "Coordenação Schools",
        role: "A contratar",
        initials: "SC",
        color: "var(--blue)",
        status: "futuro",
        bio: "Implementação pedagógica dos programas de inglês nas escolas parceiras.",
      },
      {
        name: "Coordenação Learners",
        role: "A contratar",
        initials: "LC",
        color: "var(--red)",
        status: "futuro",
        bio: "Acompanhamento pedagógico de alunos e famílias, incluindo Homeschooling e American School.",
      },
      {
        name: "Coordenação Professionals",
        role: "A contratar",
        initials: "PC",
        color: "var(--orange)",
        status: "futuro",
        bio: "Estruturação e acompanhamento dos programas de formação continuada de professores.",
      },
      {
        name: "Gerência Administrativa",
        role: "A contratar",
        initials: "GA",
        color: "var(--ink)",
        status: "futuro",
        bio: "Plano de negócio, controle financeiro e marketing da empresa.",
      },
    ],
  },

  // ==========================================================================
  // CAPÍTULO 5 — PRODUTOS E SERVIÇOS
  // ==========================================================================
  {
    layout: "gallery",
    chapterIndex: 5,
    chapterTitle: CAPITULOS[4].titulo,
    kicker: "Capítulo 05 · Produtos e Serviços",
    title: "O portfólio, frente a frente",
    images: [
      { src: "/assets/schools-curricular.jpg", alt: "Schools: estruturação curricular" },
      { src: "/assets/hero-learners.jpg", alt: "Learners: cursos de inglês" },
      { src: "/assets/prof-servico-formacao-continuada.jpg", alt: "Professionals: formação continuada" },
      { src: "/assets/global-servico-intercambios.jpg", alt: "Global: intercâmbios" },
    ],
    paragraphs: [
      "Schools concentra consultoria educacional, estruturação de programas de inglês, currículo, formação docente, avaliação e internacionalização escolar. Em Learners estão os cursos de inglês, a preparação para certificações Cambridge, o homeschooling, o American School e as experiências internacionais. Professionals oferece formação continuada, cursos, workshops, mentorias, preparação para certificações e desenvolvimento de líderes, enquanto Global cuida de intercâmbios, viagens acadêmicas, imersões e projetos internacionais.",
    ],
  },
  {
    layout: "split",
    chapterIndex: 5,
    chapterTitle: CAPITULOS[4].titulo,
    kicker: "Capítulo 05 · Produtos e Serviços",
    title: "O diferencial: American School",
    image: { src: "/assets/livro-to-the-nations.jpg", alt: "Coleção To the Nations", fit: "contain" },
    imageSide: "left",
    accent: "red",
    paragraphs: [
      "Para famílias homeschoolers, a Promise oferece uma trajetória de American School do Elementary ao High School. O estudante constrói uma formação acadêmica americana em paralelo à sua trajetória em casa e, ao concluir o High School, pode obter um diploma americano utilizável em processos de candidatura a universidades nos Estados Unidos, conforme os requisitos de cada instituição.",
      "Essa proposta se diferencia do que o mercado brasileiro costuma oferecer, que normalmente associa o High School americano a alunos já matriculados em escolas regulares.",
    ],
  },
  {
    layout: "gallery",
    chapterIndex: 5,
    chapterTitle: CAPITULOS[4].titulo,
    kicker: "Capítulo 05 · Produtos e Serviços",
    title: "Materiais e currículos autorais",
    images: [
      { src: "/assets/livro-ingles-infantil-2.png", alt: "Currículo de inglês infantil", fit: "contain" },
      { src: "/assets/livro-ingles-infantil-3.png", alt: "Currículo de inglês infantil", fit: "contain" },
      { src: "/assets/livro-ingles-infantil-4.png", alt: "Currículo de inglês infantil", fit: "contain" },
      { src: "/assets/livro-to-the-nations-2.jpg", alt: "Coleção To the Nations", fit: "contain" },
    ],
    paragraphs: [
      "A Promise já detém direitos sobre marca, metodologia e materiais próprios, incluindo o Promise Excellence Framework™ e a coleção To the Nations, currículo autoral de inglês para o infantil e os anos iniciais do Fundamental. Paideia e Oikos, por sua vez, são currículos da Cidade Viva Education, coautorados por Calebe Braga e Rita naquela instituição, e não integram a propriedade intelectual da Promise. Esses ativos próprios representam parte relevante do patrimônio da empresa e uma base para futuras soluções digitais e aplicativos de aprendizagem.",
    ],
  },
  {
    layout: "timeline",
    chapterIndex: 5,
    chapterTitle: CAPITULOS[4].titulo,
    kicker: "Capítulo 05 · Produtos e Serviços",
    title: "Maturidade e próximos lançamentos",
    accent: "orange",
    timeline: [
      { label: "Consolidado", title: "Cursos de inglês", description: "Frente mais madura, com operação consolidada há anos", icone: "chat" },
      { label: "Em validação", title: "Consultoria para escolas", description: "Em operação há mais de um ano, com resultados já avaliados", icone: "shield" },
      { label: "Em lançamento", title: "Homeschooling e American School", description: "Conclusão prevista para setembro de 2026", icone: "home" },
      { label: "Em estruturação", title: "Promise for Professionals", description: "Serviços em organização para lançamento progressivo", icone: "users" },
      { label: "Em desenvolvimento", title: "Tecnologia e aplicativos", description: "Fase conceitual, caminho de expansão futura da propriedade intelectual", icone: "puzzle" },
    ],
  },

  // ==========================================================================
  // CAPÍTULO 6 — ESTRUTURA E OPERAÇÕES
  // ==========================================================================
  {
    layout: "split",
    chapterIndex: 6,
    chapterTitle: CAPITULOS[5].titulo,
    kicker: "Capítulo 06 · Estrutura e Operações",
    title: "Uma operação enxuta, com o online como padrão",
    image: { src: "/assets/global-familia.jpg", alt: "Aprendizagem em ambiente familiar" },
    imageSide: "right",
    accent: "orange",
    paragraphs: [
      "Learners opera de forma integralmente online: aulas, acompanhamento e certificação acontecem a distância, sem planta física para o atendimento. Já em Schools, o formato varia conforme o plano contratado por cada escola parceira: consultoria, formação de professores e reuniões pedagógicas podem ser feitas online ou presencialmente, a depender da necessidade da instituição e do pacote fechado.",
      "Mesmo quando presencial, a estrutura fixa da Promise permanece enxuta: espaços físicos, quando necessários, são compartilhados ou emprestados de parceiros, sem sede própria. Esse modelo mantém os custos fixos baixos e amplia a capacidade de atender clientes em qualquer região do Brasil. A infraestrutura tecnológica própria hoje se resume ao site institucional, com plataformas e sistemas internos ainda por desenvolver.",
    ],
  },
  {
    layout: "partners",
    chapterIndex: 6,
    chapterTitle: CAPITULOS[5].titulo,
    kicker: "Capítulo 06 · Estrutura e Operações",
    title: "Parceiros e fornecedores",
    partners: [
      {
        logo: "/assets/parceiros/cidadeviva.svg",
        nome: "Cidade Viva Education",
        blurb: "Sistema de ensino cristão onde Calebe Braga coordena o departamento internacional e coautora, com Rita, os currículos de inglês Paideia e Oikos.",
      },
      {
        logo: "/assets/parceiros/kairos.png",
        nome: "Editora Kairós",
        blurb: "Editora parceira, responsável pela distribuição dos livros e materiais didáticos impressos da Promise.",
      },
      {
        logo: "/assets/parceiros/aei.webp",
        nome: "American Education International",
        blurb: "Parceira internacional na estruturação do programa American School e na convalidação de créditos acadêmicos.",
      },
      {
        logo: "/assets/parceiros/zoe.png",
        nome: "Zoe Christian School",
        blurb: "Escola cristã parceira do ecossistema Promise.",
      },
      {
        logo: "/assets/parceiros/simply.png",
        nome: "Simply So Lovely",
        blurb: "Parceira do ecossistema Promise.",
      },
      {
        logo: "/assets/parceiros/arkos-icon.svg",
        nome: "Arkos Intelligence",
        blurb: "Iniciativa de Business Intelligence, Analytics e Inteligência Artificial fundada por Renato Silva de Assis. Responsável pelo site institucional e pelas soluções de tecnologia, dados e automação da Promise.",
      },
    ],
    paragraphs: [
      "Cambridge é a fornecedora oficial das certificações internacionais: a Promise prepara e orienta os candidatos, mas os exames e certificados são emitidos pela própria Cambridge. No American School, a operação segue em parceria com uma instituição educacional americana responsável pelos créditos e pela emissão do diploma.",
    ],
  },
  {
    layout: "process",
    chapterIndex: 6,
    chapterTitle: CAPITULOS[5].titulo,
    kicker: "Capítulo 06 · Estrutura e Operações",
    title: "Da prospecção ao pós-venda",
    accent: "orange",
    process: [
      { title: "Atração", description: "Redes sociais, site, indicações, eventos ou prospecção direta", icone: "chat" },
      { title: "Diagnóstico", description: "Conversa para entender a necessidade e definir a solução", icone: "target" },
      { title: "Proposta e contratação", description: "Apresentação comercial seguida de onboarding do cliente", icone: "file" },
      { title: "Entrega", description: "Aulas, consultoria, mentorias ou programas internacionais, conforme a frente", icone: "book" },
      { title: "Acompanhamento", description: "Suporte contínuo, retenção, renovação e evolução no ecossistema", icone: "heart" },
    ],
  },
  {
    layout: "split",
    chapterIndex: 6,
    chapterTitle: CAPITULOS[5].titulo,
    kicker: "Capítulo 06 · Estrutura e Operações",
    title: "Governança, pesquisa e conformidade",
    image: { src: "/assets/schools-global-bridge.jpg", alt: "Governança e conformidade educacional" },
    imageSide: "left",
    accent: "ink",
    paragraphs: [
      "A Promise ainda não possui área formal de pesquisa e desenvolvimento, mas pretende estruturar progressivamente uma frente de PD&I voltada à criação e ao aprimoramento de currículos, materiais didáticos, metodologias e recursos digitais. A seleção de novos produtos segue critérios de demanda real, alinhamento estratégico, viabilidade financeira e capacidade de escala, sempre validados em pequena escala antes de receber investimento maior.",
      "Em regulamentação, a Promise não se apresenta como instituição certificadora quando a certificação pertence a uma organização externa, e observa as exigências legais aplicáveis a cada serviço. A política de recursos humanos prevê remuneração compatível com o mercado, promoções por competência e resultado, e planos de carreira a serem estruturados conforme a empresa cresce.",
    ],
  },

  // ==========================================================================
  // CAPÍTULO 7 — MARKETING E VENDAS
  // ==========================================================================
  {
    layout: "overlay",
    chapterIndex: 7,
    chapterTitle: CAPITULOS[6].titulo,
    kicker: "Capítulo 07 · Marketing e Vendas",
    title: "Como a Promise quer ser vista",
    accent: "red",
    paragraphs: [
      "Uma empresa educacional de alta qualidade, confiável, inovadora e com propósito, reconhecida pela integração entre consultoria escolar, ensino de inglês, formação de professores e internacionalização em um único ecossistema. O Promise Excellence Framework™, a experiência prática e as soluções personalizadas para cada escola, família e profissional sustentam essa proposta.",
    ],
  },
  {
    layout: "split",
    chapterIndex: 7,
    chapterTitle: CAPITULOS[6].titulo,
    kicker: "Capítulo 07 · Marketing e Vendas",
    title: "Como a Promise vende",
    image: { src: "/assets/professionals-authority.jpg", alt: "Venda consultiva para escolas" },
    imageSide: "right",
    accent: "orange",
    paragraphs: [
      "O modelo comercial é híbrido. Para escolas e instituições, venda consultiva, prospecção direta, reuniões e indicações, com ciclos mais longos. Para famílias e profissionais, vendas digitais, redes sociais, WhatsApp, eventos e indicações, com ciclos mais curtos.",
      "A estrutura comercial ainda é enxuta e centralizada, com investimento em marketing crescendo conforme a geração de receita. Kairos e Arkos são os principais parceiros estratégicos de vendas.",
    ],
  },
  {
    layout: "split",
    chapterIndex: 7,
    chapterTitle: CAPITULOS[6].titulo,
    kicker: "Capítulo 07 · Marketing e Vendas",
    title: "Onde e como os clientes chegam até a Promise",
    image: { src: "/assets/learners-strip-mundo.jpg", alt: "Alcance digital e institucional" },
    imageSide: "left",
    accent: "orange",
    paragraphs: [
      "Site, Instagram, WhatsApp e conteúdo de autoridade funcionam como canais transversais de atração. Prospecção direta, indicações, eventos e feiras educacionais pesam mais para escolas, enquanto redes sociais e comunidades de homeschooling pesam mais para famílias e alunos.",
      "A meta inicial de participação de mercado é pequena e especializada. A Promise prioriza qualidade, recorrência e relacionamento em vez de volume, com aceleração de vendas esperada a partir do lançamento de Homeschooling e American School em 2026.",
    ],
  },

  // ==========================================================================
  // CAPÍTULO 8 — ESTRATÉGIA DE CRESCIMENTO
  // ==========================================================================
  {
    layout: "overlay",
    chapterIndex: 8,
    chapterTitle: CAPITULOS[7].titulo,
    kicker: "Capítulo 08 · Estratégia de Crescimento",
    title: "Por que a Promise existe",
    image: { src: "/assets/global-servico-parcerias.jpg", alt: "Parcerias internacionais" },
    accent: "blue",
    paragraphs: [
      "Desenvolver pessoas e instituições por meio da educação, conectando excelência acadêmica, formação integral, cosmovisão cristã e oportunidades globais nas suas quatro frentes. No futuro, a Promise pretende se consolidar como um ecossistema educacional cristão de referência no Brasil e internacionalmente.",
    ],
  },
  {
    layout: "quadrant",
    chapterIndex: 8,
    chapterTitle: CAPITULOS[7].titulo,
    kicker: "Capítulo 08 · Estratégia de Crescimento",
    title: "Forças e oportunidades",
    quadrants: [
      {
        title: "Forças",
        color: "blue",
        items: [
          "Ecossistema integrado nas quatro frentes",
          "Metodologia própria Promise Excellence Framework™",
          "Know-how em ensino de inglês, currículo e certificação Cambridge",
          "Portfólio diversificado, com receita B2B e B2C",
          "Relacionamento próximo com os clientes",
        ],
      },
      {
        title: "Oportunidades",
        color: "orange",
        items: [
          "Crescimento da demanda por inglês e certificações internacionais",
          "Expansão da internacionalização escolar",
          "Crescimento do homeschooling",
          "Carência de formação prática para professores",
          "Potencial de produtos digitais escaláveis",
        ],
      },
    ],
  },
  {
    layout: "quadrant",
    chapterIndex: 8,
    chapterTitle: CAPITULOS[7].titulo,
    kicker: "Capítulo 08 · Estratégia de Crescimento",
    title: "Fraquezas e riscos, com plano de mitigação",
    quadrants: [
      {
        title: "Fraquezas",
        color: "red",
        items: [
          "Estrutura gerencial ainda enxuta: contratar líderes por frente",
          "Marca em consolidação: fortalecer conteúdo e presença digital",
          "Dependência do fundador: documentar processos e metodologia",
        ],
      },
      {
        title: "Riscos",
        color: "ink",
        items: [
          "Pressão de preço da concorrência: competir por diferenciação",
          "Fluxo de caixa: priorizar receitas recorrentes e controlar custos fixos",
          "Mudanças regulatórias no homeschooling: acompanhar de perto",
        ],
      },
    ],
  },
  {
    layout: "timeline",
    chapterIndex: 8,
    chapterTitle: CAPITULOS[7].titulo,
    kicker: "Capítulo 08 · Estratégia de Crescimento",
    title: "O caminho até 2027",
    timeline: [
      { label: "Set 2026", title: "Lançamento", description: "Homeschooling e American School, site finalizado e redes sociais ativas", icone: "calendar" },
      { label: "Dez 2026", title: "Consolidação", description: "Quatro frentes com processos comerciais e operacionais definidos", icone: "shield" },
      { label: "2027", title: "Expansão", description: "Carteira de escolas, alunos e profissionais, e lançamento da Professionals", icone: "globe" },
      { label: "2 anos", title: "Equilíbrio", description: "Ponto de equilíbrio e recuperação do investimento inicial", icone: "target" },
      { label: "5 anos", title: "Referência", description: "Referência nacional em educação cristã, inglês e internacionalização", icone: "medal" },
    ],
  },

  // ==========================================================================
  // CAPÍTULO 9 — FINANÇAS
  // ==========================================================================
  {
    layout: "split",
    chapterIndex: 9,
    chapterTitle: CAPITULOS[8].titulo,
    kicker: "Capítulo 09 · Finanças",
    title: "As premissas por trás dos números",
    image: { src: "/assets/bolsa-estudos.jpg", alt: "Planejamento financeiro educacional" },
    imageSide: "right",
    accent: "orange",
    paragraphs: [
      "O modelo financeiro parte de um crescimento gradual da base de clientes, de receita recorrente e do aumento da participação de serviços de maior margem. Schools funciona como fonte de contratos de maior valor, Learners como base recorrente, Professionals como frente de expansão e Global como receita adicional por projeto.",
      "A meta de planejamento é uma margem bruta consolidada próxima de 60%, revisada periodicamente conforme os resultados reais de cada frente.",
    ],
  },
  {
    layout: "quadrant",
    chapterIndex: 9,
    chapterTitle: CAPITULOS[8].titulo,
    kicker: "Capítulo 09 · Finanças",
    title: "Estrutura de custos",
    quadrants: [
      {
        title: "Custos fixos",
        color: "blue",
        items: ["Equipe e prestadores", "Tecnologia e plataformas", "Administração", "Marketing e manutenção do site"],
      },
      {
        title: "Custos variáveis",
        color: "orange",
        items: [
          "Materiais didáticos",
          "Horas de professores e consultores",
          "Taxas de certificação",
          "Parceiros, transporte e logística de projetos Global",
        ],
      },
    ],
    paragraphs: [
      "A estratégia declarada é manter a estrutura fixa enxuta e deixar os custos variáveis crescerem apenas junto com a receita, preservando margem.",
    ],
  },
  {
    layout: "split",
    chapterIndex: 9,
    chapterTitle: CAPITULOS[8].titulo,
    kicker: "Capítulo 09 · Finanças",
    title: "Investimentos e retorno esperado",
    image: { src: "/assets/prof-servico-desenvolvimento-institucional.jpg", alt: "Investimento em desenvolvimento institucional" },
    imageSide: "left",
    accent: "orange",
    paragraphs: [
      "Os principais investimentos se destinam à estruturação comercial e de marketing, à tecnologia e plataformas digitais, ao desenvolvimento de currículos e materiais próprios, e à contratação e capacitação da equipe. O retorno virá principalmente de receitas recorrentes de Learners e Schools, complementadas por Professionals e Global.",
    ],
  },
  {
    layout: "finance",
    chapterIndex: 9,
    chapterTitle: CAPITULOS[8].titulo,
    kicker: "Capítulo 09 · Finanças",
    title: "Receita e margem: cinco anos",
    financeView: "overview",
  },
  {
    layout: "finance",
    chapterIndex: 9,
    chapterTitle: CAPITULOS[8].titulo,
    kicker: "Capítulo 09 · Finanças",
    title: "DRE simplificado, ano a ano",
    financeView: "table",
  },

  // ==========================================================================
  // FECHAMENTO
  // ==========================================================================
  {
    layout: "closing",
    chapterIndex: 0,
    chapterTitle: "Fechamento",
    kicker: "Considerações finais",
    title: "Uma base sólida para os próximos passos",
    paragraphs: [
      "A Promise integra quatro frentes complementares em um ecossistema educacional com propósito claro, metodologia própria e uma oportunidade de mercado concreta. As análises apresentadas aqui, da oportunidade à estratégia de crescimento, sustentam essa proposta.",
      "O próximo passo é concluir a estruturação financeira: preencher a planilha de contas com os custos reais de cada área, validar as premissas de receita à medida que os primeiros contratos avançam, e revisar a estrutura legal da empresa. Com esses números fechados, o plano de negócio estará pronto para orientar decisões de investimento e crescimento nos próximos cinco anos.",
    ],
    stats: [
      { label: "Frentes de negócio", value: "4" },
      { label: "Anos de experiência do fundador", value: "14+" },
      { label: "Estados com presença Promise", value: "5" },
    ],
  },
];
