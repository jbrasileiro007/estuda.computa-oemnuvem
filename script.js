"use strict";

/* =====================================================================
   1. DADOS (temporário)
   Para conectar uma API/banco depois, basta reescrever o objeto `Repo`
   (seção 2). O restante do código só usa Repo e não conhece o BANCO.
   Formatos:
     A(pergunta, respostaModelo)                    -> aberta
     F(pergunta, alternativas, indiceCorreto, expl) -> fechada
     E(pergunta, opcoes, [indicesCorretos], expl, multipla?) -> escolha
   ===================================================================== */
const A = (p, r) => ({ p, r });
const F = (p, o, c, e) => ({ p, o, c: [c], e });
const E = (p, o, c, e, m = false) => ({ p, o, c, m, e });
const VF = ["Verdadeiro", "Falso"];
const IouII = ["Apenas I", "Apenas II", "I e II", "Nenhuma"];

const BANCO = {
  materias: [
    { id: "prog", nome: "Programação", icone: "{ }" },
    { id: "bd", nome: "Banco de Dados", icone: "SQL" },
    { id: "sd", nome: "Sistemas Distribuídos", icone: "⇄" },
    { id: "es", nome: "Engenharia de Software", icone: "ES" },
    { id: "nuvem", nome: "Computação em Nuvem", icone: "☁" },
  ],
  questoes: {
    prog: {
      abertas: [
        A("O que é uma função e por que usá-la?", "Bloco de código nomeado que executa uma tarefa, pode receber parâmetros e retornar um valor. Evita repetição, organiza o programa e facilita testes e manutenção."),
        A("Qual a diferença entre variável e constante?", "A variável pode ter o valor alterado durante a execução; a constante recebe um valor uma única vez e não pode ser reatribuída."),
      ],
      fechadas: [
        F("Qual estrutura executa um bloco somente se uma condição for verdadeira?", ["for", "if", "while", "return"], 1, "O if faz a decisão condicional. for e while são laços de repetição."),
        F("Qual é a complexidade média da busca binária em um vetor ordenado?", ["O(n)", "O(n²)", "O(log n)", "O(1)"], 2, "A cada passo o espaço de busca cai pela metade, o que resulta em O(log n)."),
      ],
      escolha: [
        E("Verdadeiro ou Falso: em JavaScript, uma variável declarada com const não pode ser reatribuída.", VF, [0], "Correto: const impede a reatribuição (o conteúdo de objetos ainda pode ser modificado)."),
        E("Analise:\nI. Recursão ocorre quando uma função chama a si mesma.\nII. Todo laço for é uma recursão.", IouII, [0], "Só a I está correta. Laços são iteração, que é diferente de recursão."),
      ],
    },
    bd: {
      abertas: [
        A("O que é chave primária?", "Campo (ou conjunto de campos) que identifica cada registro de uma tabela de forma única. Não pode ser nulo nem repetido."),
        A("Qual a diferença entre INNER JOIN e LEFT JOIN?", "INNER JOIN retorna apenas linhas com correspondência nas duas tabelas. LEFT JOIN retorna todas as linhas da tabela da esquerda, com NULL onde não há correspondência."),
      ],
      fechadas: [
        F("Qual comando SQL é usado para consultar dados?", ["INSERT", "UPDATE", "SELECT", "DROP"], 2, "SELECT recupera dados de uma ou mais tabelas."),
        F("Qual propriedade ACID garante que a transação seja executada por completo ou não seja executada?", ["Atomicidade", "Consistência", "Isolamento", "Durabilidade"], 0, "Atomicidade: a transação é indivisível (tudo ou nada)."),
      ],
      escolha: [
        E("Verdadeiro ou Falso: uma chave estrangeira referencia a chave primária de outra tabela.", VF, [0], "Correto: é assim que se cria o relacionamento entre tabelas."),
        E("Quais comandos abaixo são de manipulação de dados (DML)?", ["I. INSERT", "II. CREATE", "III. UPDATE", "IV. DELETE"], [0, 2, 3], "INSERT, UPDATE e DELETE manipulam dados. CREATE é DDL, define estruturas.", true),
      ],
    },
    sd: {
      abertas: [
        A("O que é um sistema distribuído?", "Conjunto de computadores independentes, conectados em rede, que cooperam e se apresentam ao usuário como um sistema único e coerente."),
        A("O que afirma o teorema CAP?", "Diante de uma partição de rede, um sistema distribuído precisa escolher entre consistência e disponibilidade; não é possível garantir as três propriedades (consistência, disponibilidade e tolerância a partições) ao mesmo tempo."),
      ],
      fechadas: [
        F("Qual técnica mantém cópias dos dados em vários nós para tolerar falhas?", ["Replicação", "Compilação", "Serialização", "Indexação"], 0, "A replicação mantém cópias em nós diferentes, aumentando a disponibilidade."),
        F("Qual é a função de um balanceador de carga?", ["Criptografar dados", "Distribuir requisições entre servidores", "Compilar o código", "Armazenar backups"], 1, "Ele reparte as requisições para evitar sobrecarga em um único servidor."),
      ],
      escolha: [
        E("Verdadeiro ou Falso: em um sistema distribuído, a falha de um nó sempre derruba todo o sistema.", VF, [1], "Falso: bem projetado, o sistema tolera falhas parciais."),
        E("Analise:\nI. A rede é sempre confiável.\nII. Componentes podem falhar de forma independente.", IouII, [1], "Só a II. Assumir que a rede é confiável é uma das falácias da computação distribuída."),
      ],
    },
    es: {
      abertas: [
        A("Qual a diferença entre requisito funcional e não funcional?", "O funcional descreve o que o sistema faz (ex.: emitir relatório). O não funcional descreve qualidades e restrições (ex.: desempenho, segurança, usabilidade)."),
        A("O que é um teste unitário e qual sua vantagem?", "Teste automatizado que verifica a menor parte do código (uma função ou método) isoladamente. Detecta erros cedo e dá segurança para refatorar."),
      ],
      fechadas: [
        F("Qual metodologia ágil organiza o trabalho em sprints?", ["Cascata", "Scrum", "Espiral", "Modelo V"], 1, "O Scrum divide o trabalho em ciclos curtos chamados sprints."),
        F("Qual princípio SOLID diz que uma classe deve ter uma única responsabilidade?", ["SRP", "OCP", "LSP", "DIP"], 0, "SRP (Single Responsibility Principle)."),
      ],
      escolha: [
        E("Verdadeiro ou Falso: testes automatizados eliminam a necessidade de revisão de código.", VF, [1], "Falso: os dois se complementam. A revisão avalia legibilidade, design e riscos que testes não cobrem."),
        E("Quais itens são requisitos não funcionais?", ["I. Desempenho", "II. Cadastro de clientes", "III. Segurança", "IV. Emitir relatório"], [0, 2], "Desempenho e segurança são qualidades do sistema. Cadastro e relatório são funcionalidades.", true),
      ],
    },
    nuvem: {
      abertas: [
        A("O que é computação em nuvem e quem são seus participantes?", "Modelo que permite acessar aplicações e serviços de qualquer lugar, independente da plataforma, bastando um terminal conectado. Participantes: provedor de serviço (infraestrutura), desenvolvedor (cria serviços) e usuário (consome)."),
        A("Explique elasticidade e self service.", "Elasticidade: a nuvem dá a ilusão de recursos infinitos, fornecidos rapidamente a qualquer momento. Self service: o usuário escolhe e contrata o serviço sem intervenção humana e paga pelo uso."),
      ],
      fechadas: [
        F("Qual camada entrega aplicações completas ao usuário final?", ["IaaS", "PaaS", "SaaS", "DBaaS"], 2, "SaaS é a camada mais alta da arquitetura."),
        F("Qual camada permite ao desenvolvedor criar e implantar aplicações sem se preocupar com processadores e memória?", ["IaaS", "PaaS", "SaaS", "BaaS"], 1, "PaaS é a camada intermediária, voltada ao desenvolvedor."),
      ],
      escolha: [
        E("Verdadeiro ou Falso: no DBaaS, a manutenção do banco de dados é feita pelo provedor.", VF, [0], "Correto: o cliente gerencia as operações, e o provedor cuida da manutenção."),
        E("Analise:\nI. IaaS oferece hardware virtualizado sob demanda.\nII. SaaS é a camada inferior da arquitetura.", IouII, [0], "Só a I. A camada inferior é o IaaS; o SaaS é a mais alta."),
      ],
    },
  },
};

