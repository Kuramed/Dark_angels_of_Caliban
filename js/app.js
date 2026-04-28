


class Categoria { constructor(nome, descricao) { this.id_categoria = Date.now(); this.nome = nome; this.descricao = descricao; } }
class Curso { constructor(titulo, id_categoria, nivel, totalAulas, totalHoras) { this.id_curso = Date.now(); this.titulo = titulo; this.id_categoria = id_categoria; this.nivel = nivel; this.totalAulas = totalAulas; this.totalHoras = totalHoras; } }
class Modulo { constructor(id_curso, titulo, ordem) { this.id_modulo = Date.now(); this.id_curso = id_curso; this.titulo = titulo; this.ordem = ordem; } }
class Aula { constructor(id_modulo, titulo, tipoConteudo, url) { this.id_aula = Date.now(); this.id_modulo = id_modulo; this.titulo = titulo; this.tipoConteudo = tipoConteudo; this.urlConteudo = url; } }

const DB = {
    categorias: [{ id_categoria: 1, nome: "Programação", descricao: "Lógica e código" }],
    cursos: [{ id_curso: 1, titulo: "JavaScript do Zero", id_categoria: 1, nivel: "Iniciante", totalAulas: 10, totalHoras: 20 }],
    modulos: [],
    aulas: [],
    usuarios: [{ id_usuario: 1, nome: "Kuramed", email: "kuramed@devtech.com", senha: "123" }],
    matriculas: [],
    certificados: [],
    planos: [
        { id_plano: 1, nome: "Mensal Básico", preco: 29.90, duracao: 1 },
        { id_plano: 2, nome: "Anual Premium", preco: 299.90, duracao: 12 }
    ],
    pagamentos: []
};

class CategoriaController {
    salvar() {
        const nome = document.getElementById('catNome').value;
        const desc = document.getElementById('catDesc').value;
        if (!nome) return alert("Preencha o nome da categoria!");
        DB.categorias.push(new Categoria(nome, desc));
        this.render();
        cursoCtrl.atualizarSelects(); 
        document.getElementById('catNome').value = ""; document.getElementById('catDesc').value = "";
    }
    render() {
        const tbody = document.getElementById('tabela-categorias'); tbody.innerHTML = "";
        DB.categorias.forEach(cat => tbody.innerHTML += `<tr><td>${cat.id_categoria}</td><td>${cat.nome}</td><td>${cat.descricao}</td></tr>`);
    }
}

class CursoController {
    atualizarSelects() {
        const select = document.getElementById('curCategoria');
        select.innerHTML = `<option value="">Selecione a Categoria...</option>` + 
            DB.categorias.map(cat => `<option value="${cat.id_categoria}">${cat.nome}</option>`).join('');
    }
    salvar() {
        const titulo = document.getElementById('curTitulo').value;
        const idCat = document.getElementById('curCategoria').value;
        const nivel = document.getElementById('curNivel').value;
        const aulas = document.getElementById('curAulas').value;
        const horas = document.getElementById('curHoras').value;
        if (!titulo || !idCat) return alert("Preencha o título e selecione uma categoria!");
        
        DB.cursos.push(new Curso(titulo, parseInt(idCat), nivel, aulas, horas));
        this.render();
        moduloCtrl.atualizarSelects(); 
        alunoCtrl.atualizarSelects();  
        
        document.getElementById('curTitulo').value = "";
    }
    render() {
        const tbody = document.getElementById('tabela-cursos'); tbody.innerHTML = "";
        DB.cursos.forEach(curso => {
            const catNome = DB.categorias.find(c => c.id_categoria === curso.id_categoria)?.nome || "N/A";
            tbody.innerHTML += `<tr><td>${curso.titulo}</td><td><span class="badge bg-primary">${catNome}</span></td><td>${curso.nivel}</td><td>${curso.totalHoras}h</td></tr>`;
        });
    }
}

