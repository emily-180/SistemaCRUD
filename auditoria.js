// Configuração do Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDggpHuI9sdEQH0nGJTDy8JlRgqh54bMvQ",
    authDomain: "sis-matematica-ifmch.firebaseapp.com",
    databaseURL: "https://sis-matematica-ifmch-default-rtdb.firebaseio.com/",
    projectId: "sis-matematica-ifmch",
    storageBucket: "sis-matematica-ifmch.appspot.com",
    messagingSenderId: "585223237603",
    appId: "1:585223237603:web:296385fe6104132454bad6"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);


document.addEventListener('DOMContentLoaded', function() {
    console.log("Carregando registros de auditoria...");

    const database = firebase.database();
    const auditoriaRef = database.ref('auditoria');

    auditoriaRef.on('value', function(snapshot) {
        console.log("Dados recebidos:", snapshot.val()); // Verifique se os dados estão sendo recebidos
        const tableBody = document.querySelector('#tabelaAuditoria tbody');
        tableBody.innerHTML = ''; 

        snapshot.forEach(function(childSnapshot) {
            const log = childSnapshot.val();
            console.log("Registro:", log); // Verifique o conteúdo de cada registro
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td class="preto">${log.acao || 'N/A'}</td>
                <td class="preto">${log.detalhes || 'N/A'}</td>
                <td class="preto">${log.nome || 'N/A'}</td>
                <td class="preto">${log.data || 'N/A'}</td>
            `;
            
            tableBody.appendChild(row);
        });
    }, function(error) {
        console.error('Erro ao carregar registros de auditoria:', error);
    });
});

