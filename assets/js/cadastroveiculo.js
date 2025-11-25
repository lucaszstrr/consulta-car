//Mascara para o campo de placa aceitar os dois tipos, mercosul e padrao
$(document).ready( function(){
    $('#placa').mask('AAA0S00', {
        translation: {
            'S': { pattern: /[A-Za-z\d/]/ }
        }
    });
});

const tipoSelect = document.getElementById("tipo");
const marcaSelect = document.getElementById("marca");
const modeloSelect = document.getElementById("modelo");
const anoSelect = document.getElementById("ano");

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
        marcaSelect.innerHTML += `<option value="${m.codigo}">${(m.nome).toUpperCase()}</option>`;
    });
    marcaSelect.disabled = false;
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
        modeloSelect.innerHTML += `<option value="${m.codigo}">${(m.nome).toUpperCase()}</option>`;
    });
    modeloSelect.disabled = false;
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
});

document.getElementById('formVeiculo').addEventListener('submit', function(e){
    e.preventDefault();

    const tipo = document.getElementById('tipo').value.trim();
    const marca = document.getElementById('marca').value.trim();
    const modelo = document.getElementById('modelo').value.trim();
    const ano = document.getElementById('ano').value.trim();
    const placa = document.getElementById('placa').value.trim();

    // const tipo = tipoSelect.value;
    // const marca = marcaSelect.value;
    // const modelo = modeloSelect.value;
    // const ano = anoSelect.value;

    console.log(tipo);
    console.log(marca);
    console.log(modelo);
    console.log(ano);

});