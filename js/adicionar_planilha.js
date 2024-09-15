function gerarPlanilhaTotal() {

}

function gerarPlanilhaMH() {
    pontosTelecom = Number(document.querySelector("#pts-telecom").value);
    pontosRede = Number(document.querySelector("#pts-rede").value);
    pontosVoip = Number(document.querySelector("#pts-voip").value);
    pontosCftv = Number(document.querySelector("#pts-cftv").value);
    distanciaMalha = Number(document.querySelector("#distanciaMalha").value);

    let linhas = document.querySelectorAll(".linha");

    for (let i = 25; i < linhas.length; i++) {
        if (i == 25 || i == 26 || i == 31 || i == 34 || i == 46) {
            continue;
        }

        switch (i) {
            case 27: linhas[i].lastChild.previousSibling.innerText = pontosTelecom * 2 + pontosRede;
                break;
            case 28: linhas[i].lastChild.previousSibling.innerText = pontosTelecom * 2 + pontosRede;
                break;
            case 29: linhas[i].lastChild.previousSibling.innerText = pontosTelecom + pontosRede;
                break;
            case 30: linhas[i].lastChild.previousSibling.innerText = pontosTelecom * 2 + pontosRede + pontosTelecom + pontosRede;
                break;
            case 32: linhas[i].lastChild.previousSibling.innerText = pontosTelecom * 2 + pontosRede;
                break;
            case 33: linhas[i].lastChild.previousSibling.innerText = 2 * (pontosTelecom * 2 + pontosRede);
                break;

        }
        // linhas[i].lastChild.previousSibling.innerText;
    }

}

function gerarPlanilhaBB() {

}