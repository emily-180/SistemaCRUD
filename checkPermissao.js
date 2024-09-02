(function() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log("Verificando permissões..."); // Log para confirmar execução
        var userEmail = sessionStorage.getItem('userEmail');

        var database = firebase.database();
        var usersRef = database.ref('usersAdm');

        usersRef.once('value', function(snapshot) {
            var users = snapshot.val();
            var isAdmin = false;

            for (var id in users) {
                var user = users[id];
                if (user.login === userEmail && user.isPermitido === true) {
                    isAdmin = true;
                    break;
                }
            }

            if (!isAdmin) {
                console.log("Acesso negado: Usuário não é administrador."); // Log para depuração
                Swal.fire({
                    icon: 'warning',
                    title: 'Acesso Negado',
                    text: 'Você não tem permissão para acessar esta página.',
                    confirmButtonColor: '#ffc107',
                    confirmButtonText: 'OK'
                }).then(function() {
                    window.location.href = 'home.html'; 
                });
            } else {
                console.log("Acesso permitido: Usuário é administrador."); // Log para depuração
            }
        });
    });
})();
