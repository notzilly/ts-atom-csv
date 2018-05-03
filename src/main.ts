import * as aj from 'array-json-transform';

var filepicker = document.getElementById('filepicker'); // Filepicker

filepicker.addEventListener('change', (e) => { // Evento que mapeia cada nova pasta
    var files = (<HTMLInputElement>e.target).files;
    
    var filelist = document.getElementById('filelist');
    
    let pathArray: Array<string> = [];
    
    for (let i = 0; i < files.length; i++) {  // Pega todos os caminhos relativos
        pathArray.push(files[i].webkitRelativePath);  // Coloca num array de strings
    }
    
    let splitPathArray: Array<Array<string>> = [];  // Estrutura do diretório
    
    pathArray.forEach((path) => {  // Pega cada pasta e subpasta
        splitPathArray.push(path.split('/'));  // Separa strings na '/'
    });

    let csv = new String('legacyId,parentId,qubitParentSlug,identifier,accessionNumber,title,levelOfDescription,extentAndMedium,repository,archivalHistory,acquisition,scopeAndContent,appraisal,accruals,arrangement,accessConditions,reproductionConditions,language,script,languageNote,physicalCharacteristics,findingAids,locationOfOriginals,locationOfCopies,relatedUnitsOfDescription,publicationNote,digitalObjectURI,generalNote,subjectAccessPoints,placeAccessPoints,nameAccessPoints,genreAccessPoints,descriptionIdentifier,institutionIdentifier,rules,descriptionStatus,levelOfDetail,revisionHistory,languageOfDescription,scriptOfDescription,sources,archivistNote,publicationStatus,physicalObjectName,physicalObjectLocation,physicalObjectType,alternativeIdentifiers,alternativeIdentifierLabels,eventDates,eventTypes,eventStartDates,eventEndDates,eventActors,eventActorHistories,culture\n');

    let id: number = 1;
    let ctrlArray: Array<any> = [];

    splitPathArray.forEach((path) => {
        path.forEach((item, index, array) => {

            let ctrlArrayId: number = 0;
            let parentId: number = 0;


            // Percorrer array do fim pro início e testar se o item existe no ctrlArray
            // Caso sim, acessar ctrlArray e buscar o legacyId do elemento em questão
            // Caso não, testar o próximo até encontrar

            let offset: number = index - 1;
            while(offset != -1){

                ctrlArrayId = ctrlArray.map((element) => { return element.title }).indexOf(array[offset]);

                if(ctrlArrayId > -1){

                    parentId = ctrlArray[ctrlArrayId].legacyId;
                    break;
                }
                
                offset--;
            }
            

            if(array.length - 1 == index){  // Se o item for o último no array, insere como 'Item'

                ctrlArray.push({
                    legacyId: id++,
                    parentId: parentId,
                    title: item,
                    levelOfDescription: 'Item'
                });
                csv = csv.concat(item);

            } else if(ctrlArray.map((element) => { return element.title }).indexOf(item) < 0){ // Se o item não for o último e não existir no array
                
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
