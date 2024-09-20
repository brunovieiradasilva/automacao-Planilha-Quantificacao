var tipoRack = 0;
var tamanhoRack = 0;
var portasDIO = 0;
var fibras = 0;
var tipoFibra = 0;
var tipoCabo = 0;
var UsTotais = 0;

const tamRack = [4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48]

var contentBB = [
    `Distribuidor Interno Óptico - Chassi ( ${portasDIO} portas )`,
    `Caixa de Emendas ( ${fibras} fibras )`,
    `Pig Tail ( ${tipoFibra} ), ( LC ), ( 2 metros )`,
    `Acoplador Óptico ( ${tipoFibra} ), ( LC )`,
    `Terminador Óptico ( ${fibras} fibras )`,
    `Cabo Óptico ( ${tipoFibra} ), ( ${tipoCabo} ), ( ${fibras} fibras )`,
    `Rack ( ${tipoRack} ), (Tamanho: ${tamanhoRack} )`,
    "Organizador lateral para Rack",
    "Exaustor (Tamanho: 2U )",
    'Bandeja fixa',
    'Bandeja deslizante',
    "Régua de Fechamento",
    "Parafuso Porca Gaiola (conjunto com 10 unidades)",
    "Abraçadeira de velcro",
    "Abraçadeira Hellermann (conjunto com 100 unidades)",
    "Filtro de linha com 06 tomadas",
    "Etiquetas para Rack",
    "Etiquetas para identificação de Cordões Ópticos",
];

function createRow(text, value) {
    var row = document.createElement('tr');

    var cell1 = document.createElement('td');
    cell1.appendChild(document.createTextNode(text));
    row.appendChild(cell1);

    var cell2 = document.createElement('td');
    cell2.appendChild(document.createTextNode(value + ""));
    row.appendChild(cell2);

    return row;
}

function createRowID(text, value, ID) {
    var row = document.createElement('tr');
    row.setAttribute('id', ID);

    var cell1 = document.createElement('td');
    cell1.appendChild(document.createTextNode(text));
    row.appendChild(cell1);

    var cell2 = document.createElement('td');
    cell2.appendChild(document.createTextNode(value + ""));
    row.appendChild(cell2);

    return row;
}

