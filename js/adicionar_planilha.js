$("#salvar").click(function () {

    let planilha = document.querySelector("input[name='1']:checked");

    let tipoPlanilha = null;
    if (planilha.value == "t") {
        tipoPlanilha = "total-table";
    }
    else if (planilha.value == "m") {
        tipoPlanilha = "mh-table";
    }
    else {
        tipoPlanilha = "backbone-table";
    }

    let c = document.querySelector('#container');
    let lastChild = c.lastChild;
});