const TIPOS = [
  { id: "abertas", nome: "Abertas", desc: "Escreva sua resposta e compare com o modelo." },
  { id: "fechadas", nome: "Fechadas", desc: "Uma alternativa correta, com resultado imediato." },
  { id: "escolha", nome: "Escolha", desc: "Verdadeiro ou Falso, I ou II e múltiplas afirmações." },
];

/* =====================================================================
   2. REPOSITÓRIO — único ponto de acesso aos dados
   Exemplo futuro:
     async materias(){ return (await fetch("/api/materias")).json(); }
     async questoes(m,t){ return (await fetch(`/api/questoes?materia=${m}&tipo=${t}`)).json(); }
   ===================================================================== */
const Repo = {
  async materias() { return BANCO.materias; },
  async questoes(materiaId, tipoId) { return BANCO.questoes[materiaId][tipoId]; },
};

/* =====================================================================
   3. UTILITÁRIOS E ESTADO
   ===================================================================== */
const $ = (s) => document.querySelector(s);
const app = $("#app");
const S = {}; // estado da sessão: materia, tipo, fila, i, est[]
const PTS = 10;

const embaralhar = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function tela(html, nome = "") {
  document.body.dataset.tela = nome;
  app.innerHTML = `<section class="tela">${html}</section>`;
  window.scrollTo({ top: 0 });
}
const contar = () => ({
  ac: S.est.filter((e) => e && e.ok === true).length,
  er: S.est.filter((e) => e && e.ok === false).length,
  fe: S.est.filter((e) => e && e.ok !== undefined).length,
});