function generateTable() {

    if (document.getElementById("tabela")) {
        document.getElementById("tabela").remove();
        document.getElementById("titulo-tabela").remove();
    }

    // creates a <table> element and a <tbody> element
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    tblBody.appendChild(createRowID("DESCRIÇÃO BASICA","QUANTIDADE","titulo"));
    tbl.id = "tabela"

    switch (document.querySelector("input[name='1']:checked").value) {
        case 't':
            gerarPlanilhaTotal(tblBody);
            break;
        case 'm':
            gerarPlanilhaMH(tblBody);
            break;
        case 'b':
            gerarPlanilhaBB(tblBody);
            break;
        default:
            throw new Error("tipo de planilha não especificada");
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.body.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("border", "2");

}

function gerarPlanilhaTotal(tblBody) {

}

function gerarPlanilhaMH(tblBody) {

    ptsTelecon = Number(document.querySelector("#pts-telecom").value);
    ptsRede = Number(document.querySelector("#pts-rede").value);
    ptsVOIP = Number(document.querySelector("#pts-voip").value);
    ptsCFTV = Number(document.querySelector("#pts-cftv").value);
    distMalha = Number(document.querySelector("#distanciaMalha").value);
    qtdRack = 1;

    PP = Math.ceil((ptsTelecon * 2 + ptsRede) / 24);

    tipoRack = document.querySelector("input[name='tipoRack']:checked").value;
    usUtilizados = 4 * PP + 4;

    if (tipoRack === "Fechado") usUtilizados += 2;

    usUtilizados *= 1.5;
    if (usUtilizados > 48) {
        qtdRack = Math.ceil(usUtilizados / 48)
        usUtilizados /= qtdRack;
    }

    if (!tamRack.includes(usUtilizados)) {
        for (i = 0; i < 15; i++) {
            if (usUtilizados < tamRack[i]) {
                UsTotais = tamRack[i];
                break;
            }
        }
    } else UsTotais = usUtilizados;

    tblBody.appendChild(createRow("Tomada RJ 45 Fêmea (categoria  6)", ptsTelecon * 2 + ptsRede));
    tblBody.appendChild(createRow("Cordão de ligação (Patch Cord), (categoria: 6), (Tamanho: 3m), (Cor: azul)", ptsTelecon * 2 + ptsRede - ptsCFTV));
    if (ptsCFTV > 0)
        tblBody.appendChild(createRow("Cordão de ligação (Patch Cord), (categoria: 6), (Tamanho: 3m), (Cor: parede)", ptsCFTV));
    tblBody.appendChild(createRow("Espelho de conexão (Tamanho 2x4) (2 furações)", ptsTelecon));
    tblBody.appendChild(createRow("Espelho de conexão (Tamanho 2x4) (1 furações)", ptsRede));
    tblBody.appendChild(createRow("Cabo UTP  rígido (categoria:  6)", ptsTelecon * 2 + ptsRede));
    tblBody.appendChild(createRow("PPMH (Patch Panel de Malha Horizontal)", PP));
    tblBody.appendChild(createRow("Organizador frontal de cabo", PP * 2));

    if (ptsCFTV + ptsVOIP < (ptsTelecon * 2 + ptsRede))
        tblBody.appendChild(createRow("Cordão de Ligação, flexível, (Patch Cable), (categoria 6), (Tamanho: 2m),  (cor: azul)", ptsTelecon * 2 + ptsRede - ptsCFTV - ptsVOIP));
    if (ptsCFTV > 0)
        tblBody.appendChild(createRow("Cordão de Ligação, flexível, (Patch Cable), (categoria 6), (Tamanho: 2m),  (cor: vermelho)", ptsCFTV));
    if (ptsVOIP > 0)
        tblBody.appendChild(createRow("Cordão de Ligação, flexível, (Patch Cable), (categoria 6), (Tamanho: 2m),  (cor: amarelo)", ptsVOIP));

    tblBody.appendChild(createRow('Rack ( ${tipoRack} ), (Tamanho: ${UsTotais} )', qtdRack));

    if (tipoRack === "Fechado") {
        tblBody.appendChild(createRow("Organizador lateral para Rack", 2 * qtdRack));
        tblBody.appendChild(createRow("Exaustor (Tamanho: 2U )", qtdRack));
    }

    tblBody.appendChild(createRow("NVR (Tamanho: 2U )", Math.ceil(ptsCFTV / 32))); //COMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETAR

    tblBody.appendChild(createRow('Bandeja fixa', 1));
    tblBody.appendChild(createRow("Régua de Fechamento", UsTotais - usUtilizados)); //COMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETAR
    tblBody.appendChild(createRow("Parafuso Porca Gaiola (conjunto com 10 unidades)", UsTotais * 4));
    tblBody.appendChild(createRow("Abraçadeira de velcro", 3));
    tblBody.appendChild(createRow("Abraçadeira Hellermann (conjunto com 100 unidades)", 1)); //COMPLETARCOMPLETAR
    tblBody.appendChild(createRow("Filtro de linha com 06 tomadas", 1)); //COMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETAR
    tblBody.appendChild(createRow("Etiquetas para Rack", 1)); //COMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETAR
    tblBody.appendChild(createRow("Etiquetas para Patch Panel", Math.ceil((ptsTelecon * 2 + ptsRede) / 24)));
    tblBody.appendChild(createRow("Etiquetas de identificação de portas do Patch Panel", PP));
    tblBody.appendChild(createRow("Etiquetas para identificação de Patch Cables", ptsTelecon * 2 + ptsRede));
    tblBody.appendChild(createRow("Etiquetas para identificação de Patch Cables", ptsTelecon * 2 + ptsRede));
    tblBody.appendChild(createRow("Etiqueta identificação do cabo de malha horizontal", (ptsTelecon * 2 + ptsRede) * 2));
    tblBody.appendChild(createRow("Etiquetas para identificação de tomadas e espelho", ptsTelecon * 3 + ptsRede * 2));

    return tblBody;
}

function gerarPlanilhaBB(tblBody) {

    andares = Number(document.querySelector("#andares").value);
    predios = Number(document.querySelector("#predios"));
    fibrasSecundario = Number(document.querySelector("#fibras-secundario").value);
    fibrasPrimario = Number(document.querySelector("#fibras-primario").value);
    velFibraSecundario = Number(document.querySelector("#velocidadeFibraPredio"));
    velFibraPrimario = Number(document.querySelector("#velocidadeFibraCampus"));
    alturaAndar = Number(document.querySelector("#alturaPeDireito").value);

    qtdDIO = Math.ceil(andares * fibras / 24);
    qtdTO = 0;
    if (fibras > 12)
        qtdDIO += (andares - 1) * Math.ceil(fibras / 24);
    else
        qtdTO += andares - 1;

    var fibrasCaixaEmenda, qtdCaixaEmenda = 1;
    if (fibras < 12)
        fibrasCaixaEmenda = fibras;
    else {
        qtdCaixaEmenda = Math.ceil(fibras / 12);
        fibrasCaixaEmenda = Math.ceil(fibras / qtdCaixaEmenda);
    }
    if (qtdTO == 0) qtdCaixaEmenda *= andares;

    // qtdRack = 1;
    // //tipoRack = document.querySelector("input[name='tipoRack']:checked").value;
    // UsTotais = 4 * PP + 4;
    // //if (tipoRack === "Fechado")     UsTotais += 2;

    // UsTotais *= 1.5;
    // if (UsTotais > 48) {
    //     qtdRack = Math.ceil(UsTotais / 48)
    //     UsTotais /= qtdRack;
    // }

    // if (!tamRack.includes(UsTotais)) 
    //     for (i=0; i<15; i++)
    //         if (UsTotais > tamRack[i])
    //             UsTotais = tamRack[i-1];    

  
    tblBody.appendChild(createRow(contentBB[0], 1));
    return tblBody;
}

