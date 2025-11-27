//Mascara do CEP
$(document).ready(function () {
    $('#cep').mask('00000-000');
});

//Cadastro
document.getElementById('formCadastro').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const confirmarSenha = document.getElementById('confirmarSenha').value.trim();
    const cep = document.getElementById('cep').value.trim();

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    let resultadoCEP = true;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (data.erro) {
                mensagem = 'CEP inválido!';
                resultadoCEP = false;
            } else {
                resultadoCEP = true;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.find((user) => user.email === email);

            if (userExists) {
                mensagem = 'Este email já foi cadastrado!';
            } else if (senha != confirmarSenha) {
                mensagem = 'As senhas não coincidem!';
            } else if (!resultadoCEP) {
                mensagem = 'CEP inválido!';
            } else {
                let veiculos = [];
                users.push({ nome, email, senha, cep, veiculos });
                localStorage.setItem('users', JSON.stringify(users));
                mensagem = 'Cadastro realizado com sucesso!';
                redirect = true;
            }

            // Exibicao modal
            const msgTexto = document.getElementById('msgTexto');
            msgTexto.textContent = mensagem;

            const modal = new bootstrap.Modal(document.getElementById('mensagemModal'));
            modal.show();

            // Redirecionamento se o cadastro deu certo
            const modalElement = document.getElementById('mensagemModal');
            modalElement.addEventListener(
                'hidden.bs.modal',
                function () {
                    if (redirect) {
                        window.location.href = 'login.html';
                    }
                },
                { once: true }
            );
        })
        .catch(() => {
            mensagem = 'Erro ao verificar CEP.';
            const msgTexto = document.getElementById('msgTexto');
            msgTexto.textContent = mensagem;

            const modal = new bootstrap.Modal(document.getElementById('mensagemModal'));
            modal.show();
        });
});
