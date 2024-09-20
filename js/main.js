
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

    var backboneRackField = document.querySelector("#backbone-rack-field"),
        style = window.getComputedStyle(backboneRackField),
        display = style.getPropertyValue("display");

    console.log(display);

    if (display == 'none')
        $("#backbone-rack-field").toggle("3s");
});

$("#backbone-primario").click(function () {
    $("#backbone-primario-field").toggle("3s");

    var backboneRackField = document.querySelector("#backbone-rack-field"),
        style = window.getComputedStyle(backboneRackField),
        display = style.getPropertyValue("display");

    if (display == 'none')
        $("#backbone-rack-field").toggle("3s");
});

$("#salvar").click(function () {

    $("main").css("display", " ");

    let planilha = document.querySelector("input[name='1']:checked");

    let tipoPlanilha = null;
    if (planilha.value == "t") {
        tipoPlanilha = "total-table";
        gerarPlanilhaTotal();
    }
    else if (planilha.value == "m") {
        tipoPlanilha = "mh-table";
        generateTable();
    }
    else {
        tipoPlanilha = "backbone-table";
        gerarPlanilhaBB();
    }
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
        text: "DESCRIÇÃO BÁSICA - MATERIAL DE INFRA DE REDE"
    });

    $(".exportar").remove();
    $("#quantificacao-form").append(ex1);
    $("#quantificacao-form").append(ex2);
    $("#txt").append(ex3);
});