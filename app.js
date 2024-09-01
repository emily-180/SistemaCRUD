(function () {
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

    const database = firebase.database();
    
    let competitionIdToDelete = null;
    

    window.displayCompetitions = function () {
        const competitionsRef = database.ref('competicao');
        competitionsRef.on('value', snapshot => {
            const competitions = snapshot.val();
            const tableBody = document.querySelector('.competition-table tbody');
            tableBody.innerHTML = ''; 

            let totalBronze = 0;
            let totalPrata = 0;
            let totalOuro = 0;
            let totalMencao = 0;
            let totalParticipacao = 0;

            for (let id in competitions) {
                const comp = competitions[id];
                totalBronze += parseInt(comp.quantMedalhaBronze, 10) || 0;
                totalPrata += parseInt(comp.quantMedalhaPrata, 10) || 0;
                totalOuro += parseInt(comp.quantMedalhaOuro, 10) || 0;
                totalMencao += parseInt(comp.quantMencaoHonrosa, 10) || 0;
                totalParticipacao += parseInt(comp.quantMedalhaParticipacao, 10) || 0;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="preto">${comp.nome}</td>
                    <td class="preto">${comp.sigla}</td>
                    <td class="preto">${comp.edicao}</td>
                    <td class="preto">${(parseInt(comp.quantMedalhaBronze, 10) || 0)} Bronze, ${parseInt(comp.quantMedalhaPrata, 10) || 0} Prata, ${parseInt(comp.quantMedalhaOuro, 10) || 0} Ouro</td>
                    <td class="preto">${(parseInt(comp.quantMencaoHonrosa, 10) || 0)} Menção Honrosa, ${parseInt(comp.quantMedalhaParticipacao, 10) || 0} Medalha de Participação </td>
                    <td class="preto">
                        <button class="btn btn-danger btn-sm" onclick="confirmDelete('${id}')">Excluir</button>
                    </td>
                `;
                tableBody.appendChild(row);
            }

            // Atualiza os totais de medalhas na página
            document.getElementById('totalBronze').textContent = totalBronze;
            document.getElementById('totalPrata').textContent = totalPrata;
            document.getElementById('totalOuro').textContent = totalOuro;
            document.getElementById('totalMencao').textContent = totalMencao;
            document.getElementById('totalParticipacao').textContent = totalParticipacao;

            const chartData = prepareChartData(competitions);
            displayChart(chartData);
        });
    };
    
    window.confirmDelete = function (id) {
        competitionIdToDelete = id;
        $('#deleteConfirmationModal').modal('show');
    };

    window.deleteCompetition = function () {
        if (competitionIdToDelete) {
            const competitionRef = database.ref('competicao/' + competitionIdToDelete);
            competitionRef.remove()
                .then(() => {
                    console.log('Competição deletada com sucesso');
                    $('#deleteConfirmationModal').modal('hide'); 
                    displayCompetitions(); 
                    competitionIdToDelete = null;
                })
                .catch(error => console.error('Erro ao deletar competição: ', error));
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('confirmDeleteBtn').addEventListener('click', deleteCompetition);
    });

     window.createCompetition = function (nome, sigla, edicao, ouro, prata, bronze, mencao, participacao) {
        const newCompetition = {
            nome: nome,
            sigla: sigla,
            edicao: edicao,
            quantMedalhaBronze: bronze,
            quantMedalhaPrata: prata,
            quantMedalhaOuro: ouro,
            quantMencaoHonrosa: mencao,
            quantMedalhaParticipacao: participacao
        };

        const competitionsRef = database.ref('competicao');
        competitionsRef.push(newCompetition)
            .then(() => {
                document.getElementById('addCompetitionForm').reset();
                window.location.href = 'home.html';
            })
            .catch(error => console.error('Erro ao adicionar competição: ', error));
    };

    document.getElementById('addCompetitionForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const sigla = document.getElementById('sigla').value;
        const edicao = document.getElementById('edicao').value;
        const ouro = document.getElementById('ouro').value;
        const prata = document.getElementById('prata').value;
        const bronze = document.getElementById('bronze').value;
        const mencao = document.getElementById('mencao').value;
        const participacao = document.getElementById('participacao').value;

        createCompetition(nome, sigla, edicao, ouro, prata, bronze, mencao, participacao);
    });

    window.logout = function () {
        localStorage.clear();
        window.location.href = 'index.html';
    };

    

 

})();
