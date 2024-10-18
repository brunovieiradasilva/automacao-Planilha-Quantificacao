var tamanhoRack = 0;
var portasDIO = 0;
var fibras = 0;
var tipoFibra = 0;
var tipoCabo = 0;
var UsTotais = 0;
var UsUtilizados = 0;

const tamRack = [4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48]

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

    try {
        var tipoPlanilha = document.querySelector("input[name='1']:checked");
        if (tipoPlanilha == null) throw new Error("Tipo de planilha não selecionado");
        switch (tipoPlanilha.value) {
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
                break;
        }
    }
    catch (ex) {
        alert(ex.message);
        return;
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.body.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("border", "2");

}

function gerarPlanilhaTotal(tblBody) {
    gerarPlanilhaMH(tblBody);
    gerarPlanilhaBB(tblBody);

    return tblBody;
}

function gerarPlanilhaMH(tblBody) {

    ptsTelecon = Number(document.querySelector("#pts-telecom").value);
    ptsRede = Number(document.querySelector("#pts-rede").value);
    ptsVOIP = Number(document.querySelector("#pts-voip").value);
    ptsCFTV = Number(document.querySelector("#pts-cftv").value);
    distMalha = Number(document.querySelector("#distanciaMalha").value);
    qtdRack = 1;

    PP = Math.ceil((ptsTelecon * 2 + ptsRede) / 24);

    var tipoRack;
    try {
        tipoRack = document.querySelector("input[name='tipoRackMH']:checked");
        if (tipoRack == null) throw new Error("Tipo de rack não selecionado");
        tipoRack = tipoRack.value;
    } catch (ex) {
        alert(ex.message);
        return;
    }
    UsUtilizados = 4 * PP + 4;

    if (tipoRack === "Fechado") UsUtilizados += 2;

    UsTotais = UsUtilizados * 1.5;
    if (UsUtilizados > 48) {
        qtdRack = Math.ceil(UsTotais / 48)
        UsTotais /= qtdRack;
    }

    if (!tamRack.includes(UsTotais)) {
        for (i = 0; i < 15; i++) {
            if (UsTotais < tamRack[i]) {
                UsTotais = tamRack[i];
                break;
            }
        }
    } 

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

    tblBody.appendChild(createRow(`Rack ( ${tipoRack} ), (Tamanho: ${UsTotais}U )`, qtdRack));

    if (tipoRack === "Fechado")     tblBody.appendChild(createRow("Exaustor (Tamanho: 2U )", qtdRack));
    else                            tblBody.appendChild(createRow("Organizador lateral para Rack", 2 * qtdRack));

    if (ptsCFTV > 0)    tblBody.appendChild(createRow("NVR (Tamanho: 2U )", Math.ceil(ptsCFTV / 32)));  

    tblBody.appendChild(createRow('Bandeja fixa', 1));
    tblBody.appendChild(createRow("Régua de Fechamento", UsTotais * qtdRack - UsUtilizados)); 
    tblBody.appendChild(createRow("Parafuso Porca Gaiola (conjunto com 10 unidades)", Math.ceil(UsTotais * 4 / 10) ));
    tblBody.appendChild(createRow("Abraçadeira de velcro (rolos de 3 metros)", qtdRack));
    tblBody.appendChild(createRow("Abraçadeira Hellermann (conjunto com 100 unidades)", qtdRack)); 
    tblBody.appendChild(createRow("Filtro de linha com 06 tomadas", qtdRack)); 
    tblBody.appendChild(createRow("Etiquetas para Rack", qtdRack)); 
    tblBody.appendChild(createRow("Etiquetas para Patch Panel", Math.ceil((ptsTelecon * 2 + ptsRede) / 24)));
    tblBody.appendChild(createRow("Etiquetas de identificação de portas do Patch Panel", PP));
    tblBody.appendChild(createRow("Etiquetas para identificação de Patch Cables", ptsTelecon * 2 + ptsRede));
    tblBody.appendChild(createRow("Etiquetas para identificação de Patch Cables", ptsTelecon * 2 + ptsRede));
    tblBody.appendChild(createRow("Etiqueta identificação do cabo de malha horizontal", (ptsTelecon * 2 + ptsRede) * 2));
    tblBody.appendChild(createRow("Etiquetas para identificação de tomadas e espelho", ptsTelecon * 3 + ptsRede * 2));

    return;
}

