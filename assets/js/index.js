//javascript do index.html

const API_URL = process.env.NEXT_PUBLIC_API_URL1;

async function incrementCount() {
    const agora = moment().tz('America/Sao_Paulo');
    const horaAtual = agora.format('HH:mm'); // Formato "HH:mm"

    // Verificar se está dentro de algum horário permitido
    const emHorarioPermitido = 
        estaNoIntervalo(horaAtual, "07:00", "08:30") ||   // Café da manhã
        estaNoIntervalo(horaAtual, "10:30", "14:00") ||   // Almoço
        estaNoIntervalo(horaAtual, "17:30", "19:45");     // Jantar

    if (!emHorarioPermitido) {
        showAlert("Horário não permitido para registro.");
        return; // Não registra fora do horário permitido
    }

    // Verifica se já passou o tempo permitido para o próximo registro
    if (await blockIfAlreadyRegistered()) {
        return; // Se já registrou, não continua
    }

    const response = await fetch(`${API_URL}/increment`, { method: 'POST' });

    if (!response.ok) {
        const erro = await response.json();
        showAlert(erro.message);
        return;
    }

    showAlert("⚠️ Atenção: Uso de copo descartável detectado!", "danger");

    saveLastRegisterTime();
    //disableButtons();
    loadCurrentCount();
}

async function incrementCountEcono() {
    const agora = moment().tz('America/Sao_Paulo');
    const horaAtual = agora.format('HH:mm'); // Formato "HH:mm"

    // Verificar se está dentro de algum horário permitido
    const emHorarioPermitido = 
        estaNoIntervalo(horaAtual, "07:00", "08:30") ||   // Café da manhã
        estaNoIntervalo(horaAtual, "10:30", "14:00") ||   // Almoço
        estaNoIntervalo(horaAtual, "17:30", "19:45");     // Jantar

    if (!emHorarioPermitido) {
        showAlert("Horário não permitido para registro.");
        return; // Não registra fora do horário permitido
    }

    // Verifica se já passou o tempo permitido para o próximo registro
    if (await blockIfAlreadyRegistered()) {
        return; // Se já registrou, não continua
    }


    // Faz a requisição POST para incrementar o número
    const response = await fetch(`${API_URL}/increment_econo`, { method: 'POST' });

    if (!response.ok) {
        const erro = await response.json();
        showAlert(erro.message); // mostra "Horário não permitido."
        return;
    }

    const data = await response.json();

    showAlert("✅ Parabéns! Seu copo reutilizável faz a diferença.", "success");

    saveLastRegisterTime();
    //disableButtons();
    loadCurrentCount();
}

async function loadCurrentCount() {
    // Faz a requisição GET para obter o número atual
    const count = await fetch(`${API_URL}/current-count`);
    const data = await count.json();
    document.getElementById('counter').textContent = data.count;
    
    const count_today = await fetch(`${API_URL}/current-day`);
    const data1 = await count_today.json(); 
    document.getElementById('counterHoje').textContent = data1.count_today;

    const count_week = await fetch(`${API_URL}/current-week`);
    const data2 = await count_week.json();     document.getElementById('counterSemana').textContent = data2.count_week; 

    const count_month = await fetch(`${API_URL}/current-month`);
    const data3 = await count_month.json(); 
    document.getElementById('counterMes').textContent = data3.count_month;

    const count_year = await fetch(`${API_URL}/current-year`);
    const data4 = await count_year.json();     
    document.getElementById('counterAno').textContent = data4.count_year;

    const countEcono = await fetch(`${API_URL}/current-econo`);
    const data5 = await countEcono.json();     
    document.getElementById('counterEcono').textContent = data5.countEcono;
}











function showAlert(message, type = 'default') {
    const alertContainer = document.getElementById('alert-container') || createAlertContainer();

    const alertBox = document.createElement('div');
    alertBox.className = 'custom-alert';  // Aplica a classe de estilo

    // Se for erro ou sucesso, aplica a classe correspondente
    if (type === 'success') {
        alertBox.classList.add('success');
    } else if (type === 'danger') {
        alertBox.classList.add('danger');
    } else {
        alertBox.classList.add('default'); // Para a mensagem cinza de fora de horário
    }

    alertBox.textContent = message;

    alertContainer.appendChild(alertBox);

    // Exibe o alerta com animação suave
    setTimeout(() => {
        alertBox.classList.add('show');
    }, 10); // Tempo mínimo para aplicar a classe de exibição

    // Remove o alerta após 3 segundos
    setTimeout(() => {
        alertBox.classList.remove('show');
        setTimeout(() => {
            alertBox.remove();
        }, 500); // Tempo para o efeito de desaparecimento
    }, 3000);
}

// Função para criar o container de alertas se ele não existir
function createAlertContainer() {
    const container = document.createElement('div');
    container.id = 'alert-container';
    document.body.appendChild(container);  // Você pode alterar onde deseja posicionar
    return container;
}





const THREE_HOURS = 3 * 60 * 60 * 1000;

const estaNoIntervalo = (horaAtual, horaInicial, horaFinal) => {
    return horaAtual >= horaInicial && horaAtual < horaFinal;
};

function saveLastRegisterTime() {
    localStorage.setItem('lastRegisterTime', Date.now());
}

async function blockIfAlreadyRegistered() {
    // Obter o horário do último registro no localStorage
    const lastTime = localStorage.getItem('lastRegisterTime');
    if (!lastTime) {
        return false; // Nunca registrou antes, pode registrar
    }

    const now = Date.now(); // Obter o horário atual em milissegundos
    const timeDifference = now - lastTime; // Diferença de tempo entre agora e o último registro

    // Verificar se já se passaram 3 horas (3 horas = 3 * 60 * 60 * 1000 milissegundos)
    if (timeDifference < 3 * 60 * 60 * 1000) {
        showAlert(`⚠️ Você já realizou seu registro nessa refeição!`);
        return true; // BLOQUEIA envio
    }

    // Se já passaram 3 horas, pode enviar
    return false;
}


function checkButtonStatus() {
    const lastTime = localStorage.getItem('lastRegisterTime');
    if (!lastTime) {
        enableButtons();
        return;
    }

    const now = Date.now();
    if (now - lastTime >= THREE_HOURS) {
        enableButtons();
    } else {
        disableButtons();
        const timeLeft = THREE_HOURS - (now - lastTime);
        // Agenda para reabilitar automaticamente quando chegar 3 horas
        setTimeout(enableButtons, timeLeft);
    }
}











function disableButtons() {
    document.getElementById('utilizouCopo').disabled = true;
    document.getElementById('economizouCopo').disabled = true;
}

function enableButtons() {
    document.getElementById('utilizouCopo').disabled = false;
    document.getElementById('economizouCopo').disabled = false;
    localStorage.removeItem('lastRegisterTime'); // Zera para nova contagem
}


window.onload = function() {
    loadCurrentCount();
};