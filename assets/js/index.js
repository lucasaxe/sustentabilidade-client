//javascript do index.html

function podeRegistrar() {
    const now = new Date();
    const lastClickTime = localStorage.getItem('lastClickTime');
    if(!lastClickTime) return 1;

    const nowHours = now.getHours(), nowMinutes = now.getMinutes(); // Minutos atuais
    const lastClickDate = new Date(lastClickTime), lastClickHours = lastClickDate.getHours(), lastClickMinutes = lastClickDate.getMinutes(); // Minutos registrados

    console.log(`Último clique: ${lastClickTime} (hora: ${lastClickHours}:${lastClickMinutes})`);
    console.log(`Hora atual: ${now} (hora: ${nowHours}:${nowMinutes})`);

    // Definir o intervalo permitido (8:30 AM - 1:30 PM)
    const intervalo1InicioHora = 6, intervalo1InicioMinutos = 30, intervalo1FimHora = 8, intervalo1FimMinutos = 0;
    const intervalo2InicioHora = 10, intervalo2InicioMinutos = 30, intervalo2FimHora = 14, intervalo2FimMinutos = 0;
    const intervalo3InicioHora = 17, intervalo3InicioMinutos = 30, intervalo3FimHora = 19, intervalo3FimMinutos = 45;

    let valid = 1;

    if((nowHours>intervalo1InicioHora || (nowHours === intervalo1InicioHora && nowMinutes >= intervalo1InicioMinutos)) && (nowHours < intervalo1FimHora || (nowHours === intervalo1FimHora && nowMinutes <= intervalo1FimMinutos))/*mid*/ && ((lastClickHours>intervalo1InicioHora || (lastClickHours === intervalo1InicioHora && lastClickMinutes >= intervalo1InicioMinutos)) && (lastClickHours < intervalo1FimHora || (lastClickHours === intervalo1FimHora && lastClickMinutes <= intervalo1FimMinutos)))){
        valid = 0;
    }
    else if((nowHours>intervalo2InicioHora || (nowHours === intervalo2InicioHora && nowMinutes >= intervalo2InicioMinutos)) && (nowHours < intervalo2FimHora || (nowHours === intervalo2FimHora && nowMinutes <= intervalo2FimMinutos))/*mid*/ && ((lastClickHours>intervalo2InicioHora || (lastClickHours === intervalo2InicioHora && lastClickMinutes >= intervalo2InicioMinutos)) && (lastClickHours < intervalo2FimHora || (lastClickHours === intervalo2FimHora && lastClickMinutes <= intervalo2FimMinutos)))){
        valid = 0;
    }
    else if((nowHours>intervalo3InicioHora || (nowHours === intervalo3InicioHora && nowMinutes >= intervalo3InicioMinutos)) && (nowHours < intervalo3FimHora || (nowHours === intervalo3FimHora && nowMinutes <= intervalo3FimMinutos))/*mid*/ && ((lastClickHours>intervalo3InicioHora || (lastClickHours === intervalo3InicioHora && lastClickMinutes >= intervalo3InicioMinutos)) && (lastClickHours < intervalo3FimHora || (lastClickHours === intervalo3FimHora && lastClickMinutes <= intervalo3FimMinutos)))){
        valid = 0;
    }else{
        valid = 1;
    }

    return valid; // Caso contrário
}

async function incrementCount() {
    if(podeRegistrar()){
        // Faz a requisição POST para incrementar o número
        const response = await fetch('http://localhost:3000/increment', { method: 'POST' });
        const data = await response.json();

        // Salvar a data do clique no localStorage
        const today = new Date().toLocaleTimeString();
        localStorage.setItem('lastClickTime', today);

        // Opcional: Desabilitar o botão para evitar novos cliques
        document.getElementById('utilizouCopo').disabled = true;
        document.getElementById('economizouCopo').disabled = true;

    }else{
        document.getElementById('utilizouCopo').disabled = true;
        document.getElementById('economizouCopo').disabled = true;
        alert('Você já registrou nesta refeição!');
    }

    loadCurrentCount();
}

async function incrementCountEcono() {
    if(podeRegistrar()){
        // Faz a requisição POST para incrementar o número
        const response = await fetch('http://localhost:3000/increment_econo', { method: 'POST' });
        const data = await response.json();

        // Salvar a data do clique no localStorage
        const today = new Date().toLocaleTimeString();
        localStorage.setItem('lastClickTime', today);

        // Opcional: Desabilitar o botão para evitar novos cliques
        document.getElementById('utilizouCopo').disabled = true;
        document.getElementById('economizouCopo').disabled = true;

    }else{
        document.getElementById('utilizouCopo').disabled = true;
        document.getElementById('economizouCopo').disabled = true;
        alert('Você já registrou nesta refeição!');
    }

    loadCurrentCount();
}

async function loadCurrentCount() {
    // Faz a requisição GET para obter o número atual
    const count = await fetch('http://localhost:3000/current-count');
    const data = await count.json();
    document.getElementById('counter').textContent = data.count;
    
    const count_today = await fetch('http://localhost:3000/current-day');
    const data1 = await count_today.json(); 
    document.getElementById('counterHoje').textContent = data1.count_today;

    const count_week = await fetch('http://localhost:3000/current-week');
    const data2 = await count_week.json();     document.getElementById('counterSemana').textContent = data2.count_week; 

    const count_month = await fetch('http://localhost:3000/current-month');
    const data3 = await count_month.json(); 
    document.getElementById('counterMes').textContent = data3.count_month;

    const count_year = await fetch('http://localhost:3000/current-year');
    const data4 = await count_year.json();     
    document.getElementById('counterAno').textContent = data4.count_year;

    const countEcono = await fetch('http://localhost:3000/current-econo');
    const data5 = await countEcono.json();     
    document.getElementById('counterEcono').textContent = data5.countEcono;
}


