$("#salvar").click(function () {

    let planilha = document.querySelector("input[name='1']:checked");

    if (planilha.value == "t") {
        gerarPlanilhaTotal();
    }
    else if (planilha.value == "m") {
        gerarPlanilhaMH();
    }
    else {
        gerarPlanilhaBB();
    }

    let c = document.querySelector('#container');
    let lastChild = c.lastChild;
});

function  gerarPlanilhaTotal(){

}

function  gerarPlanilhaMH(){
    
}

function  gerarPlanilhaBB(){
    
}