/* =====================================================================
   4. TELAS
   ===================================================================== */
async function home() {
  const ms = await Repo.materias();
  tela(`
    <div class="hero">
      <h1 class="logo">Estuda<span>+</span></h1>
      <p>Escolha uma matéria e pratique com questões abertas, fechadas e de escolha.</p>
    </div>
    <h2>Matérias</h2>
    <div class="grade">${ms.map((m) => `
      <button class="cartao" data-m="${m.id}"><span class="ico">${m.icone}</span><strong>${m.nome}</strong></button>`).join("")}
    </div>`, "home");
  app.querySelectorAll("[data-m]").forEach((b) => (b.onclick = () => tipos(ms.find((m) => m.id === b.dataset.m))));
}

function tipos(materia) {
  S.materia = materia;
  tela(`
    <button class="voltar" id="v">Voltar</button>
    <h2>${materia.nome}</h2>
    <p class="sub">Que tipo de atividade você quer fazer?</p>
    <div class="grade">${TIPOS.map((t) => `
      <button class="cartao" data-t="${t.id}"><strong>${t.nome}</strong><span>${t.desc}</span></button>`).join("")}
    </div>`, "tipos");
  $("#v").onclick = home;
  app.querySelectorAll("[data-t]").forEach((b) => (b.onclick = () => iniciar(TIPOS.find((t) => t.id === b.dataset.t))));
}

function preparar(q, tipoId) {
  if (tipoId === "abertas") return { tipo: "aberta", p: q.p, r: q.r };
  let o = q.o.map((t, i) => ({ t, ok: q.c.includes(i) }));
  if (tipoId === "fechadas") o = embaralhar(o); // em "escolha" a ordem é fixa (I/II, V/F)
  return { tipo: q.m ? "multi" : "uni", p: q.p, o, m: !!q.m, e: q.e };
}

async function iniciar(tipo) {
  S.tipo = tipo;
  const bruto = embaralhar(await Repo.questoes(S.materia.id, tipo.id));
  S.fila = bruto.map((q) => preparar(q, tipo.id));
  S.est = S.fila.map(() => null);
  S.i = 0;
  questao();
}

function corpoAberta(q, e) {
  let h = `<textarea id="txt" placeholder="Digite sua resposta..." ${e ? "disabled" : ""}>${e ? esc(e.txt) : ""}</textarea>`;
  if (!e) return h + `<button class="btn" id="ver">Ver resposta modelo</button>`;
  h += `<div class="fb"><strong>Resposta modelo</strong>${esc(q.r)}</div>`;
  if (e.ok === undefined)
    h += `<div class="auto"><span>Sua resposta estava certa?</span>
      <button class="btn ok" data-a="1">Acertei</button><button class="btn no" data-a="0">Errei</button></div>`;
  return h;
}

