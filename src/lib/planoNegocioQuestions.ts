export interface PlanoPergunta {
  id: string;
  pergunta: string;
  acao?: string;
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
          { id: "oportunidade.publico-alvo", pergunta: "Qual é o público-alvo?", acao: "Descreva quem são os clientes (escolas, alunos/famílias, professores) e a localidade. Destaque planos de expansão geográfica, se houver." },
          { id: "oportunidade.ciclo-vida", pergunta: "Qual a durabilidade do produto/serviço no mercado (ciclo de vida)?", acao: "Quanto tempo um cliente costuma ficar com a Promise? Quanto tempo o negócio pretende ficar no mercado?" },
          { id: "oportunidade.acesso-clientes", pergunta: "Os clientes estão acessíveis? De que forma você consegue chegar até eles (canais utilizados)?", acao: "Descreva a relação com escolas, famílias homeschooling, igrejas ou outras redes. Números ajudam, se tiver." },
          { id: "oportunidade.potencial-crescimento", pergunta: "Existe potencial de crescimento desse mercado para os próximos anos? Ele é alto?", acao: "Algum dado concreto (reportagem, estatística, legislação)? Pense nas diferentes frentes: escolas, learners, professionals, global." },
          { id: "oportunidade.retorno-investimento", pergunta: "O investimento realizado pode ser recuperado no curto prazo (menos de 2 anos)?", acao: "Uma estimativa inicial já ajuda; a estrutura financeira detalha isso depois." },
          { id: "oportunidade.mercado-crescendo", pergunta: "O mercado está crescendo? É emergente (novo)? É fragmentado (muitos competidores)?", acao: "Dados de mercado de inglês, certificações internacionais, homeschooling ou educação cristã no Brasil, se tiver." },
          { id: "oportunidade.barreiras-entrada", pergunta: "Existem barreiras proprietárias de entrada no mercado? Você tem estratégias para superá-las?", acao: "Certificações, credenciamento, know-how, relacionamento institucional que dificultam a entrada de concorrentes." },
          { id: "oportunidade.competidores-chave", pergunta: "Quantos competidores-chave estão no mercado? Eles controlam a propriedade intelectual ou os canais de venda?", acao: "Quem hoje disputa o mesmo público (cursos de inglês, sistemas de certificação, consultorias de internacionalização)?" },
          { id: "oportunidade.tamanho-mercado", pergunta: "Qual é o tamanho do mercado em reais e o potencial de participação de mercado?", acao: "Algum dado concreto de mercado, mesmo que estimado." },
          { id: "oportunidade.margem-lucro", pergunta: "Qual o potencial de lucro desse mercado (margens brutas praticadas)?", acao: "Estimativa de margem em cada frente (Schools, Learners, Professionals, Global)." },
          { id: "oportunidade.capital-necessario", pergunta: "Qual a necessidade de capital e a expectativa para atingir o ponto de equilíbrio e o retorno de investimentos?", acao: "A parte financeira do plano vai detalhar isso; aqui vale uma primeira impressão." },
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
          { id: "conceito.o-que-e", pergunta: "O que é ou será o seu negócio? Será ofertado para quem? Para que objetivo?", acao: "Um parágrafo objetivo, apresentando as frentes da Promise (Schools, Learners, Professionals, Global)." },
          { id: "conceito.visao-missao", pergunta: "Qual é a visão e a missão da Promise (valores e diferenciais)?", acao: "O que guia as decisões da empresa e o que a torna diferente de um curso de inglês comum." },
          { id: "conceito.o-que-vende", pergunta: "O que a empresa vende? Quais produtos e serviços, em cada frente?", acao: "Descreva de forma objetiva o que é vendido/entregue em cada uma das frentes." },
          { id: "conceito.para-quem-vende", pergunta: "Para quem sua empresa vende?", acao: "Quem decide a compra em cada frente (escola, família, professor)? Existe um perfil ideal de cliente?" },
          { id: "conceito.historico", pergunta: "Apresente um breve histórico: principais realizações, crescimento, número de clientes/alunos atendidos, número de pessoas na equipe, diferenciais.", acao: "Um parágrafo com o histórico da Promise, resultados já alcançados e o que já foi construído até aqui." },
          { id: "conceito.porque-sucesso", pergunta: "Por que você pode fazer essa empresa ser bem-sucedida? Qual é a oportunidade de negócio e quais serão os principais produtos e serviços?", acao: "Explique rapidamente a estrutura da Promise (as 4 frentes) e por que ela tem condições de crescer." },
          { id: "conceito.estrutura-legal", pergunta: "Qual a estrutura legal da empresa, composição societária, certificações, licenças ou outros requisitos legais para funcionar?", acao: "Certificações que a Promise já possui (ex: Centro Preparatório Cambridge), e o que elas representam." },
          { id: "conceito.localizacao", pergunta: "Qual a localização da empresa? Há filiais?", acao: "Onde a Promise opera hoje, e se as atividades são remotas, presenciais ou híbridas." },
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
          { id: "mercado.tendencias", pergunta: "Quais são as tendências nesse setor?", acao: "Tendências em ensino de inglês, certificações internacionais, homeschooling, educação cristã." },
          { id: "mercado.fatores-projecoes", pergunta: "Quais fatores estão influenciando as projeções de mercado?", acao: "Regulação, comportamento do consumidor, tecnologia, demanda por internacionalização." },
          { id: "mercado.porque-promissor", pergunta: "Por que o mercado se mostra promissor?", acao: "O que sustenta a leitura de que esse mercado vai crescer nos próximos anos." },
          { id: "mercado.tamanho-numeros", pergunta: "Qual o tamanho do mercado em reais, número de clientes e competidores? Como será o mercado nos próximos anos?", acao: "Dados concretos, se disponíveis, para cada frente da Promise." },
          { id: "mercado.estruturado-segmentado", pergunta: "Como o mercado está estruturado e segmentado?", acao: "Por tipo de oferta (cursos, certificações, consultoria), por perfil de cliente (escola, família, professor), por região." },
          { id: "mercado.oportunidades-riscos", pergunta: "Quais são as oportunidades e riscos do mercado?", acao: "O que pode acelerar o crescimento e o que pode travar (concorrência, regulação, ciclo orçamentário das escolas)." },
        ],
      },
      {
        titulo: "Mercado-Alvo",
        perguntas: [
          { id: "mercado.perfil-comprador", pergunta: "Qual o perfil do comprador (setor, porte, faturamento, tempo de existência)?", acao: "Descreva o perfil típico de escola, família e professor que a Promise atende." },
          { id: "mercado.o-que-compra-hoje", pergunta: "O que ele está comprando atualmente?", acao: "O que escolas, famílias e professores usam hoje antes de conhecer a Promise." },
          { id: "mercado.porque-compra", pergunta: "Por que ele está comprando?", acao: "Motivações reais: exigência da BNCC, desejo de internacionalização, formação cristã, certificação profissional." },
          { id: "mercado.fatores-compra", pergunta: "Quais fatores influenciam a compra?", acao: "Preço, confiança, resultado comprovado, indicação, presença institucional." },
          { id: "mercado.quando-como-compra", pergunta: "Quando, como e com que periodicidade é feita a compra?", acao: "Ciclo de decisão de escolas (anual?) e de famílias/professores (contínuo?)." },
          { id: "mercado.onde-encontrar", pergunta: "Onde ele se encontra? Como chegar até ele?", acao: "Canais atuais: eventos, redes sociais, indicação, prospecção direta." },
          { id: "mercado.necessidades-nao-atendidas", pergunta: "Quais necessidades dos clientes em potencial ainda não são satisfatoriamente atendidas?", acao: "Onde está a lacuna que a Promise resolve melhor que o que já existe no mercado." },
        ],
      },
      {
        titulo: "Análise de concorrência",
        perguntas: [
          { id: "concorrencia.quem-sao", pergunta: "Quem são seus concorrentes?", acao: "Liste os principais concorrentes diretos e indiretos, em cada frente." },
          { id: "concorrencia.comparacao", pergunta: "De que maneira seu produto ou serviço pode ser comparado ao dos concorrentes?", acao: "Onde a Promise se diferencia, onde é parecida." },
          { id: "concorrencia.organizacao", pergunta: "De que maneira ele está organizado?", acao: "Como os concorrentes estruturam seus produtos e atendimento." },
          { id: "concorrencia.decisoes-rapidas", pergunta: "Ele pode tomar decisões mais rápidas que você?", acao: "Agilidade dos concorrentes frente à estrutura da Promise hoje." },
          { id: "concorrencia.responde-mudancas", pergunta: "Ele responde rapidamente a mudanças?", acao: "Como os concorrentes reagiram a mudanças recentes de mercado ou economia." },
          { id: "concorrencia.equipe-eficiente", pergunta: "Ele tem uma equipe gerencial eficiente?", acao: "O que se sabe sobre a equipe/estrutura dos principais concorrentes." },
          { id: "concorrencia.lider-seguidora", pergunta: "A concorrência é líder ou seguidora de mercado?", acao: "Quem define os padrões de preço e serviço hoje nesse nicho." },
          { id: "concorrencia.futuros-concorrentes", pergunta: "Eles poderão vir a ser seus concorrentes no futuro (mesmo que não sejam hoje)?", acao: "Players adjacentes que podem migrar para o mesmo espaço da Promise." },
          { id: "concorrencia.vantagens-competitivas", pergunta: "Quais são as vantagens competitivas da Promise e dos concorrentes?", acao: "O que a Promise faz melhor, e onde os concorrentes ainda levam vantagem." },
          { id: "concorrencia.quadro-comparativo", pergunta: "Quadro comparativo entre concorrentes: material didático, site, redes sociais, consultoria, plataforma, preço, suporte, presença em eventos.", acao: "Pode ser um resumo em texto por enquanto; o quadro formal vem depois." },
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
          { id: "equipe.organograma", pergunta: "Qual o organograma funcional que estrutura o modelo de negócio?", acao: "Quem ocupa cada posição hoje, mesmo que informalmente." },
          { id: "equipe.principais-envolvidos", pergunta: "Quem são os principais envolvidos no negócio (administrativo, marketing/vendas, técnico/pedagógico, financeiro)?", acao: "Descreva de forma sintética as áreas-chave e quem ocupa cada uma." },
          { id: "equipe.principais-executivos", pergunta: "Quem são os principais executivos? De onde vêm? Qual a experiência prévia de cada um?", acao: "Um mini currículo de cada pessoa-chave, mostrando por que são capazes de tocar o negócio." },
          { id: "equipe.responsabilidades", pergunta: "Quais as responsabilidades de cada área?", acao: "Detalhe as atribuições de cada área da estrutura atual." },
          { id: "equipe.o-que-falta", pergunta: "O que (ou quem) está faltando?", acao: "Competências ou pessoas de fora que ainda serão necessárias." },
          { id: "equipe.previsao-rh", pergunta: "Previsão de recursos humanos necessários, política de contratação, benefícios e custos de pessoal.", acao: "Quantas pessoas, que política salarial, que benefícios, que custos." },
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
          { id: "produtos.beneficios", pergunta: "Quais os benefícios proporcionados por seus produtos/serviços e o que os tornam especiais?", acao: "Não entre em características técnicas. Liste até 4 benefícios reais (ex: confiança, resultado comprovado, cosmovisão cristã, acompanhamento próximo)." },
          { id: "produtos.utilidade-apelo", pergunta: "Qual a finalidade dos produtos/serviços? Para que servem? Qual apelo procuram atender?", acao: "Utilidade tanto para quem contrata (escola, família) quanto para quem aprende (aluno)." },
          { id: "produtos.tecnologia-pd", pergunta: "Há inovação tecnológica? Você domina a tecnologia? Há alguma propriedade intelectual?", acao: "Materiais autorais, metodologia própria (Promise Excellence Framework), plataforma, currículos." },
          { id: "produtos.ciclo-vida", pergunta: "Em que estágio do ciclo de vida encontra-se cada produto/serviço?", acao: "O que já está maduro, o que ainda está em lançamento." },
          { id: "produtos.especial", pergunta: "O que tem de especial nos produtos/serviços da Promise?", acao: "Resumo direto do diferencial." },
        ],
      },
      {
        titulo: "Portfólio",
        perguntas: [
          { id: "produtos.portfolio", pergunta: "Qual o seu portfólio de produtos?", acao: "Descreva por grupos/categorias (Schools, Learners, Professionals, Global), sem entrar em detalhe técnico." },
          { id: "produtos.plano-desenvolvimento", pergunta: "Plano de desenvolvimento dos produtos: ações e prazos críticos para desenvolver e lançar cada produto.", acao: "" },
          { id: "produtos.plano-testes", pergunta: "Plano de testes, análise de viabilidade, composição de custos, lançamento e avaliação dos produtos.", acao: "Não precisa detalhar, mas mostrar que a Promise considera isso crítico." },
          { id: "produtos.acompanhamento-gestao", pergunta: "Plano de acompanhamento e gestão dos produtos (métricas/indicadores).", acao: "" },
          { id: "produtos.categorias", pergunta: "Divisão dos produtos em categorias (prazo de venda, tipo de aplicação, modelo comercial, prazo de retorno).", acao: "" },
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
          { id: "operacoes.pd", pergunta: "Pesquisa e Desenvolvimento: há área, política e plano de investimento nesse setor?", acao: "" },
          { id: "operacoes.aliancas", pergunta: "Alianças estratégicas: quais parceiros são chave para o negócio prosperar?", acao: "Cambridge, escolas parceiras, editoras, plataformas." },
          { id: "operacoes.tecnologia", pergunta: "Tecnologia: você detém o conhecimento tecnológico? Ou sabe como obtê-lo?", acao: "" },
          { id: "operacoes.criterios-selecao", pergunta: "Critérios de seleção de produtos: como é a política de investimento em novos produtos?", acao: "" },
          { id: "operacoes.producao-distribuicao", pergunta: "Produção e distribuição: há estrutura de produção? Quem distribui o material/serviço?", acao: "" },
          { id: "operacoes.pos-venda", pergunta: "Serviços pós-venda: há estrutura dedicada a isso?", acao: "" },
          { id: "operacoes.propriedade-intelectual", pergunta: "Propriedade intelectual (marca e materiais): você detém o direito de uso? Há diferencial competitivo e inovação?", acao: "" },
          { id: "operacoes.regulamentacoes", pergunta: "Regulamentações e certificações: há questões legais críticas para o negócio funcionar? A Promise atende a essas demandas?", acao: "" },
          { id: "operacoes.maquinas-equipamentos", pergunta: "Existem máquinas e equipamentos necessários?", acao: "" },
          { id: "operacoes.processo-negocio", pergunta: "Como é dado o processo do negócio, do primeiro contato até a entrega do serviço?", acao: "" },
          { id: "operacoes.politica-rh", pergunta: "Qual a política de recursos humanos (salários, benefícios, promoções, plano de carreira)?", acao: "" },
          { id: "operacoes.fornecedores", pergunta: "Quais são os fornecedores (serviços, materiais etc.)?", acao: "" },
          { id: "operacoes.infraestrutura", pergunta: "Infraestrutura e planta (layout físico, se houver).", acao: "" },
          { id: "operacoes.infraestrutura-tech", pergunta: "Infraestrutura tecnológica (site, plataforma, ferramentas internas).", acao: "" },
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
          { id: "marketing.posicionamento", pergunta: "Como você quer que seus produtos/serviços sejam vistos e percebidos pelos clientes? Como vai se diferenciar da concorrência?", acao: "" },
        ],
      },
      {
        titulo: "Preço",
        perguntas: [
          { id: "marketing.preco", pergunta: "Qual a política de preços que a Promise vai praticar?", acao: "Preços, prazos e formas de pagamento por frente/segmento." },
        ],
      },
      {
        titulo: "Praça",
        perguntas: [
          { id: "marketing.praca", pergunta: "Como seus produtos/serviços chegam até os clientes?", acao: "Canais, prazo de entrega, logística de atendimento." },
        ],
      },
      {
        titulo: "Propaganda / comunicação",
        perguntas: [
          { id: "marketing.propaganda", pergunta: "Como seus clientes ficam sabendo dos seus produtos/serviços?", acao: "Vendas, relações públicas, mídias prioritárias, eventos/feiras." },
        ],
      },
      {
        titulo: "Modelo de negócio",
        perguntas: [
          { id: "marketing.modelo-venda", pergunta: "Qual o modelo de venda será adotado? Quanto pretende investir em marketing e vendas?", acao: "Venda direta, indireta, ou os dois. Ciclo de vendas, comissionamento, treinamento da equipe." },
          { id: "marketing.distribuidores", pergunta: "Terá distribuidores?", acao: "" },
          { id: "marketing.licenciamento", pergunta: "Precisará de algum licenciamento?", acao: "" },
          { id: "marketing.forcas-vendas", pergunta: "Quais forças de vendas a Promise terá?", acao: "" },
          { id: "marketing.parceiros-vendas", pergunta: "Quais serão os parceiros estratégicos para a realização das vendas?", acao: "" },
        ],
      },
      {
        titulo: "Projeção de vendas",
        perguntas: [
          { id: "marketing.quanto-vender", pergunta: "Quanto sua empresa vai vender e quando?", acao: "Estimativa inicial, com horizonte de tempo definido (ex: 5 anos)." },
          { id: "marketing.participacao-mercado", pergunta: "Quanto de participação de mercado sua empresa vai conseguir e quando?", acao: "" },
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
          { id: "crescimento.razao-de-ser", pergunta: "O que faz a Promise? Qual a razão de ser desse negócio? O que será esse negócio no futuro?", acao: "Retome missão, princípios, valores e objetivos apresentados em Conceito." },
          { id: "crescimento.forcas", pergunta: "Quais as forças do seu negócio?", acao: "" },
          { id: "crescimento.fraquezas", pergunta: "Quais as fraquezas do seu negócio? Como podem ser superadas?", acao: "" },
          { id: "crescimento.oportunidades", pergunta: "Quais as principais oportunidades existentes para o seu negócio?", acao: "" },
          { id: "crescimento.riscos", pergunta: "Quais os principais riscos para sua empresa? Como pretende enfrentá-los?", acao: "Tenha planos de contingência caso metas não sejam atingidas como planejado." },
          { id: "crescimento.objetivos-metas", pergunta: "Quais os objetivos e metas do seu negócio?", acao: "Defina metas SMART: específicas, mensuráveis, atingíveis, relevantes e com prazo." },
          { id: "crescimento.estrategias-cronograma", pergunta: "Quais estratégias a Promise vai usar para cumprir seus objetivos? Apresente um cronograma com as principais atividades dos próximos meses/anos.", acao: "Defina prazos claros e métricas (clientes, receita, participação de mercado)." },
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
          { id: "financas.premissas", pergunta: "Premissas: como a estratégia do negócio se traduz em números?", acao: "" },
          { id: "financas.custos-despesas", pergunta: "Qual a composição de custos e despesas do negócio?", acao: "Custos fixos e variáveis de cada frente: pessoal, materiais, plataforma, certificações, marketing." },
          { id: "financas.investimentos-retornos", pergunta: "Quais investimentos são necessários e quais as possibilidades de retorno?", acao: "" },
          { id: "financas.previsao-receitas", pergunta: "Previsão de receitas para os próximos anos (horizonte médio de 5 anos).", acao: "" },
          { id: "financas.prazo-retorno", pergunta: "Qual o prazo para o retorno do investimento, com base no fluxo de caixa do negócio?", acao: "" },
          { id: "financas.metricas-retorno", pergunta: "Quais métricas e índices de retorno mostram a viabilidade financeira do negócio?", acao: "Ex: ponto de equilíbrio (breakeven), payback, TIR, VPL." },
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
          { id: "sumario.quem-voce-e", pergunta: "Quem você é? O que é o negócio e seu modelo de negócio? Quem está envolvido? Por que você e sua equipe são especiais para esse negócio?", acao: "" },
          { id: "sumario.estrategia-visao", pergunta: "Qual é sua estratégia/visão? Como pretende desenvolver a empresa e onde quer chegar?", acao: "" },
          { id: "sumario.mercado", pergunta: "Qual é o seu mercado? Qual a oportunidade de negócio? Qual o mercado-alvo e por que se mostra promissor?", acao: "" },
          { id: "sumario.investimento", pergunta: "Quanto de investimento você precisa e o que fará com ele? Quando será necessário?", acao: "" },
          { id: "sumario.vantagens-competitivas", pergunta: "Quais são suas vantagens competitivas? Quais os diferenciais da sua empresa?", acao: "" },
        ],
      },
    ],
  },
];
