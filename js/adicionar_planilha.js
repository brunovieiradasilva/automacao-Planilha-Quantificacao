var tipoRack;
var tamanhoRack;
var portasDIO;
var fibras;
var tipoFibra;
var tipoCabo;

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

function gerarPlanilhaTotal() {

}

function createRow( text, value ) {
    var cell1 = document.createElement('td').appendChild(document.createTextNode(text)); 
    var row = document.createElement('tr');
    row.appendChild(cell1);
    var cell2 = document.createElement('td').appendChild(document.createTextNode(value + ""));
    row.appendChild(cell2);

    return row;
}

function gerarPlanilhaMH(tblBody) {

    ptsTelecon = Number(document.querySelector("#pts-telecom").value);
    ptsRede = Number(document.querySelector("#pts-rede").value);
    ptsVOIP = Number(document.querySelector("#pts-voip").value);
    ptsCFTV = Number(document.querySelector("#pts-cftv").value);
    distMalha = Number(document.querySelector("#distanciaMalha").value);
    qtdRack = 

    PP = Math.ceil((ptsTelecon * 2 + ptsRede) / 24);

    tipoRack = document.querySelector("input[name='tipoRack']:checked").value;
    UsTotais = 4 * PP + 4;
    if (tipoRack === "Fechado")     UsTotais += 2;
    
    UsTotais *= 1.5;
    if (UsTotais > 48) {
        qtdRack = Math.ceil(UsTotais / 48)
        UsTotais /= qtdRack;
    }

    tblBody.appendChild(createRow( "Tomada RJ 45 Fêmea (categoria  6)", ptsTelecon * 2 + ptsRede ));
    tblBody.appendChild(createRow( "Cordão de ligação (Patch Cord), (categoria: 6), (Tamanho: 3m), (Cor: azul)", ptsTelecon * 2 + ptsRede - ptsCFTV ));
    if (ptsCFTV > 0)
        tblBody.appendChild(createRow( "Cordão de ligação (Patch Cord), (categoria: 6), (Tamanho: 3m), (Cor: parede)", ptsCFTV ));
    tblBody.appendChild(createRow( "Espelho de conexão (Tamanho 2x4) (2 furações)", ptsTelecon ));
    tblBody.appendChild(createRow( "Espelho de conexão (Tamanho 2x4) (1 furações)", ptsRede ));
    tblBody.appendChild(createRow( "Cabo UTP  rígido (categoria:  6)", ptsTelecon * 2 + ptsRede ));
    tblBody.appendChild(createRow( "PPMH (Patch Panel de Malha Horizontal)", PP ));
    tblBody.appendChild(createRow( "Organizador frontal de cabo", (ptsTelecon * 2 + ptsRede) / 12 ));

    if (ptsCFTV + ptsVOIP < (ptsTelecon * 2 + ptsRede))
        tblBody.appendChild(createRow( "Cordão de Ligação, flexível, (Patch Cable), (categoria 6), (Tamanho: 2m),  (cor: azul)", ptsTelecon * 2 + ptsRede - ptsCFTV - ptsVOIP ));
    if (ptsCFTV > 0)
        tblBody.appendChild(createRow( "Cordão de Ligação, flexível, (Patch Cable), (categoria 6), (Tamanho: 2m),  (cor: vermelho)", ptsCFTV ));
    if (ptsVOIP > 0)
        tblBody.appendChild(createRow( "Cordão de Ligação, flexível, (Patch Cable), (categoria 6), (Tamanho: 2m),  (cor: amarelo)", ptsVOIP ));

    tblBody.appendChild(createRow( `Rack ( ${tipoRack} ), (Tamanho: ${UsTotais} )`, qtdRack )); 
    
    if (tipoRack === "Fechado") {
        tblBody.appendChild(createRow( "Organizador lateral para Rack", 2 ));
        tblBody.appendChild(createRow( "Exaustor (Tamanho: 2U )", 2 ));  
    }

    tblBody.appendChild(createRow( "NVR (Tamanho: 2U )", Math.ceil(ptsCFTV/32) )); //COMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETAR
    
    tblBody.appendChild(createRow( 'Bandeja fixa', 1 ));
    tblBody.appendChild(createRow( "Régua de Fechamento", 1234567890 )); //COMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETAR
    tblBody.appendChild(createRow( "Parafuso Porca Gaiola (conjunto com 10 unidades)", UsTotais * 4 ));
    tblBody.appendChild(createRow( "Abraçadeira de velcro", 3 ));
    tblBody.appendChild(createRow( "Abraçadeira Hellermann (conjunto com 100 unidades)", 1 )); //COMPLETARCOMPLETAR
    tblBody.appendChild(createRow( "Filtro de linha com 06 tomadas", 1 )); //COMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETAR
    tblBody.appendChild(createRow( "Etiquetas para Rack", 1 )); //COMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETARCOMPLETAR
    tblBody.appendChild(createRow( "Etiquetas para Patch Panel", Math.ceil((ptsTelecon * 2 + ptsRede) / 24) ));
    tblBody.appendChild(createRow( "Etiquetas de identificação de portas do Patch Panel", PP ));
    tblBody.appendChild(createRow( "Etiquetas para identificação de Patch Cables", ptsTelecon * 2 + ptsRede ));
    tblBody.appendChild(createRow( "Etiquetas para identificação de Patch Cables", ptsTelecon * 2 + ptsRede ));
    tblBody.appendChild(createRow( "Etiqueta identificação do cabo de malha horizontal", (ptsTelecon * 2 + ptsRede) * 2 ));
    tblBody.appendChild(createRow( "Etiquetas para identificação de tomadas e espelho", ptsTelecon * 3 + ptsRede * 2 ));

    return tblBody;
}

function gerarPlanilhaBB() {
}

function generateTable() {

    if (document.getElementById("tabela")) {
        document.getElementById("tabela").remove();
    }

    // creates a <table> element and a <tbody> element
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

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
  
    // // creating all cells
    // for (let i = 0; i < 20; i++) {
    //   // creates a table row
    //   const row = document.createElement("tr");
  
    //   for (let j = 0; j < 4; j++) {
    //     // Create a <td> element and a text node, make the text
    //     // node the contents of the <td>, and put the <td> at
    //     // the end of the table row
    //     const cell = document.createElement("td");
    //     const cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
    //     cell.appendChild(cellText);
    //     row.appendChild(cell);
    //   }
  
    //   // add the row to the end of the table body
    //   tblBody.appendChild(row);
    // }
  
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.body.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("border", "2");
    
  }