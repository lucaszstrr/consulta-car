document.getElementById('formLogin').addEventListener('submit', function(e){
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email == email && user.senha == senha);

    let loginSucesso = false;
    const msgTexto = document.getElementById("msgTexto");

    if (user) {

        msgTexto.textContent = "Login realizado com sucesso!";
        loginSucesso = true;

    } else {

        msgTexto.textContent = "Email ou senha inválidos!";
        
    }

    const modal = new bootstrap.Modal(document.getElementById("mensagemModal"));
    modal.show();

    const modalElement = document.getElementById("mensagemModal");
    modalElement.addEventListener("hidden.bs.modal", function () {
        if (loginSucesso) {
            window.location.href = "meusveiculos.html";
        }
    }, { once: true });
});