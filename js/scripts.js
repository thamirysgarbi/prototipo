

// ======== ALERTAS INTELIGENTES (ESTOQUE) ========

// Exemplo de dados (isso depois vem do backend)
const estoqueProdutos = [
    {
        nome: 'Shampoo Reconstrutor',
        estoqueAtual: 2,
        estoqueMinimo: 5,
        vendasMediaDia: 1
    },
    {
        nome: 'Máscara Capilar',
        estoqueAtual: 5,
        estoqueMinimo: 5,
        vendasMediaDia: 0.7
    },
    {
        nome: 'Pomada Modeladora',
        estoqueAtual: 18,
        estoqueMinimo: 5,
        vendasMediaDia: 3
    }
];

const alertsContainer = document.getElementById('alertsContainer');

function gerarAlertasEstoque() {
    let alertas = [];

    estoqueProdutos.forEach(produto => {
        const diasRestantes = Math.ceil(produto.estoqueAtual / produto.vendasMediaDia);

        // 🔴 Estoque abaixo do mínimo
        if (produto.estoqueAtual <= produto.estoqueMinimo) {
            alertas.push({
                tipo: 'danger',
                texto: `<strong>${produto.nome}</strong> está abaixo do estoque mínimo.
        Com o ritmo atual, pode acabar em <strong>${diasRestantes} dias</strong>.`
            });
        }

        // 🟡 Estoque próximo do mínimo
        else if (produto.estoqueAtual <= produto.estoqueMinimo * 1.5) {
            alertas.push({
                tipo: 'warning',
                texto: `<strong>${produto.nome}</strong> está com estoque baixo.
        Estoque estimado para <strong>${diasRestantes} dias</strong>.`
            });
        }

        // 🔵 Oportunidade (alto giro)
        else if (produto.vendasMediaDia >= 2) {
            alertas.push({
                tipo: 'info',
                texto: `<strong>${produto.nome}</strong> tem alto giro e boa saída.
        Pode ser destacado para aumentar o ticket médio.`
            });
        }
    });

    // Renderização (máx. 3 alertas)
    alertas.slice(0, 3).forEach(alerta => {
        const div = document.createElement('div');
        div.className = `insight ${alerta.tipo}`;
        div.innerHTML = alerta.texto;
        alertsContainer.appendChild(div);
    });

    // Se não tiver alertas, esconder o bloco
    if (alertas.length === 0) {
        alertsContainer.parentElement.style.display = 'none';
    }
}

// Inicializa
gerarAlertasEstoque();


// ======== ALERTAS DE ANIVERSÁRIO (CLIENTES) ========

// Exemplo de dados (backend depois)
const clientes = [
    { nome: 'Ana Silva', aniversario: '2026-03-17' },
    { nome: 'Carla Mendes', aniversario: '2025-12-18' },
    { nome: 'Juliana Costa', aniversario: '2025-12-20' },
    { nome: 'Marcos Lima', aniversario: '2025-12-23' }
];

const alertsClientes = document.getElementById('alertsClientes');

function gerarAlertasClientes() {
    const hoje = new Date();
    const hojeStr = hoje.toISOString().slice(5, 10); // MM-DD

    const aniversariosHoje = [];
    const aniversariosSemana = [];

    clientes.forEach(cliente => {
        const data = cliente.aniversario.slice(5, 10);

        if (data === hojeStr) {
            aniversariosHoje.push(cliente.nome);
        }

        const diffDias =
            (new Date(hoje.getFullYear(), parseInt(data.slice(0, 2)) - 1, parseInt(data.slice(3, 5))) - hoje) / (1000 * 60 * 60 * 24);

        if (diffDias > 0 && diffDias <= 7) {
            aniversariosSemana.push(cliente.nome);
        }
    });

    // 🎂 Aniversários hoje
    if (aniversariosHoje.length > 0) {
        const div = document.createElement('div');
        div.className = 'insight info';
        div.innerHTML = `
      🎂 <strong>${aniversariosHoje.length} cliente(s)</strong> fazem aniversário hoje.
      Entrar em contato pode aumentar o retorno nos próximos dias.
    <a href="#"
   class="report-link"
   data-report="financeiro"
   data-context="valores-a-receber">
  Todos os aniversariantes
  <span class="arrow">→</span>
</a>` ;
        alertsClientes.appendChild(div);
    }

    // 🔁 Retornos hoje
    if (aniversariosHoje.length > 0) {
        const div = document.createElement('div');
        div.className = 'insight info';
        div.innerHTML = `
      🔁 <strong>${aniversariosHoje.length} cliente(s)</strong> tem  retorno previsto para hoje.
      Entrar em contato pode aumentar os agendamentos nos próximos dias.
    <a href="#"
   class="report-link"
   data-report="financeiro"
   data-context="valores-a-receber">
  Visualizar retornos
  <span class="arrow">→</span>
</a>` ;
        alertsClientes.appendChild(div);
    }

    // Se não tiver alertas
    if (!alertsClientes.hasChildNodes()) {
        alertsClientes.parentElement.style.display = 'none';
    }
}

