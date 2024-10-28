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
    row.setAttribute('class', ID);

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
    tblBody.appendChild(createRowID("DESCRIÇÃO BASICA - MALHA HORIZONTAL","QUANTIDADE","titulo"));

    ptsTelecon = Number(document.querySelector("#pts-telecom").value);
    ptsRede = Number(document.querySelector("#pts-rede").value);
    ptsVOIP = Number(document.querySelector("#pts-voip").value);
    ptsCFTV = Number(document.querySelector("#pts-cftv").value);
    distMalha = Number(document.querySelector("#distanciaMalha").value);
    qtdRack = 1;
    var BBSecundario = document.querySelector("#backbone-secundario").checked;
    var andares = Number(document.querySelector("#andares").value);
    var BBPrimario = document.querySelector("#backbone-primario").checked;
    var predios = Number(document.querySelector("#predios").value);
    if (!BBSecundario)  andares = 1;
    if (!BBSecundario)  predios = 1;

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

    if ( ptsCFTV > 0 )              UsUtilizados += Math.ceil( ptsCFTV/32 );//referente ao NVR
    if ( tipoRack === "Fechado" )   UsUtilizados += 2;                      //referente ao exaustor

    UsTotais = UsUtilizados * 1.5;
    if (UsUtilizados > 48) {
        qtdRack = Math.ceil(UsTotais / 48);
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

    var multiplicador = andares * predios;
    tblBody.appendChild(createRow("Tomada RJ 45 Fêmea (categoria  6)", (ptsTelecon * 2 + ptsRede) * multiplicador ));
    tblBody.appendChild(createRow("Cordão de ligação (Patch Cord), (categoria: 6), (Tamanho: 3m), (Cor: azul)", (ptsTelecon * 2 + ptsRede - ptsCFTV) * multiplicador));
    if (ptsCFTV > 0)
        tblBody.appendChild(createRow("Cordão de ligação (Patch Cord), (categoria: 6), (Tamanho: 3m), (Cor: parede)", (ptsCFTV) * multiplicador));
    tblBody.appendChild(createRow("Espelho de conexão (Tamanho 2x4) (2 furações)", ptsTelecon * multiplicador));
    if (ptsRede > 0)   tblBody.appendChild(createRow("Espelho de conexão (Tamanho 2x4) (1 furações)", ptsRede * multiplicador));
    else        ptsRede = 0;
    tblBody.appendChild(createRow("Cabo UTP  rígido (categoria:  6)", Math.ceil((ptsTelecon * 2 + ptsRede) * multiplicador * distMalha / 305)));

    PP *= multiplicador;
    qtdRack *= multiplicador;
    tblBody.appendChild(createRow("PPMH (Patch Panel de Malha Horizontal)", PP));
    tblBody.appendChild(createRow("Organizador frontal de cabo", PP * 2));
    if (ptsCFTV + ptsVOIP < (ptsTelecon * 2 + ptsRede))
        tblBody.appendChild(createRow("Cordão de Ligação, flexível, (Patch Cable), (categoria 6), (Tamanho: 2m),  (cor: azul)", (ptsTelecon * 2 + ptsRede - ptsCFTV - ptsVOIP) * multiplicador));
    if (ptsCFTV > 0)
        tblBody.appendChild(createRow("Cordão de Ligação, flexível, (Patch Cable), (categoria 6), (Tamanho: 2m),  (cor: vermelho)", ptsCFTV * multiplicador));
    if (ptsVOIP > 0)
        tblBody.appendChild(createRow("Cordão de Ligação, flexível, (Patch Cable), (categoria 6), (Tamanho: 2m),  (cor: amarelo)", ptsVOIP * multiplicador));

    tblBody.appendChild(createRow(`Rack ( ${tipoRack} ), (Tamanho: ${UsTotais}U )`, qtdRack));

    if (tipoRack === "Fechado")     tblBody.appendChild(createRow("Exaustor (Tamanho: 2U )", qtdRack));
    else                            tblBody.appendChild(createRow("Organizador lateral para Rack", 2 * qtdRack));

    if (ptsCFTV > 0)    tblBody.appendChild(createRow("NVR (Tamanho: 2U )", Math.ceil(ptsCFTV / 32)));  

    tblBody.appendChild(createRow('Bandeja fixa', qtdRack));
    tblBody.appendChild(createRow("Régua de Fechamento", (UsTotais - UsUtilizados) * qtdRack)); 
    tblBody.appendChild(createRow("Parafuso Porca Gaiola (conjunto com 10 unidades)", Math.ceil(UsTotais * multiplicador * 4 / 10) ));
    tblBody.appendChild(createRow("Abraçadeira de velcro (rolos de 3 metros)", qtdRack));
    tblBody.appendChild(createRow("Abraçadeira Hellermann (conjunto com 100 unidades)", qtdRack)); 
    tblBody.appendChild(createRow("Filtro de linha com 06 tomadas", qtdRack)); 
    tblBody.appendChild(createRow("Etiquetas para Rack", qtdRack)); 
    tblBody.appendChild(createRow("Etiquetas para Patch Panel", PP));
    tblBody.appendChild(createRow("Etiquetas de identificação de portas do Patch Panel", PP * 24));
    tblBody.appendChild(createRow("Etiquetas para identificação de Patch Cables", (ptsTelecon * 2 + ptsRede) * 2 * multiplicador));
    tblBody.appendChild(createRow("Etiqueta identificação do cabo de malha horizontal", (ptsTelecon * 2 + ptsRede) * 2 * multiplicador));
    tblBody.appendChild(createRow("Etiquetas para identificação de tomadas e espelho", ptsTelecon * 3 + ptsRede * 2 * multiplicador));

    return;
}

