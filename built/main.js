"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filepicker = document.getElementById('filepicker'); // Filepicker
filepicker.addEventListener('change', function (e) {
    var files = e.target.files;
    var filelist = document.getElementById('filelist');
    var pathArray = [];
    for (var i = 0; i < files.length; i++) { // Pega todos os caminhos relativos
        pathArray.push(files[i].webkitRelativePath); // Coloca num array de strings
    }
    var splitPathArray = []; // Estrutura do diretório
    pathArray.forEach(function (path) {
        splitPathArray.push(path.split('/')); // Separa strings na '/'
    });
    var csv = new String('legacyId,parentId,qubitParentSlug,identifier,accessionNumber,title,levelOfDescription,extentAndMedium,repository,archivalHistory,acquisition,scopeAndContent,appraisal,accruals,arrangement,accessConditions,reproductionConditions,language,script,languageNote,physicalCharacteristics,findingAids,locationOfOriginals,locationOfCopies,relatedUnitsOfDescription,publicationNote,digitalObjectURI,generalNote,subjectAccessPoints,placeAccessPoints,nameAccessPoints,genreAccessPoints,descriptionIdentifier,institutionIdentifier,rules,descriptionStatus,levelOfDetail,revisionHistory,languageOfDescription,scriptOfDescription,sources,archivistNote,publicationStatus,physicalObjectName,physicalObjectLocation,physicalObjectType,alternativeIdentifiers,alternativeIdentifierLabels,eventDates,eventTypes,eventStartDates,eventEndDates,eventActors,eventActorHistories,culture\n');
    var id = 1;
    var ctrlArray = [];
    splitPathArray.forEach(function (path) {
        path.forEach(function (item, index, array) {
            var ctrlArrayId = 0;
            var parentId = 0;
            // Percorrer array do fim pro início e testar se o item existe no ctrlArray
            // Caso sim, acessar ctrlArray e buscar o legacyId do elemento em questão
            // Caso não, testar o próximo até encontrar
            var offset = index - 1;
            while (offset != -1) {
                ctrlArrayId = ctrlArray.map(function (element) { return element.title; }).indexOf(array[offset]);
                if (ctrlArrayId > -1) {
                    parentId = ctrlArray[ctrlArrayId].legacyId;
                    break;
                }
                offset--;
            }
            if (array.length - 1 == index) { // Se o item for o último no array, insere como 'Item'
                ctrlArray.push({
                    legacyId: id++,
                    parentId: parentId,
                    title: item,
                    levelOfDescription: 'Item'
                });
                csv = csv.concat(item);
            }
            else if (ctrlArray.map(function (element) { return element.title; }).indexOf(item) < 0) { // Se o item não for o último e não existir no array
                ctrlArray.push({
                    legacyId: id++,
                    parentId: parentId,
                    title: item,
                    levelOfDescription: 'Folder'
                });
                csv = csv.concat(item);
            }
        });
    });
    console.log(ctrlArray);
    console.log(splitPathArray);
}, false);
