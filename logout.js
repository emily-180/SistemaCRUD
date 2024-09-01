
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('logoutButton').addEventListener('click', function(event) {
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
                    
                    sessionStorage.removeItem('loggedIn');
                    
                   
                    window.location.href = 'login.html';
                }
            });
        });
    });
})();