// Inicializa
gerarAlertasClientes();


// ======== MOVIMENTAÇÕES DO DIA (CANCELAMENTOS) ========

// Exemplo de dados (backend depois)
const movimentacoesAgenda = [
    {
        tipo: 'cancelamento',
        cliente: 'Maria Oliveira',
        servico: 'Manicure',
        horario: '14:00'
    },
    {
        tipo: 'cancelamento',
        cliente: 'João Santos',
        servico: 'Corte Masculino',
        horario: '16:30'
    }
];

const containerMovimentacoes = document.getElementById('movimentacoesHoje');

function gerarMovimentacoesHoje() {
    let total = 0;

    movimentacoesAgenda.forEach(evento => {
        total++;

        if (evento.tipo === 'cancelamento') {
            const div = document.createElement('div');
            div.className = 'insight warning';
            div.innerHTML = `
        ⚠️ <strong>${evento.cliente}</strong> cancelou o agendamento de hoje
        (${evento.servico} às ${evento.horario}).
        <br><small>Você pode tentar reagendar esse horário.</small>
      `;
            containerMovimentacoes.appendChild(div);
        }
    });

    // Se não houver movimentações
    if (total === 0) {
        containerMovimentacoes.innerHTML = `
      <div class="insight neutral">
        ✅ Nenhum cancelamento registrado hoje.
        Sua agenda segue estável.
      </div>
    `;
    }
}

// Inicializa
gerarMovimentacoesHoje();


document.querySelectorAll('.nav-tabs .nav-link').forEach(tab => {
    tab.addEventListener('shown.bs.tab', function () {
        this.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest'
        });
    });
});




function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    // MOBILE
    if (window.innerWidth < 992) {
        sidebar.classList.toggle('mobile-open');
        overlay.classList.toggle('show');
        return;
    }

    // DESKTOP
    sidebar.classList.toggle('closed');
    closeAllSubmenus();
}

function closeSidebarMobile() {
    document.getElementById('sidebar').classList.remove('mobile-open');
    document.getElementById('sidebarOverlay').classList.remove('show');
}

// Fecha ao redimensionar
window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
        closeSidebarMobile();
    }
});



function toggleSubmenu(el) {
    const item = el.closest('.menu-item');

    // Fecha outros submenus (opcional, mas UX melhor)
    document.querySelectorAll('.menu-item').forEach(i => {
        if (i !== item) i.classList.remove('open');
    });

    item.classList.toggle('open');
}

function closeAllSubmenus() {
    document.querySelectorAll('.menu-item.open').forEach(item => {
        item.classList.remove('open');
    });
}





document.querySelectorAll('.sidebar-menu a').forEach(link => {
    link.addEventListener('click', (e) => {


        // MOBILE
        if (window.innerWidth < 992) {

            // Se o link ABRE SUBMENU, não fecha o menu
            if (link.closest('.has-submenu')) {
                e.preventDefault();
                return;
            }

            // Se for link final, fecha o menu
            closeSidebarMobile();
        }



    });
});





function abrirInfoDashboard() {
    const modal = new bootstrap.Modal(
        document.getElementById('modalInfoDashboard')
    );
    modal.show();
}



function abrirPagina(id) {
    document.querySelectorAll('.app-page').forEach(page => {
        page.classList.add('d-none');
    });

    const page = document.getElementById(id);
    if (page) page.classList.remove('d-none');

    atualizarBotaoGlobal(id);

    // fechar painel insight ao trocar de página
    const insightPanel = document.getElementById("insightPanel");
    const overlay = document.querySelector(".insight-overlay");

    if (insightPanel) insightPanel.classList.remove("active");
    if (overlay) overlay.classList.remove("active");

    if (window.innerWidth < 992 && typeof closeSidebarMobile === "function") {
        closeSidebarMobile();
    }
}

const acoesPorPagina = {
    "page-servicos": {
        texto: "+ Novo serviço",
        acao: "abrirModalNovoServico()"
    }
};

function atualizarBotaoGlobal(id) {
    const box = document.getElementById('globalActionBox');
    if (!box) return;

    box.innerHTML = '';

    if (acoesPorPagina[id]) {
        const { texto, acao } = acoesPorPagina[id];

        box.innerHTML = `
      <button class="btn-novo" onclick="${acao}">
        ${texto}
      </button>
    `;
    }
}






const START_HOUR = 8; // 08:00
const PX_PER_MIN = 1;

