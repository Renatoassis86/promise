export interface PlanoPergunta {
  id: string;
  pergunta: string;
  acao?: string;
  explicacao?: string;
  exemplo?: string;
}

export interface PlanoSubsecao {
  titulo?: string;
  perguntas: PlanoPergunta[];
}

export interface PlanoSecao {
  id: string;
  titulo: string;
  intro?: string;
  subsecoes: PlanoSubsecao[];
}

export const PLANO_NEGOCIO_SECOES: PlanoSecao[] = [
  {
    id: "oportunidade",
    titulo: "Análise de Oportunidade",
    intro: "Perguntas rápidas, sem necessidade de detalhar demais nessa fase. Servem para checar se vale a pena seguir em frente com o plano.",
    subsecoes: [
      {
        perguntas: [
          {
            id: "oportunidade.publico-alvo",
            pergunta: "Qual é o público-alvo?",
            explicacao: "Detalhamento abrangente do público-alvo considerando obrigatoriamente as 3 frentes de negócio da Promise: 1) Schools (gestores e diretores de escolas confessionais/privadas K-12); 2) Learners (famílias, crianças, adolescentes e público de homeschooling); 3) Professionals (professores de inglês e educadores em busca de capacitação e certificação).",
            exemplo: "1) Schools: Mantenedores de escolas confessionais privadas (200 a 1.000 alunos); 2) Learners: Famílias de classe A/B e adeptos do homeschooling em busca de inglês com valores morais e selo Cambridge; 3) Professionals: Licenciados em Letras e docentes que buscam aprimoramento metodológico e certificação internacional."
          },
          {
            id: "oportunidade.ciclo-vida",
            pergunta: "Qual a durabilidade do produto/serviço no mercado (ciclo de vida)?",
            explicacao: "Informe a expectativa de tempo de retenção, renovação e recorrência dos clientes considerando as 3 óticas da Promise (contratos escolares de longo prazo, jornada do aluno por níveis e formação continuada do professor).",
            exemplo: "Schools: contratos de licenciamento de 3 a 5 anos renováveis; Learners: jornada contínua de 3 a 6 anos do nível básico ao avançado/certificação Cambridge; Professionals: programas de capacitação e mentoria anual recorrente."
          },
          {
            id: "oportunidade.acesso-clientes",
            pergunta: "Os clientes estão acessíveis? De que forma você consegue chegar até eles (canais utilizados)?",
            explicacao: "Mapeie os canais de atração e relacionamento para cada uma das 3 frentes: contato comercial B2B para Schools, marketing digital/redes/eventos para Learners, e parcerias/redes pedagógicas para Professionals.",
            exemplo: "Schools: prospecção direta, congressos educacionais confessionais (ACSI/ANACEU); Learners: tráfego pago no Instagram/YouTube, comunidades de homeschooling e indicações; Professionals: workshops online, grupos de educadores e LinkedIn."
          },
          {
            id: "oportunidade.potencial-crescimento",
            pergunta: "Existe potencial de crescimento desse mercado para os próximos anos? Ele é alto?",
            explicacao: "Apresente dados e tendências do setor analisando o potencial de expansão nas 3 frentes (exigência de bilinguismo nas escolas, busca por inglês confissional por famílias e demanda por docentes qualificados).",
            exemplo: "Alto potencial impulsionado por: obrigatoriedade de bilinguismo nas escolas confessionais (Schools), crescimento de 20%+ a.a. do homeschooling e cursos livres (Learners) e escassez de professores de inglês com proficiência comprovada (Professionals)."
          },
          {
            id: "oportunidade.retorno-investimento",
            pergunta: "O investimento realizado pode ser recuperado no curto prazo (menos de 2 anos)?",
            explicacao: "Estimativa financeira de retorno sobre o investimento (ROI) avaliando a entrada de receitas das 3 frentes (licenciamento de escolas, mensalidades de alunos e cursos de professores).",
            exemplo: "Com o fechamento de 5 a 10 escolas parceiras (Schools) no Ano 1, somado às matrículas diretas (Learners) e turmas de capacitação (Professionals), a receita recorrente cobre o investimento inicial em 12 a 18 meses."
          },
          {
            id: "oportunidade.mercado-crescendo",
            pergunta: "O mercado está crescendo? É emergente (novo)? É fragmentado (muitos competidores)?",
            explicacao: "Caracterize o momento do mercado educacional bilíngue e de idiomas sob o prisma das 3 soluções da Promise (B2B escolar, B2C alunos e B2B2C formação docente).",
            exemplo: "Mercado em forte expansão e fragmentado: poucas soluções bilíngues com cosmovisão cristã para escolas, cursos tradicionais repetitivos para alunos e falta de programas práticos de mentoria para professores."
          },
          {
            id: "oportunidade.barreiras-entrada",
            pergunta: "Existem barreiras proprietárias de entrada no mercado? Você tem estratégias para superá-las?",
            explicacao: "Identifique os ativos, certificações e diferenciais exclusivos da Promise que protegem o negócio nas 3 frentes contra novos concorrentes.",
            exemplo: "Credenciamento oficial como Centro Preparatório Cambridge, acervo de materiais didáticos autorais com cosmovisão cristã e metodologia exclusiva de mentoria docente (Promise Excellence Framework)."
          },
          {
            id: "oportunidade.competidores-chave",
            pergunta: "Quantos competidores-chave estão no mercado? Eles controlam a propriedade intelectual ou os canais de venda?",
            explicacao: "Analise a concorrência direta e indireta que atua em cada uma das 3 frentes (sistemas bilíngues laicos para escolas, franquias de idiomas para alunos e cursos de extensão isolados para professores).",
            exemplo: "Schools: disputado por PES, Systemic e Edify (sem foco confissional); Learners: disputado por Wizard, CNA e plataformas digitais; Professionals: disputado por universidades e cursos isolados de metodologia."
          },
          {
            id: "oportunidade.tamanho-mercado",
            pergunta: "Qual é o tamanho do mercado em reais e o potencial de participação de mercado?",
            explicacao: "Estime o valor financeiro total movimentado pelo setor de educação bilíngue, materiais e cursos, definindo a meta de captura nas 3 frentes.",
            exemplo: "Mercado de educação bilíngue e cursos de inglês movimenta R$ 2,5 bilhões/ano no Brasil; a Promise almeja alcançar 1,5% desse mercado focando em escolas confessionais, famílias de virtudes e professores parceiros."
          },
          {
            id: "oportunidade.margem-lucro",
            pergunta: "Qual o potencial de lucro desse mercado (margens brutas praticadas)?",
            explicacao: "Estime o percentual de margem de lucro bruta para cada um dos 3 modelos de negócio da Promise.",
            exemplo: "Schools (licenciamento e consultoria): 65% a 75%; Learners (turmas diretas de inglês): 50% a 60%; Professionals (cursos e mentorias para professores): 60% a 70%."
          },
          {
            id: "oportunidade.capital-necessario",
            pergunta: "Qual a necessidade de capital e a expectativa para atingir o ponto de equilíbrio e o retorno de investimentos?",
            explicacao: "Indique o volume de capital inicial necessário para estruturar a produção pedagógica, plataformas e vendas para as 3 frentes até o breakeven.",
            exemplo: "Necessidade inicial de R$ 150.000 (impressão/matriz de materiais Schools, infraestrutura digital Learners/Professionals e marketing), com ponto de equilíbrio (breakeven) atingido no mês 14."
          },
        ],
      },
    ],
  },
  {
    id: "conceito",
    titulo: "Conceito",
    subsecoes: [
      {
        perguntas: [
          {
            id: "conceito.o-que-e",
            pergunta: "O que é ou será o seu negócio? Será ofertado para quem? Para que objetivo?",
            explicacao: "Apresente o conceito central da Promise integrando explicitamente suas 3 frentes de atuação: Schools (solução bilíngue para escolas), Learners (ensino de inglês para alunos) e Professionals (qualificação de professores).",
            exemplo: "A Promise English é um ecossistema educacional de língua inglesa com preparação Cambridge que oferece: 1) Programa bilíngue curricular para escolas K-12 (Schools); 2) Cursos e certificações para alunos e famílias (Learners); 3) Formação continuada e mentoria para professores (Professionals)."
          },
          {
            id: "conceito.visao-missao",
            pergunta: "Qual é a visão e a missão da Promise (valores e diferenciais)?",
            explicacao: "Defina a missão, visão e valores ético-pedagógicos que norteiam as entregas das 3 frentes do negócio.",
            exemplo: "Missão: Capacitar alunos, escolas e professores para o alcance da fluência global em inglês fundamentados em virtudes e excelência. Visão: Ser o principal ecossistema bilíngue confissional e de preparação internacional do Brasil."
          },
          {
            id: "conceito.o-que-vende",
            pergunta: "O que a empresa vende? Quais produtos e serviços, em cada frente?",
            explicacao: "Detalhamento explícito dos produtos e serviços vendidos em cada uma das 3 frentes da Promise.",
            exemplo: "Schools: licenciamento de programa bilíngue K-12, livros didáticos e treinamento de equipe; Learners: mensalidades de cursos de inglês por nível e simulados Cambridge; Professionals: cursos de extensão, workshops metodológicos e mentorias docentes."
          },
          {
            id: "conceito.para-quem-vende",
            pergunta: "Para quem sua empresa vende?",
            explicacao: "Mapeie os compradores tomadores de decisão e os usuários finais para Schools (diretores), Learners (pais/alunos) e Professionals (professores).",
            exemplo: "Schools: mantenedores e diretores de colégios confessionais e privados; Learners: pais de alunos da Educação Básica e estudantes em busca de proficiência; Professionals: professores de inglês da rede pública e privada."
          },
          {
            id: "conceito.historico",
            pergunta: "Apresente um breve histórico: principais realizações, crescimento, número de clientes/alunos atendidos, número de pessoas na equipe, diferenciais.",
            explicacao: "Resuma os marcos já alcançados pela Promise no atendimento a escolas, alunos e docentes.",
            exemplo: "Fundada para suprir a carência de programas bilíngues com cosmovisão cristã, a Promise tornou-se Centro Preparatório Cambridge, atendeu centenas de alunos (Learners), capacitou dezenas de educadores (Professionals) e firmou parcerias escolares (Schools)."
          },
          {
            id: "conceito.porque-sucesso",
            pergunta: "Por que você pode fazer essa empresa ser bem-sucedida? Qual é a oportunidade de negócio e quais serão os principais produtos e serviços?",
            explicacao: "Explique a sinergia entre as 3 frentes de negócio que garante a sustentabilidade e diferenciação da Promise.",
            exemplo: "Sucesso garantido pela integração: a frente Schools gera volume e reputação B2B, a frente Learners atende a demanda B2C direta, e a frente Professionals garante corpo docente qualificado para sustentar a qualidade pedagógica."
          },
          {
            id: "conceito.estrutura-legal",
            pergunta: "Qual a estrutura legal da empresa, composição societária, certificações, licenças ou outros requisitos legais para funcionar?",
            explicacao: "Indique o enquadramento jurídico da empresa, registro de marcas e selos institucionais aplicáveis às 3 frentes.",
            exemplo: "Sociedade Empresária Limitada (LTDA), registro de marca Promise English no INPI e credenciamento oficial como Cambridge English Preparation Centre para certificações das 3 frentes."
          },
          {
            id: "conceito.localizacao",
            pergunta: "Qual a localização da empresa? Há filiais?",
            explicacao: "Descreva a infraestrutura de atendimento físico (nas escolas parceiras) e digital (para alunos e professores em todo o Brasil).",
            exemplo: "Sede administrativa e centro pedagógico em [Cidade/Estado], operando em modelo híbrido: atendimento presencial nas escolas parceiras (Schools) e plataforma online para turmas de alunos (Learners) e professores (Professionals)."
          },
        ],
      },
    ],
  },
  {
    id: "mercado",
    titulo: "Mercado e Competidores",
    subsecoes: [
      {
        titulo: "Análise do setor",
        perguntas: [
          {
            id: "mercado.tendencias",
            pergunta: "Quais são as tendências nesse setor?",
            explicacao: "Identifique as principais tendências de mercado sob as 3 frentes da Promise (obrigatoriedade de inglês nas escolas, busca por inglês com valores pelas famílias e necessidade de certificação docente).",
            exemplo: "Schools: busca por programas bilíngues para retenção de matrículas; Learners: crescimento do homeschooling e busca por certificações internacionais; Professionals: exigência por capacitação prática alinhada a normas internacionais."
          },
          {
            id: "mercado.fatores-projecoes",
            pergunta: "Quais fatores estão influenciando as projeções de mercado?",
            explicacao: "Liste fatores normativos, tecnológicos e comportamentais que impulsionam as 3 frentes de negócio da Promise.",
            exemplo: "Diretrizes da BNCC para o inglês, demanda de famílias por ambientes educacionais seguros com valores éticos, e a valorização de credenciais Cambridge no mercado de trabalho para educadores."
          },
          {
            id: "mercado.porque-promissor",
            pergunta: "Por que o mercado se mostra promissor?",
            explicacao: "Fundamente a oportunidade de expansão da Promise considerando a demanda reprimida em escolas, alunos e professores.",
            exemplo: "Menos de 1% da população brasileira é fluente em inglês; escolas confessionais carecem de parceiros bilíngues alinhados à sua cosmovisão, e professores buscam metodologias atualizadas com retorno financeiro."
          },
          {
            id: "mercado.tamanho-numeros",
            pergunta: "Qual o tamanho do mercado em reais, número de clientes e competidores? Como será o mercado nos próximos anos?",
            explicacao: "Apresente estimativas numéricas de mercado para as 3 frentes (quantidade de escolas privadas, total de famílias e número de professores de idiomas).",
            exemplo: "Schools: 4.000+ escolas confessionais/privadas com potencial bilíngue; Learners: 50.000+ famílias de homeschooling e ensino suplementar; Professionals: 30.000+ professores de inglês no Brasil."
          },
          {
            id: "mercado.estruturado-segmentado",
            pergunta: "Como o mercado está estruturado e segmentado?",
            explicacao: "Divida a estrutura do mercado educacional conforme a oferta das 3 frentes da Promise.",
            exemplo: "Segmentado em: 1) Soluções B2B para escolas particulares (Schools); 2) B2C para alunos individuais e famílias (Learners); 3) Formação B2B2C/C2C para professores de inglês (Professionals)."
          },
          {
            id: "mercado.oportunidades-riscos",
            pergunta: "Quais são as oportunidades e riscos do mercado?",
            explicacao: "Mapeie oportunidades e riscos específicos para cada uma das 3 frentes de atuação.",
            exemplo: "Oportunidades: parceria com redes confessionais (Schools), expansão de turmas online (Learners) e mentorias (Professionals). Riscos: recessão econômica afetando mensalidades e alta rotatividade docente nas escolas."
          },
        ],
      },
      {
        titulo: "Mercado-Alvo",
        perguntas: [
          {
            id: "mercado.perfil-comprador",
            pergunta: "Qual o perfil do comprador (setor, porte, faturamento, tempo de existência)?",
            explicacao: "Defina o Perfil do Cliente Ideal (ICP) detalhado para cada uma das 3 frentes da Promise.",
            exemplo: "Schools: Escolas confessionais de 200 a 1.000 alunos; Learners: Pais de classe A/B e praticantes de homeschooling com filhos de 5 a 17 anos; Professionals: Licenciados em Letras e professores de inglês buscando evolução na carreira."
          },
          {
            id: "mercado.o-que-compra-hoje",
            pergunta: "O que ele está comprando atualmente?",
            explicacao: "Identifique as soluções atuais que seus clientes utilizam antes de conhecer a Promise nas 3 frentes.",
            exemplo: "Schools: compram apostilas importadas genéricas ou franquias bilíngues laicas; Learners: contratam cursos livres de idiomas tradicionais; Professionals: fazem cursos isolados de gramática sem foco pedagógico."
          },
          {
            id: "mercado.porque-compra",
            pergunta: "Por que ele está comprando?",
            explicacao: "Descreva a motivação real e a dor de cada comprador nas 3 frentes.",
            exemplo: "Schools: compram para se diferenciar da concorrência mantendo a identidade confissional; Learners: compram para obter fluência e certificação Cambridge; Professionals: compram para conquistar melhores salários e autoridade."
          },
          {
            id: "mercado.fatores-compra",
            pergunta: "Quais fatores influenciam a compra?",
            explicacao: "Quais critérios definem a escolha da Promise nas 3 frentes (selo Cambridge, valores, suporte e preço).",
            exemplo: "Selo de Centro Preparatório Cambridge, fundamentação em virtudes/cosmovisão, custo-benefício acessível e proximidade no acompanhamento pedagógico."
          },
          {
            id: "mercado.quando-como-compra",
            pergunta: "Quando, como e com que periodicidade é feita a compra?",
            explicacao: "Sazonalidade e ciclo de decisão de compra para Schools (anual), Learners (semestral/mensal) e Professionals (contínuo).",
            exemplo: "Schools: fechamento de contratos de agosto a novembro para o ano seguinte; Learners: matrículas em jan/fev e julho; Professionals: adesão contínua a workshops e turmas de mentoria."
          },
          {
            id: "mercado.onde-encontrar",
            pergunta: "Onde ele se encontra? Como chegar até ele?",
            explicacao: "Mapeie os canais onde os clientes das 3 frentes se encontram e consomem informação.",
            exemplo: "Schools: congressos de educação cristã (ACSI/ANACEU) e encontros de mantenedores; Learners: redes sociais, eventos de homeschooling e igrejas; Professionals: LinkedIn, grupos de professores e eventos pedagógicos."
          },
          {
            id: "mercado.necessidades-nao-atendidas",
            pergunta: "Quais necessidades dos clientes em potencial ainda não são satisfatoriamente atendidas?",
            explicacao: "Aponte as falhas dos concorrentes que a Promise corrige nas 3 frentes.",
            exemplo: "Falta de programas bilíngues com virtudes morais para escolas, ausência de acompanhamento próximo para alunos e escassez de mentorias práticas para professores."
          },
        ],
      },
      {
        titulo: "Análise de concorrência",
        perguntas: [
          {
            id: "concorrencia.quem-sao",
            pergunta: "Quem são seus concorrentes?",
            explicacao: "Liste os concorrentes diretos e indiretos para as 3 frentes da Promise.",
            exemplo: "Schools: PES, Systemic, Edify; Learners: Wizard, CNA, cursos online; Professionals: cursos de extensão universitários e consultores independentes."
          },
          {
            id: "concorrencia.comparacao",
            pergunta: "De que maneira seu produto ou serviço pode ser comparado ao dos concorrentes?",
            explicacao: "Compare as entregas da Promise com os concorrentes nas 3 frentes de atuação.",
            exemplo: "A Promise destaca-se por entregar um ecossistema integrado: material escolar autoral com virtudes (Schools), preparação Cambridge com suporte próximo (Learners) e mentoria docente contínua (Professionals)."
          },
          {
            id: "concorrencia.organizacao",
            pergunta: "De que maneira ele está organizado?",
            explicacao: "Como os concorrentes das 3 frentes se organizam comercial e operacionalmente.",
            exemplo: "Sistemas bilíngues e franquias tradicionais possuem estruturas corporativas engessadas e atendimento impessoal para escolas, alunos e professores."
          },
          {
            id: "concorrencia.decisoes-rapidas",
            pergunta: "Ele pode tomar decisões mais rápidas que você?",
            explicacao: "Avalie a agilidade de decisão da Promise vs concorrência nas 3 frentes.",
            exemplo: "Por ser uma estrutura especialista e enxuta, a Promise adapta currículos escolares, conteúdos para alunos e módulos de professores com rapidez incomparável."
          },
          {
            id: "concorrencia.responde-mudancas",
            pergunta: "Ele responde rapidamente a mudanças?",
            explicacao: "Avalie a capacidade da concorrência de responder a novas demandas das 3 frentes.",
            exemplo: "Concorrentes tradicionais demoram anos para revisar materiais didáticos e ignoram as necessidades do público confissional e do homeschooling."
          },
          {
            id: "concorrencia.equipe-eficiente",
            pergunta: "Ele tem uma equipe gerencial eficiente?",
            explicacao: "Analise o nível gerencial e pedagógico da concorrência nas 3 frentes.",
            exemplo: "Concorrentes possuem equipes de vendas agressivas, porém com alta rotatividade de consultores pedagógicos de atendimento."
          },
          {
            id: "concorrencia.lider-seguidora",
            pergunta: "A concorrência é líder ou seguidora de mercado?",
            explicacao: "Classifique o mercado entre líderes gerais e a liderança da Promise em seu nicho nas 3 frentes.",
            exemplo: "Grandes editoras lideram escolas laicas; a Promise busca a liderança absoluta no nicho de escolas confessionais, alunos de ensino suplementar/homeschooling e professores especialistas."
          },
          {
            id: "concorrencia.futuros-concorrentes",
            pergunta: "Eles poderão vir a ser seus concorrentes no futuro (mesmo que não sejam hoje)?",
            explicacao: "Preveja potenciais novos concorrentes que possam tentar entrar nas 3 frentes da Promise.",
            exemplo: "Editoras confessionais lançando programas bilíngues ou redes de idiomas criando braços de treinamento para professores."
          },
          {
            id: "concorrencia.vantagens-competitivas",
            pergunta: "Quais são as vantagens competitivas da Promise e dos concorrentes?",
            explicacao: "Sintetize as vantagens competitivas imbatíveis da Promise nas 3 frentes.",
            exemplo: "Chancela Cambridge, proposta pedagógica autoral com cosmovisão cristã, modelo integrado de mentoria docente e custo-benefício altamente atrativo."
          },
          {
            id: "concorrencia.quadro-comparativo",
            pergunta: "Quadro comparativo entre concorrentes: material didático, site, redes sociais, consultoria, plataforma, preço, suporte, presença em eventos.",
            explicacao: "Quadro comparativo da Promise vs concorrentes cobrindo atributos das 3 frentes (material, valores, certificação, suporte, preço).",
            exemplo: "Promise vs Mercado: Material Autoral Confissional (Sim vs Não), Certificação Cambridge (Sim vs Variável), Mentoria Docente Ativa (Sim vs Não), Custo por Aluno (Acessível vs Alto)."
          },
        ],
      },
    ],
  },
  {
    id: "equipe",
    titulo: "Equipe de Gestão",
    subsecoes: [
      {
        perguntas: [
          {
            id: "equipe.organograma",
            pergunta: "Qual o organograma funcional que estrutura o modelo de negócio?",
            explicacao: "Apresente o organograma funcional da Promise cobrindo a gestão das 3 frentes (Schools, Learners e Professionals).",
            exemplo: "Direção Geral & Estratégia -> Gestão Pedagógica (Coordenadores de Inglês/Materiais) -> Consultoria Comercial (Schools/Learners) -> Suporte & TI (Plataforma/Professionals)."
          },
          {
            id: "equipe.principais-envolvidos",
            pergunta: "Quem são os principais envolvidos no negócio (administrativo, marketing/vendas, técnico/pedagógico, financeiro)?",
            explicacao: "Identifique as lideranças responsáveis pela condução estratégica e operacional das 3 frentes da Promise.",
            exemplo: "Calebe (Direção Geral e Expansão Comercial), Coordenação Pedagógica (Desenvolvimento de conteúdos Schools/Learners/Professionals) e Responsável por Atendimento e Plataforma."
          },
          {
            id: "equipe.principais-executivos",
            pergunta: "Quem são os principais executivos? De onde vêm? Qual a experiência prévia de cada um?",
            explicacao: "Resuma o histórico, formação e autoridade dos executivos à frente das 3 frentes da Promise.",
            exemplo: "Líderes com especialização em Letras/Inglês, vasta experiência em sala de aula, preparação para exames Cambridge e gestão de programas educacionais."
          },
          {
            id: "equipe.responsabilidades",
            pergunta: "Quais as responsabilidades de cada área?",
            explicacao: "Detalhe as atribuições diárias das equipes na gestão de escolas (Schools), turmas (Learners) e professores (Professionals).",
            exemplo: "Pedagógico: cria materiais para Schools/Learners e ministras treinamentos para Professionals; Comercial: prospecta escolas e capta alunos; Operações: distribui materiais e mantém a plataforma."
          },
          {
            id: "equipe.o-que-falta",
            pergunta: "O que (ou quem) está faltando?",
            explicacao: "Mapeie contratações necessárias para suportar a expansão das 3 frentes da Promise.",
            exemplo: "Contratação de um Consultor de Vendas B2B (foco Schools), um Gestor de Tráfego/Marketing (foco Learners) e um Tutor Pedagógico (foco Professionals)."
          },
          {
            id: "equipe.previsao-rh",
            pergunta: "Previsão de recursos humanos necessários, política de contratação, benefícios e custos de pessoal.",
            explicacao: "Projete o plano de cargos, remuneração e incentivos para a equipe que atende as 3 frentes.",
            exemplo: "Adição de 2 consultores de campo no Ano 2; política de bonificação vinculada à retenção de escolas parceiras (Schools) e satisfação de alunos (Learners)."
          },
        ],
      },
    ],
  },
  {
    id: "produtos",
    titulo: "Produtos e Serviços",
    subsecoes: [
      {
        titulo: "Benefícios e diferenciais",
        perguntas: [
          {
            id: "produtos.beneficios",
            pergunta: "Quais os benefícios proporcionados por seus produtos/serviços e o que os tornam especiais?",
            explicacao: "Liste até 4 benefícios chave transformadores gerados para os clientes das 3 frentes da Promise.",
            exemplo: "1) Certificação internacional Cambridge; 2) Ensino fundamentado em virtudes e cosmovisão; 3) Formação continuada e mentoria para professores; 4) Solução bilíngue completa de custo acessível."
          },
          {
            id: "produtos.utilidade-apelo",
            pergunta: "Qual a finalidade dos produtos/serviços? Para que servem? Qual apelo procuram atender?",
            explicacao: "Descreva a utilidade e o apelo do produto para os compradores das 3 frentes (escola, aluno/família e professor).",
            exemplo: "Escolas: captação e retenção de alunos bilíngues; Famílias: fluência real com formação moral do filho; Professores: evolução profissional e reconhecimento na carreira."
          },
          {
            id: "produtos.tecnologia-pd",
            pergunta: "Há inovação tecnológica? Você domina a tecnologia? Há alguma propriedade intelectual?",
            explicacao: "Destaque as metodologias autorais, materiais didáticos e tecnologias aplicados nas 3 frentes.",
            exemplo: "Metodologia autoral de ensino integrado de línguas e conteúdos (CLIL) alinhada a virtudes, acervo de livros registrados e plataforma digital para alunos e docentes."
          },
          {
            id: "produtos.ciclo-vida",
            pergunta: "Em que estágio do ciclo de vida encontra-se cada produto/serviço?",
            explicacao: "Classifique o estágio de maturidade dos produtos e serviços em cada uma das 3 frentes.",
            exemplo: "Promise Schools: em expansão ativa; Promise Learners: maduro e validado; Promise Professionals: em fase de escalonamento."
          },
          {
            id: "produtos.especial",
            pergunta: "O que tem de especial nos produtos/serviços da Promise?",
            explicacao: "Síntese marcante do grande diferencial único que une as 3 frentes da Promise.",
            exemplo: "Conectar o mais respeitado padrão de proficiência internacional (Cambridge) a um ecossistema educacional humanizado com valores ético-cristãos para escolas, alunos e educadores."
          },
        ],
      },
      {
        titulo: "Portfólio",
        perguntas: [
          {
            id: "produtos.portfolio",
            pergunta: "Qual o seu portfólio de produtos?",
            explicacao: "Apresente o catálogo completo de produtos e serviços organizado estruturadamente pelas 3 frentes da Promise.",
            exemplo: "1) Schools: Programa Bilíngue K-12, livros didáticos e capacitação docente; 2) Learners: Cursos de inglês por nível e simulados Cambridge; 3) Professionals: Workshops, mentorias e certificações docentes."
          },
          {
            id: "produtos.plano-desenvolvimento",
            pergunta: "Plano de desenvolvimento dos produtos: ações e prazos críticos para desenvolver e lançar cada produto.",
            explicacao: "Plano e calendário de atualização e lançamento de novos produtos para as 3 frentes.",
            exemplo: "Atualização anual dos livros escolares no 3º trimestre, lançamento de novos módulos de curso para Learners no 1º trimestre e novos workshops para Professionals a cada semestre."
          },
          {
            id: "produtos.plano-testes",
            pergunta: "Plano de testes, análise de viabilidade, composição de custos, lançamento e avaliação dos produtos.",
            explicacao: "Como a Promise testa e valida novos materiais didáticos e metodologias antes do lançamento nas 3 frentes.",
            exemplo: "Aplicação de projetos-piloto em turmas parceiras selecionadas, coletando métricas de aprendizagem dos alunos e avaliação dos professores para ajustes metodológicos."
          },
          {
            id: "produtos.acompanhamento-gestao",
            pergunta: "Plano de acompanhamento e gestão dos produtos (métricas/indicadores).",
            explicacao: "Indicadores chave de desempenho (KPIs) pedagógico e de satisfação nas 3 frentes.",
            exemplo: "Aprovação exames Cambridge (>90%), NPS de gestores escolares (Schools >85), retenção de alunos (Learners >80%) e engajamento de docentes (Professionals)."
          },
          {
            id: "produtos.categorias",
            pergunta: "Divisão dos produtos em categorias (prazo de venda, tipo de aplicação, modelo comercial, prazo de retorno).",
            explicacao: "Classifique os produtos conforme o modelo econômico de precificação e recorrência nas 3 frentes.",
            exemplo: "Schools: Anuidade/Licenciamento recorrente por aluno; Learners: Mensalidades recorrentes de cursos; Professionals: Venda avulsa de cursos e mensalidade de mentoria."
          },
        ],
      },
    ],
  },
  {
    id: "estrutura-operacoes",
    titulo: "Estrutura e Operações",
    intro: "Continuação de Produtos/Serviços e Equipe de Gestão. Priorize objetividade.",
    subsecoes: [
      {
        perguntas: [
          {
            id: "operacoes.pd",
            pergunta: "Pesquisa e Desenvolvimento: há área, política e plano de investimento nesse setor?",
            explicacao: "Descreva a política de investimentos em P&D para aprimoramento dos materiais e serviços das 3 frentes da Promise.",
            exemplo: "Reinvestimento contínuo de 5% do faturamento da empresa em inovação pedagógica, revisão de materiais autorais e atualização das diretrizes de certificação Cambridge."
          },
          {
            id: "operacoes.aliancas",
            pergunta: "Alianças estratégicas: quais parceiros são chave para o negócio prosperar?",
            explicacao: "Mapeie os parceiros estratégicos essenciais para o funcionamento das 3 frentes da Promise.",
            exemplo: "Cambridge Assessment English, associações de escolas confessionais (ACSI/ANACEU), gráficas de livros didáticos e parceiros de tecnologia educacional."
          },
          {
            id: "operacoes.tecnologia",
            pergunta: "Tecnologia: você detém o conhecimento tecnológico? Ou sabe como obtê-lo?",
            explicacao: "Confirmação do domínio metodológico, pedagógico e tecnológico aplicados nas 3 frentes da Promise.",
            exemplo: "Total domínio autoral das coleções de livros didáticos, matrizes curriculares alinhadas à BNCC/Cambridge e infraestrutura em nuvem para distribuição de conteúdos."
          },
          {
            id: "operacoes.criterios-selecao",
            pergunta: "Critérios de seleção de produtos: como é a política de investimento em novos produtos?",
            explicacao: "Critérios para criação, seleção ou alteração de produtos e serviços para as 3 frentes.",
            exemplo: "Demanda real das escolas e famílias parceiras, viabilidade financeira de produção gráfica/digital e alinhamento estrito com os exames oficiais Cambridge."
          },
          {
            id: "operacoes.producao-distribuicao",
            pergunta: "Produção e distribuição: há estrutura de produção? Quem distribui o material/serviço?",
            explicacao: "Logística de impressão gráfica e distribuição digital dos materiais das 3 frentes da Promise.",
            exemplo: "Livros impressos sob demanda via gráfica homologada e entregues diretamente nas escolas (Schools); materiais digitais e plataformas disponibilizados via web (Learners/Professionals)."
          },
          {
            id: "operacoes.pos-venda",
            pergunta: "Serviços pós-venda: há estrutura dedicada a isso?",
            explicacao: "Estrutura dedicada ao suporte continuado dos clientes das 3 frentes (escolas, pais/alunos e professores).",
            exemplo: "Equipe dedicada de Sucesso do Cliente (CS) com encontros mensais de acompanhamento com escolas (Schools), suporte a alunos (Learners) e canal direto com professores (Professionals)."
          },
          {
            id: "operacoes.propriedade-intelectual",
            pergunta: "Propriedade intelectual (marca e materiais): você detém o direito de uso? Há diferencial competitivo e inovação?",
            explicacao: "Proteção de marcas, currículos e materiais didáticos das 3 frentes da Promise.",
            exemplo: "Marca Promise English registrada no INPI e direitos autorais resguardados sobre todo o acervo de livros pedagógicos e materiais de treinamento."
          },
          {
            id: "operacoes.regulamentacoes",
            pergunta: "Regulamentações e certificações: há questões legais críticas para o negócio funcionar? A Promise atende a essas demandas?",
            explicacao: "Conformidade com a legislação educacional (BNCC, MEC), normas de LGPD e requisitos Cambridge nas 3 frentes.",
            exemplo: "Total adequação do currículo à BNCC, proteção de dados de alunos/pais conforme a LGPD e observância rigorosa das regras institucionais da Cambridge."
          },
          {
            id: "operacoes.maquinas-equipamentos",
            pergunta: "Existem máquinas e equipamentos necessários?",
            explicacao: "Equipamentos de TI, escritório e estúdio necessários para a operação das 3 frentes.",
            exemplo: "Computadores de alta performance para a equipe pedagógica/TI e estúdio audiovisual estruturado para gravação de videoaulas e treinamentos online."
          },
          {
            id: "operacoes.processo-negocio",
            pergunta: "Como é dado o processo do negócio, do primeiro contato até a entrega do serviço?",
            explicacao: "Jornada operacional completa da Promise do primeiro contato à renovação nas 3 frentes.",
            exemplo: "Schools: Apresentação -> Contrato -> Treinamento -> Entrega de Livros -> Aulas/Suporte -> Simulado Cambridge -> Renovação; Learners/Professionals: Captação -> Matrícula -> Aulas -> Certificação."
          },
          {
            id: "operacoes.politica-rh",
            pergunta: "Qual a política de recursos humanos (salários, benefícios, promoções, plano de carreira)?",
            explicacao: "Política de contratação, formação interna e retenção de talentos envolvidos nas 3 frentes.",
            exemplo: "Contratação de especialistas alinhados aos valores e visão da empresa, oferecendo remuneração competitiva, bônus por resultados e financiamento de certificações."
          },
          {
            id: "operacoes.fornecedores",
            pergunta: "Quais são os fornecedores (serviços, materiais etc.)?",
            explicacao: "Mapeie os fornecedores de insumos gráficos, tecnológicos e de serviços para as 3 frentes.",
            exemplo: "Gráficas editoriais, provedores de infraestrutura em nuvem (Vercel/Supabase), órgãos aplicadores de exames Cambridge e assessoria jurídica/contábil."
          },
          {
            id: "operacoes.infraestrutura",
            pergunta: "Infraestrutura e planta (layout físico, se houver).",
            explicacao: "Infraestrutura física e logística para atendimento de reuniões, estúdio e reuniões das 3 frentes.",
            exemplo: "Sede administrativa com estúdio de gravação audiovisual e salas de reunião, operando em formato híbrido para otimização de custos operacionais."
          },
          {
            id: "operacoes.infraestrutura-tech",
            pergunta: "Infraestrutura tecnológica (site, plataforma, ferramentas internas).",
            explicacao: "Sistemas e softwares que sustentam o funcionamento das 3 frentes da Promise.",
            exemplo: "Plataforma web em Next.js com banco Supabase, CRM de gestão de vendas escolares, ambiente virtual de aprendizagem para alunos e portal docente."
          },
        ],
      },
    ],
  },
  {
    id: "marketing-vendas",
    titulo: "Marketing e Vendas",
    intro: "Estruturado nos 4Ps: posicionamento, preço, praça e promoção.",
    subsecoes: [
      {
        titulo: "Posicionamento",
        perguntas: [
          {
            id: "marketing.posicionamento",
            pergunta: "Como você quer que seus produtos/serviços sejam vistos e percebidos pelos clientes? Como vai se diferenciar da concorrência?",
            explicacao: "Defina a percepção de marca que a Promise deve construir na mente dos clientes das 3 frentes (Schools, Learners e Professionals).",
            exemplo: "Ser percebida como a solução bilíngue definitiva que conecta excelência internacional (Cambridge) a valores ético-cristãos para escolas (Schools), alunos (Learners) e professores (Professionals)."
          },
        ],
      },
      {
        titulo: "Preço",
        perguntas: [
          {
            id: "marketing.preco",
            pergunta: "Qual a política de preços que a Promise vai praticar?",
            explicacao: "Estratégia de precificação e condições de pagamento detalhadas para cada uma das 3 frentes da Promise.",
            exemplo: "Schools: taxa de licenciamento e material didático de R$ 350 a R$ 600 por aluno/ano (parcelados no carnê/cartão da escola); Learners: mensalidades de R$ 250 a R$ 400; Professionals: cursos e workshops de R$ 200 a R$ 800."
          },
        ],
      },
      {
        titulo: "Praça",
        perguntas: [
          {
            id: "marketing.praca",
            pergunta: "Como seus produtos/serviços chegam até os clientes?",
            explicacao: "Canais físicos e digitais de distribuição e entrega dos serviços nas 3 frentes da Promise.",
            exemplo: "Presencial nas salas de aula das escolas parceiras (Schools); 100% online ao vivo com suporte de plataforma interativa para turmas de Learners e turmas de Professionals."
          },
        ],
      },
      {
        titulo: "Propaganda / comunicação",
        perguntas: [
          {
            id: "marketing.propaganda",
            pergunta: "Como seus clientes ficam sabendo dos seus produtos/serviços?",
            explicacao: "Estratégias de promoção e atração de clientes para cada uma das 3 frentes da Promise.",
            exemplo: "Schools: participação em congressos de educação cristã e prospecção direta; Learners: anúncios no Instagram/YouTube e indicações; Professionals: LinkedIn, eventos pedagógicos e workshops gratuitos."
          },
        ],
      },
      {
        titulo: "Modelo de negócio",
        perguntas: [
          {
            id: "marketing.modelo-venda",
            pergunta: "Qual o modelo de venda será adotado? Quanto pretende investir em marketing e vendas?",
            explicacao: "Modelo de comercialização e alocação de investimentos comerciais nas 3 frentes da Promise.",
            exemplo: "Vendas consultivas B2B diretas para gestores escolares (Schools); campanhas digitais de inbound marketing B2C para alunos (Learners) e educadores (Professionals)."
          },
          {
            id: "marketing.distribuidores",
            pergunta: "Terá distribuidores?",
            explicacao: "Se haverá representantes comerciais ou distribuidores regionais para expansão das 3 frentes.",
            exemplo: "Atuação com representantes comerciais educacionais credenciados em estados estratégicos para expandir a presença da Promise em novas redes de escolas."
          },
          {
            id: "marketing.licenciamento",
            pergunta: "Precisará de algum licenciamento?",
            explicacao: "Regras de licenciamento do uso do selo e materiais didáticos da Promise.",
            exemplo: "Concessão do selo 'Escola Parceira Promise English' e licença de uso do material didático autoral para escolas conveniadas."
          },
          {
            id: "marketing.forcas-vendas",
            pergunta: "Quais forças de vendas a Promise terá?",
            explicacao: "Estrutura e capacitação da equipe comercial dedicada ao fechamento de contratos nas 3 frentes.",
            exemplo: "Consultores comerciais internos especializados em gestão escolar e atendimento a famílias, treinados para apresentar o retorno pedagógico e financeiro das soluções."
          },
          {
            id: "marketing.parceiros-vendas",
            pergunta: "Quais serão os parceiros estratégicos para a realização das vendas?",
            explicacao: "Parceiros institucionais e influenciadores que recomendam as 3 frentes da Promise.",
            exemplo: "Associações estaduais e nacionais de escolas confessionais (ACSI/ANACEU), redes de liderança em homeschooling e consultorias pedagógicas parceiras."
          },
        ],
      },
      {
        titulo: "Projeção de vendas",
        perguntas: [
          {
            id: "marketing.quanto-vender",
            pergunta: "Quanto sua empresa vai vender e quando?",
            explicacao: "Projeção de volume de vendas e faturamento detalhado por horizonte de tempo nas 3 frentes.",
            exemplo: "Ano 1: 5 escolas (1.000 alunos Schools) + 150 alunos diretos (Learners) + 50 professores (Professionals); Ano 2: 15 escolas (3.500 alunos) + 400 Learners + 150 Professionals."
          },
          {
            id: "marketing.participacao-mercado",
            pergunta: "Quanto de participação de mercado sua empresa vai conseguir e quando?",
            explicacao: "Meta de participação de mercado (market share) estimada para o segmento alvo nas 3 frentes.",
            exemplo: "Conquistar 5% de participação no segmento de escolas confessionais privadas do estado no horizonte de 3 a 5 anos."
          },
        ],
      },
    ],
  },
  {
    id: "crescimento",
    titulo: "Estratégia de Crescimento",
    subsecoes: [
      {
        perguntas: [
          {
            id: "crescimento.razao-de-ser",
            pergunta: "O que faz a Promise? Qual a razão de ser desse negócio? O que será esse negócio no futuro?",
            explicacao: "Propósito existencial e visão de futuro de longo prazo integrando as 3 frentes da Promise.",
            exemplo: "A Promise existe para formar cidadãos com fluência global e fundamentação ética. No futuro, será a maior rede de soluções bilíngues e certificação para escolas confessionais, alunos e professores da América Latina."
          },
          {
            id: "crescimento.forcas",
            pergunta: "Quais as forças do seu negócio?",
            explicacao: "Pontos fortes internos do modelo de negócio nas 3 frentes (Matriz SWOT - Forças).",
            exemplo: "Selo de preparação Cambridge, metodologia autoral alinhada a virtudes, forte conexão com gestores escolares e custos operacionais enxutos."
          },
          {
            id: "crescimento.fraquezas",
            pergunta: "Quais as fraquezas do seu negócio? Como podem ser superadas?",
            explicacao: "Pontos fracos internos que precisam de aprimoramento nas 3 frentes (Matriz SWOT - Fraquezas).",
            exemplo: "Marca ainda em fase de consolidação nacional e equipe comercial pequena; superadas por parcerias estratégicas com associações e marketing digital."
          },
          {
            id: "crescimento.oportunidades",
            pergunta: "Quais as principais oportunidades existentes para o seu negócio?",
            explicacao: "Oportunidades externas de mercado a serem aproveitadas pelas 3 frentes (Matriz SWOT - Oportunidades).",
            exemplo: "Crescimento da demanda escolar por programas bilíngues, expansão do homeschooling e carência de programas práticos de mentoria para professores."
          },
          {
            id: "crescimento.riscos",
            pergunta: "Quais os principais riscos para sua empresa? Como pretende enfrentá-los?",
            explicacao: "Ameaças externas e planos de contingência para proteger as 3 frentes (Matriz SWOT - Ameaças).",
            exemplo: "Inadimplência escolar ou perda de matrículas em cenários de crise econômica; mitigada por contratos plurianuais com escolas e modelos acessíveis para alunos."
          },
          {
            id: "crescimento.objetivos-metas",
            pergunta: "Quais os objetivos e metas do seu negócio?",
            explicacao: "Defina metas SMART (Específicas, Mensuráveis, Atingíveis, Relevantes e com Prazo) para as 3 frentes da Promise.",
            exemplo: "Atingir 50 escolas parceiras (Schools), 1.500 alunos diretos (Learners) e 500 professores capacitados (Professionals) até o final do 4º ano."
          },
          {
            id: "crescimento.estrategias-cronograma",
            pergunta: "Quais estratégias a Promise vai usar para cumprir seus objetivos? Apresente um cronograma com as principais atividades dos próximos meses/anos.",
            explicacao: "Cronograma e linha do tempo das principais estratégias de expansão das 3 frentes.",
            exemplo: "Meses 1-4: Refinamento de materiais e prospecção inicial; Meses 5-9: Apresentações e fechamento de contratos para o ano seguinte; Meses 10-12: Treinamentos e implantação."
          },
        ],
      },
    ],
  },
  {
    id: "financas",
    titulo: "Finanças",
    subsecoes: [
      {
        perguntas: [
          {
            id: "financas.premissas",
            pergunta: "Premissas: como a estratégia do negócio se traduz em números?",
            explicacao: "Premissas adotadas para projeções financeiras cobrindo custos e receitas das 3 frentes da Promise.",
            exemplo: "Reajuste anual de tabelas de 8%, retenção anual de 95% das escolas parceiras (Schools), taxa de conversão de 15% em anúncios (Learners) e CAC controlado."
          },
          {
            id: "financas.custos-despesas",
            pergunta: "Qual a composição de custos e despesas do negócio?",
            explicacao: "Estrutura detalhada de custos fixos e variáveis da operação que atende as 3 frentes.",
            exemplo: "Custos Fixos: equipe pedagógica/administrativa, software, escritório e assessoria contábil; Custos Variáveis: impressão de livros didáticos, comissões de vendas e taxas de exames Cambridge."
          },
          {
            id: "financas.investimentos-retornos",
            pergunta: "Quais investimentos são necessários e quais as possibilidades de retorno?",
            explicacao: "Aporte financeiro inicial necessário e sua alocação estratégica para alavancar as 3 frentes.",
            exemplo: "Investimento inicial de R$ 150.000 (40% em comercial/marketing, 35% em elaboração de materiais e plataforma digital, 25% em reserva de capital de giro)."
          },
          {
            id: "financas.previsao-receitas",
            pergunta: "Previsão de receitas para os próximos anos (horizonte médio de 5 anos).",
            explicacao: "Projeção de faturamento bruto anual acumulado das 3 frentes para os próximos 5 anos.",
            exemplo: "Ano 1: R$ 400.000 | Ano 2: R$ 1.200.000 | Ano 3: R$ 2.800.000 | Ano 4: R$ 5.200.000 | Ano 5: R$ 8.500.000."
          },
          {
            id: "financas.prazo-retorno",
            pergunta: "Qual o prazo para o retorno do investimento, com base no fluxo de caixa do negócio?",
            explicacao: "Tempo necessário para recuperação do capital inicial investido (Payback) com o fluxo de caixa das 3 frentes.",
            exemplo: "Payback estimado em 16 a 18 meses a partir do início oficial da comercialização dos programas bilíngues e cursos."
          },
          {
            id: "financas.metricas-retorno",
            pergunta: "Quais métricas e índices de retorno mostram a viabilidade financeira do negócio?",
            explicacao: "Indicadores econômicos que comprovam a viabilidade financeira do modelo de 3 frentes da Promise.",
            exemplo: "Ponto de equilíbrio (Breakeven) atingido com 4 escolas conveniadas (800 alunos); Margem líquida estimada de 25% a partir do 2º ano de operação."
          },
        ],
      },
    ],
  },
  {
    id: "sumario",
    titulo: "Sumário Executivo",
    intro: "Feito por último, já que resume o conteúdo das demais seções. É a primeira seção a ser lida no documento final.",
    subsecoes: [
      {
        perguntas: [
          {
            id: "sumario.quem-voce-e",
            pergunta: "Quem você é? O que é o negócio e seu modelo de negócio? Quem está envolvido? Por que você e sua equipe são especiais para esse negócio?",
            explicacao: "Apresentação executiva sintética da Promise destacando a atuação integrada nas suas 3 frentes.",
            exemplo: "A Promise English é um ecossistema educacional de língua inglesa liderado por educadores especialistas em exames Cambridge, oferecendo soluções para escolas (Schools), alunos (Learners) e professores (Professionals)."
          },
          {
            id: "sumario.estrategia-visao",
            pergunta: "Qual é sua estratégia/visão? Como pretende desenvolver a empresa e onde quer chegar?",
            explicacao: "Síntese da visão de futuro e estratégia de posicionamento das 3 frentes no mercado nacional.",
            exemplo: "Consolidar a Promise como a principal parceira bilíngue confissional do país, unindo rigor acadêmico internacional (Cambridge) a valores ético-cristãos em todas as frentes de atuação."
          },
          {
            id: "sumario.mercado",
            pergunta: "Qual é o seu mercado? Qual a oportunidade de negócio? Qual o mercado-alvo e por que se mostra promissor?",
            explicacao: "Resumo da oportunidade de mercado identificada no atendimento às demandas das 3 frentes.",
            exemplo: "Oportunidade em um mercado educacional em expansão, porém carente de parceiros que combinem bilinguismo de elite, virtudes morais e suporte docente de excelência."
          },
          {
            id: "sumario.investimento",
            pergunta: "Quanto de investimento você precisa e o que fará com ele? Quando será necessário?",
            explicacao: "Síntese do aporte financeiro necessário e a destinação estratégica para acelerar as 3 frentes.",
            exemplo: "Necessidade de R$ 150.000 para aceleração comercial e finalização de plataformas/materiais, com previsão de retorno integral do capital investido em menos de 2 anos."
          },
          {
            id: "sumario.vantagens-competitivas",
            pergunta: "Quais são suas vantagens competitivas? Quais os diferenciais da sua empresa?",
            explicacao: "Resumo dos 3 pilares de diferenciação imbatíveis que sustentam o sucesso da Promise perante a concorrência.",
            exemplo: "1) Credenciamento e preparação Cambridge; 2) Proposta pedagógica autoral com cosmovisão e virtudes; 3) Modelo integrado de alta rentabilidade atendendo escolas, alunos e educadores."
          },
        ],
      },
    ],
  },
];
