var Register = /** @class */ (function () {
    function Register(legacyId, parentId, title, levelOfDescription) {
        this.legacyId = legacyId;
        this.parentId = parentId;
        this.title = title;
        this.levelOfDescription = levelOfDescription;
    }
    return Register;
}());
var CSV = /** @class */ (function () {
    function CSV(registers) {
        this.header = 'legacyId,parentId,qubitParentSlug,identifier,accessionNumber,title,levelOfDescription,extentAndMedium,repository,archivalHistory,acquisition,scopeAndContent,appraisal,accruals,arrangement,accessConditions,reproductionConditions,language,script,languageNote,physicalCharacteristics,findingAids,locationOfOriginals,locationOfCopies,relatedUnitsOfDescription,publicationNote,digitalObjectURI,generalNote,subjectAccessPoints,placeAccessPoints,nameAccessPoints,genreAccessPoints,descriptionIdentifier,institutionIdentifier,rules,descriptionStatus,levelOfDetail,revisionHistory,languageOfDescription,scriptOfDescription,sources,archivistNote,publicationStatus,physicalObjectName,physicalObjectLocation,physicalObjectType,alternativeIdentifiers,alternativeIdentifierLabels,eventDates,eventTypes,eventStartDates,eventEndDates,eventActors,eventActorHistories,culture\n';
        this.registers = registers;
    }
    CSV.prototype.getRegistersAsCSV = function () {
        var content = ''; // String vazia
        this.registers.forEach(function (register) {
            content = content.concat(register.legacyId.toString(), ',', (register.parentId > 0 ? register.parentId.toString() : ''), ',,,,', register.title, ',', register.levelOfDescription, ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n');
        });
        return content;
    };
    CSV.prototype.download = function () {
        var csv = this.header + this.getRegistersAsCSV(); // Concatena header com registros
        // Cria elemento 'a' 
        // Seta propriedades para download
        // Nome do arquivo default é atom.csv
        // Clica no elemento e depois remove o mesmo
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
        element.setAttribute('download', 'atom.csv');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };
    return CSV;
}());
var filepicker = document.getElementById('filepicker'); // Filepicker
var downloadButton = document.getElementById('btn-download'); // Botão de download
var csv; // Declaração do CSV
downloadButton.addEventListener('click', function (e) { csv.download(); }); // Ao clicar no botão o arquivo é baixado
filepicker.addEventListener('change', function (e) {
    var files = e.target.files; // Files do input
    if (files.length > 0) { // Se houver pelo menos um arquivo selecionado
        var pathArray = []; // Array que vai conter as strings dos caminhos dos arquivos
        for (var i = 0; i < files.length; i++) { // Pega todos os caminhos relativos
            pathArray.push(files[i].webkitRelativePath); // Coloca no array de strings pathArray
        }
        var splitPathArray_1 = []; // Estrutura do diretório (array de array de strings)
        pathArray.forEach(function (path) {
            splitPathArray_1.push(path.split('/')); // Separa strings na '/'
        });
        var id_1 = 1; // legacyId de cada nova inserção
        var registerArray_1 = []; // Array de controle que contém objetos (futuras linhas do csv)
        splitPathArray_1.forEach(function (path) {
            path.forEach(function (item, index, array) {
                var registerArrayId = 0; // id do array de registros
                var parentId = 0; // id do pai daquele registro
                var searchIndex = index - 1; // searchIndex 
                // Percorrer array do fim pro início e testar se o item existe no registerArray
                // Caso sim, acessar registerArray e buscar o legacyId do elemento em questão
                // Caso não, testar o próximo até encontrar
                while (searchIndex != -1) { // Enquanto searchIndex for maior ou igual a 0
                    registerArrayId = registerArray_1.map(function (element) { return element.title; }).indexOf(array[searchIndex]); // Guarda id do array de registros que contém aquele
                    if (registerArrayId > -1) { // Se registerArrayId for válido (existe)
                        parentId = registerArray_1[registerArrayId].legacyId; // Guarda parentId do registro
                        break; // Sai do laço while
                    }
                    searchIndex--; // Decrementa searchIndex
                }
                if (registerArray_1.map(function (element) { return element.title; }).indexOf(item) < 0) { // Se o item não existir no registerArray
                    var levelOfDescription = ''; // Item, classe ou subclasse
                    if (array.length - 1 == index) {
                        levelOfDescription = 'Item';
                    } // Item se for o último índice do array
                    else if (index == 0) {
                        levelOfDescription = 'Classe';
                    } // Classe se for o primeiro índice do array
                    else {
                        levelOfDescription = 'Subclasse';
                    } // Senão Subclasse
                    registerArray_1.push(new Register(id_1++, parentId, item, levelOfDescription)); // Insere novo registro no array de registros
                }
            });
        });
        csv = new CSV(registerArray_1); // Instancia CSV
        downloadButton.disabled = false; // Habilita botão de download
    }
}, false);
