// logout.js
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelector('.user').addEventListener('submit', function(event) {
            event.preventDefault(); 

            var email = document.getElementById('exampleInputEmail').value;
            var password = document.getElementById('exampleInputPassword').value;

            var adminEmail = "adminclubematematica@gmail.com";
            var adminPassword = "gapeMat2023";

            // Verifica se ambos os campos estão vazios
            if (email === '' && password === '') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos vazios',
                    text: 'Por favor, insira seu email e senha.',
                    confirmButtonColor: '#ffc107',
                    confirmButtonText: 'OK'
                });

            } else if (email === adminEmail && password === adminPassword) {
                // Verifica as credenciais
                sessionStorage.setItem('loggedIn', 'true');
                window.location.href = 'index.html'; 

            } else {
                // Caso as credenciais estejam incorretas
                Swal.fire({
                    icon: 'error',
                    title: 'Erro de autenticação',
                    text: 'Email ou senha incorretos!',
                    confirmButtonColor: '#ffc107',
                    confirmButtonText: 'OK'
                });

                // Limpa os campos
                document.getElementById('exampleInputEmail').value = '';
                document.getElementById('exampleInputPassword').value = '';
            }
        });
    });
})();