function gerarPlanilhaBB(tblBody) {
    tblBody.appendChild(createRowID("DESCRIÇÃO BASICA - BACKBONE ÓPTICO","QUANTIDADE","titulo"));

    var andares = Number(document.querySelector("#andares").value);
    var predios = Number(document.querySelector("#predios").value);
    var distPredios = Number(document.querySelector("#distPredios").value);
    var fibras = Number(document.querySelector("#qtdFibras").value);
    var velFibraSecundario = Number(document.querySelector("#velocidadeFibraPredio").value);
    var alturaAndar = Number(document.querySelector("#alturaPeDireito").value);
    var BBPrimario = document.querySelector("#backbone-primario").checked;
    var BBSecundario = document.querySelector("#backbone-secundario").checked;

    if (andares == 0)    andares = 1;
    if (predios == 0)    predios = 1;

    // console.log(predios);
    // console.log(andares * fibras);
    // console.log((predios - 2) * fibras);
    // console.log(Math.ceil(andares * fibras / 24 + (predios - 2) * fibras / 24));

    var fibrasPrimario = fibras;
    var fibrasSecundario = fibras * (andares - 1);

    var qtdTO = 0;
    var qtdDIO = Math.ceil(fibrasSecundario / 24);
    if (BBSecundario) {
        if (fibras > 12)
            qtdDIO = Math.ceil(andares * fibras / 24);
        else
            qtdTO += andares - 1;
    }

    var fibrasCaixaEmenda, qtdCaixaEmenda = 1;
    if (fibras < 12)
        fibrasCaixaEmenda = fibras;
    else {
        qtdCaixaEmenda = Math.ceil(fibras / 12);
        fibrasCaixaEmenda = Math.ceil(fibras / qtdCaixaEmenda);
    }  

    if (BBSecundario) {
        var seqCaixaEmenda = qtdCaixaEmenda * (andares - 1);
        if (qtdTO == 0)     qtdCaixaEmenda = qtdCaixaEmenda * (andares - 1) + seqCaixaEmenda;
        else                qtdCaixaEmenda = seqCaixaEmenda;
    }

    if (predios > 1) {      //no caso de se ter mais de um predio, deve ser adicionada mais uma caixa de emenda e espaço de 
                            //DIO para cada predio extra conectado à infraestrutura
        qtdCaixaEmenda = Math.ceil((fibrasSecundario + (predios - 1) * fibrasPrimario) / fibrasCaixaEmenda) * predios; 
        qtdDIO = Math.ceil((fibrasSecundario + fibrasPrimario * (predios - 1)) / 24) * predios;
    }

    var alturaPredio = alturaAndar * andares;

    var metrosFibraSecundario = 0;
    for(i=2; i<=andares; i++) {
        metrosFibraSecundario += i*alturaAndar + alturaAndar;
    }
    metrosFibraSecundario *= 1.1;
    var metrosFibraPrimario = distPredios * (predios - 1) * 1.1;
    
    var tipoFibraPrimario = "OS2 9x125µm";
    var tipoFibraSecundario = "OM4 50x125µm";
    if ( (alturaPredio > 500 && velFibraSecundario >= 10) || (alturaPredio >= 150 && velFibraSecundario > 40) )
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
        `Rack ( ${tipoRack} ), (Tamanho: ${UsTotais}U )`,                                                       //09
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

    if (BBSecundario) {
        if (!(tipoFibraPrimario === tipoFibraSecundario)) {
            qtdCordaoOpticoSecundario = fibrasSecundario;
            if (qtdTO === 0)        qtdCordaoOpticoSecundario *= 2;

            tblBody.appendChild(createRow(contentBB[4], Math.ceil(fibrasSecundario * predios)));
            tblBody.appendChild(createRow(contentBB[5], Math.ceil(fibrasSecundario * predios / 2)));
            tblBody.appendChild(createRow(contentBB[21], Math.ceil( qtdCordaoOpticoSecundario * predios / 2)));
            tblBody.appendChild(createRow(contentBB[8], metrosFibraSecundario * predios));
        }

        tblBody.appendChild(createRow(contentBB[6], qtdTO * predios));
    }

    if (BBPrimario) {
        if (tipoFibraPrimario === tipoFibraSecundario && BBSecundario) {
            metrosFibraPrimario += metrosFibraSecundario;
            fibrasPrimario += fibrasSecundario;
        }
        tblBody.appendChild(createRow(contentBB[2], fibrasPrimario * predios / 2));
        tblBody.appendChild(createRow(contentBB[3], fibrasPrimario * predios / 2));
        tblBody.appendChild(createRow(contentBB[20], Math.ceil( fibrasPrimario * predios / 2 )));
        tblBody.appendChild(createRow(contentBB[7], metrosFibraPrimario * (predios - 1)));
    }

    var qtdTotalRack = qtdRack * predios; 
    tblBody.appendChild(createRow(contentBB[9], qtdTotalRack));
    if (tipoRack === "Fechado")     tblBody.appendChild(createRow(contentBB[11], qtdTotalRack));
    else                            tblBody.appendChild(createRow(contentBB[10], 2 * qtdTotalRack));
    tblBody.appendChild(createRow(contentBB[12], qtdTotalRack));
    tblBody.appendChild(createRow(contentBB[13], (UsTotais - UsUtilizados) * qtdTotalRack));

    tblBody.appendChild(createRow(contentBB[14], Math.ceil( UsTotais * qtdTotalRack * 4 / 10 )));
    tblBody.appendChild(createRow(contentBB[15], qtdTotalRack));
    tblBody.appendChild(createRow(contentBB[16], qtdTotalRack));
    tblBody.appendChild(createRow(contentBB[17], qtdTotalRack));
    tblBody.appendChild(createRow(contentBB[18], qtdTotalRack));

    return;
}