function gerarPlanilhaBB(tblBody) {

    var andares = Number(document.querySelector("#andares").value);
    var predios = Number(document.querySelector("#predios").value);
    var distPredios = Number(document.querySelector("#distPredios").value);
    var fibras = Number(document.querySelector("#qtdFibras").value);
    var velFibraSecundario = Number(document.querySelector("#velocidadeFibraPredio").value);
    var velFibraPrimario = Number(document.querySelector("#velocidadeFibraCampus").value);
    var alturaAndar = Number(document.querySelector("#alturaPeDireito").value);

    var fibrasPrimario = fibras;
    var fibrasSecundario = fibras * (andares - 1);

    var qtdDIO = Math.ceil(fibras / 24);
    var qtdTO = 0;
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
    var seqCaixaEmenda = qtdCaixaEmenda * andares;
    if (qtdTO == 0)     qtdCaixaEmenda = qtdCaixaEmenda * (andares - 1) + seqCaixaEmenda;
    else                qtdCaixaEmenda = seqCaixaEmenda;

    var alturaPredio = alturaAndar * andares;

    var metrosFibraSecundario = 0;
    for(i=2; i<=andares; i++) {
        metrosFibraSecundario += i*alturaAndar + alturaAndar;
    }
    var metrosFibraPrimario = distPredios * predios;
    
    var tipoFibraPrimario = "OS2 9x125µm";
    var tipoFibraSecundario = "OM4 50x125µm";
    if ( (alturaPredio > 500 && velFibraSecundario > 10) || (alturaPredio > 150 && velFibraSecundario > 40) )
        tipoFibraSecundario = "OS1 9x125µm";

    var tipoCaboPrimario = "loose";
    var tipoCaboSecundario = "thight buffer";

    var qtdCordaoOpticoSecundario = 0;

    var tipoRack;
    try {
        tipoRack = document.querySelector("input[name='tipoRackBackbone']:checked");
        if (tipoRack == null) throw new Error("Tipo de rack não selecionado");
        tipoRack = tipoRack.value;
    } catch (ex) {
        alert(ex.message);
        return;
    }
    var UsUtilizados = qtdDIO * 4 + 4;
    var qtdRack = 1;

    if (tipoRack === "Fechado") UsUtilizados += 2;

    UsTotais = UsUtilizados * 1.5;
    if (UsUtilizados > 48) {
        qtdRack = Math.ceil(UsTotais / 48)
        UsTotais /= qtdRack;
    }

    if (!tamRack.includes(UsTotais)) {
        for (i = 0; i < 15; i++) {
            if (UsTotais < tamRack[i]) {
                UsTotais = tamRack[i];
                break;
            }
        }
    } 

    var contentBB = [
        `Distribuidor Interno Óptico - Chassi ( 24 portas )`,                                                   //00
        `Caixa de Emendas ( ${fibrasCaixaEmenda} fibras )`,                                                     //01
        `Pig Tail ( ${tipoFibraPrimario} ), ( duplo ), ( LC ), ( 2 metros )`,                                   //02
        `Acoplador Óptico ( ${tipoFibraPrimario} ), ( LC ), ( duplo )`,                                         //03
        `Pig Tail ( ${tipoFibraSecundario} ), ( duplo ), ( LC ), ( 2 metros )`,                                 //04
        `Acoplador Óptico ( ${tipoFibraSecundario} ), ( LC ), ( duplo )`,                                       //05
        `Terminador Óptico ( ${fibrasCaixaEmenda} fibras )`,                                                    //06
        `Cabo Óptico ( ${tipoFibraPrimario} ), ( ${tipoCaboPrimario} ), ( ${fibras} fibras ) ( metros )`,       //07
        `Cabo Óptico ( ${tipoFibraSecundario} ), ( ${tipoCaboSecundario} ), ( ${fibras} fibras ) ( metros )`,   //08
        `Rack ( ${tipoRack} ), (Tamanho: ${UsTotais} )`,                                                        //09
        "Organizador lateral para Rack",                                                                        //10
        "Exaustor (Tamanho: 2U )",                                                                              //11
        'Bandeja fixa',                                                                                         //12
        "Régua de Fechamento",                                                                                  //13
        "Parafuso Porca Gaiola (conjunto com 10 unidades)",                                                     //14
        "Abraçadeira de velcro (rolos de 3 metros)",                                                            //15
        "Abraçadeira Hellermann (conjunto com 100 unidades)",                                                   //16
        "Filtro de linha com 06 tomadas",                                                                       //17
        "Etiquetas para Rack",                                                                                  //18
        "Etiquetas para identificação de Cordões Ópticos",                                                      //19
        `Cordão Óptico ( ${tipoFibraPrimario} ) ( duplo ) ( LC ) ( 2 metros ) `,                                //20
        `Cordão Óptico ( ${tipoFibraSecundario} ) ( duplo ) ( LC ) ( 2 metros ) `                               //21
    ];

    tblBody.appendChild(createRow(contentBB[0], qtdDIO));
    tblBody.appendChild(createRow(contentBB[1], qtdCaixaEmenda));

    if (tipoFibraPrimario === tipoFibraSecundario) {
        metrosFibraPrimario += metrosFibraSecundario;
        fibrasPrimario += fibrasSecundario;
    }
    tblBody.appendChild(createRow(contentBB[2], fibrasPrimario / 2));
    tblBody.appendChild(createRow(contentBB[3], fibrasPrimario / 2));
    tblBody.appendChild(createRow(contentBB[20], Math.ceil( fibras / 2 )));
    tblBody.appendChild(createRow(contentBB[7], metrosFibraPrimario));

    tblBody.appendChild(createRow(contentBB[9], qtdRack));
    if (tipoRack === "Fechado")     tblBody.appendChild(createRow(contentBB[11], qtdRack));
    else                            tblBody.appendChild(createRow(contentBB[10], 2 * qtdRack));
    tblBody.appendChild(createRow(contentBB[12], qtdRack));
    tblBody.appendChild(createRow(contentBB[13], UsTotais * qtdRack - UsUtilizados));

    if (!(tipoFibraPrimario === tipoFibraSecundario)) {
        qtdCordaoOpticoSecundario = fibras * (andares - 1);
        if (qtdTO === 0)        qtdCordaoOpticoSecundario *= 2;

        tblBody.appendChild(createRow(contentBB[4], fibrasSecundario / 2));
        tblBody.appendChild(createRow(contentBB[5], fibrasSecundario / 2));
        tblBody.appendChild(createRow(contentBB[21], Math.ceil( qtdCordaoOpticoSecundario / 2 )));
        tblBody.appendChild(createRow(contentBB[8], metrosFibraSecundario));
    }

    tblBody.appendChild(createRow(contentBB[6], qtdTO));
    tblBody.appendChild(createRow(contentBB[14], Math.ceil( UsTotais * qtdRack * 4 / 10 )));
    tblBody.appendChild(createRow(contentBB[15], qtdRack));
    tblBody.appendChild(createRow(contentBB[16], qtdRack));
    tblBody.appendChild(createRow(contentBB[17], qtdRack));
    tblBody.appendChild(createRow(contentBB[18], qtdRack));

    return;
}

