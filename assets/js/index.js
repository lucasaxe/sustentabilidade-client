//javascript do index.html

async function incrementCount() {
    // Faz a requisição POST para incrementar o número
    const response = await fetch('https://sustentabilidade-server.onrender.com/increment', { method: 'POST' });

    if (!response.ok) {
        const erro = await response.json();
        alert(erro.message); // mostra "Horário não permitido."
        return;
    }

    const data = await response.json();

    document.getElementById('utilizouCopo').disabled = true;
    document.getElementById('economizouCopo').disabled = true;

    loadCurrentCount();
}

async function incrementCountEcono() {
    // Faz a requisição POST para incrementar o número
    const response = await fetch('https://sustentabilidade-server.onrender.com/increment_econo', { method: 'POST' });

    if (!response.ok) {
        const erro = await response.json();
        alert(erro.message); // mostra "Horário não permitido."
        return;
    }

    const data = await response.json();

    document.getElementById('utilizouCopo').disabled = true;
    document.getElementById('economizouCopo').disabled = true;

    loadCurrentCount();
}

async function loadCurrentCount() {
    // Faz a requisição GET para obter o número atual
    const count = await fetch('https://sustentabilidade-server.onrender.com/current-count');
    const data = await count.json();
    document.getElementById('counter').textContent = data.count;
    
    const count_today = await fetch('https://sustentabilidade-server.onrender.com/current-day');
    const data1 = await count_today.json(); 
    document.getElementById('counterHoje').textContent = data1.count_today;

    const count_week = await fetch('https://sustentabilidade-server.onrender.com/current-week');
    const data2 = await count_week.json();     document.getElementById('counterSemana').textContent = data2.count_week; 

    const count_month = await fetch('https://sustentabilidade-server.onrender.com/current-month');
    const data3 = await count_month.json(); 
    document.getElementById('counterMes').textContent = data3.count_month;

    const count_year = await fetch('https://sustentabilidade-server.onrender.com/current-year');
    const data4 = await count_year.json();     
    document.getElementById('counterAno').textContent = data4.count_year;

    const countEcono = await fetch('https://sustentabilidade-server.onrender.com/current-econo');
    const data5 = await countEcono.json();     
    document.getElementById('counterEcono').textContent = data5.countEcono;
}


// Carrega o número atual ao carregar a página
window.onload = loadCurrentCount();