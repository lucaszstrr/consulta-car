const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

//validacao se há usuario logado
if (!usuarioLogado) {
    window.location.href = 'login.html';
}

const veiculosUsuario = usuarioLogado.veiculos;

let totalVeiculos = 0;
let totalCarros = 0;
let totalMotos = 0;
let totalCaminhoes = 0;
let valorTotal = 0;

veiculosUsuario.forEach((veiculo) => {
    if (veiculo.tipo === 'Carro') totalCarros++;
    else if (veiculo.tipo === 'Moto') totalMotos++;
    else if (veiculo.tipo === 'Caminhão') totalCaminhoes++;

    totalVeiculos++;
    valorTotal += Number(veiculo.valor.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
});

document.getElementById('totalVeiculos').textContent = totalVeiculos;
document.getElementById('totalCarros').textContent = totalCarros;
document.getElementById('totalMotos').textContent = totalMotos;
document.getElementById('totalCaminhoes').textContent = totalCaminhoes;
document.getElementById('valorTotal').textContent = valorTotal.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
