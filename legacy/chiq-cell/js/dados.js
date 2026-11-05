/* =====================================================
   DADOS DO SITE — edite aqui: loja, vendedores e produtos
   ===================================================== */
let LOJA = {
  endereco: 'Rua Porto de Pedras, nº 10 — Bangu',
  horario: 'Confirme os horários com nossa equipe antes de visitar.'
};

// Vendedores: nome, telefone (55 + DDD + número, só números), foto opcional (link da imagem)
let VENDEDORES = [
  { nome: 'Vendedor 1', telefone: '5521999990001', foto: '' },
  { nome: 'Vendedor 2', telefone: '5521999990002', foto: '' },
  { nome: 'Vendedor 3', telefone: '5521999990003', foto: '' },
  { nome: 'Equipe CHIQ CELL', telefone: '5521999990004', foto: '' }
];

// Produtos: para adicionar, copie um bloco { ... } e cole depois da vírgula.
// grupo: "11", "12", ... "SE", "Xiaomi" (usado nos filtros) | cor: '', 'pink', 'blue' ou 'purple'
// foto (link de imagem) e preco são opcionais | itens: destaques curtos
let PRODUTOS = [
  // ---------- Linha 11 ----------
  { grupo:'11', nome:'iPhone 11', lanc:'2019', chip:'A13 Bionic', tela:'6,1" Liquid Retina (LCD)', camera:'Dupla 12 MP (principal + ultra-angular)', frontal:'12 MP', arm:'64 / 128 / 256 GB', cor:'purple', foto:'img/iphone-11.jpg', itens:['Face ID e resistência IP68','Modo Noite e vídeo 4K','Entrada Lightning'] },
  { grupo:'11', nome:'iPhone 11 Pro', lanc:'2019', chip:'A13 Bionic', tela:'5,8" Super Retina XDR (OLED)', camera:'Tripla 12 MP (principal, ultra-angular, tele 2x)', frontal:'12 MP', arm:'64 / 256 / 512 GB', cor:'', itens:['Tela OLED','Acabamento em aço inoxidável','Três câmeras'] },
  { grupo:'11', nome:'iPhone 11 Pro Max', lanc:'2019', chip:'A13 Bionic', tela:'6,5" Super Retina XDR (OLED)', camera:'Tripla 12 MP (principal, ultra-angular, tele 2x)', frontal:'12 MP', arm:'64 / 256 / 512 GB', cor:'', itens:['Maior tela da linha','Bateria de longa duração','Três câmeras'] },
  // ---------- SE ----------
  { grupo:'SE', nome:'iPhone SE (2ª geração)', lanc:'2020', chip:'A13 Bionic', tela:'4,7" Retina HD (LCD)', camera:'12 MP', frontal:'7 MP', arm:'64 / 128 / 256 GB', cor:'pink', itens:['Compacto, com botão Home','Touch ID','Entrada Lightning'] },
  { grupo:'SE', nome:'iPhone SE (3ª geração)', lanc:'2022', chip:'A15 Bionic', tela:'4,7" Retina HD (LCD)', camera:'12 MP', frontal:'7 MP', arm:'64 / 128 / 256 GB', cor:'pink', itens:['Compatível com 5G','Touch ID','Compacto, com botão Home'] },
  // ---------- Linha 12 ----------
  { grupo:'12', nome:'iPhone 12 mini', lanc:'2020', chip:'A14 Bionic', tela:'5,4" Super Retina XDR (OLED)', camera:'Dupla 12 MP (principal + ultra-angular)', frontal:'12 MP', arm:'64 / 128 / 256 GB', cor:'blue', itens:['Compatível com 5G','MagSafe','Tamanho compacto'] },
  { grupo:'12', nome:'iPhone 12', lanc:'2020', chip:'A14 Bionic', tela:'6,1" Super Retina XDR (OLED)', camera:'Dupla 12 MP (principal + ultra-angular)', frontal:'12 MP', arm:'64 / 128 / 256 GB', cor:'blue', itens:['Compatível com 5G','MagSafe','Tela OLED'] },
  { grupo:'12', nome:'iPhone 12 Pro', lanc:'2020', chip:'A14 Bionic', tela:'6,1" Super Retina XDR (OLED)', camera:'Tripla 12 MP (principal, ultra-angular, tele 2x) + LiDAR', frontal:'12 MP', arm:'128 / 256 / 512 GB', cor:'', itens:['Scanner LiDAR','Acabamento em aço inoxidável','Compatível com 5G'] },
  { grupo:'12', nome:'iPhone 12 Pro Max', lanc:'2020', chip:'A14 Bionic', tela:'6,7" Super Retina XDR (OLED)', camera:'Tripla 12 MP (principal maior, ultra-angular, tele 2,5x) + LiDAR', frontal:'12 MP', arm:'128 / 256 / 512 GB', cor:'', itens:['Sensor principal maior','Scanner LiDAR','Maior tela da linha'] },
  // ---------- Linha 13 ----------
  { grupo:'13', nome:'iPhone 13 mini', lanc:'2021', chip:'A15 Bionic', tela:'5,4" Super Retina XDR (OLED)', camera:'Dupla 12 MP (principal + ultra-angular)', frontal:'12 MP', arm:'128 / 256 / 512 GB', cor:'pink', itens:['Modo Cinema','Estabilização por deslocamento de sensor','Tamanho compacto'] },
  { grupo:'13', nome:'iPhone 13', lanc:'2021', chip:'A15 Bionic', tela:'6,1" Super Retina XDR (OLED)', camera:'Dupla 12 MP (principal + ultra-angular)', frontal:'12 MP', arm:'128 / 256 / 512 GB', cor:'pink', itens:['Modo Cinema','Estabilização por deslocamento de sensor','Bateria melhor que a linha 12'] },
  { grupo:'13', nome:'iPhone 13 Pro', lanc:'2021', chip:'A15 Bionic', tela:'6,1" Super Retina XDR com ProMotion 120 Hz', camera:'Tripla 12 MP (principal, ultra-angular, tele 3x) + LiDAR', frontal:'12 MP', arm:'128 GB a 1 TB', cor:'purple', itens:['Tela ProMotion 120 Hz','Modo Macro','Tele 3x'] },
  { grupo:'13', nome:'iPhone 13 Pro Max', lanc:'2021', chip:'A15 Bionic', tela:'6,7" Super Retina XDR com ProMotion 120 Hz', camera:'Tripla 12 MP (principal, ultra-angular, tele 3x) + LiDAR', frontal:'12 MP', arm:'128 GB a 1 TB', cor:'purple', itens:['Tela ProMotion 120 Hz','Modo Macro','Maior bateria da linha 13'] },
  // ---------- Linha 14 ----------
  { grupo:'14', nome:'iPhone 14', lanc:'2022', chip:'A15 Bionic', tela:'6,1" Super Retina XDR (OLED)', camera:'Dupla 12 MP (principal + ultra-angular)', frontal:'12 MP com foco automático', arm:'128 / 256 / 512 GB', cor:'blue', itens:['Detecção de Acidente','SOS via satélite','Modo Ação para vídeos'] },
  { grupo:'14', nome:'iPhone 14 Plus', lanc:'2022', chip:'A15 Bionic', tela:'6,7" Super Retina XDR (OLED)', camera:'Dupla 12 MP (principal + ultra-angular)', frontal:'12 MP com foco automático', arm:'128 / 256 / 512 GB', cor:'blue', itens:['Tela grande de 6,7"','Bateria de longa duração','SOS via satélite'] },
  { grupo:'14', nome:'iPhone 14 Pro', lanc:'2022', chip:'A16 Bionic', tela:'6,1" Super Retina XDR com ProMotion e Tela Sempre Ativa', camera:'Tripla (principal 48 MP, ultra-angular 12 MP, tele 3x 12 MP)', frontal:'12 MP com foco automático', arm:'128 GB a 1 TB', cor:'purple', itens:['Dynamic Island','Câmera principal de 48 MP','Tela Sempre Ativa'] },
  { grupo:'14', nome:'iPhone 14 Pro Max', lanc:'2022', chip:'A16 Bionic', tela:'6,7" Super Retina XDR com ProMotion e Tela Sempre Ativa', camera:'Tripla (principal 48 MP, ultra-angular 12 MP, tele 3x 12 MP)', frontal:'12 MP com foco automático', arm:'128 GB a 1 TB', cor:'purple', itens:['Dynamic Island','Câmera principal de 48 MP','Maior tela da linha 14'] },
  // ---------- Linha 15 ----------
  { grupo:'15', nome:'iPhone 15', lanc:'2023', chip:'A16 Bionic', tela:'6,1" Super Retina XDR (OLED)', camera:'Dupla (principal 48 MP + ultra-angular 12 MP)', frontal:'12 MP', arm:'128 / 256 / 512 GB', cor:'pink', itens:['Entrada USB-C','Dynamic Island','Câmera principal de 48 MP'] },
  { grupo:'15', nome:'iPhone 15 Plus', lanc:'2023', chip:'A16 Bionic', tela:'6,7" Super Retina XDR (OLED)', camera:'Dupla (principal 48 MP + ultra-angular 12 MP)', frontal:'12 MP', arm:'128 / 256 / 512 GB', cor:'pink', itens:['Entrada USB-C','Dynamic Island','Tela grande de 6,7"'] },
  { grupo:'15', nome:'iPhone 15 Pro', lanc:'2023', chip:'A17 Pro', tela:'6,1" Super Retina XDR com ProMotion', camera:'Tripla (principal 48 MP, ultra-angular 12 MP, tele 3x 12 MP)', frontal:'12 MP', arm:'128 GB a 1 TB', cor:'purple', itens:['Estrutura em titânio','Botão de Ação','USB-C'] },
  { grupo:'15', nome:'iPhone 15 Pro Max', lanc:'2023', chip:'A17 Pro', tela:'6,7" Super Retina XDR com ProMotion', camera:'Tripla (principal 48 MP, ultra-angular 12 MP, tele 5x 12 MP)', frontal:'12 MP', arm:'256 GB a 1 TB', cor:'purple', itens:['Zoom óptico 5x','Estrutura em titânio','Botão de Ação'] },
  // ---------- Linha 16 ----------
  { grupo:'16', nome:'iPhone 16', lanc:'2024', chip:'A18', tela:'6,1" Super Retina XDR (OLED)', camera:'Dupla (Fusion 48 MP + ultra-angular 12 MP)', frontal:'12 MP', arm:'128 / 256 / 512 GB', cor:'blue', itens:['Botão de Controle da Câmera','Botão de Ação','Apple Intelligence'] },
  { grupo:'16', nome:'iPhone 16 Plus', lanc:'2024', chip:'A18', tela:'6,7" Super Retina XDR (OLED)', camera:'Dupla (Fusion 48 MP + ultra-angular 12 MP)', frontal:'12 MP', arm:'128 / 256 / 512 GB', cor:'blue', itens:['Botão de Controle da Câmera','Bateria de longa duração','Apple Intelligence'] },
  { grupo:'16', nome:'iPhone 16 Pro', lanc:'2024', chip:'A18 Pro', tela:'6,3" Super Retina XDR com ProMotion', camera:'Tripla (Fusion 48 MP, ultra-angular 48 MP, tele 5x 12 MP)', frontal:'12 MP', arm:'128 GB a 1 TB', cor:'purple', itens:['Estrutura em titânio','Ultra-angular de 48 MP','Zoom óptico 5x'] },
  { grupo:'16', nome:'iPhone 16 Pro Max', lanc:'2024', chip:'A18 Pro', tela:'6,9" Super Retina XDR com ProMotion', camera:'Tripla (Fusion 48 MP, ultra-angular 48 MP, tele 5x 12 MP)', frontal:'12 MP', arm:'256 GB a 1 TB', cor:'purple', itens:['Maior tela da linha 16','Estrutura em titânio','Zoom óptico 5x'] },
  { grupo:'16', nome:'iPhone 16e', lanc:'2025', chip:'A18', tela:'6,1" Super Retina XDR (OLED)', camera:'Única Fusion 48 MP', frontal:'12 MP', arm:'128 / 256 / 512 GB', cor:'', itens:['Modem Apple C1','USB-C e Botão de Ação','Apple Intelligence'] },
  // ---------- Linha 17 ----------
  { grupo:'17', nome:'iPhone 17', lanc:'2025', chip:'A19', tela:'6,3" OLED com ProMotion 120 Hz', camera:'Dupla (Fusion 48 MP + ultra-angular 48 MP)', frontal:'18 MP Center Stage', arm:'256 / 512 GB', cores:'Preto, lavanda, azul-névoa, verde-sálvia, branco', cor:'blue', itens:['Tela ProMotion 120 Hz','Câmera frontal de 18 MP','Começa em 256 GB'] },
  { grupo:'17', nome:'iPhone Air', lanc:'2025', chip:'A19 Pro', tela:'6,5" OLED com ProMotion 120 Hz', camera:'Única Fusion 48 MP', frontal:'18 MP Center Stage', arm:'256 GB / 512 GB / 1 TB', cores:'Azul-céu, dourado-claro, branco-nuvem, preto-espacial', cor:'', itens:['O iPhone mais fino já feito','Estrutura em titânio','Somente eSIM'] },
  { grupo:'17', nome:'iPhone 17 Pro', lanc:'2025', chip:'A19 Pro', tela:'6,3" OLED com ProMotion 120 Hz', camera:'Tripla 48 MP (principal, ultra-angular, tele até 8x)', frontal:'18 MP Center Stage', arm:'256 GB / 512 GB / 1 TB', cores:'Azul-escuro, laranja-cósmico, prateado', cor:'purple', itens:['Câmara de vapor para resfriamento','Tele de 48 MP (até 8x óptico)','Corpo unibody em alumínio'] },
  { grupo:'17', nome:'iPhone 17 Pro Max', lanc:'2025', chip:'A19 Pro', tela:'6,9" OLED com ProMotion 120 Hz', camera:'Tripla 48 MP (principal, ultra-angular, tele até 8x)', frontal:'18 MP Center Stage', arm:'256 GB a 2 TB', cores:'Azul-escuro, laranja-cósmico, prateado', cor:'purple', itens:['Maior bateria da linha 17','Opção de 2 TB','Tele de 48 MP (até 8x óptico)'] },
  { grupo:'17', nome:'iPhone 17e', lanc:'2026', chip:'A19', tela:'6,1" OLED (60 Hz) com Ceramic Shield 2', camera:'Única Fusion 48 MP', frontal:'12 MP', arm:'256 / 512 GB', cores:'Preto, branco, rosa-suave', cor:'pink', itens:['MagSafe de volta','Modem Apple C1X','Começa em 256 GB'] },
  // ---------- Linha 18 ----------
  { grupo:'18', nome:'iPhone 18 Pro', lanc:'2026', chip:'A20 Pro (12 GB de RAM)', tela:'6,3" OLED com ProMotion 120 Hz', camera:'Tripla 48 MP, com abertura variável f/1.48 a f/4 na principal', frontal:'18 MP', arm:'A partir de 256 GB', cor:'purple', itens:['Câmera principal de abertura variável','Dynamic Island menor','Modem Apple C2'] },
  { grupo:'18', nome:'iPhone 18 Pro Max', lanc:'2026', chip:'A20 Pro (12 GB de RAM)', tela:'Maior tela da linha, OLED com ProMotion 120 Hz', camera:'Tripla 48 MP, com abertura variável f/1.48 a f/4 na principal', frontal:'18 MP', arm:'A partir de 256 GB', cor:'purple', itens:['Maior bateria da linha 18','Câmera principal de abertura variável','Modem Apple C2'] },
  // ---------- Xiaomi ----------
  { grupo:'Xiaomi', nome:'Xiaomi / Redmi', lanc:'', chip:'', tela:'', camera:'', frontal:'', arm:'', cor:'blue', itens:['Opções para vários perfis','Recursos modernos','Consulte os modelos disponíveis'] }
];
/* ================== FIM DA ÁREA EDITÁVEL ================== */