class ModuloController {
    atualizarSelects() {
        const select = document.getElementById('modCurso');
        select.innerHTML = `<option value="">Selecione o Curso...</option>` + 
            DB.cursos.map(c => `<option value="${c.id_curso}">${c.titulo}</option>`).join('');
    }
    salvar() {
        const idCurso = document.getElementById('modCurso').value; const titulo = document.getElementById('modTitulo').value; const ordem = document.getElementById('modOrdem').value;
        if (!idCurso || !titulo) return alert("Selecione o curso e digite o título!");
        DB.modulos.push(new Modulo(parseInt(idCurso), titulo, ordem));
        this.render();
        aulaCtrl.atualizarSelects(); 
        document.getElementById('modTitulo').value = "";
    }
    render() {
        const tbody = document.getElementById('tabela-modulos'); tbody.innerHTML = "";
        DB.modulos.forEach(mod => {
            const cursoNome = DB.cursos.find(c => c.id_curso === mod.id_curso)?.titulo || "N/A";
            tbody.innerHTML += `<tr><td><span class="badge bg-success">${cursoNome}</span></td><td>${mod.titulo}</td><td>${mod.ordem}</td></tr>`;
        });
    }
}

class AulaController {
    atualizarSelects() {
        const select = document.getElementById('aulaModulo');
        select.innerHTML = `<option value="">Selecione o Módulo...</option>` + 
            DB.modulos.map(m => {
                const cursoNome = DB.cursos.find(c => c.id_curso === m.id_curso)?.titulo || "";
                return `<option value="${m.id_modulo}">${m.titulo} (${cursoNome})</option>`;
            }).join('');
    }
    salvar() {
        const idMod = document.getElementById('aulaModulo').value; const titulo = document.getElementById('aulaTitulo').value; const tipo = document.getElementById('aulaTipo').value; const url = document.getElementById('aulaUrl').value;
        if (!idMod || !titulo) return alert("Selecione o módulo e digite o título!");
        DB.aulas.push(new Aula(parseInt(idMod), titulo, tipo, url));
        this.render(); document.getElementById('aulaTitulo').value = "";
    }
    render() {
        const tbody = document.getElementById('tabela-aulas'); tbody.innerHTML = "";
        DB.aulas.forEach(aula => {
            const modNome = DB.modulos.find(m => m.id_modulo === aula.id_modulo)?.titulo || "N/A";
            tbody.innerHTML += `<tr><td><span class="badge bg-warning text-dark">${modNome}</span></td><td>${aula.titulo}</td><td>${aula.tipo}</td></tr>`;
        });
    }
}

class AlunoController {
    atualizarSelects() {
        
        const optionsAluno = `<option value="">Selecione o Aluno...</option>` + 
            DB.usuarios.map(u => `<option value="${u.id_usuario}">${u.nome}</option>`).join('');
        
        document.getElementById('matUsuario').innerHTML = optionsAluno;
        document.getElementById('payUsuario').innerHTML = optionsAluno;

        
        document.getElementById('matCurso').innerHTML = `<option value="">Selecione o Curso...</option>` + 
            DB.cursos.map(c => `<option value="${c.id_curso}">${c.titulo}</option>`).join('');
    }

    cadastrar() {
        const nome = document.getElementById('usuNome').value; const email = document.getElementById('usuEmail').value; const senha = document.getElementById('usuSenha').value;
        if (!nome || !email) return alert("Preencha Nome e E-mail!");
        
        DB.usuarios.push({ id_usuario: Date.now(), nome, email, senha });
        alert(`Conta de ${nome} criada com sucesso!`);
        
        document.getElementById('usuNome').value = ""; document.getElementById('usuEmail').value = ""; document.getElementById('usuSenha').value = "";
        this.atualizarSelects(); 
    }

    matricular() {
        const idUser = document.getElementById('matUsuario').value; const idCurso = document.getElementById('matCurso').value;
        if (!idUser || !idCurso) return alert("Selecione um Aluno e um Curso!");
        
        DB.matriculas.push({ id_matricula: Date.now(), id_usuario: parseInt(idUser), id_curso: parseInt(idCurso), status: "Concluído" });
        this.renderMatriculas();
    }

