(function() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log("Verificando login..."); // Log para confirmar execução
        var loggedIn = sessionStorage.getItem('loggedIn');
        var userEmail = sessionStorage.getItem('userEmail');

        if (loggedIn !== 'true' || !userEmail) {
            console.log("Usuário não logado ou e-mail não encontrado."); // Log para depuração
            window.location.href = 'index.html'; 
            return;
        }
        // Se o usuário estiver logado, você pode continuar com a verificação de permissões, se necessário
    });
})();
