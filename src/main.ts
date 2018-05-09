class Register { // Registro (linha) a ser inserida no csv
    legacyId: number;
    parentId: number;
    title: string;
    levelOfDescription: string;

    constructor(legacyId: number, parentId: number, title: string, levelOfDescription: string){ // Construtor
        this.legacyId = legacyId;
        this.parentId = parentId;
        this.title = title;
        this.levelOfDescription = levelOfDescription;
    }
}

class CSV { // CSV 
    private header: string;
    private registers: Register[];

    constructor(registers: Register[]){
        this.header = 'legacyId,parentId,qubitParentSlug,identifier,accessionNumber,title,levelOfDescription,extentAndMedium,repository,archivalHistory,acquisition,scopeAndContent,appraisal,accruals,arrangement,accessConditions,reproductionConditions,language,script,languageNote,physicalCharacteristics,findingAids,locationOfOriginals,locationOfCopies,relatedUnitsOfDescription,publicationNote,digitalObjectURI,generalNote,subjectAccessPoints,placeAccessPoints,nameAccessPoints,genreAccessPoints,descriptionIdentifier,institutionIdentifier,rules,descriptionStatus,levelOfDetail,revisionHistory,languageOfDescription,scriptOfDescription,sources,archivistNote,publicationStatus,physicalObjectName,physicalObjectLocation,physicalObjectType,alternativeIdentifiers,alternativeIdentifierLabels,eventDates,eventTypes,eventStartDates,eventEndDates,eventActors,eventActorHistories,culture\n';
        this.registers = registers;
    }

    public getRegisters() : Register[] {
        return this.registers;
    }

}

let filepicker = document.getElementById('filepicker'); // Filepicker

filepicker.addEventListener('change', (e) => { // Evento que mapeia cada nova seleção de diretório

    let files = (<HTMLInputElement>e.target).files; // Files do input
    let pathArray: string[] = []; // Array que vai conter as strings dos caminhos dos arquivos
    
    for (let i = 0; i < files.length; i++) {  // Pega todos os caminhos relativos
        pathArray.push(files[i].webkitRelativePath);  // Coloca no array de strings pathArray
    }
    
    let splitPathArray: string[][] = [];  // Estrutura do diretório (array de array de strings)
    
    pathArray.forEach((path) => {  // Faz o loop pelos caminhos dos arquivos
        splitPathArray.push(path.split('/'));  // Separa strings na '/'
    });

    let id: number = 1; // legacyId de cada nova inserção
    let registerArray: Register[] = []; // Array de controle que contém objetos (futuras linhas do csv)

    splitPathArray.forEach((path) => { // Loop em cada registro
        path.forEach((item, index, array) => { // Loop em cada subdivisão do registro

            let registerArrayId: number = 0; // id do array de registros
            let parentId: number = 0; // id do pai daquele registro
            let searchIndex: number = index - 1; // searchIndex 

            // Percorrer array do fim pro início e testar se o item existe no registerArray
            // Caso sim, acessar registerArray e buscar o legacyId do elemento em questão
            // Caso não, testar o próximo até encontrar

            while(searchIndex != -1){ // Enquanto searchIndex for maior ou igual a 0

                registerArrayId = registerArray.map((element) => { return element.title }).indexOf(array[searchIndex]); // Guarda id do array de registros que contém aquele

                if(registerArrayId > -1){ // Se registerArrayId for válido (existe)
                    parentId = registerArray[registerArrayId].legacyId; // Guarda parentId do registro
                    break; // Sai do laço while
                }
                
                searchIndex--; // Decrementa searchIndex
            }
            
            if(registerArray.map((element) => { return element.title }).indexOf(item) < 0){  // Se o item não existir no registerArray

                let levelOfDescription: string = ''; // Item, classe ou subclasse

                if(array.length - 1 == index) { levelOfDescription = 'Item' } // Item se for o último índice do array
                else if(index == 0) { levelOfDescription = 'Classe' } // Classe se for o primeiro índice do array
                else { levelOfDescription = 'Subclasse' } // Senão Subclasse

                registerArray.push(new Register(id++, parentId, item, levelOfDescription)); // Insere novo registro no array de registros

            }

        });
    });

    let csv = new CSV(registerArray);

    console.log(csv.getRegisters());
    console.log(splitPathArray);

}, false);
