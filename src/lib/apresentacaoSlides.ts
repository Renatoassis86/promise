import type { Frente } from "@/lib/financasCalculo";

export interface SlideStat {
  label: string;
  value: string;
}

export interface Slide {
  variant: "cover" | "toc" | "content" | "finance" | "closing";
  chapterIndex: number; // 0 = capa/sumário/fechamento, 1-10 = capítulo oficial
  chapterTitle: string;
  kicker?: string;
  title: string;
  paragraphs?: string[];
  stats?: SlideStat[];
  frentes?: Frente[];
}

const CAPITULOS = [
  "Análise de Oportunidade",
  "Conceito",
  "Mercado e Competidores",
  "Equipe de Gestão",
  "Produtos e Serviços",
  "Estrutura e Operações",
  "Marketing e Vendas",
  "Estratégia de Crescimento",
  "Finanças",
  "Sumário Executivo",
];

export const APRESENTACAO_SLIDES: Slide[] = [
  {
    variant: "cover",
    chapterIndex: 0,
    chapterTitle: "Capa",
    kicker: "Documento interno · Promise Education Group",
    title: "Plano de Negócio",
    paragraphs: [
      "Apresentação executiva do plano de negócio da Promise, um ecossistema educacional que integra quatro frentes complementares — Schools, Learners, Professionals e Global — sob uma mesma missão de excelência acadêmica e cosmovisão cristã.",
    ],
    frentes: ["schools", "learners", "professionals"],
  },
  {
    variant: "toc",
    chapterIndex: 0,
    chapterTitle: "Sumário",
    kicker: "Sumário",
    title: "Os 10 capítulos do plano",
  },

  // Capítulo 1 — Análise de Oportunidade
  {
    variant: "content",
    chapterIndex: 1,
    chapterTitle: CAPITULOS[0],
    kicker: "Capítulo 01 · Análise de Oportunidade",
    title: "Quem a Promise atende, e por que agora",
    paragraphs: [
      "A Promise atende três públicos com uma mesma proposta de fundo: escolas privadas — especialmente cristãs e clássicas — que precisam estruturar ou revisar seus programas de inglês; famílias e estudantes, incluindo o crescente público de homeschooling, em busca de uma trajetória de inglês com certificação internacional; e professores, coordenadores e gestores educacionais em busca de formação continuada e reconhecimento profissional.",
      "O momento é favorável: escolas cristãs continuam sendo abertas em todo o Brasil e a maioria não sabe estruturar um departamento de inglês; o homeschooling cresce e amadurece, criando demanda por validação acadêmica reconhecida; e o ensino de inglês migrou para o formato online, o que favorece diretamente o modelo da Promise.",
    ],
    frentes: ["schools", "learners", "professionals"],
  },
  {
    variant: "content",
    chapterIndex: 1,
    chapterTitle: CAPITULOS[0],
    kicker: "Capítulo 01 · Análise de Oportunidade",
    title: "Tamanho e crescimento do mercado",
    paragraphs: [
      "O mercado brasileiro de ensino de idiomas foi estimado em cerca de US$ 1,52 bilhão em 2025, com projeção de chegar a US$ 3,02 bilhões até 2034. A educação básica soma cerca de 46 milhões de matrículas, das quais 10 milhões na rede privada — a base endereçável de Schools e Learners. Já o mercado de educação internacional movimentou cerca de R$ 7 bilhões em 2025, crescendo 27,3% no ano, abrindo espaço direto para a Promise Global.",
      "O homeschooling ainda é um nicho menor e difícil de dimensionar — o MEC estima cerca de 17 mil famílias e 35 mil estudantes, número que já pode estar desatualizado diante do crescimento observado. A meta da Promise não é capturar uma grande fatia desse mercado total, mas construir uma participação pequena, especializada e sustentável.",
    ],
    stats: [
      { label: "Mercado de idiomas no Brasil (2025)", value: "US$ 1,52 bi" },
      { label: "Educação internacional no Brasil (2025)", value: "R$ 7 bi · +27,3%" },
    ],
  },
  {
    variant: "content",
    chapterIndex: 1,
    chapterTitle: CAPITULOS[0],
    kicker: "Capítulo 01 · Análise de Oportunidade",
    title: "Capital, margens e retorno esperado",
    paragraphs: [
      "O modelo prioriza serviços — consultoria, formação e aulas — o que exige menor investimento em ativos físicos. As estimativas iniciais de margem bruta variam por frente: 60–75% em Schools, 50–65% em Learners, 65–80% em Professionals e 25–45% em Global, que envolve custos de terceiros como transporte e hospedagem. A meta consolidada é uma margem bruta próxima de 60%.",
      "As estimativas de ponto de equilíbrio e retorno ainda variam entre as análises internas — de 6 a 18 meses para o breakeven e de 12 a 24 meses para a recuperação total do capital investido. Essa faixa será refinada no capítulo de Finanças conforme os primeiros resultados reais da operação.",
    ],
    stats: [
      { label: "Margem bruta · Schools", value: "60–75%" },
      { label: "Margem bruta · Learners", value: "50–65%" },
      { label: "Margem bruta · Professionals", value: "65–80%" },
      { label: "Margem bruta · Global", value: "25–45%" },
    ],
  },

  // Capítulo 2 — Conceito
  {
    variant: "content",
    chapterIndex: 2,
    chapterTitle: CAPITULOS[1],
    kicker: "Capítulo 02 · Conceito",
    title: "O que é a Promise",
    paragraphs: [
      "A Promise Education Group é uma empresa de educação voltada à formação integral e à internacionalização educacional. Atende escolas, famílias homeschoolers, estudantes, professores e gestores por meio de quatro frentes: estruturação de programas de inglês e internacionalização escolar, ensino de inglês e preparação para certificações Cambridge, formação e desenvolvimento profissional de educadores, e experiências educacionais internacionais.",
      "Seu objetivo é desenvolver pessoas e instituições com excelência, propósito e uma perspectiva cristã, ampliando oportunidades acadêmicas e a capacidade de atuar em um mundo globalizado.",
    ],
    frentes: ["schools", "learners", "professionals"],
  },
  {
    variant: "content",
    chapterIndex: 2,
    chapterTitle: CAPITULOS[1],
    kicker: "Capítulo 02 · Conceito",
    title: "Missão, visão e valores",
    paragraphs: [
      "Missão: expandir os horizontes de escolas, famílias homeschooling, educadores e estudantes por meio da internacionalização educacional de excelência, formando cidadãos preparados para impactar o mundo com competência, propósito e cosmovisão cristã.",
      "Visão: ser o principal ecossistema cristão de internacionalização educacional da América Latina, construído sobre os valores de excelência, propósito, cosmovisão cristã, desenvolvimento integral, autonomia e visão global. O diferencial estrutural é o Promise Excellence Framework™ — a metodologia própria que integra as quatro frentes em um único ecossistema.",
    ],
  },
  {
    variant: "content",
    chapterIndex: 2,
    chapterTitle: CAPITULOS[1],
    kicker: "Capítulo 02 · Conceito",
    title: "Estrutura legal e onde a Promise atua",
    paragraphs: [
      "Hoje a Promise está registrada como MEI — uma estrutura que já foi identificada como necessária de revisão à medida que o negócio ganha escala. A operação é totalmente online, sem sede física voltada ao atendimento de alunos, o que mantém a estrutura de custos enxuta e permite atender famílias e escolas em qualquer região do Brasil.",
      "Como o modelo ainda é novo, a Promise não possui um histórico extenso de métricas — a prioridade atual é consolidar as quatro frentes e construir esse histórico a partir dos próximos ciclos.",
    ],
  },

  // Capítulo 3 — Mercado e Competidores
  {
    variant: "content",
    chapterIndex: 3,
    chapterTitle: CAPITULOS[2],
    kicker: "Capítulo 03 · Mercado e Competidores",
    title: "Como o mercado está estruturado",
    paragraphs: [
      "O mercado se divide por tipo de oferta — cursos de inglês, certificações internacionais, consultoria educacional, formação docente, programas de High School americano e intercâmbios — e por perfil de cliente: escolas privadas (sobretudo cristãs e bilíngues), famílias e estudantes (incluindo homeschoolers) e professores, coordenadores e gestores. Geograficamente, a expectativa é encontrar uma parcela relevante de clientes no interior de estados brasileiros em crescimento.",
      "As tendências reforçam a oportunidade: o inglês migrou para o formato online, escolas cristãs continuam sendo abertas por todo o país sem saber estruturar seus departamentos de inglês, e o homeschooling cresce ao mesmo tempo em que precisa de mais estrutura e validação acadêmica.",
    ],
  },
  {
    variant: "content",
    chapterIndex: 3,
    chapterTitle: CAPITULOS[2],
    kicker: "Capítulo 03 · Mercado e Competidores",
    title: "Quem compra, e por quê",
    paragraphs: [
      "Na frente Schools, o comprador típico são escolas privadas cristãs ou clássicas de pequeno a grande porte, decidido por mantenedores, diretores e coordenadores pedagógicos, motivados por diferenciação institucional e excelência de programa. Na frente Learners, são famílias de classe média e média-alta — incluindo homeschoolers — que valorizam inglês, certificação Cambridge e uma trajetória acadêmica internacional para os filhos. Na frente Professionals, são professores, coordenadores e gestores investindo na própria carreira.",
      "O ciclo de compra também varia: escolas decidem anualmente, antes do início do ano letivo; famílias contratam de forma recorrente, por mensalidade ou ciclos semestrais; e professores compram formação de forma contínua, conforme a necessidade.",
    ],
    frentes: ["schools", "learners", "professionals"],
  },
  {
    variant: "content",
    chapterIndex: 3,
    chapterTitle: CAPITULOS[2],
    kicker: "Capítulo 03 · Mercado e Competidores",
    title: "A lacuna que a Promise preenche",
    paragraphs: [
      "A principal lacuna do mercado é a fragmentação: escolas, famílias e profissionais hoje encontram materiais, cursos, certificações, plataformas e intercâmbios separadamente, mas poucas soluções integram ensino de inglês, currículo, formação profissional, certificação, internacionalização e cosmovisão cristã em uma única trajetória coerente.",
      "Os principais fatores de decisão de compra confirmam essa leitura: confiança e credibilidade, qualidade e resultados comprovados, alinhamento de valores, indicação e reputação — com preço funcionando como um fator relevante, mas raramente o principal critério.",
    ],
  },
  {
    variant: "content",
    chapterIndex: 3,
    chapterTitle: CAPITULOS[2],
    kicker: "Capítulo 03 · Mercado e Competidores",
    title: "Concorrência: quem disputa cada frente",
    paragraphs: [
      "Na Schools, os concorrentes são consultorias educacionais e sistemas de ensino bilíngue, além de redes como Cultura Inglesa, CNA, Wizard, CCAA e Fisk disputando parte do orçamento escolar. Na Learners, escolas e plataformas de inglês, aulas particulares e empresas de intercâmbio. Na Professionals, centros de preparação para TKT, CELTA e DELTA — inclusive a própria Cambridge. Na Global, agências de intercâmbio e consultorias de educação internacional.",
      "Concorrentes maiores como CNA+, Cultura Inglesa e Wizard (Pearson) têm vantagem clara em escala, estrutura gerencial, marca e orçamento de marketing — a Cultura Inglesa, por exemplo, atua há mais de 90 anos combinando ensino, certificações e formação docente.",
    ],
  },
  {
    variant: "content",
    chapterIndex: 3,
    chapterTitle: CAPITULOS[2],
    kicker: "Capítulo 03 · Mercado e Competidores",
    title: "A vantagem competitiva da Promise",
    paragraphs: [
      "A Promise não compete por escala: compete por integração. Enquanto os concorrentes oferecem cursos, consultoria ou intercâmbios isoladamente, a Promise une estruturação escolar, formação profissional, ensino de inglês e internacionalização em um único ecossistema, sob uma cosmovisão cristã que a coloca em um nicho pouco disputado.",
      "A estratégia reconhece a menor escala inicial como uma vantagem de agilidade e proximidade — a Promise adapta currículos, materiais e formações com uma velocidade que estruturas maiores não conseguem replicar — enquanto constrói marca, parcerias e escala ao longo do tempo.",
    ],
  },

  // Capítulo 4 — Equipe de Gestão
  {
    variant: "content",
    chapterIndex: 4,
    chapterTitle: CAPITULOS[3],
    kicker: "Capítulo 04 · Equipe de Gestão",
    title: "Uma estrutura enxuta hoje",
    paragraphs: [
      "A Promise opera hoje com uma estrutura funcional enxuta: a direção executiva concentra a gestão estratégica, integrando as quatro frentes, com apoio de professores responsáveis pela entrega pedagógica e de parceiros especializados em marketing, administração e pedagogia.",
      "As áreas de negócio — administrativa, comercial, técnico-pedagógica e financeira — ainda são parcialmente centralizadas na liderança, com apoio pontual de profissionais e parceiros externos.",
    ],
  },
  {
    variant: "content",
    chapterIndex: 4,
    chapterTitle: CAPITULOS[3],
    kicker: "Capítulo 04 · Equipe de Gestão",
    title: "Para onde a equipe precisa crescer",
    paragraphs: [
      "O plano de expansão prevê separar a gestão pedagógica da administrativa: um coordenador dedicado a cada uma das frentes Schools, Learners e Professionals, responsável por montar e acompanhar a parte pedagógica, e um gerente administrativo cuidando do plano de negócio, financeiro e marketing da empresa.",
      "No curto prazo, a prioridade é consolidar os 4 professores já pré-contratados; coordenadores e gerentes entram conforme cada frente ganha escala.",
    ],
  },

  // Capítulo 5 — Produtos e Serviços
  {
    variant: "content",
    chapterIndex: 5,
    chapterTitle: CAPITULOS[4],
    kicker: "Capítulo 05 · Produtos e Serviços",
    title: "O portfólio, frente a frente",
    paragraphs: [
      "Schools reúne consultoria educacional, estruturação de programas de inglês, currículo, formação docente, avaliação e internacionalização escolar. Learners reúne cursos de inglês, preparação para certificações Cambridge, homeschooling, American School e experiências internacionais.",
      "Professionals reúne formação continuada, cursos, workshops, mentorias, preparação para certificações e desenvolvimento de líderes. Global reúne intercâmbios, viagens acadêmicas, imersões e projetos internacionais — todas integradas pelo Promise Excellence Framework™.",
    ],
    frentes: ["schools", "learners", "professionals"],
  },
  {
    variant: "content",
    chapterIndex: 5,
    chapterTitle: CAPITULOS[4],
    kicker: "Capítulo 05 · Produtos e Serviços",
    title: "O diferencial: American School",
    paragraphs: [
      "Para famílias homeschoolers, a Promise oferece uma trajetória de American School do Elementary ao High School — o estudante constrói uma formação acadêmica americana em paralelo à sua trajetória em casa e, ao concluir o High School, pode obter um diploma americano utilizável em processos de candidatura a universidades nos Estados Unidos, conforme os requisitos de cada instituição.",
      "É uma proposta que se diferencia do que o mercado brasileiro costuma oferecer, normalmente associando o High School americano a alunos já matriculados em escolas regulares.",
    ],
  },
  {
    variant: "content",
    chapterIndex: 5,
    chapterTitle: CAPITULOS[4],
    kicker: "Capítulo 05 · Produtos e Serviços",
    title: "Maturidade e próximos lançamentos",
    paragraphs: [
      "Os cursos de inglês são a frente mais madura, com operação consolidada há anos; a consultoria para escolas já opera e valida resultados há mais de um ano; a Global já tem experiência prática com projetos realizados.",
      "Homeschooling e American School estão em fase de lançamento, com meta de conclusão até setembro de 2026. Professionals está em fase de estruturação para lançamento, e a tecnologia/aplicativos educacionais seguem em desenvolvimento conceitual — um caminho natural de expansão futura da propriedade intelectual da Promise.",
    ],
  },

  // Capítulo 6 — Estrutura e Operações
  {
    variant: "content",
    chapterIndex: 6,
    chapterTitle: CAPITULOS[5],
    kicker: "Capítulo 06 · Estrutura e Operações",
    title: "Uma operação 100% online, por design",
    paragraphs: [
      "Como as aulas e formações são realizadas integralmente online, a Promise não depende de uma planta física para o atendimento: a estrutura necessária é essencialmente tecnológica — computadores, internet de alta qualidade, plataformas de videoconferência e ferramentas de comunicação e produção de conteúdo.",
      "Espaços físicos, quando necessários para reuniões ou eventos pontuais, podem ser compartilhados ou emprestados de parceiros. Esse modelo mantém os custos fixos baixos e amplia a capacidade de atender clientes em qualquer região do Brasil.",
    ],
  },
  {
    variant: "content",
    chapterIndex: 6,
    chapterTitle: CAPITULOS[5],
    kicker: "Capítulo 06 · Estrutura e Operações",
    title: "Parceiros, fornecedores e propriedade intelectual",
    paragraphs: [
      "Kairos e Arkos atuam como parceiros e distribuidores de livros da Promise — a Arkos também é responsável pelo desenvolvimento do site institucional. Cambridge, AEI e Education são fornecedores-chave, especialmente para certificações e materiais.",
      "A Promise já detém direitos sobre sua marca, currículos e materiais autorais, incluindo o Promise Excellence Framework™ — ativos que pretende ampliar continuamente com novos conteúdos e, no futuro, soluções digitais próprias.",
    ],
  },
  {
    variant: "content",
    chapterIndex: 6,
    chapterTitle: CAPITULOS[5],
    kicker: "Capítulo 06 · Estrutura e Operações",
    title: "Da prospecção ao pós-venda",
    paragraphs: [
      "A jornada começa com a atração do cliente por redes sociais, site, indicações, eventos ou prospecção direta, seguida por diagnóstico, proposta comercial, contratação e onboarding. A entrega acontece integralmente online — aulas para Learners, consultoria para Schools, mentorias para Professionals e programas internacionais para Global.",
      "Depois da entrega, a Promise mantém acompanhamento contínuo, buscando retenção, renovação e evolução do cliente dentro do ecossistema — uma futura área de Customer Success já está prevista à medida que a operação cresce.",
    ],
  },

  // Capítulo 7 — Marketing e Vendas
  {
    variant: "content",
    chapterIndex: 7,
    chapterTitle: CAPITULOS[6],
    kicker: "Capítulo 07 · Marketing e Vendas",
    title: "Como a Promise quer ser vista",
    paragraphs: [
      "A Promise busca ser percebida como uma empresa educacional de alta qualidade, confiável, inovadora e com propósito — não uma provedora isolada de cursos, consultoria ou intercâmbios, mas um ecossistema educacional integrado apoiado pelo Promise Excellence Framework™, experiência prática e soluções personalizadas para cada escola, família e profissional.",
    ],
  },
  {
    variant: "content",
    chapterIndex: 7,
    chapterTitle: CAPITULOS[6],
    kicker: "Capítulo 07 · Marketing e Vendas",
    title: "Como a Promise vende",
    paragraphs: [
      "O modelo comercial é híbrido: para escolas e instituições, venda consultiva, prospecção direta, reuniões e indicações, com ciclos mais longos; para famílias e profissionais, vendas digitais, redes sociais, WhatsApp, eventos e indicações, com ciclos mais curtos.",
      "A estrutura comercial ainda é enxuta e centralizada, com investimento em marketing crescendo conforme a geração de receita. Kairos e Arkos são os principais parceiros estratégicos de vendas.",
    ],
  },
  {
    variant: "content",
    chapterIndex: 7,
    chapterTitle: CAPITULOS[6],
    kicker: "Capítulo 07 · Marketing e Vendas",
    title: "Onde e como os clientes chegam até a Promise",
    paragraphs: [
      "Site, Instagram, WhatsApp e conteúdo de autoridade funcionam como canais transversais de atração; prospecção direta, indicações, eventos e feiras educacionais pesam mais para escolas, enquanto redes sociais e comunidades de homeschooling pesam mais para famílias e alunos.",
      "A meta inicial de participação de mercado é deliberadamente pequena e especializada: a Promise prioriza qualidade, recorrência e relacionamento em vez de volume, com aceleração de vendas esperada a partir do lançamento de Homeschooling e American School em 2026.",
    ],
  },

  // Capítulo 8 — Estratégia de Crescimento
  {
    variant: "content",
    chapterIndex: 8,
    chapterTitle: CAPITULOS[7],
    kicker: "Capítulo 08 · Estratégia de Crescimento",
    title: "Por que a Promise existe",
    paragraphs: [
      "A Promise existe para desenvolver pessoas e instituições por meio da educação, conectando excelência acadêmica, formação integral, cosmovisão cristã e oportunidades globais nas suas quatro frentes. No futuro, pretende se consolidar como um ecossistema educacional cristão de referência no Brasil e internacionalmente.",
    ],
  },
  {
    variant: "content",
    chapterIndex: 8,
    chapterTitle: CAPITULOS[7],
    kicker: "Capítulo 08 · Estratégia de Crescimento",
    title: "Forças e oportunidades",
    paragraphs: [
      "As principais forças da Promise são o ecossistema integrado das quatro frentes, a metodologia própria (Promise Excellence Framework™), o know-how em ensino de inglês, currículo, formação docente e certificação Cambridge, o portfólio diversificado B2B/B2C e o relacionamento próximo com os clientes.",
      "As oportunidades vêm do crescimento da demanda por inglês e certificações internacionais, da expansão da internacionalização escolar, do crescimento do homeschooling, da carência de formação prática para professores e do potencial de produtos digitais escaláveis.",
    ],
  },
  {
    variant: "content",
    chapterIndex: 8,
    chapterTitle: CAPITULOS[7],
    kicker: "Capítulo 08 · Estratégia de Crescimento",
    title: "Fraquezas e riscos, com plano de mitigação",
    paragraphs: [
      "A estrutura gerencial ainda enxuta, a marca em consolidação e a dependência do fundador são as principais fraquezas reconhecidas — endereçadas por contratação de líderes por frente, produção de conteúdo e documentação de processos e metodologia.",
      "Entre os riscos: pressão de preço da concorrência (mitigada por diferenciação, não por preço), fluxo de caixa (mitigado priorizando receitas recorrentes e controlando custos fixos) e mudanças regulatórias no homeschooling, acompanhadas de perto junto a parceiros especializados.",
    ],
  },
  {
    variant: "content",
    chapterIndex: 8,
    chapterTitle: CAPITULOS[7],
    kicker: "Capítulo 08 · Estratégia de Crescimento",
    title: "O caminho até 2027",
    paragraphs: [
      "Até setembro de 2026: lançamento de Homeschooling e American School, site institucional finalizado e presença ativa nas redes sociais. Até dezembro de 2026: as quatro frentes consolidadas, com processos comerciais e operacionais definidos.",
      "Em 2027: expansão da carteira de escolas, alunos e profissionais, fortalecimento de parcerias e lançamento da Promise for Professionals. A meta de dois anos é atingir o ponto de equilíbrio e recuperar o investimento inicial; em cinco anos, consolidar a Promise como referência nacional em educação cristã, inglês e internacionalização.",
    ],
  },

  // Capítulo 9 — Finanças
  {
    variant: "content",
    chapterIndex: 9,
    chapterTitle: CAPITULOS[8],
    kicker: "Capítulo 09 · Finanças",
    title: "As premissas por trás dos números",
    paragraphs: [
      "O modelo financeiro parte de um crescimento gradual da base de clientes, de receita recorrente e do aumento da participação de serviços de maior margem: Schools como fonte de contratos de maior valor, Learners como base recorrente, Professionals como frente de expansão e Global como receita adicional por projeto.",
      "A meta de planejamento é uma margem bruta consolidada próxima de 60%, revisada periodicamente conforme os resultados reais de cada frente.",
    ],
  },
  {
    variant: "content",
    chapterIndex: 9,
    chapterTitle: CAPITULOS[8],
    kicker: "Capítulo 09 · Finanças",
    title: "Estrutura de custos",
    paragraphs: [
      "Os custos fixos concentram equipe e prestadores, tecnologia e plataformas, administração, marketing e manutenção do site. Os custos variáveis acompanham cada entrega: materiais didáticos, horas de professores e consultores, taxas de certificação e, na Global, custos de parceiros, transporte, hospedagem e logística de cada projeto.",
      "A estratégia declarada é manter a estrutura fixa enxuta e deixar os custos variáveis crescerem apenas junto com a receita, preservando margem.",
    ],
  },
  {
    variant: "finance",
    chapterIndex: 9,
    chapterTitle: CAPITULOS[8],
    kicker: "Capítulo 09 · Finanças",
    title: "Proposta orçamentária — 5 anos",
  },

  // Capítulo 10 — Sumário Executivo
  {
    variant: "content",
    chapterIndex: 10,
    chapterTitle: CAPITULOS[9],
    kicker: "Capítulo 10 · Sumário Executivo",
    title: "Quem lidera a Promise",
    paragraphs: [
      "Calebe Braga é fundador e diretor da Promise Education Group, com mais de 14 anos de atuação em ensino de inglês, mais de 8 anos à frente de um Centro Preparatório Oficial de Cambridge, autor do currículo de inglês das coleções Paideia e Oikos, do sistema de ensino cristão Cidade Viva Education e da coleção To the Nations.",
      "Formação em Letras e certificação CELTA (Cambridge), com presença em 5 estados brasileiros. A empresa nasce dessa experiência prática combinada a uma proposta de educação cristã e formação integral.",
    ],
  },
  {
    variant: "closing",
    chapterIndex: 10,
    chapterTitle: CAPITULOS[9],
    kicker: "Capítulo 10 · Sumário Executivo",
    title: "O que torna a Promise diferente",
    paragraphs: [
      "A integração das quatro frentes, a metodologia própria Promise Excellence Framework™, a experiência prática em ensino de inglês e avaliação Cambridge, e uma proposta educacional fundamentada em cosmovisão cristã.",
      "A Promise não busca apenas desenvolver competências linguísticas e acadêmicas — busca integrar excelência, formação integral, propósito e fé, respeitando a identidade de cada escola e família, enquanto constrói ativos próprios que podem ser escalados ao longo do tempo.",
    ],
  },
];