    gerarCertificado(idUser, idCurso) {
        const aluno = DB.usuarios.find(u => u.id_usuario === idUser)?.nome;
        const curso = DB.cursos.find(c => c.id_curso === idCurso)?.titulo;
        const hash = Math.random().toString(36).substr(2, 9).toUpperCase();
        alert(`🎓 CERTIFICADO DE CONCLUSÃO\n\nAluno: ${aluno}\nCurso: ${curso}\n\nCódigo de Verificação: ${hash}\nStatus: Válido`);
    }

    renderMatriculas() {
        const tbody = document.getElementById('tabela-matriculas'); tbody.innerHTML = "";
        DB.matriculas.forEach(mat => {
            const alunoNome = DB.usuarios.find(u => u.id_usuario === mat.id_usuario)?.nome || "N/A";
            const cursoNome = DB.cursos.find(c => c.id_curso === mat.id_curso)?.titulo || "N/A";
            tbody.innerHTML += `<tr><td>${alunoNome}</td><td>${cursoNome}</td><td><span class="badge bg-success">Concluído</span></td><td><button class="btn btn-sm btn-outline-success" onclick="alunoCtrl.gerarCertificado(${mat.id_usuario}, ${mat.id_curso})">🧾 Emitir PDF</button></td></tr>`;
        });
    }
}

class FinanceiroController {
    init() {
        const select = document.getElementById('payPlano');
        if(select) {
            select.innerHTML = `<option value="">Selecione...</option>` + DB.planos.map(p => 
                `<option value="${p.id_plano}">${p.nome} - R$ ${p.preco.toFixed(2)}</option>`
            ).join('');
        }
    }
    processarPagamento() {
        const idUser = document.getElementById('payUsuario').value; const idPlano = document.getElementById('payPlano').value; const metodo = document.getElementById('payMetodo').value;
        if (!idUser || !idPlano) return alert("Selecione quem está pagando e o Plano!");
        
        const transacaoID = "TXN-" + Math.floor(Math.random() * 1000000);
        DB.pagamentos.push({ id_transacao: transacaoID, id_usuario: parseInt(idUser), id_plano: parseInt(idPlano), metodo: metodo, status: "Aprovado" });
        alert(`✅ Pagamento Aprovado!\nTransação: ${transacaoID}\nMétodo: ${metodo}`);
        this.renderPagamentos();
    }
    renderPagamentos() {
        const tbody = document.getElementById('tabela-pagamentos'); tbody.innerHTML = "";
        DB.pagamentos.forEach(pay => {
            const alunoNome = DB.usuarios.find(u => u.id_usuario === pay.id_usuario)?.nome || "N/A";
            const plano = DB.planos.find(p => p.id_plano === pay.id_plano);
            tbody.innerHTML += `<tr><td class="fw-bold text-primary">${pay.id_transacao}</td><td>${alunoNome}</td><td>${plano ? plano.nome : 'N/A'} (R$ ${plano ? plano.preco.toFixed(2) : '0'})</td><td>${pay.metodo}</td><td><span class="badge bg-success">Aprovado</span></td></tr>`;
        });
    }
}

const catCtrl = new CategoriaController();
const cursoCtrl = new CursoController();
const moduloCtrl = new ModuloController();
const aulaCtrl = new AulaController();
const alunoCtrl = new AlunoController();
const finCtrl = new FinanceiroController();

catCtrl.render();
cursoCtrl.render();
cursoCtrl.atualizarSelects();
moduloCtrl.render();
moduloCtrl.atualizarSelects();
aulaCtrl.render();
aulaCtrl.atualizarSelects();
alunoCtrl.renderMatriculas();
alunoCtrl.atualizarSelects();
finCtrl.init();
finCtrl.renderPagamentos();