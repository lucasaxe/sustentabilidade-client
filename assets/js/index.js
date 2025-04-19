//javascript do index.html

//const API_URL = 'http://localhost:3000';
const API_URL = 'https://sustentabilidade-server.onrender.com';

async function incrementCount() {
    // Faz a requisição POST para incrementar o número
    const response = await fetch(`${API_URL}/increment`, { method: 'POST' });

    if(!response.ok){
        const erro = await response.json();
        showAlert(erro.message); // mostra "Horário não permitido."
        return;
    }

    const data = await response.json();

    showAlert("⚠️ Atenção: Uso de copo descartável detectado!", "danger");

    document.getElementById('utilizouCopo').disabled = true;
    document.getElementById('economizouCopo').disabled = true;

    loadCurrentCount();
}

async function incrementCountEcono() {
    // Faz a requisição POST para incrementar o número
    const response = await fetch(`${API_URL}/increment_econo`, { method: 'POST' });

    if (!response.ok) {
        const erro = await response.json();
        showAlert(erro.message); // mostra "Horário não permitido."
        return;
    }

    const data = await response.json();

    showAlert("✅ Parabéns! Seu copo reutilizável faz a diferença.", "success");

    document.getElementById('utilizouCopo').disabled = true;
    document.getElementById('economizouCopo').disabled = true;

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


// Carrega o número atual ao carregar a página
window.onload = loadCurrentCount();



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