function corpoOpcoes(q, e) {
  const tp = q.m ? "checkbox" : "radio";
  let h = `<div class="ops">${q.o.map((o, i) => {
    const sel = e && e.sel.includes(i);
    const cls = e ? (o.ok ? "certa" : sel ? "errada" : "") : "";
    return `<label class="op ${cls}"><input type="${tp}" name="o" value="${i}" ${sel ? "checked" : ""} ${e ? "disabled" : ""}><span>${esc(o.t)}</span></label>`;
  }).join("")}</div>`;
  if (!e && S.tipo.id !== "fechadas") h += `<button class="btn" id="env" disabled>Enviar resposta</button>`;
  if (e) h += `<div class="fb ${e.ok ? "certa" : "errada"}"><strong>${e.ok ? "Você acertou!" : "Não foi dessa vez."}</strong>${esc(q.e)}</div>`;
  return h;
}

function questao() {
  const q = S.fila[S.i], e = S.est[S.i], n = S.fila.length;
  const { ac, er, fe } = contar();
  const feita = e && e.ok !== undefined;
  const dica = q.tipo === "multi" ? "Marque todas as corretas." : q.tipo === "uni" ? "Escolha uma alternativa." : "";

  tela(`
    <button class="voltar" id="v">Voltar</button>
    <div class="placar">
      <div class="stat">Pontos<b>${ac * PTS}</b></div>
      <div class="stat a">Acertos<b>${ac}</b></div>
      <div class="stat e">Erros<b>${er}</b></div>
    </div>
    <div class="barra" role="progressbar" aria-valuenow="${fe}" aria-valuemax="${n}"><i style="width:${(fe / n) * 100}%"></i></div>
    <p class="contagem">Questão ${S.i + 1} de ${n} · ${S.materia.nome}</p>
    <div class="q">
      <h3>${esc(q.p)}</h3>
      ${dica ? `<p class="dica">${dica}</p>` : ""}
      ${q.tipo === "aberta" ? corpoAberta(q, e) : corpoOpcoes(q, e)}
    </div>
    <div class="nav">
      <button class="btn sec" id="ant">Voltar</button>
      <button class="btn" id="prox" ${feita ? "" : "disabled"}>${S.i < n - 1 ? "Próxima questão" : "Ver resultado"}</button>
    </div>`, "quiz");

  $("#v").onclick = () => tipos(S.materia);
  $("#ant").onclick = () => (S.i > 0 ? (S.i--, questao()) : tipos(S.materia));
  $("#prox").onclick = () => (S.i < n - 1 ? (S.i++, questao()) : final());

  if (q.tipo === "aberta") {
    if ($("#ver")) $("#ver").onclick = () => { S.est[S.i] = { txt: $("#txt").value }; questao(); };
    app.querySelectorAll("[data-a]").forEach((b) => (b.onclick = () => { S.est[S.i].ok = b.dataset.a === "1"; questao(); }));
    return;
  }
  const responder = (sel) => {
    const ok = q.o.every((o, i) => o.ok === sel.includes(i)); // tudo ou nada
    S.est[S.i] = { sel, ok };
    questao();
  };
  app.querySelectorAll("input[name=o]").forEach((inp) => (inp.onchange = () => {
    if (e) return;
    if (S.tipo.id === "fechadas") return responder([+inp.value]); // feedback imediato
    $("#env").disabled = !app.querySelector("input[name=o]:checked");
  }));
  if ($("#env")) $("#env").onclick = () => responder([...app.querySelectorAll("input[name=o]:checked")].map((i) => +i.value));
}

function final() {
  const n = S.fila.length, { ac, er } = contar();
  const pct = Math.round((ac / n) * 100);
  const msg = pct >= 80 ? "Excelente desempenho!" : pct >= 50 ? "Bom caminho. Vale revisar os erros." : "Continue praticando, você chega lá.";
  tela(`
    <h2>Resultado</h2>
    <p class="sub">${S.materia.nome} · atividades ${S.tipo.nome.toLowerCase()}</p>
    <div class="anel" style="--p:${pct}"><strong>${pct}%</strong></div>
    <p>${msg}</p>
    <div class="placar">
      <div class="stat">Pontos<b>${ac * PTS} / ${n * PTS}</b></div>
      <div class="stat a">Acertos<b>${ac}</b></div>
      <div class="stat e">Erros<b>${er}</b></div>
    </div>
    <div class="acoes">
      <button class="btn" id="re">Refazer atividade</button>
      <button class="btn sec" id="ot">Outro tipo</button>
      <button class="btn sec" id="hm">Escolher matéria</button>
    </div>`, "final");
  $("#re").onclick = () => iniciar(S.tipo); // reembaralha as questões
  $("#ot").onclick = () => tipos(S.materia);
  $("#hm").onclick = home;
}

$("#marca").onclick = home;
home();
