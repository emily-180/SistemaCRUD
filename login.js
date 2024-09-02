(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyDggpHuI9sdEQH0nGJTDy8JlRgqh54bMvQ",
        authDomain: "sis-matematica-ifmch.firebaseapp.com",
        databaseURL: "https://sis-matematica-ifmch-default-rtdb.firebaseio.com/",
        projectId: "sis-matematica-ifmch",
        storageBucket: "sis-matematica-ifmch.appspot.com",
        messagingSenderId: "585223237603",
        appId: "1:585223237603:web:296385fe6104132454bad6"
    };
    firebase.initializeApp(firebaseConfig);

    document.addEventListener('DOMContentLoaded', function() {
        document.querySelector('.user').addEventListener('submit', function(event) {
            event.preventDefault();

            var email = document.getElementById('exampleInputEmail').value.trim();
            var password = document.getElementById('exampleInputPassword').value.trim();

            if (email === '' || password === '') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos vazios',
                    text: 'Por favor, insira seu email e senha.',
                    confirmButtonColor: '#ffc107',
                    confirmButtonText: 'OK'
                });
                return;
            }

            var database = firebase.database();
            var usersRef = database.ref('usersAdm');

            usersRef.once('value', function(snapshot) {
                var users = snapshot.val();
                var userFound = false;

                for (var id in users) {
                    var user = users[id];
                    console.log('Verificando usuário:', user);
                    if (user.login === email && user.senha === password) {
                        userFound = true;
                        sessionStorage.setItem('loggedIn', 'true');
                        sessionStorage.setItem('userEmail', email); // Armazenar o email do usuário
                        console.log('Usuário encontrado:', user);

                        // Redireciona todos os usuários para home.html
                        window.location.href = 'home.html';
                        break;
                    }
                }

                if (!userFound) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro de autenticação',
                        text: 'Email ou senha incorretos!',
                        confirmButtonColor: '#ffc107',
                        confirmButtonText: 'OK'
                    });
                }
            });
        });
    });
})();
