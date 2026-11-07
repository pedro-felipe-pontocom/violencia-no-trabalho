/* =====================================================================
   CONTEÚDO DA APRESENTAÇÃO  ·  edite aqui
   ---------------------------------------------------------------------
   1) Nomes do grupo, professor(a), turma etc.: bloco TRABALHO logo abaixo.
   2) Cada { ... } dentro de SLIDES é um slide, na ordem em que aparecem.
   3) "notas" é o texto do apresentador (tecla N): o que você vai falar.

   Marcações que funcionam dentro dos textos:
     ==texto==   marca-texto vermelho (animado)
     ~~texto~~   texto riscado (animado)
     __texto__   sublinhado à mão (animado)
     **texto**   negrito
   Dica: mantenha as aspas e vírgulas do jeito que estão.
   ===================================================================== */

window.TRABALHO = {
  integrantes: ['Pedro Felipe', 'Leandro Freitas', 'Matheus', 'Ruan', 'Maria Melo', 'Gabriel Ronald (3003)'],
  rotuloProfessor: 'Professora',
  professor: 'Neusa',
  turma: '3002',
  escola: '[ESCOLA]',   // deixe '' para esconder
  data: '[DATA]',       // deixe '' para esconder
};

window.SLIDES = [

  /* ------------------------------------------------------------- 01 */
  {
    layout: 'capa',
    secao: 'Capa',
    tagline: 'Jornal-dossiê de Sociologia\nEdição especial: violência',
    tema: 'Tema: Violência. Onde está?',
    titulo: ['Onde está', 'a violência?'],
    faixa: 'No mundo do trabalho.',
    linhaFina: 'Assédio, salário desigual, preconceito, escravidão, acidentes e aplicativos. Quem manda, quem obedece e ==quem paga o preço==.',
    notas: `Bom dia (boa tarde). O tema que recebemos foi a violência, com uma pergunta: onde ela está? Nós fomos procurar num lugar onde quase todo mundo passa a maior parte da vida adulta: o trabalho.

Reparem no nome do nosso "jornal": Expediente. É a palavra para o horário de trabalho e também o nome da ficha que lista quem fez um jornal.

Vamos mostrar que a violência no trabalho aparece de formas visíveis, como acidentes e trabalho escravo, e de formas quase invisíveis, como uma piada, um salário menor ou o medo de reclamar. O fio que liga tudo é a relação de poder: quem manda, quem é mandado e quem paga o preço. Todos os números têm fonte oficial, listada no último slide.`,
  },

  /* ------------------------------------------------------------- 02 */
  {
    layout: 'conceito',
    secao: 'O que é',
    titulo: ['Nem toda', 'violência', 'deixa marca', 'no corpo.'],
    definicao: 'Para a OIT, violência e assédio no trabalho são comportamentos e práticas inaceitáveis, ou ameaças deles, que causam ou podem causar **dano físico, psicológico, sexual ou econômico**.',
    fonte: 'Convenção 190 da OIT, 2019',
    tipos: [
      { nome: 'Física', texto: 'Agressão, acidente por falta de proteção, jornada que esgota o corpo.' },
      { nome: 'Psicológica', texto: 'Grito, humilhação, ameaça, isolamento, meta impossível.' },
      { nome: 'Simbólica', texto: 'Piada, apelido, “aqui sempre foi assim”. Machuca e ==parece normal==.' },
      { nome: 'Estrutural', texto: 'Está nas regras do jogo: salário desigual, informalidade, trabalho infantil.' },
    ],
    notas: `Quando a gente pensa em violência, pensa em soco, briga, sangue. Mas a Organização Internacional do Trabalho, a OIT, que é a agência da ONU para o trabalho, usa uma definição mais ampla na Convenção 190, de 2019: violência e assédio são comportamentos inaceitáveis, ou ameaças deles, que causam ou podem causar dano físico, psicológico, sexual ou econômico.

Organizamos em quatro formas. A física é a que deixa marca no corpo. A psicológica é a humilhação, o grito, a ameaça. A simbólica é a mais traiçoeira: vem na piada, no apelido, no "aqui sempre foi assim", e por isso parece normal. A estrutural está nas próprias regras da sociedade: ninguém precisa bater em ninguém para uma mulher ganhar menos ou para uma criança largar a escola e ir trabalhar. O sociólogo norueguês Johan Galtung chamou isso de violência estrutural.`,
  },

  /* ------------------------------------------------------------- 03 */
  {
    layout: 'piramide',
    secao: 'Relação de poder',
    titulo: ['Quem manda', '× quem é', 'mandado'],
    niveis: [
      { quem: 'Donos e acionistas', faz: 'ficam com o lucro' },
      { quem: 'Diretoria', faz: 'define as metas' },
      { quem: 'Gerência', faz: 'cobra as metas' },
      { quem: 'Supervisão', faz: 'vigia, avalia e pune' },
      { quem: 'Trabalhadores com carteira', faz: 'executam' },
      { quem: 'Terceirizados, informais, por app', faz: 'executam sem proteção' },
    ],
    setaDesce: 'Ordens',
    setaSobe: 'Lucro',
    dado: {
      a: { valor: '1 em 17', texto: 'homens brancos é diretor ou gerente' },
      b: { valor: '1 em 46', texto: 'mulheres negras chega a esses cargos' },
      fonte: 'DIEESE, com dados da PNAD Contínua/IBGE, 2º tri. 2025',
    },
    conclusao: 'Quanto mais embaixo: ==mais medo de demissão==, menos voz e mais exposição à violência.',
    notas: `Para entender a violência no trabalho, primeiro é preciso entender quem tem poder. Toda empresa tem uma hierarquia: no topo, os donos e acionistas, que ficam com o lucro. Depois a diretoria, que define as metas; a gerência, que cobra; a supervisão, que vigia e pune. Na base, a maioria: quem executa. E ainda abaixo estão terceirizados, informais e trabalhadores por aplicativo, que fazem trabalho parecido com menos proteção (por isso o contorno tracejado).

As ordens descem, o lucro sobe. Quanto mais embaixo, maior o medo de ser demitido e menor a voz. E a pirâmide não é neutra: segundo o DIEESE, entre homens brancos, 1 em cada 17 é diretor ou gerente; entre mulheres negras, só 1 em cada 46. Gênero e raça ajudam a decidir quem fica no topo e quem fica na base.`,
  },

  /* ------------------------------------------------------------- 04 */
  {
    layout: 'silencio',
    secao: 'O silêncio',
    abertura: {
      antes: 'Mais de',
      numero: '1 em cada 5',
      texto: 'trabalhadores no mundo já sofreu violência ou assédio no trabalho: 22,8%, ou 743 milhões de pessoas.',
    },
    frase: { antes: '“Meu chefe', tarjado: 'me humilhou na frente de todo mundo', depois: '.”' },
    revelacao: { antes: 'Só', numero: 54.4, depois: 'das vítimas contaram isso para alguém.' },
    pergunta: ['Por que o resto', 'se calou?'],
    motivos: [
      { texto: 'Achou que seria perda de tempo', valor: 55.0 },
      { texto: 'Medo de prejudicar a reputação', valor: 44.5 },
      { texto: 'Regras pouco claras no trabalho', valor: 43.1 },
      { texto: 'Não sabia o que fazer', valor: 38.3 },
      { texto: 'Medo de punição', valor: 33.2 },
    ],
    notaMotivos: 'Cada pessoa podia marcar mais de um motivo.',
    fonte: 'OIT, Lloyd’s Register Foundation e Gallup, 2022 · pesquisa em 121 países',
    notas: `A maior pesquisa mundial sobre o tema, feita pela OIT com a Fundação Lloyd's Register e o instituto Gallup em 121 países, mostrou que mais de 1 em cada 5 trabalhadores já sofreu violência ou assédio no trabalho: 22,8%, cerca de 743 milhões de pessoas.

E a parte mais chocante: só 54,4% das vítimas contaram para alguém. Quase metade guardou para si. Por quê? A resposta mais comum foi achar que seria perda de tempo. Depois vêm o medo de prejudicar a reputação, regras pouco claras, não saber o que fazer e medo de punição.

Aqui entra a relação de poder: muitas vezes quem agride é o mesmo que avalia, promove e demite. No Brasil, soma-se o medo de perder o emprego: quem depende do salário para pagar o aluguel pensa duas vezes antes de denunciar o chefe. O silêncio também é efeito do poder.`,
  },

  /* ------------------------------------------------------------- 05 */
  {
    layout: 'assedio',
    secao: 'Assédio',
    moral: {
      rotulo: 'Assédio moral',
      numero: 142828,
      legenda: 'novos processos na Justiça do Trabalho em 2025, 22% a mais que em 2024.',
      definicao: 'Humilhar, isolar ou ameaçar alguém de forma repetida para controlar, punir ou forçar um pedido de demissão.',
    },
    sexual: {
      rotulo: 'Assédio sexual',
      numero: 12813,
      legenda: 'novos processos em 2025.',
      definicao: 'Constranger alguém para obter vantagem sexual ==usando a posição de chefe==. É crime: Código Penal, art. 216-A.',
    },
    frasesTitulo: 'Soa familiar?',
    frases: [
      '“Se não bater a meta, tem fila de gente querendo a sua vaga.”',
      '“Sorri mais, você fica mais bonita assim.”',
      '“Isso é frescura. Aqui todo mundo aguenta.”',
    ],
    fonte: 'TST, fev. 2026 · De 2020 a 2025, foram 601.538 ações por assédio moral (TST, maio 2026)',
    notas: `O assédio moral é quando alguém é exposto a humilhações de forma repetida: gritos, apelidos, isolamento, cobranças impossíveis, ameaças. O objetivo pode ser controlar, punir ou forçar a pessoa a pedir demissão. Em 2025, a Justiça do Trabalho recebeu 142.828 novos processos por assédio moral, 22% a mais que no ano anterior. De 2020 a 2025, foram mais de 600 mil.

O assédio sexual é constranger alguém para conseguir vantagem sexual. Quando a pessoa se aproveita da posição de chefe, é crime previsto no artigo 216-A do Código Penal. Foram 12.813 novos processos em 2025.

Reparem na expressão "usando a posição de chefe": é a relação de poder virando arma. O aumento dos processos pode significar mais casos, mas também que mais gente está tendo coragem e informação para denunciar. As frases embaixo são exemplos do tipo de fala que, repetida, vira assédio.`,
  },

  /* ------------------------------------------------------------- 06 */
  {
    layout: 'genero',
    secao: 'Desigualdade salarial',
    titulo: ['A violência que vem', 'no contracheque'],
    numero: 21.3,
    legenda: 'a menos: é o que as mulheres recebem, em média, em relação aos homens.',
    piorou: 'E a diferença ==cresceu==: em 2023, era de 20,7%.',
    contracheque: {
      homem: { rotulo: 'Homem', valor: 'R$ 100,00' },
      mulher: { rotulo: 'Mulher', valor: 'R$ 78,70' },
      recorte: '−R$ 21,30',
      percentualMulher: 78.7,
    },
    lei: 'Lei 14.611/2023: salário igual para trabalho igual.',
    fonte: '5º Relatório de Transparência Salarial · MTE e Ministério das Mulheres, abr. 2026 · empresas privadas com 100 ou mais empregados',
    notas: `Agora uma violência que não faz barulho: a desigualdade salarial. Desde 2023, a Lei 14.611 obriga empresas com 100 ou mais empregados a publicar relatórios de transparência salarial. O 5º relatório, de abril de 2026, mostrou que as mulheres recebem, em média, 21,3% a menos que os homens. Na prática: a cada 100 reais pagos a um homem, uma mulher recebe 78 reais e 70 centavos. E a diferença cresceu: em 2023 era de 20,7%.

Por que isso é violência? Porque é um dano econômico, como diz a definição da OIT, e porque é estrutural: está no jeito como a sociedade distribui cargos e valoriza cada trabalho. Mulheres são punidas pela maternidade, chegam menos a cargos de chefia e são maioria em profissões mal pagas. Em maio de 2026, o STF confirmou que a lei de igualdade salarial é constitucional.`,
  },

  /* ------------------------------------------------------------- 07 */
  {
    layout: 'interseccao',
    secao: 'Desigualdade salarial',
    titulo: ['Quando raça', 'e gênero', 'se somam'],
    destaque: { numero: 53, texto: 'é a diferença entre o rendimento médio de uma mulher negra e o de um homem branco.' },
    grupos: ['Homens brancos', 'Mulheres negras'],
    linhas: [
      { rotulo: 'Até o fundamental', valores: [2527, 1343] },
      { rotulo: 'Ensino médio completo', valores: [3468, 1864] },
      { rotulo: 'Ensino superior completo', valores: [9051, 4214] },
      { rotulo: 'Média geral', valores: [4831, 2264] },
    ],
    conclusao: 'Com diploma universitário, ela ==ainda recebe menos da metade==.',
    fonte: 'DIEESE, Boletim Especial 20 de Novembro, 2025, com dados da PNAD Contínua/IBGE (2º tri. 2025) · rendimento médio mensal · negras = pretas e pardas',
    notas: `Quando a gente cruza gênero com raça, a desigualdade fica ainda maior. Esses dados são do DIEESE, com base na pesquisa do IBGE do segundo trimestre de 2025. Em média, um homem branco recebe 4.831 reais por mês; uma mulher negra, 2.264. Uma diferença de 53%, cerca de 30.800 reais a menos por ano.

O mais importante do gráfico: a diferença não some com estudo. Entre quem tem ensino superior completo, o homem branco recebe 9.051 reais, e a mulher negra, 4.214. Menos da metade.

Isso tem nome: interseccionalidade. As discriminações se somam. A intelectual brasileira Lélia Gonzalez já discutia o cruzamento entre racismo e sexismo nos anos 1980. E tem raiz histórica: o Brasil aboliu a escravidão sem garantir terra, escola ou trabalho digno à população negra, e as mulheres negras foram empurradas para o trabalho doméstico, até hoje uma das ocupações mais mal pagas.`,
  },

  /* ------------------------------------------------------------- 08 */
  {
    layout: 'classificados',
    secao: 'Preconceito',
    titulo: ['O preconceito', 'começa no', 'anúncio da vaga.'],
    anuncios: [
      { vaga: 'Vendedora', texto: 'Exige-se ~~boa aparência~~.', tipo: 'Racismo' },
      { vaga: 'Secretária', texto: 'Preferência por ~~solteiras, sem filhos~~.', tipo: 'Machismo' },
      { vaga: 'Estoquista', texto: '~~Idade máxima: 35 anos~~.', tipo: 'Etarismo' },
      { vaga: 'Recepcionista', texto: '~~Sem limitações físicas~~.', tipo: 'Capacitismo' },
      { vaga: 'Atendente', texto: 'Vaga para ~~“homem de verdade”~~.', tipo: 'LGBTfobia' },
    ],
    aviso: 'Anúncios fictícios. Na vida real, exigências assim são proibidas pela Lei 9.029/1995.',
    dados: [
      { numero: '26,6%', texto: 'das pessoas com deficiência estavam trabalhando. Sem deficiência: 60,7%.', fonte: 'IBGE, PNAD Contínua 2022' },
      { numero: '8,0%', texto: 'de desemprego entre mulheres negras. Entre homens brancos: 4,1%.', fonte: 'DIEESE/PNAD Contínua, 2º tri. 2025' },
    ],
    notas: `O preconceito no trabalho começa antes mesmo da contratação. Esses anúncios são fictícios, mas imitam exigências que aparecem na vida real. "Boa aparência" foi por muito tempo um código para excluir pessoas negras: é racismo. "Sem filhos" ou "solteiras" é machismo, pune a mulher pela maternidade. "Idade máxima" é etarismo, preconceito de idade. "Sem limitações físicas" é capacitismo, preconceito contra pessoas com deficiência. E "homem de verdade" é um jeito de excluir homens gays, pessoas trans e quem foge do padrão: LGBTfobia.

Os números mostram o efeito: só 26,6% das pessoas com deficiência estavam trabalhando em 2022, contra 60,7% das pessoas sem deficiência. E o desemprego das mulheres negras é quase o dobro do dos homens brancos: 8% contra 4,1%.

Tudo isso é proibido. A Lei 9.029, de 1995, proíbe discriminar na contratação. Racismo é crime, e desde 2019 o STF entende que a LGBTfobia também se enquadra na Lei do Racismo.`,
  },

  /* ------------------------------------------------------------- 09 */
  {
    layout: 'escravidao',
    secao: 'Trabalho escravo',
    tema: 'escuro',
    chamada: 'Trabalho análogo à escravidão',
    titulo: ['Abolida em 1888.', 'Encontrada em 2025.'],
    numero: 2772,
    legenda: 'pessoas resgatadas em 2025 pela fiscalização do trabalho.',
    perfil: [
      { valor: '83%', texto: 'negras (pretas ou pardas)' },
      { valor: '86%', texto: 'homens' },
      { valor: '68%', texto: 'em cidades, não no campo' },
    ],
    historico: 'Mais de 70 mil pessoas resgatadas no Brasil desde 1995.',
    legendaRiscos: 'Cada risco: uma pessoa resgatada em 2025.',
    oQueE: {
      titulo: 'O que a lei chama de trabalho escravo · Código Penal, art. 149',
      itens: ['Trabalho forçado', 'Jornada exaustiva', 'Condições degradantes', 'Dívida que prende'],
    },
    fonte: 'MTE/Inspeção do Trabalho, balanço 2025 (jan. 2026) · total desde 1995: Brasil de Fato, set. 2026',
    notas: `A Lei Áurea é de 1888, mas a escravidão continua existindo de outra forma. Hoje a lei fala em "trabalho análogo à escravidão", no artigo 149 do Código Penal: trabalho forçado, jornada exaustiva, condições degradantes ou dívida que prende o trabalhador ao patrão. Não precisa ter corrente.

Em 2025, a fiscalização do Ministério do Trabalho resgatou 2.772 pessoas. Cada risco deste quadro é uma delas. 83% eram negras e 86% eram homens. E, pela primeira vez, a maioria, 68%, estava em cidades, principalmente na construção civil, e não no campo. Desde 1995, mais de 70 mil pessoas foram resgatadas no Brasil.

É o exemplo mais extremo da relação de poder: o patrão controla não só o trabalho, mas a liberdade da pessoa. E o perfil das vítimas mostra que a herança da escravidão ainda decide quem é mais vulnerável.`,
  },

  /* ------------------------------------------------------------- 10 */
  {
    layout: 'recibo',
    secao: 'Precarização e uberização',
    titulo: ['O chefe', 'virou', 'aplicativo.'],
    numero: 2.0,
    numeroSufixo: 'milhões',
    legenda: 'de pessoas trabalhavam por aplicativo no Brasil em 2025.',
    texto: 'O trabalhador vira “parceiro”: entra com o carro, a moto, o celular e o próprio corpo. ==O app dita as regras==, o preço e o ritmo.',
    lente: 'Ver Ricardo Antunes e Foucault, slide 15',
    recibo: {
      cabecalho: 'Extrato do trabalho por app',
      subtitulo: 'Média nacional · 2025',
      linhas: [
        { item: 'Jornada por semana', valor: '44,7 h', obs: '5,4 h a mais que os demais' },
        { item: 'Ganho por hora', valor: 'R$ 16,20', obs: '12% a menos que os demais' },
        { item: 'Contribui p/ previdência', valor: '34%', obs: 'demais trabalhadores: 63%' },
        { item: 'Na informalidade', valor: '72,1%', obs: 'demais trabalhadores: 42,7%' },
        { item: 'Quem define o valor', valor: 'O APP', obs: '80,2% dos motoristas dependem totalmente', destaque: true },
        { item: 'Ameaça de bloqueio', valor: '25,3%', obs: 'dos motoristas têm a jornada moldada por ela' },
      ],
      rodape: 'Fonte: IBGE, PNAD Contínua · Trabalho por meio de plataformas digitais 2025 (set. 2026) · resultados experimentais',
    },
    notas: `A uberização é a precarização do trabalho na era dos aplicativos. Em 2025, segundo o IBGE, cerca de 2 milhões de pessoas trabalhavam por aplicativo no Brasil. Elas são chamadas de "parceiras" ou "empreendedoras", mas olhem esse extrato.

Trabalham em média 44,7 horas por semana, 5,4 horas a mais que os outros trabalhadores. Ganham 16 reais e 20 centavos por hora, 12% a menos. Só 34% contribuem para a previdência: se sofrerem um acidente, a maioria fica sem renda. 72% estão na informalidade.

E quem decide é o app: 80,2% dos motoristas dependem totalmente do aplicativo para saber quanto vão receber, e um em cada quatro tem a jornada moldada por ameaça de punição ou bloqueio. O chefe não aparece, mas manda: é um algoritmo. O IBGE avisa que esses dados ainda são experimentais.`,
  },

  /* ------------------------------------------------------------- 11 */
  {
    layout: 'acidentes',
    secao: 'Acidentes e mortes',
    tema: 'escuro',
    titulo: ['Trabalho', 'que mata.'],
    numero: 32,
    numeroSufixo: 'mil',
    legenda: 'mortes no trabalho com carteira assinada, de 2012 a 2024.',
    numero2: '8,8 milhões',
    legenda2: 'de acidentes de trabalho no mesmo período.',
    relogio: { titulo: 'Uma notificação de morte a cada 3,5 horas', rodape: 'Em um dia: quase 7.' },
    profissoes: {
      titulo: 'Quem mais se afasta por acidente',
      itens: ['Alimentadores de linha de produção', 'Motoristas de caminhão', 'Faxineiros', 'Serventes de obra'],
    },
    alerta: 'E a conta só inclui quem tem carteira assinada. ==Informais e trabalhadores por app ficam de fora==.',
    fonte: 'Observatório de Segurança e Saúde no Trabalho (SmartLab · MPT e OIT), via MPT-BA, abr. 2025',
    notas: `Acidente de trabalho parece fatalidade, mas muitas vezes é escolha: economizar em equipamento de proteção, acelerar o ritmo, cortar pausa, cortar treinamento. Segundo o Observatório de Segurança e Saúde no Trabalho, do Ministério Público do Trabalho com a OIT, de 2012 a 2024 o Brasil registrou 8,8 milhões de acidentes e 32 mil mortes de trabalhadores com carteira assinada. É uma notificação de morte a cada 3 horas e meia, quase sete por dia.

Quem mais se afasta por acidente são alimentadores de linha de produção, motoristas de caminhão, faxineiros e serventes de obra: gente da base da pirâmide.

E esse número é menor que a realidade, porque só conta quem tem carteira. Informais e trabalhadores por aplicativo ficam fora da estatística. Marx diria que, quando o lucro vale mais que a segurança, o corpo do trabalhador vira custo.`,
  },

  /* ------------------------------------------------------------- 12 */
  {
    layout: 'infantil',
    secao: 'Trabalho infantil',
    titulo: 'Infância com expediente.',
    numero: 1.65,
    numeroSufixo: 'milhão',
    legenda: 'de crianças e adolescentes de 5 a 17 anos em trabalho infantil em 2024.',
    subiu: 'Depois de anos de queda, ==voltou a subir==: +2,1% em relação a 2023.',
    fatos: [
      { valor: '4,3%', texto: 'de todas as crianças e adolescentes dessa idade' },
      { valor: '66%', texto: 'são pretos ou pardos' },
      { valor: '66%', texto: 'são meninos' },
      { valor: '560 mil', texto: 'nas piores formas: trabalho perigoso, insalubre ou degradante' },
    ],
    regua: {
      titulo: 'O que diz a Constituição · art. 7º, XXXIII',
      faixas: [
        { de: 5, ate: 14, texto: 'Proibido' },
        { de: 14, ate: 16, texto: 'Só como aprendiz' },
        { de: 16, ate: 18, texto: 'Permitido, mas nunca à noite, perigoso ou insalubre' },
      ],
    },
    fonte: 'IBGE, PNAD Contínua: Trabalho de crianças e adolescentes de 5 a 17 anos 2024 (set. 2025)',
    notas: `Trabalho infantil também é violência no mundo do trabalho, e das mais graves, porque a criança não tem como negociar nem se defender. Em 2024, segundo o IBGE, 1,65 milhão de crianças e adolescentes de 5 a 17 anos estavam em situação de trabalho infantil. Isso é 4,3% de todos dessa idade. Dois terços são pretos ou pardos, e dois terços são meninos. 560 mil estavam nas piores formas, como trabalho perigoso ou insalubre. E, depois de anos de queda, o número voltou a subir.

A régua mostra o que diz a Constituição, no artigo 7º: antes dos 14 anos, nenhum trabalho; de 14 a 16, só como aprendiz; de 16 a 18, pode trabalhar, mas nunca à noite nem em atividade perigosa ou insalubre.

O trabalho infantil rouba a escola e o futuro, e por isso reproduz a pobreza de geração em geração.`,
  },

  /* ------------------------------------------------------------- 13 */
  {
    layout: 'teoria',
    secao: 'O que a Sociologia explica',
    marx: {
      nome: 'Marx',
      completo: 'Karl Marx · 1818–1883',
      conceitos: [
        { termo: 'Mais-valia', texto: 'O trabalhador produz mais valor do que recebe de salário. ==A diferença vira lucro== de quem é dono.' },
        { termo: 'Alienação', texto: 'Quem trabalha não controla o que faz nem fica com o que produz.' },
      ],
      esquema: { titulo: 'Esquema ilustrativo de uma jornada de 8 horas', horasPagas: 3, pago: 'paga o salário', excedente: 'vira lucro: mais-valia' },
      citacao: '“O trabalhador se torna tanto mais pobre quanto mais riqueza produz.”',
      obra: 'Manuscritos econômico-filosóficos, 1844',
    },
    weber: {
      nome: 'Weber',
      completo: 'Max Weber · 1864–1920',
      conceitos: [
        { termo: 'Poder', texto: 'A chance de impor a própria vontade, mesmo contra a resistência dos outros.' },
        { termo: 'Dominação', texto: 'Quando a ordem é obedecida porque parece legítima. Na empresa, ==o cargo e o regulamento== dão ao chefe o direito de mandar.' },
      ],
      tiposTitulo: 'Tipos de dominação',
      tipos: ['Tradicional', 'Carismática', 'Racional-legal'],
      tipoDestaque: 2,
      obra: 'Economia e sociedade, 1922',
    },
    notas: `Agora, as lentes da Sociologia. Karl Marx, no século 19, mostrou que no capitalismo o trabalhador produz mais valor do que recebe de salário. O esquema é só ilustrativo: imagine que, numa jornada de 8 horas, as primeiras horas já pagam o salário, e o resto vira lucro de quem é dono. Essa diferença é a mais-valia. Para Marx, isso é exploração, mesmo quando é legal. Ele também falou em alienação: o trabalhador não controla o que faz e não fica com o que produz. Daí a frase: "o trabalhador se torna tanto mais pobre quanto mais riqueza produz".

Max Weber ajuda a entender a obediência. Poder é a chance de impor a própria vontade, mesmo contra resistência. Dominação é quando a ordem é obedecida porque parece legítima. Na empresa moderna, a dominação é racional-legal: obedecemos ao chefe por causa do cargo e do regulamento, não da pessoa. Isso explica por que é tão difícil questionar quem está acima.`,
  },

  /* ------------------------------------------------------------- 14 */
  {
    layout: 'bourdieu',
    secao: 'O que a Sociologia explica',
    autor: 'Pierre Bourdieu · 1930–2002',
    conceito: 'Violência simbólica',
    citacao: ['“Violência suave,', 'insensível,', '__invisível__ a suas', 'próprias vítimas.”'],
    obra: 'A dominação masculina, 1998',
    explicacao: 'É a dominação que não precisa de grito. Ela funciona quando quem é dominado passa a achar a desigualdade ==natural==.',
    exemplosTitulo: 'No trabalho, ela aparece assim:',
    exemplos: ['“Isso é serviço de mulher.”', '“Ele não tem perfil de liderança.”', '“Peão não precisa dar opinião.”'],
    notas: `Pierre Bourdieu, sociólogo francês, criou um conceito que encaixa perfeitamente no nosso tema: violência simbólica. Ele a descreveu como uma "violência suave, insensível, invisível a suas próprias vítimas".

É a dominação que não precisa de grito nem de soco. Ela funciona pelas ideias, pela linguagem, pelo que a gente aprende desde criança como "natural". Frases como "isso é serviço de mulher", "ele não tem perfil de liderança" ou "peão não precisa dar opinião" parecem inofensivas, mas ensinam a cada um qual é o seu lugar.

O mais forte do conceito é que o próprio dominado passa a aceitar a dominação: a mulher que acha normal ganhar menos, o trabalhador que acha que não tem direito de reclamar. Isso ajuda a explicar o silêncio que vimos no slide 4. Quando a violência parece natural, ela nem precisa ser imposta: ela se reproduz sozinha.`,
  },

  /* ------------------------------------------------------------- 15 */
  {
    layout: 'panoptico',
    secao: 'O que a Sociologia explica',
    antunes: {
      nome: 'Antunes',
      completo: 'Ricardo Antunes · sociólogo brasileiro, nascido em 1953',
      termo: 'Uberização',
      texto: 'O trabalho vira serviço sob demanda, sem direitos, controlado por plataformas. A pessoa é chamada de ==“empreendedora de si mesma”==, mas carrega sozinha os custos e os riscos.',
      obra: 'O privilégio da servidão, 2018',
    },
    foucault: {
      nome: 'Foucault',
      completo: 'Michel Foucault · 1926–1984',
      termo: 'Poder disciplinar',
      texto: 'Vigiar, medir e punir para produzir “corpos dóceis”. No panóptico, quem se sente vigiado o tempo todo ==passa a se vigiar sozinho==.',
      hojeTitulo: 'Hoje, a torre é:',
      hoje: ['Câmera', 'Ponto eletrônico', 'Meta cronometrada', 'Nota do cliente', 'Algoritmo'],
      obra: 'Vigiar e punir, 1975',
      torre: 'Torre: vê sem ser vista',
      celas: 'Celas: nunca sabem quando são observadas',
    },
    notas: `Ricardo Antunes é um sociólogo brasileiro, professor da Unicamp, que estuda o mundo do trabalho. No livro "O privilégio da servidão", de 2018, ele mostra como o trabalho está ficando cada vez mais precário e usa o termo uberização: o trabalho vira serviço sob demanda, sem direitos, controlado por plataformas. A pessoa é chamada de empreendedora de si mesma, mas carrega sozinha os custos e os riscos. O título do livro é uma provocação: hoje, ter qualquer emprego, mesmo ruim, parece um privilégio.

Michel Foucault, filósofo francês, estudou o poder disciplinar no livro "Vigiar e punir", de 1975. Ele usa a imagem do panóptico: uma prisão circular com uma torre no centro, de onde o vigia vê todas as celas, mas os presos não veem o vigia. Como nunca sabem se estão sendo observados, passam a se vigiar sozinhos. No trabalho de hoje, a torre virou câmera, ponto eletrônico, meta cronometrada, nota do cliente e algoritmo.`,
  },

  /* ------------------------------------------------------------- 16 */
  {
    layout: 'servico',
    secao: 'Como combater',
    titulo: 'Tem lei. Tem onde denunciar.',
    leisTitulo: 'A lei',
    leis: [
      { nome: 'CLT', ano: '1943', texto: 'Base dos direitos: carteira, jornada, salário, férias.' },
      { nome: 'Código Penal', ano: 'art. 149 e 216-A', texto: 'Trabalho escravo e assédio sexual por superior são crimes.' },
      { nome: 'Lei 9.029', ano: '1995', texto: 'Proíbe discriminar para contratar ou manter alguém no emprego.' },
      { nome: 'Lei 14.457', ano: '2022', texto: 'Empresas com CIPA devem prevenir e combater o assédio.' },
      { nome: 'Lei 14.611', ano: '2023', texto: 'Igualdade salarial entre mulheres e homens. Confirmada pelo STF em 2026.' },
      { nome: 'NR-1', ano: 'maio 2026', texto: 'Empresas devem gerenciar riscos psicossociais, como assédio e sobrecarga.' },
    ],
    canaisTitulo: 'Onde denunciar',
    canais: [
      { nome: 'MPT', onde: 'mpt.mp.br', texto: 'Ministério Público do Trabalho. Denúncia on-line, pode ser sigilosa.' },
      { nome: 'Disque 100', onde: 'grátis · 24 h', texto: 'Discriminação, trabalho escravo e infantil.' },
      { nome: 'Ligue 180', onde: 'grátis · 24 h', texto: 'Violência contra a mulher.' },
      { nome: 'Sistema Ipê', onde: 'ipe.sit.trabalho.gov.br', texto: 'Trabalho escravo, de forma anônima.' },
      { nome: 'Sindicato e CIPA', onde: 'no local de trabalho', texto: 'Ninguém precisa denunciar sozinho.' },
    ],
    dica: 'Se acontecer com você: anote datas · guarde mensagens e prints · procure testemunhas',
    notas: `E o que fazer? Primeiro: existe lei. A CLT, de 1943, é a base dos direitos trabalhistas. O Código Penal define como crime o trabalho análogo à escravidão e o assédio sexual praticado por superior. A Lei 9.029 proíbe discriminação. A Lei 14.457, de 2022, obriga empresas com CIPA a prevenir e combater o assédio. A Lei 14.611, de 2023, garante igualdade salarial e foi confirmada pelo STF em 2026. E desde maio de 2026 a norma NR-1 manda as empresas gerenciarem riscos psicossociais, como assédio e sobrecarga. Por enquanto, as multas dessa parte estão suspensas pelo STF enquanto se discutem os critérios, mas a obrigação continua valendo.

Ainda falta o Brasil ratificar a Convenção 190 da OIT, a convenção internacional contra violência e assédio no trabalho. A Câmara dos Deputados aprovou o texto em setembro de 2026, e agora ele depende do Senado.

Para denunciar: Ministério Público do Trabalho, Disque 100, Ligue 180, Sistema Ipê para trabalho escravo, sindicato e CIPA. E se acontecer com você: anote datas, guarde mensagens e prints e procure testemunhas. Ninguém precisa enfrentar isso sozinho.`,
  },

  /* ------------------------------------------------------------- 17 */
  {
    layout: 'pergunta',
    secao: 'Conclusão',
    tema: 'vermelho',
    conclusao: 'A violência no trabalho segue a hierarquia: pesa mais sobre quem tem menos poder. Mulheres, pessoas negras, crianças, pessoas com deficiência, trabalhadores sem direitos.',
    rotuloPergunta: 'Pergunta para a turma',
    pergunta: ['O que a gente', 'aprendeu a chamar', 'de ~~normal~~?'],
    carimbo: 'Violência',
    apoio: 'Pense num emprego de alguém da sua família, num estágio, num aplicativo. Que situação todo mundo aceita, mas que hoje você chamaria de violência?',
    notas: `Para concluir: a violência no trabalho não é aleatória. Ela segue a hierarquia e pesa mais sobre quem tem menos poder: mulheres, pessoas negras, crianças, pessoas com deficiência, trabalhadores sem direitos. Às vezes ela é física e aparece no jornal. Mas muitas vezes é estrutural e simbólica, e por isso a gente nem percebe.

Então deixamos uma pergunta para a turma: o que a gente aprendeu a chamar de normal? Pensem num emprego de alguém da família, num estágio, num aplicativo. Que situação todo mundo aceita, mas que depois desta apresentação vocês chamariam de violência?

(Deixar a turma responder. Se ninguém falar, dar um exemplo: o chefe que grita e todo mundo diz "ele é assim mesmo".)`,
  },

  /* ------------------------------------------------------------- 18 */
  {
    layout: 'referencias',
    secao: 'Referências',
    titulo: 'Fontes',
    nota: 'Links acessados em novembro de 2026. Clique para abrir.',
    grupos: [
      {
        titulo: 'Dados e pesquisas',
        itens: [
          { texto: 'OIT; Lloyd’s Register Foundation; Gallup. Experiences of violence and harassment at work: a global first survey. Genebra, 2022.', url: 'https://www.ilo.org/sites/default/files/wcmsp5/groups/public/@dgreports/@dcomm/documents/publication/wcms_863095.pdf' },
          { texto: 'TST. Assédio moral e sexual: números registram aumento de demandas na Justiça do Trabalho. Fev. 2026.', url: 'https://www.tst.jus.br/en/-/assedio-moral-e-sexual-numeros-registram-aumento-de-demandas-na-justica-do-trabalho' },
          { texto: 'TST. Assédio moral: Justiça do Trabalho recebeu 600 mil casos nos últimos cinco anos. Maio 2026.', url: 'https://www.tst.jus.br/en/-/assedio-moral-justica-do-trabalho-recebeu-600-mil-casos-nos-ultimos-cinco-anos' },
          { texto: 'MTE. 5º Relatório de Transparência Salarial aponta crescimento de 11% de mulheres no mercado de trabalho. Abr. 2026.', url: 'https://www.gov.br/trabalho-e-emprego/pt-br/noticias-e-conteudo/2026/abril/5o-relatorio-de-transparencia-salarial-aponta-crescimento-de-11-de-mulheres-no-mercado-de-trabalho' },
          { texto: 'DIEESE. Mulheres negras acumulam funções e discriminações no trabalho. Boletim Especial, nov. 2025.', url: 'https://www.dieese.org.br/boletimespecial/2025/conscienciaNegra.pdf' },
          { texto: 'IBGE. PNAD Contínua: Pessoas com deficiência 2022. 2023.', url: 'https://biblioteca.ibge.gov.br/visualizacao/livros/liv102013_informativo.pdf' },
          { texto: 'MTE/SIT. Combate ao trabalho escravo no Brasil: resultados da fiscalização em 2025. Jan. 2026.', url: 'https://www.gov.br/trabalho-e-emprego/pt-br/noticias-e-conteudo/2026/janeiro/SITBalancoTAE2025Infografico.pdf' },
          { texto: 'Agência Gov. Governo do Brasil resgata 2.772 trabalhadores em ações de combate ao trabalho análogo à escravidão em 2025. Jan. 2026.', url: 'https://agenciagov.ebc.com.br/noticias/202601/governo-do-brasil-resgata-2-772-trabalhadores-em-acoes-de-combate-ao-trabalho-analogo-a-escravidao-em-2025' },
          { texto: 'Brasil de Fato. Com megaoperação, Brasil acumula 70 mil resgatados da escravidão desde 1995. Set. 2026.', url: 'https://www.brasildefato.com.br/2026/09/14/com-megaoperacao-brasil-acumula-70-mil-resgatados-da-escravidao-desde-1995/' },
          { texto: 'IBGE. PNAD Contínua: Trabalho por meio de plataformas digitais 2025. Set. 2026.', url: 'https://biblioteca.ibge.gov.br/visualizacao/livros/liv102309_informativo.pdf' },
          { texto: 'MPT-BA. Abril Verde: Brasil tem 32 mil mortes por acidentes de trabalho em 12 anos. Abr. 2025.', url: 'https://www.prt5.mpt.mp.br/informe-se/noticias-do-mpt-ba/2482-abril-verde-brasil-tem-32-mil-mortes-por-acidentes-de-trabalho-em-12-anos' },
          { texto: 'MPT e OIT. Observatório de Segurança e Saúde no Trabalho (SmartLab).', url: 'https://smartlabbr.org/sst' },
          { texto: 'IBGE. PNAD Contínua: Trabalho de crianças e adolescentes de 5 a 17 anos 2024. Set. 2025.', url: 'https://biblioteca.ibge.gov.br/visualizacao/livros/liv102202_informativo.pdf' },
        ],
      },
      {
        titulo: 'Leis e decisões',
        itens: [
          { texto: 'OIT. Convenção nº 190 sobre violência e assédio no mundo do trabalho, 2019.', url: 'https://normlex.ilo.org/dyn/nrmlx_en/f?p=NORMLEXPUB:12100:0::NO::P12100_ILO_CODE:C190' },
          { texto: 'Constituição Federal, art. 7º, XXXIII.', url: 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm' },
          { texto: 'CLT, Decreto-Lei 5.452/1943.', url: 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm' },
          { texto: 'Código Penal, arts. 149 e 216-A.', url: 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm' },
          { texto: 'Lei 7.716/1989 (crimes de racismo).', url: 'https://www.planalto.gov.br/ccivil_03/leis/l7716.htm' },
          { texto: 'Lei 9.029/1995 (proíbe práticas discriminatórias no trabalho).', url: 'https://www.planalto.gov.br/ccivil_03/leis/l9029.htm' },
          { texto: 'Lei 14.457/2022 (Programa Emprega + Mulheres; CIPA e assédio).', url: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14457.htm' },
          { texto: 'Lei 14.611/2023 (igualdade salarial).', url: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14611.htm' },
          { texto: 'SBT News. STF valida lei da igualdade salarial entre homens e mulheres por unanimidade. Maio 2026.', url: 'https://sbtnews.sbt.com.br/noticia/justica/stf-valida-lei-da-igualdade-salarial-entre-homens-e-mulheres-por-unanimidade' },
          { texto: 'STF. Suspende sanções da NR-1 e abre conciliação sobre riscos psicossociais no trabalho. Jun. 2026.', url: 'https://noticias.stf.jus.br/?p=164325' },
          { texto: 'STF. Ementa e acórdão do julgamento que criminalizou a homofobia (ADO 26), 2019.', url: 'https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=423925' },
          { texto: 'Congresso Nacional. PDL 997/2026 (aprova a Convenção 190 da OIT): tramitação.', url: 'https://www.congressonacional.leg.br/materias/materias-bicamerais/-/ver/pdl-997-2026' },
        ],
      },
      {
        titulo: 'Teoria',
        itens: [
          { texto: 'ANTUNES, Ricardo. O privilégio da servidão: o novo proletariado de serviços na era digital. São Paulo: Boitempo, 2018.' },
          { texto: 'BOURDIEU, Pierre. A dominação masculina. Rio de Janeiro: Bertrand Brasil, 1999 (orig. 1998).' },
          { texto: 'FOUCAULT, Michel. Vigiar e punir: nascimento da prisão. Petrópolis: Vozes (orig. 1975).' },
          { texto: 'GALTUNG, Johan. Violence, peace, and peace research. Journal of Peace Research, v. 6, n. 3, 1969.' },
          { texto: 'GONZALEZ, Lélia. Racismo e sexismo na cultura brasileira. Revista Ciências Sociais Hoje, 1984.' },
          { texto: 'MARX, Karl. Manuscritos econômico-filosóficos. São Paulo: Boitempo, 2004 (orig. 1844).' },
          { texto: 'MARX, Karl. O capital, Livro I. São Paulo: Boitempo, 2013 (orig. 1867).' },
          { texto: 'WEBER, Max. Economia e sociedade. Brasília: Ed. UnB, 1991 (orig. 1922).' },
        ],
      },
    ],
    notas: `Todas as informações desta apresentação vêm destas fontes: dados do IBGE, do Ministério do Trabalho, do TST, do DIEESE, do Ministério Público do Trabalho e da OIT, além das leis no site do Planalto e dos livros dos autores que usamos. Os links podem ser clicados.

Obrigado! Estamos abertos a perguntas.`,
  },
];
