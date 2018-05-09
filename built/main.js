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
    CSV.prototype.getRegisters = function () {
        return this.registers;
    };
    return CSV;
}());
var filepicker = document.getElementById('filepicker'); // Filepicker
filepicker.addEventListener('change', function (e) {
    var files = e.target.files; // Files do input
    var pathArray = []; // Array que vai conter as strings dos caminhos dos arquivos
    for (var i = 0; i < files.length; i++) { // Pega todos os caminhos relativos
        pathArray.push(files[i].webkitRelativePath); // Coloca no array de strings pathArray
    }
    var splitPathArray = []; // Estrutura do diretório (array de array de strings)
    pathArray.forEach(function (path) {
        splitPathArray.push(path.split('/')); // Separa strings na '/'
    });
    var id = 1; // legacyId de cada nova inserção
    var registerArray = []; // Array de controle que contém objetos (futuras linhas do csv)
    splitPathArray.forEach(function (path) {
        path.forEach(function (item, index, array) {
            var registerArrayId = 0; // id do array de registros
            var parentId = 0; // id do pai daquele registro
            var searchIndex = index - 1; // searchIndex 
            // Percorrer array do fim pro início e testar se o item existe no registerArray
            // Caso sim, acessar registerArray e buscar o legacyId do elemento em questão
            // Caso não, testar o próximo até encontrar
            while (searchIndex != -1) { // Enquanto searchIndex for maior ou igual a 0
                registerArrayId = registerArray.map(function (element) { return element.title; }).indexOf(array[searchIndex]); // Guarda id do array de registros que contém aquele
                if (registerArrayId > -1) { // Se registerArrayId for válido (existe)
                    parentId = registerArray[registerArrayId].legacyId; // Guarda parentId do registro
                    break; // Sai do laço while
                }
                searchIndex--; // Decrementa searchIndex
            }
            if (registerArray.map(function (element) { return element.title; }).indexOf(item) < 0) { // Se o item não existir no registerArray
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
                registerArray.push(new Register(id++, parentId, item, levelOfDescription)); // Insere novo registro no array de registros
            }
        });
    });
    var csv = new CSV(registerArray);
    console.log(csv.getRegisters());
    console.log(splitPathArray);
}, false);
