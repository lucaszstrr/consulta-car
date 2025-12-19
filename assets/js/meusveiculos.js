//validacao pra ver se tem algum usuario logado
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

if (!usuarioLogado) {
    window.location.href = 'login.html';
}

//carrega os veiculos ou dá a msg de sem veículos adicionados
document.addEventListener('DOMContentLoaded', function () {
    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    const cardVeiculos = document.getElementById('veiculosAdicionados');
    const semVeiculos = document.getElementById('semVeiculos');

    if (usuarioLogado && usuarioLogado.veiculos && usuarioLogado.veiculos.length > 0) {
        semVeiculos.style.display = 'none';
        cardVeiculos.style.display = 'block';
        montarCardsVeiculos(usuarioLogado.veiculos);
    } else {
        cardVeiculos.style.display = 'none';
        semVeiculos.style.display = 'block';
    }
});

//monta os cards dos veiculos
function montarCardsVeiculos(veiculos) {
    const cardVeiculos = document.getElementById('veiculosAdicionados');
    cardVeiculos.innerHTML = '';

    let index = 0;

    veiculos.forEach((veiculo) => {
        const logoURL = `https://logos-api.apistemic.com/domain:${veiculo.marca.toLowerCase()}.com`;

        const card = `
            <div class="border-0 card-veiculo card p-4 d-flex flex-column flex-md-row align-items-center align-items-md-start mb-3 shadow-sm rounded-4 mx-auto"
                    style="max-width: 900px;">

                <img src="${logoURL}" alt="Logo da ${veiculo.marca}" class="logo-veiculo me-md-4 mb-3 mb-md-0" loading="lazy">

                <div class="row flex-grow-1 w-100">
                    <div class="col-12 col-md-4">
                        <p><strong>Tipo:</strong> ${veiculo.tipo}</p>
                        <p><strong>Marca:</strong> ${veiculo.marca}</p>
                    </div>
                    <div class="col-12 col-md-4">
                        <p><strong>Modelo:</strong> ${veiculo.modelo}</p>
                        <p><strong>Ano:</strong> ${veiculo.ano}</p>
                    </div>
                    <div class="col-12 col-md-4">
                        <p><strong>FIPE:</strong> ${veiculo.valor}</p>
                        <p><strong>Placa:</strong> ${veiculo.placa}</p>

                        <div class="mt-3 d-flex gap-2">
                            <button data-indice="${index}" class="btn btn-sm btn-success btn-editar">Editar</button>
                            <button data-indice="${index}" class="btn btn-sm btn-primary btn-excluir">Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        index++;
        cardVeiculos.insertAdjacentHTML('beforeend', card);
    });
}

document.getElementById('veiculosAdicionados').addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-editar')) {
        const indice = e.target.getAttribute('data-indice');
        editarVeiculo(parseInt(indice));
    }

    if (e.target.classList.contains('btn-excluir')) {
        const indice = e.target.getAttribute('data-indice');
        excluirVeiculo(parseInt(indice));
    }
});

function excluirVeiculo(indice) {
    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    let users = JSON.parse(localStorage.getItem('users')) || [];

    usuarioLogado.veiculos.splice(indice, 1);
    users = users.map((u) => (u.email === usuarioLogado.email ? usuarioLogado : u));

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

    montarCardsVeiculos(usuarioLogado.veiculos);
}

function editarVeiculo(indice) {
    localStorage.setItem('indiceEdicaoVeiculo', indice);
    window.location.href = 'cadastroveiculo.html';
}