document.querySelectorAll('.slot').forEach(slot => {
    const [h, m] = slot.dataset.start.split(':').map(Number);
    const top = ((h * 60 + m) - (START_HOUR * 60)) * PX_PER_MIN;

    slot.style.top = top + 'px';

    const cards = slot.querySelectorAll('.appointment');
    let maxDuration = 0;

    cards.forEach(card => {
        const duration = parseInt(card.dataset.duration, 10);
        card.style.height = duration + 'px';
        maxDuration = Math.max(maxDuration, duration);
    });

    slot.style.height = maxDuration + 'px';
});

const dayBtn = document.getElementById('dayBtn');
const weekBtn = document.getElementById('weekBtn');
const monthBtn = document.getElementById('monthBtn');

const dayView = document.getElementById('dayView');
const weekView = document.getElementById('weekView');
const monthView = document.getElementById('monthView');

const title = document.getElementById('title');

function hideAll() {
    dayView.style.display = 'none';
    weekView.style.display = 'none';
    monthView.style.display = 'none';
}

dayBtn.onclick = () => {
    hideAll();
    dayView.style.display = 'block';

    dayBtn.classList.add('active');
    weekBtn.classList.remove('active');
    monthBtn.classList.remove('active');

    title.innerText = 'Agenda • Dia';
};

weekBtn.onclick = () => {
    hideAll();
    weekView.style.display = 'block';

    weekBtn.classList.add('active');
    dayBtn.classList.remove('active');
    monthBtn.classList.remove('active');

    title.innerText = '📅 Agenda • Semana';
};

monthBtn.onclick = () => {
    hideAll();
    monthView.style.display = 'block';

    monthBtn.classList.add('active');
    dayBtn.classList.remove('active');
    weekBtn.classList.remove('active');

    title.innerText = '📅 Agenda • Mês';
};

const monthEvents = {
    1: [
        { time: '09:00', title: 'Limpeza', duration: 60, professional: 'Ana', color: 'purple' },
        { time: '11:00', title: 'Avaliação', duration: 30, professional: 'Carla', color: 'blue' }
    ],
    2: [
        { time: '14:00', title: 'Drenagem', duration: 60, professional: 'Ana', color: 'green' }
    ],
    4: [
        { time: '10:30', title: 'Skinbooster', duration: 60, professional: 'Eva', color: 'pink' },
        { time: '15:00', title: 'Consulta', duration: 30, professional: 'Carla', color: 'amber' }
    ],
    6: [
        { time: '09:00', title: 'Limpeza', duration: 60, professional: 'Ana', color: 'purple' },
        { time: '10:00', title: 'Corte', duration: 45, professional: 'Bruno', color: 'blue' },
        { time: '11:00', title: 'Barba', duration: 30, professional: 'Bruno', color: 'green' },
        { time: '12:00', title: 'Avaliação Facial', duration: 30, professional: 'Carla', color: 'amber' },
        { time: '15:00', title: 'Drenagem Linfática', duration: 60, professional: 'Ana', color: 'blue' }
    ],
    12: [
        { time: '09:00', title: 'Massagem', duration: 60, professional: 'Eva', color: 'pink' },
        { time: '10:00', title: 'Corte', duration: 45, professional: 'Bruno', color: 'blue' },
        { time: '11:00', title: 'Barba', duration: 30, professional: 'Bruno', color: 'green' },
        { time: '12:00', title: 'Avaliação Facial', duration: 30, professional: 'Carla', color: 'amber' },
        { time: '15:00', title: 'Drenagem Linfática', duration: 60, professional: 'Ana', color: 'blue' },
        { time: '18:00', title: 'Hidratação Profunda', duration: 90, professional: 'Eva', color: 'blue' }
    ]
};


let selectedProfessional = 'all';

document
    .getElementById('monthProfessional')
    .addEventListener('change', e => {
        selectedProfessional = e.target.value;
        renderMonth(2026, 1); // re-renderiza fevereiro
    });


function renderMonth(year, month) {
    const calendar = document.getElementById('monthCalendar');
    calendar.innerHTML = '';

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // 0 = domingo → queremos 0 = segunda
    let startWeekDay = firstDay.getDay() - 1;
    if (startWeekDay < 0) startWeekDay = 6;

    // espaços vazios antes do dia 1
    for (let i = 0; i < startWeekDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'month-day';
        empty.innerHTML = `<span class="day-number"></span>`;
        calendar.appendChild(empty);
    }

    // dias do mês
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const cell = document.createElement('div');
        cell.className = 'month-day';

        // número do dia
        const number = document.createElement('span');
        number.className = 'day-number';
        number.innerText = day;
        cell.appendChild(number);

        if (monthEvents[day]) {

            // mini cards (visão mensal)
            monthEvents[day].slice(0, 3).forEach(event => {
                const e = document.createElement('div');
                e.className = `mini-card ${event.color}`;
                e.innerText = `${event.time} ${event.title} • ${event.professional}`;
                cell.appendChild(e);
            });

            if (monthEvents[day].length > 3) {
                const more = document.createElement('div');
                more.className = 'more';
                more.innerText = `+${monthEvents[day].length - 3}`;
                cell.appendChild(more);
            }


            // tooltip (lista completa)
            const tooltip = document.createElement('div');
            tooltip.className = 'day-tooltip';

            let list = '<strong>' + day + ' de Fevereiro</strong><ul>';

            monthEvents[day].forEach(event => {
                list += `<li>${event.time} • ${event.title} (${event.duration}min) • ${event.professional}</li>`;

            });

            list += '</ul>';
            tooltip.innerHTML = list;

            cell.appendChild(tooltip);
        }


        calendar.appendChild(cell);
    }
}

