(function() {
    document.addEventListener('DOMContentLoaded', function() {
        // Verifica se o botão de logout existe
        var logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', function(event) {
                event.preventDefault();
                
                Swal.fire({
                    title: 'Tem certeza?',
                    text: "Você está prestes a sair da sua conta!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#2e2e2e',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, sair!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Remove o item de login e redireciona para a página inicial
                        sessionStorage.removeItem('loggedIn');
                        sessionStorage.removeItem('userEmail'); // Também pode ser removido se necessário

                        window.location.href = 'index.html';
                    }
                });
            });
        } else {
            console.error('Botão de logout não encontrado.');
        }
    });
})();