// Carrega o número atual ao carregar a página
window.onload = loadCurrentCount();




/*

let id_user = 1

let colors = [
    {
        taskStatus: 'new',
        select_bg_color: 'bg-white'
    },
    {
        taskStatus: 'in_progress',
        select_bg_color: 'bg-info'
    },
    {
        taskStatus: 'canceled',
        select_bg_color: 'bg-danger'
    },
    {
        taskStatus: 'done',
        select_bg_color: 'bg-success'
    }
];

window.onload = () => {
    get_username(id_user);
    get_userTasks(id_user);
} 


//====================================================================
function get_username(id_user){
    fetch(`http://localhost:3000/user/${id_user}`)
    .then(response => {
        if(response.status === 200){
            return (response.json());
        }else{
            console.log('ERRO');
        }
    })
    .then(dados => {
        if(dados.length === 0){
            console.log('ERRO')
        }else{
            document.querySelector("#quantidade_copos").textContent = dados[0].quantidade;
        }
    })
}

//====================================================================
function get_userTasks(id_user, status = "all"){
    fetch(`http://localhost:3000/user/${id_user}/tasks/${status}`)
    .then(response => {
        if(response.status === 200){
            return response.json();
        }else{
            console.log('ERRO');
        }
    })
    .then(tarefas => {
        if(tarefas.length === 0){
            //document.querySelector("#no_tasks").classList.remove("d-none");
            //document.querySelector("#total_tasks").classList.add("d-none");
            //document.querySelector("#tasks_container").classList.add("d-none");
        }else{
            //document.querySelector("#tasks_container").classList.remove("d-none");
            //document.querySelector("#tasks_container").innerHTML = null;

            tarefas.forEach(tarefa => {
                let color = colors.find(item => item.taskStatus == tarefa.taskStatus);

                let html = `
                <div class="cow-12 border border-primary rounded p-3 shadow">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <div class="d-flex align-items-center">
                                <h5 class="me-3 text-info"> <i class="fa-solid fa-caret-right m2-3"></i> </5>
                                <h5>${tarefa.taskText} </h5>
                            </div>
                        </div>
                        <div class="col-2 ">
                            <select id="task_status_${tarefa.id}" onchange="change_task_status(${tarefa.id})" class="form-select p-2 ${color.select_bg_color}">
                                <option value="new" ${tarefa.taskStatus == 'new' ? 'selected' : ''}>Nova</option>
                                <option value="in_progress" ${tarefa.taskStatus == 'in_progress' ? 'selected' : ''}>Em Progresso</option>
                                <option value="canceled" ${tarefa.taskStatus == 'canceled' ? 'selected' : ''}>Cancelada</option>
                                <option value="done" ${tarefa.taskStatus == 'done' ? 'selected' : ''}>Completa</option>
                            </select>
                        </div>
                        <div class="col-1 text-end"><span class="edit_link" onclick="edit_task(${tarefa.id})"><i class="fa-regular fa-pen-to-square me-2"></i>Editar</span></div>
                        <div class="col-1 text-end"><span class="delete_link" onclick="delete_task(${tarefa.id})"><i class="fa-regular fa-trash-can me-2"></i>Deletar</span></div>
                    </div>
                </div>`;

                let new_task = document.createElement('div');
                new_task.classList.add('row', 'mb-3');
                new_task.innerHTML = html;

                //document.querySelector("#tasks_container").appendChild(new_task);
            });

            //document.querySelector("#total_tasks").classList.remove("d-none");
            //document.querySelector("#total_tasks > div > h4 > span").textContent = tarefas.length;
            //document.querySelector("#no_tasks").classList.add("d-none");
        }
    })
}

//====================================================================
function edit_task(id_task){
    const url = window.location.origin + "/frontend/edit_task.html?id_task=" + id_task;
    window.location.href = url;
}

//====================================================================
function delete_task(id_task){
    const url = window.location.origin + "/frontend/delete_task.html?id_task=" + id_task;
    window.location.href = url;
}

//====================================================================
function change_task_status(id_task){
    //pega o novo status na pagina
    let status = document.querySelector("#task_status_" + id_task).value;

    //atualiza o status no banco de dados
    fetch(`http://localhost:3000/user/tasks/update_status`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({id_task, status})
    })
    .then(response => {
        if(response.status === 200){
            return response.json();
        }
    })
    .then(dados => {
        console.log(dados);
    })

    //update select color base on task status
    let color_obj = colors.find(e => e.taskStatus==status);
    let select = document.querySelector(`#task_status_${id_task}`);

    let colors_tmp = colors.map(c => { return c.select_bg_color });
    select.classList.remove(...colors_tmp);
    select.classList.add(color_obj.select_bg_color);
}

/*
document.querySelector("#btn_new_task").addEventListener('click', () => {
    const url = window.location.origin + "/frontend/new_task.html?id_user=" + id_user;
    window.location.href = url;
})

document.querySelector("#select_filter").addEventListener('change', () => {
    let task_status = document.querySelector('#select_filter').value;
    get_userTasks(id_user, task_status);
}) */