renderMonth(2026, 1); // Fevereiro 2026

const agendaLayout = document.querySelector('.agenda-layout');
const toggleBtn = document.getElementById('toggleAgendaPanel');

toggleBtn.addEventListener('click', () => {
    agendaLayout.classList.toggle('panel-hidden');
});





const cashbackData = {
    gerado: 3800,
    usado: 2380,
    expirado: 120,
    clientes: [
        { nome: 'Ana Paula', saldo: 45, status: 'Ativo' },
        { nome: 'Juliana', saldo: 12, status: 'Expira em breve' },
        { nome: 'Carlos', saldo: 0, status: 'Usado' }
    ]
};



function carregarCashback() {
    const totalAtivo =
        cashbackData.gerado -
        cashbackData.usado -
        cashbackData.expirado;

    document.getElementById('gerado').innerText =
        cashbackData.gerado.toLocaleString('pt-BR', {
            minimumFractionDigits: 2
        });
    document.getElementById('usado').innerText =
        cashbackData.usado.toLocaleString('pt-BR', {
            minimumFractionDigits: 2
        });

    document.getElementById('expirado').innerText =
        cashbackData.expirado.toLocaleString('pt-BR', {
            minimumFractionDigits: 2
        });

    document.getElementById('totalAtivo').innerText =
        (cashbackData.gerado - cashbackData.usado - cashbackData.expirado)
            .toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    const tbody = document.getElementById('cashbackClientes');
    tbody.innerHTML = '';

    cashbackData.clientes.forEach(c => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
      <td>${c.nome}</td>
      <td>R$${c.saldo.toFixed(2)}</td>
      <td>
        <span class="badge ${c.status.includes('Expira') ? 'warn' : 'ok'
            }">${c.status}</span>
      </td>
      <td>
        <button class="whatsapp-btn" title="Enviar WhatsApp">
          <i class="fab fa-whatsapp"></i>
          Chamar
        </button>
      </td>
    `;

        tbody.appendChild(tr);
    });
}

// carrega quando abrir a página
document
    .querySelector('[onclick="abrirPagina(\'page-cashback\')"]')
    ?.addEventListener('click', carregarCashback);



function abrirModalServico(id) {
    const modal = document.getElementById('modalServico');
    modal.style.display = 'flex';
    document.getElementById('modalTitulo').innerText =
        'Configurar serviço #' + id;
}

function fecharModal() {
    document.getElementById('modalServico').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const geraCashback = document.getElementById('geraCashback');
    const cashbackConfig = document.getElementById('cashbackConfig');
    const aceitaCashback = document.getElementById('aceitaCashback');
    const limites = document.getElementById('limitesCashback');

if (geraCashback && cashbackConfig) {
    geraCashback.addEventListener('change', () => {
        cashbackConfig.classList.toggle('hidden', !geraCashback.checked);
    });
}

   if (aceitaCashback && limites) {
    aceitaCashback.addEventListener('change', () => {
        limites.classList.toggle('hidden', !aceitaCashback.checked);
    });
}
});




const despesas = [
    {
        descricao: 'CAESB - Dezembro',
        entidade: 'Companhia de Saneamento',
        pagamento: 'PIX Nubank',
        vencimento: '2026-01-01',
        valor: 65.42,
        pago: false
    },
    {
        descricao: 'Marketing Digital',
        entidade: 'Israel Macedo',
        pagamento: 'PIX Nubank',
        vencimento: '2026-01-08',
        valor: 649.00,
        pago: true
    },
    {
        descricao: 'Energia elétrica',
        entidade: 'Neoenergia',
        pagamento: 'PIX Stone',
        vencimento: '2026-01-08',
        valor: 801.67,
        pago: false
    }
];

let filtroAtual = 'todos';

function calcularStatus(d) {
    if (d.pago) return 'pago';

    const hoje = new Date().toISOString().split('T')[0];

    if (d.vencimento < hoje) return 'vencido'; if (d.vencimento === hoje) return 'hoje'; return 'avencer';
} function
    render() {
    const tbody = document.getElementById('tabelaDespesas'); tbody.innerHTML = ''; let total = {
        vencido: 0,
        hoje: 0, avencer: 0, pago: 0
    }; despesas.forEach(d => {
        const status = calcularStatus(d);
        total[status] += d.valor;

        if (filtroAtual !== 'todos' && filtroAtual !== status) return;

        tbody.innerHTML += `
      <tr>
        <td>${d.descricao}</td>
        <td>${d.entidade}</td>
        <td>${d.pagamento}</td>
        <td>${new Date(d.vencimento).toLocaleDateString('pt-BR')}</td>
        <td><span class="badge ${status}">${status}</span></td>
        <td class="right">R$${d.valor.toFixed(2)}</td>
        <td class="actions-cell">
          👁️ ✏️ 💰
        </td>
      </tr>
      `;
    });

    document.getElementById('totalVencido').innerText = total.vencido.toFixed(2);
    document.getElementById('totalHoje').innerText = total.hoje.toFixed(2);
    document.getElementById('totalAvencer').innerText = total.avencer.toFixed(2);
    document.getElementById('totalPagoDespesas').innerText = total.pago.toFixed(2);
    document.getElementById('totalGeral').innerText =
        Object.values(total).reduce((a, b) => a + b, 0).toFixed(2);
}

function filtrarStatus(status) {
    filtroAtual = status;
    render();
}

render();



function toggleInsight() {
    document.getElementById("insightPanel").classList.toggle("active");
    document.querySelector(".insight-overlay").classList.toggle("active");
}

function checkPacotesPage() {
    const pacotesPage = document.getElementById("page-pacotes");
    const button = document.querySelector(".buttom-box");

    // Ajuste aqui dependendo de como você controla páginas
    if (pacotesPage && !pacotesPage.classList.contains("d-none")) {
        button.style.display = "flex";
    } else {
        button.style.display = "none";
    }
}

// roda sempre que a página carregar
document.addEventListener("DOMContentLoaded", checkPacotesPage);

// se você troca páginas via JS, chame checkPacotesPage()
// sempre que mudar de página




function abrirModalNovoServico() {

    const overlay = document.getElementById("tourOverlay");
    const botao = document.getElementById("btn-novo-servico");

    if (overlay) overlay.classList.remove("active");
    if (botao) botao.classList.remove("tour-highlight");

    document.getElementById('modalNovoServico').style.display = 'flex';
}

function irParaServico() {

    // troca de página usando sua função padrão
    abrirPagina('page-servicos');

    // pequeno delay para garantir render
    setTimeout(() => {

        const overlay = document.getElementById("tourOverlay");
        const botao = document.getElementById("btn-novo-servico");

        if (overlay) overlay.classList.add("active");
        if (botao) botao.classList.add("tour-highlight");

    }, 200);
}


function fecharModalNovoServico() {
    document.getElementById('modalNovoServico').style.display = 'none';
}

function salvarNovoServico() {

    const nome = document.getElementById('novoNome').value;
    const categoria = document.getElementById('novaCategoria').value;
    const preco = document.getElementById('novoPreco').value;
    const duracao = document.getElementById('novaDuracao').value;

    if (!nome || !preco || !duracao) {
        alert("Preencha os campos obrigatórios");
        return;
    }

    const grid = document.querySelector('#page-servicos .services-grid');

    const novoCard = document.createElement('div');
    novoCard.className = 'service-card';

    novoCard.innerHTML = `
    <h4>${nome}</h4>
    <p class="service-muted">${categoria || 'Sem categoria'}</p>

    <div class="service-meta">
      <span>R$ ${parseFloat(preco).toFixed(2)}</span>
      <span>${duracao} min</span>
    </div>

    <span class="cashback-badge"><i class="fas fa-heart"></i> Fidelização ativa</span>
  `;

    grid.appendChild(novoCard);

    fecharModalNovoServico();

    const btnOnboarding = document.getElementById("btn-onboarding-servico");

    if (btnOnboarding) {
        btnOnboarding.disabled = true;
        btnOnboarding.classList.add("disabled");
        btnOnboarding.innerText = "Serviço cadastrado ✓";
    }
}




const toggleTheme = document.getElementById("toggleTheme");

function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");

}

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    applyTheme(savedTheme);
} else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
}

toggleTheme.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";

    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    updateThemePreviews(); // 🔥 ATUALIZA OS PREVIEWS
});


const trialDays = 10;
const signupDate = new Date("2026-02-15");

const today = new Date();
const diffTime = today - signupDate;
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

const currentDay = Math.min(diffDays + 1, trialDays);
const percentage = (currentDay / trialDays) * 100;

const trialBar = document.getElementById("trialBar");
const trialText = document.getElementById("trialText");

if (diffDays >= trialDays) {
    trialText.innerText = "Encerrado";
    trialBar.style.width = "100%";
} else {
    trialText.innerText = `Dia ${currentDay} de ${trialDays}`;
    trialBar.style.width = percentage + "%";
}






const modal = document.getElementById("modalComanda");

document.querySelectorAll(".btn-novo").forEach(btn => {
    btn.addEventListener("click", () => {
        modal.style.display = "flex";
        atualizarData();
    });
});

function fecharComanda() {
    modal.style.display = "none";
}

function atualizarData() {
    const agora = new Date();
    document.getElementById("comandaData").innerText =
        agora.toLocaleDateString("pt-BR") + " • " +
        agora.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
}




function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function calcularTotalComanda() {

    let total = 0;

    document.querySelectorAll(".total-item").forEach(input => {
        const valor = parseFloat(input.value) || 0;
        total += valor;
    });

    document.getElementById("totalComanda").innerText = formatarMoeda(total);
    document.getElementById("totalCobrar").innerText = formatarMoeda(total);



    return total;

}

function atualizarPagamento() {

    const total = calcularTotalComanda();

    const pago = parseFloat(
        document.getElementById("valorPagamento").value
    ) || 0;

    document.getElementById("totalPago").innerText = formatarMoeda(pago);

    const restante = total - pago;

    if (restante > 0) {
        document.getElementById("totalCobrar").innerText = formatarMoeda(restante);
        document.getElementById("troco").innerText = "R$ 0,00";
    } else {
        document.getElementById("totalCobrar").innerText = "R$ 0,00";
        document.getElementById("troco").innerText =
            restante < 0 ? formatarMoeda(Math.abs(restante)) : "R$ 0,00";
    }
}


calcularTotalComanda();

function calcularLinha(linha) {

    const valor = parseFloat(linha.querySelector(".valor-item")?.value) || 0;
    const qtd = parseFloat(linha.querySelector(".quantidade-item")?.value) || 1;
    const desc = parseFloat(linha.querySelector(".desconto-item")?.value) || 0;
    const acresc = parseFloat(linha.querySelector(".acrescimo-item")?.value) || 0;

    let total = valor * qtd;

    total -= total * (desc / 100);
    total += total * (acresc / 100);

    linha.querySelector(".total-item").value = total.toFixed(2);

    calcularTotalComanda();
}

document.addEventListener("input", function (e) {

    if (
        e.target.classList.contains("valor-item") ||
        e.target.classList.contains("quantidade-item") ||
        e.target.classList.contains("desconto-item") ||
        e.target.classList.contains("acrescimo-item")
    ) {
        const linha = e.target.closest(".row");
        calcularLinha(linha);
    }

});



let numeroComanda = 240;

function salvarComanda() {

    numeroComanda++;

    const cliente = document.querySelector(
        'input[placeholder="Cadastrar - (99) 99999-9999"]'
    ).value || "Cliente Teste";

    const totalComanda = document.getElementById("totalComanda").innerText;
    const totalPago = document.getElementById("totalPago").innerText;
    const totalCobrar = document.getElementById("totalCobrar").innerText;

    const dataHoje = new Date().toLocaleDateString("pt-BR");

    // 🔥 MOCKS
    const servicos = Math.floor(Math.random() * 5) + 1;
    const produtos = Math.floor(Math.random() * 3);
    const pacotes = Math.floor(Math.random() * 2);

    const totalNumerico = parseFloat(
        totalComanda.replace("R$", "").replace(".", "").replace(",", ".")
    ) || 0;

    const custo = (totalNumerico * 0.2).toFixed(2);
    const lucro = (totalNumerico - custo).toFixed(2);

    const formasPagamento = [
        "Cartão de Crédito",
        "Cartão de Débito",
        "Pix",
        "Dinheiro"
    ];

    const formaMock = formasPagamento[
        Math.floor(Math.random() * formasPagamento.length)
    ];

    let statusClasse = "badge-fechada";
    let statusTexto = "Fechada";
    let footerExtra = "";

    // 🔥 Converter valores para número
    const totalNum = parseFloat(
        totalComanda.replace("R$", "").replace(/\./g, "").replace(",", ".")
    ) || 0;

    const pagoNum = parseFloat(
        totalPago.replace("R$", "").replace(/\./g, "").replace(",", ".")
    ) || 0;

    // 🔥 Regras de status
    if (pagoNum < totalNum) {
        statusClasse = "badge-fechada";
        statusTexto = "Fechada";

        const divida = (totalNum - pagoNum)
            .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

        footerExtra = `<div class="danger">Deixou Dívida: ${divida}</div>`;
    }
    else if (pagoNum > totalNum) {
        statusClasse = "badge-fechada";
        statusTexto = "Fechada";

        const credito = (pagoNum - totalNum)
            .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

        footerExtra = `<div class="sucess">Deixou Crédito: ${credito}</div>`;
    }




    const card = document.createElement("div");
    card.className = "comanda-card card-framja";


    // AQUI

    card.innerHTML = `
    <div class="comanda-header">
      <div class="comanda-info">
        <span>${dataHoje}</span>
        <span>Comanda: ${numeroComanda}</span>
      </div>
      </div>

     <div class="comanda-cliente">  
    <div>
      ${cliente}
    </div>
            <div class="comanda-status ${statusClasse}">
          ${statusTexto}
        </div>
        </div>

    <div style="display:flex;justify-content:space-between;">
      <div>
        <div class="meta-caixa">Total Pago</div>
        <div class="total-pago">${totalPago}</div>
      </div>

      <div class="comanda-itens">
        <div>
         <span>Serviços</span>
    <strong>
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"
        style="vertical-align: middle;">
        <circle cx="6" cy="6" r="2"></circle>
        <circle cx="6" cy="18" r="2"></circle>
        <path d="M8 8L20 20"></path>
        <path d="M8 16L20 4"></path>
      </svg>
      ${servicos}
    </strong>
        </div>
        <div>
          <span>Produtos</span>
    <strong>
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"
        style="vertical-align: middle;">
        <path d="M9 3h6"></path>
        <path d="M10 3v4"></path>
        <path d="M14 3v4"></path>
        <rect x="7" y="7" width="10" height="14" rx="2"></rect>
      </svg>
      ${produtos}
    </strong>
        </div>
        <div>
          <span>Pacotes</span>
    <strong>
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"
        style="vertical-align: middle;">
        <path d="M3 7l9-4 9 4-9 4-9-4z"></path>
        <path d="M3 7v10l9 4 9-4V7"></path>
      </svg>
      ${pacotes}
    </strong>
        </div>
      </div>
    </div>

    <div class="comanda-top">
      <div>
        <div class="meta-caixa">Total Comanda</div>
        <div class="valor">${totalComanda}</div>
      </div>

      <div>
        <div class="meta-caixa">Custo</div>
        <div class="custo"><small>R$ ${custo}</small></div>
      </div>

      <div>
        <div class="meta-caixa">Lucro</div>
        <div class="lucro"><small>R$ ${lucro}</small></div>
      </div>
    </div>

    <div class="comanda-footer">
      <div class="pagamentos-inline">
        ${formaMock}: ${totalPago}
      </div>
      ${footerExtra}
    </div>
  `;

    document.getElementById("comandasGrid").prepend(card);

    fecharComanda();
}



// EXCLUIR COMANDA

function excluirComanda(botao) {

    const card = botao.closest(".comanda-card");

    card.style.opacity = "0";
    card.style.transform = "scale(.95)";
    card.style.transition = "all .2s ease";

    setTimeout(() => {
        card.remove();
    }, 200);

}

document.addEventListener("click", function (e) {

    const botao = e.target.closest(".btn-excluir-comanda");

    if (botao) {

        const card = botao.closest(".comanda-card");

        if (!card) return;

        card.style.opacity = "0";
        card.style.transform = "scale(.95)";
        card.style.transition = "all .2s ease";

        setTimeout(() => {
            card.remove();
        }, 200);

    }

});

// OCULTA CAIXA RESUMO

const toggleResumo = document.getElementById("toggleResumo");
const caixaLayout = document.querySelector(".caixa-layout");

const eyeOpen = `
<svg class="icon-search" viewBox="0 0 24 24">
  <polyline points="9 6 15 12 9 18"></polyline>
</svg>

`;

const eyeClosed = `
<svg class="icon-search" viewBox="0 0 24 24">
  <polyline points="15 6 9 12 15 18"></polyline>
</svg>

`;

toggleResumo.addEventListener("click", function () {

    caixaLayout.classList.toggle("resumo-hidden");

    if (caixaLayout.classList.contains("resumo-hidden")) {
        toggleResumo.innerHTML = eyeClosed;
    } else {
        toggleResumo.innerHTML = eyeOpen;
    }

});

document.addEventListener('click', function (e) {

    const btnMobile = e.target.closest('#toggleResumoMobile');
    const caixaLayout = document.querySelector('.caixa-layout');

    if (btnMobile) {
        caixaLayout.classList.toggle('open-resumo');
    }

});




document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("notificationBtn");
    const dropdown = document.getElementById("notificationDropdown");
    const items = document.querySelectorAll(".notification-item");

    if (btn && dropdown) {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.classList.toggle("active");
        });

        document.addEventListener("click", () => {
            dropdown.classList.remove("active");
        });
    }

    items.forEach(item => {
        item.addEventListener("click", (e) => {
            e.stopPropagation();
            items.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            item.classList.remove("unread");
        });
    });

});



(function () {

    const toggleBtn = document.getElementById("themeToggleBtn");
    const dropdown = document.getElementById("themeDropdown");
    const options = dropdown.querySelectorAll("button");

    // Aplicar tema salvo
    const savedTheme = localStorage.getItem("colorTheme");
    if (savedTheme) {
        document.body.setAttribute("data-theme", savedTheme);
    }

    // Abrir / fechar dropdown
    toggleBtn.addEventListener("click", () => {
        dropdown.style.display =
            dropdown.style.display === "flex" ? "none" : "flex";
    });

    // Selecionar tema
    options.forEach(btn => {
        btn.addEventListener("click", () => {
            const theme = btn.getAttribute("data-theme");
            document.body.setAttribute("data-theme", theme);
            localStorage.setItem("colorTheme", theme);
            dropdown.style.display = "none";

            updateThemePreviews(); // 🔥 ATUALIZA TAMBÉM

        });
    });

    // Fechar clicando fora
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".theme-selector")) {
            dropdown.style.display = "none";
        }
    });

})();




function updateThemePreviews() {
    const buttons = document.querySelectorAll(".theme-option");
    const body = document.body;

    const originalTheme = body.getAttribute("data-theme");
    const isDark = body.classList.contains("dark");

    buttons.forEach(button => {
        const theme = button.getAttribute("data-theme");

        // aplica tema temporário
        body.setAttribute("data-theme", theme);

        if (isDark) {
            body.classList.add("dark");
        } else {
            body.classList.remove("dark");
        }

        const styles = getComputedStyle(body);
        const gradient = styles.getPropertyValue("--gradient-main");

        button.style.setProperty("--preview-gradient", gradient);
    });

    // restaura tema original
    body.setAttribute("data-theme", originalTheme);

    if (isDark) {
        body.classList.add("dark");
    } else {
        body.classList.remove("dark");
    }
}

document.addEventListener("DOMContentLoaded", updateThemePreviews);




// ==============================
// 🔹 GERENCIADOR GLOBAL
// ==============================

const charts = [];

function getThemeVar(variable) {
    return getComputedStyle(document.body)
        .getPropertyValue(variable)
        .trim();
}

function createCharts() {

    const primary = getThemeVar('--primary');
    const secondary = getThemeVar('--secondary');
    const tertiary = getThemeVar('--gradient-main');

    charts.push(
        new Chart(chartGeral, {
            type: 'doughnut',
            data: {
                labels: ['Receita', 'Despesas', 'Lucro'],
                datasets: [{
                    data: [18450, 7320, 11130],
                    backgroundColor: [primary, secondary, '#820ad1']
                }]
            }
        })
    );

    charts.push(
        new Chart(chartFinanceiro, {
            type: 'doughnut',
            data: {
                labels: ['Serviços', 'Produtos', 'Pacotes'],
                datasets: [{
                    data: [13200, 5250, 0],
                    backgroundColor: [primary, '#F55ABB', '#6B7280']
                }]
            }
        })
    );

    charts.push(
        new Chart(chartClientes, {
            type: 'doughnut',
            data: {
                labels: ['Novos', 'Recorrentes', 'Inativos'],
                datasets: [{
                    data: [18, 210, 27],
                    backgroundColor: [primary, '#16A34A', '#6B7280']
                }]
            }
        })
    );

    charts.push(
        new Chart(chartOperacao, {
            type: 'bar',
            data: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
                datasets: [{
                    label: 'Atendimentos',
                    data: [32, 28, 35, 30, 40, 49],
                    backgroundColor: primary
                }]
            }
        })
    );

    charts.push(
        new Chart(chartProfissionais, {
            type: 'bar',
            data: {
                labels: [
                    'Eduardo',
                    'Viviane',
                    'Ana Paula',
                    'Carla',
                    'João',
                    'Mariana'
                ],
                datasets: [{
                    label: 'Receita gerada',
                    data: [19150, 9150, 8200, 6100, 3150, 1150],
                    backgroundColor: primary,
                    borderRadius: 6,
                    barThickness: 22
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        grid: {
                            color: '#E5E7EB'
                        },
                        ticks: {
                            autoSkip: true,
                            maxRotation: 0,
                            minRotation: 0,
                            padding: 8,
                            font: { size: 11 },
                            callback: value => `R$ ${value.toLocaleString('pt-BR')}`
                        }
                    }
                }
            }
        })
    );
}

function updateAllChartsTheme() {
    const primary = getThemeVar('--primary');

    charts.forEach(chart => {
        chart.data.datasets.forEach(dataset => {

            if (Array.isArray(dataset.backgroundColor)) {
                dataset.backgroundColor[0] = primary;
            } else {
                dataset.backgroundColor = primary;
            }

        });

        chart.update();
    });
}

// ==============================
// 🔹 INICIAR
// ==============================

createCharts();

// ==============================
// 🔹 OBSERVAR MUDANÇA DE TEMA
// ==============================

const observer = new MutationObserver(() => {
    updateAllChartsTheme();
});

observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['data-theme', 'class']
});



flatpickr(".date-input", {
  dateFormat: "d/m/Y",
});
