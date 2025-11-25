//carrega os veiculos ou dá a msg de sem veículos adicionados
document.addEventListener('DOMContentLoaded', function() {
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

    veiculos.forEach(veiculo => {
        const logoURL = `https://logo.clearbit.com/${veiculo.marca.toLowerCase()}.com`;

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
                            <button class="btn btn-sm btn-success">Editar</button>
                            <button class="btn btn-sm btn-primary">Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardVeiculos.insertAdjacentHTML('beforeend', card);
    });
};
