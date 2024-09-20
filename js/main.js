
$("#ethernet").click(function () {
    $("#ethernet-field").toggle("3s");
});

$("#voip").click(function () {
    $("#voip-field").toggle("3s");
});

$("#cftv").click(function () {
    $("#cftv-field").toggle("3s");
});

$("#telefonia").click(function () {
    $("#telefonia-field").toggle("3s");
});

$("#backbone-secundario").click(function () {
    $("#backbone-secundario-field").toggle("3s");
});

$("#backbone-primario").click(function () {
    $("#backbone-primario-field").toggle("3s");

});

$("#salvar").click(function () {

    $("main").css("display", " ");

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
    generateTable();

    $(".table-form").hide("3s");
    $("#" + tipoPlanilha + "s").show("3s");

    var ex1 = $('<a>', {
        class: "exportar",
        download: "quantificacao.xls",
        href: "#",
        onclick: "return ExcellentExport.excel(this,'" + tipoPlanilha + "', 'Quantificacao');",
        text: "Exportar para excel"
    });

    var ex2 = $('<a>', {
        class: "exportar",
        download: "quantificacao.csv",
        href: "#",
        onclick: "return ExcellentExport.csv(this, '" + tipoPlanilha + "', 'Quantificacao');",
        text: "Exportar para csv"
    });

    var ex3 = $('<h2>', {
        id: "titulo-tabela",
        text: "MATERIAL DE INFRAESTRUTURA DE REDE"
    });

    $(".exportar").remove();
    $("#quantificacao-form").append(ex1);
    $("#quantificacao-form").append(ex2);
    $("#txt").append(ex3);
});

$(".tipoPlanilha").click(function () {

    switch (document.querySelector("input[name='1']:checked").value) {
        case 't':
            $("#planilhaMH").show("3s");
            $("#planilhaBB").show("3s");
            break;
        case 'm':
            $("#planilhaMH").show("3s");
            $("#planilhaBB").hide("3s");
            break;
        case 'b':
            $("#planilhaBB").show("3s");
            $("#planilhaMH").hide("3s");
            break;
        default:
            throw new Error("tipo de planilha não especificada");
    }

});