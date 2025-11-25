//Mascara para o campo de placa aceitar os dois tipos, mercosul e padrao
$(document).ready( function(){
    $('#placa').mask('AAA0B00', {
        translation: {
            'B': { pattern: /[A-Za-z\d/]/ }
        }
    });
});

const tipoSelect = document.getElementById("tipo");
const marcaSelect = document.getElementById("marca");
const modeloSelect = document.getElementById("modelo");
const anoSelect = document.getElementById("ano");

let tipoString = "";

tipoSelect.addEventListener("change", async () => {
    const tipo = tipoSelect.value;
    marcaSelect.innerHTML = '<option value="">Carregando marcas...</option>';
    modeloSelect.innerHTML = '<option value="">Selecione a marca primeiro</option>';
    anoSelect.innerHTML = '<option value="">Selecione o modelo primeiro</option>';
    marcaSelect.disabled = true;
    modeloSelect.disabled = true;
    anoSelect.disabled = true;

    if (!tipo) return;

    const res = await fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas`);
    const marcas = await res.json();

    marcaSelect.innerHTML = '<option value="">Selecione a marca</option>';
    marcas.forEach(m => {
        marcaSelect.innerHTML += `<option value="${m.codigo}" data-nome="${(m.nome).toUpperCase()}">${(m.nome).toUpperCase()}</option>`;
    });

    if (tipo == 'carros') tipoString = 'Carro';
    if (tipo == 'motos') tipoString = 'Moto';
    if (tipo == 'caminhoes') tipoString = 'Caminhão';

    marcaSelect.disabled = false;
    marcaSelect.required = true;
});

marcaSelect.addEventListener("change", async () => {
    const tipo = tipoSelect.value;
    const marca = marcaSelect.value;
    modeloSelect.innerHTML = '<option value="">Carregando modelos...</option>';
    modeloSelect.disabled = true;

    const res = await fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos`);
    const data = await res.json();

    modeloSelect.innerHTML = '<option value="">Selecione o modelo</option>';
    data.modelos.forEach(m => {
        modeloSelect.innerHTML += `<option value="${m.codigo}" data-nome="${(m.nome).toUpperCase()}">${(m.nome).toUpperCase()}</option>`;
    });

    modeloSelect.disabled = false;
    modeloSelect.required = true;
});

modeloSelect.addEventListener("change", async () => {
    const tipo = tipoSelect.value;
    const marca = marcaSelect.value;
    const modelo = modeloSelect.value;
    anoSelect.innerHTML = '<option value="">Carregando anos...</option>';
    anoSelect.disabled = true;

    const res = await fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos/${modelo}/anos`);
    const anos = await res.json();

    anoSelect.innerHTML = '<option value="">Selecione o ano</option>';
    anos.forEach(a => {
        anoSelect.innerHTML += `<option value="${a.codigo}">${a.nome}</option>`;
    });

    anoSelect.disabled = false;
    anoSelect.required = true;
});

document.getElementById('formVeiculo').addEventListener('submit', function(e){
    e.preventDefault();

    const marca = marcaSelect.options[marcaSelect.selectedIndex].dataset.nome;
    const modelo = modeloSelect.options[modeloSelect.selectedIndex].dataset.nome;
    const ano = anoSelect.value;
    const placa = document.getElementById('placa').value.trim().toUpperCase();

    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Consulta da fipe
    fetch(`https://parallelum.com.br/fipe/api/v1/${tipoSelect.value}/marcas/${marcaSelect.value}/modelos/${modeloSelect.value}/anos/${ano}`)
    .then(res => res.json())
    .then(dados => {
        const valorFipe = dados.Valor || 'Não disponível';

        const novoVeiculo = {
            tipo: tipoString,
            marca,
            modelo,
            ano,
            placa,
            valor: valorFipe
        };

        usuarioLogado.veiculos.push(novoVeiculo);

        users = users.map(u => {
            if (u.email === usuarioLogado.email) {
                return usuarioLogado;
            }
            return u;
        });

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

        const msgTexto = document.getElementById('msgTexto');
        msgTexto.textContent = 'Veículo cadastrado com sucesso!';

        const modal = new bootstrap.Modal(document.getElementById('mensagemModal'));
        modal.show();

        const modalElement = document.getElementById('mensagemModal');
        modalElement.addEventListener('hidden.bs.modal', function () {
            window.location.href = 'meusveiculos.html';
        }, { once: true });
    })
    .catch(() => {
        const msgTexto = document.getElementById('msgTexto');
        msgTexto.textContent = 'Erro ao obter valor FIPE. Tente novamente.';

        const modal = new bootstrap.Modal(document.getElementById('mensagemModal'));
        modal.show();
    });
});