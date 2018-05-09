(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VzZXJzL1ppbGx5L0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsdC9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsInZhciBSZWdpc3RlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFJlZ2lzdGVyKGxlZ2FjeUlkLCBwYXJlbnRJZCwgdGl0bGUsIGxldmVsT2ZEZXNjcmlwdGlvbikge1xyXG4gICAgICAgIHRoaXMubGVnYWN5SWQgPSBsZWdhY3lJZDtcclxuICAgICAgICB0aGlzLnBhcmVudElkID0gcGFyZW50SWQ7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMubGV2ZWxPZkRlc2NyaXB0aW9uID0gbGV2ZWxPZkRlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFJlZ2lzdGVyO1xyXG59KCkpO1xyXG52YXIgQ1NWID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQ1NWKHJlZ2lzdGVycykge1xyXG4gICAgICAgIHRoaXMuaGVhZGVyID0gJ2xlZ2FjeUlkLHBhcmVudElkLHF1Yml0UGFyZW50U2x1ZyxpZGVudGlmaWVyLGFjY2Vzc2lvbk51bWJlcix0aXRsZSxsZXZlbE9mRGVzY3JpcHRpb24sZXh0ZW50QW5kTWVkaXVtLHJlcG9zaXRvcnksYXJjaGl2YWxIaXN0b3J5LGFjcXVpc2l0aW9uLHNjb3BlQW5kQ29udGVudCxhcHByYWlzYWwsYWNjcnVhbHMsYXJyYW5nZW1lbnQsYWNjZXNzQ29uZGl0aW9ucyxyZXByb2R1Y3Rpb25Db25kaXRpb25zLGxhbmd1YWdlLHNjcmlwdCxsYW5ndWFnZU5vdGUscGh5c2ljYWxDaGFyYWN0ZXJpc3RpY3MsZmluZGluZ0FpZHMsbG9jYXRpb25PZk9yaWdpbmFscyxsb2NhdGlvbk9mQ29waWVzLHJlbGF0ZWRVbml0c09mRGVzY3JpcHRpb24scHVibGljYXRpb25Ob3RlLGRpZ2l0YWxPYmplY3RVUkksZ2VuZXJhbE5vdGUsc3ViamVjdEFjY2Vzc1BvaW50cyxwbGFjZUFjY2Vzc1BvaW50cyxuYW1lQWNjZXNzUG9pbnRzLGdlbnJlQWNjZXNzUG9pbnRzLGRlc2NyaXB0aW9uSWRlbnRpZmllcixpbnN0aXR1dGlvbklkZW50aWZpZXIscnVsZXMsZGVzY3JpcHRpb25TdGF0dXMsbGV2ZWxPZkRldGFpbCxyZXZpc2lvbkhpc3RvcnksbGFuZ3VhZ2VPZkRlc2NyaXB0aW9uLHNjcmlwdE9mRGVzY3JpcHRpb24sc291cmNlcyxhcmNoaXZpc3ROb3RlLHB1YmxpY2F0aW9uU3RhdHVzLHBoeXNpY2FsT2JqZWN0TmFtZSxwaHlzaWNhbE9iamVjdExvY2F0aW9uLHBoeXNpY2FsT2JqZWN0VHlwZSxhbHRlcm5hdGl2ZUlkZW50aWZpZXJzLGFsdGVybmF0aXZlSWRlbnRpZmllckxhYmVscyxldmVudERhdGVzLGV2ZW50VHlwZXMsZXZlbnRTdGFydERhdGVzLGV2ZW50RW5kRGF0ZXMsZXZlbnRBY3RvcnMsZXZlbnRBY3Rvckhpc3RvcmllcyxjdWx0dXJlXFxuJztcclxuICAgICAgICB0aGlzLnJlZ2lzdGVycyA9IHJlZ2lzdGVycztcclxuICAgIH1cclxuICAgIENTVi5wcm90b3R5cGUuZ2V0UmVnaXN0ZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVycztcclxuICAgIH07XHJcbiAgICByZXR1cm4gQ1NWO1xyXG59KCkpO1xyXG52YXIgZmlsZXBpY2tlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlcGlja2VyJyk7IC8vIEZpbGVwaWNrZXJcclxuZmlsZXBpY2tlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgdmFyIGZpbGVzID0gZS50YXJnZXQuZmlsZXM7IC8vIEZpbGVzIGRvIGlucHV0XHJcbiAgICB2YXIgcGF0aEFycmF5ID0gW107IC8vIEFycmF5IHF1ZSB2YWkgY29udGVyIGFzIHN0cmluZ3MgZG9zIGNhbWluaG9zIGRvcyBhcnF1aXZvc1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykgeyAvLyBQZWdhIHRvZG9zIG9zIGNhbWluaG9zIHJlbGF0aXZvc1xyXG4gICAgICAgIHBhdGhBcnJheS5wdXNoKGZpbGVzW2ldLndlYmtpdFJlbGF0aXZlUGF0aCk7IC8vIENvbG9jYSBubyBhcnJheSBkZSBzdHJpbmdzIHBhdGhBcnJheVxyXG4gICAgfVxyXG4gICAgdmFyIHNwbGl0UGF0aEFycmF5ID0gW107IC8vIEVzdHJ1dHVyYSBkbyBkaXJldMOzcmlvIChhcnJheSBkZSBhcnJheSBkZSBzdHJpbmdzKVxyXG4gICAgcGF0aEFycmF5LmZvckVhY2goZnVuY3Rpb24gKHBhdGgpIHtcclxuICAgICAgICBzcGxpdFBhdGhBcnJheS5wdXNoKHBhdGguc3BsaXQoJy8nKSk7IC8vIFNlcGFyYSBzdHJpbmdzIG5hICcvJ1xyXG4gICAgfSk7XHJcbiAgICB2YXIgaWQgPSAxOyAvLyBsZWdhY3lJZCBkZSBjYWRhIG5vdmEgaW5zZXLDp8Ojb1xyXG4gICAgdmFyIHJlZ2lzdGVyQXJyYXkgPSBbXTsgLy8gQXJyYXkgZGUgY29udHJvbGUgcXVlIGNvbnTDqW0gb2JqZXRvcyAoZnV0dXJhcyBsaW5oYXMgZG8gY3N2KVxyXG4gICAgc3BsaXRQYXRoQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAocGF0aCkge1xyXG4gICAgICAgIHBhdGguZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgIHZhciByZWdpc3RlckFycmF5SWQgPSAwOyAvLyBpZCBkbyBhcnJheSBkZSByZWdpc3Ryb3NcclxuICAgICAgICAgICAgdmFyIHBhcmVudElkID0gMDsgLy8gaWQgZG8gcGFpIGRhcXVlbGUgcmVnaXN0cm9cclxuICAgICAgICAgICAgdmFyIHNlYXJjaEluZGV4ID0gaW5kZXggLSAxOyAvLyBzZWFyY2hJbmRleCBcclxuICAgICAgICAgICAgLy8gUGVyY29ycmVyIGFycmF5IGRvIGZpbSBwcm8gaW7DrWNpbyBlIHRlc3RhciBzZSBvIGl0ZW0gZXhpc3RlIG5vIHJlZ2lzdGVyQXJyYXlcclxuICAgICAgICAgICAgLy8gQ2FzbyBzaW0sIGFjZXNzYXIgcmVnaXN0ZXJBcnJheSBlIGJ1c2NhciBvIGxlZ2FjeUlkIGRvIGVsZW1lbnRvIGVtIHF1ZXN0w6NvXHJcbiAgICAgICAgICAgIC8vIENhc28gbsOjbywgdGVzdGFyIG8gcHLDs3hpbW8gYXTDqSBlbmNvbnRyYXJcclxuICAgICAgICAgICAgd2hpbGUgKHNlYXJjaEluZGV4ICE9IC0xKSB7IC8vIEVucXVhbnRvIHNlYXJjaEluZGV4IGZvciBtYWlvciBvdSBpZ3VhbCBhIDBcclxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyQXJyYXlJZCA9IHJlZ2lzdGVyQXJyYXkubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBlbGVtZW50LnRpdGxlOyB9KS5pbmRleE9mKGFycmF5W3NlYXJjaEluZGV4XSk7IC8vIEd1YXJkYSBpZCBkbyBhcnJheSBkZSByZWdpc3Ryb3MgcXVlIGNvbnTDqW0gYXF1ZWxlXHJcbiAgICAgICAgICAgICAgICBpZiAocmVnaXN0ZXJBcnJheUlkID4gLTEpIHsgLy8gU2UgcmVnaXN0ZXJBcnJheUlkIGZvciB2w6FsaWRvIChleGlzdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50SWQgPSByZWdpc3RlckFycmF5W3JlZ2lzdGVyQXJyYXlJZF0ubGVnYWN5SWQ7IC8vIEd1YXJkYSBwYXJlbnRJZCBkbyByZWdpc3Ryb1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLyBTYWkgZG8gbGHDp28gd2hpbGVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlYXJjaEluZGV4LS07IC8vIERlY3JlbWVudGEgc2VhcmNoSW5kZXhcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVnaXN0ZXJBcnJheS5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIGVsZW1lbnQudGl0bGU7IH0pLmluZGV4T2YoaXRlbSkgPCAwKSB7IC8vIFNlIG8gaXRlbSBuw6NvIGV4aXN0aXIgbm8gcmVnaXN0ZXJBcnJheVxyXG4gICAgICAgICAgICAgICAgdmFyIGxldmVsT2ZEZXNjcmlwdGlvbiA9ICcnOyAvLyBJdGVtLCBjbGFzc2Ugb3Ugc3ViY2xhc3NlXHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXkubGVuZ3RoIC0gMSA9PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldmVsT2ZEZXNjcmlwdGlvbiA9ICdJdGVtJztcclxuICAgICAgICAgICAgICAgIH0gLy8gSXRlbSBzZSBmb3IgbyDDumx0aW1vIMOtbmRpY2UgZG8gYXJyYXlcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluZGV4ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXZlbE9mRGVzY3JpcHRpb24gPSAnQ2xhc3NlJztcclxuICAgICAgICAgICAgICAgIH0gLy8gQ2xhc3NlIHNlIGZvciBvIHByaW1laXJvIMOtbmRpY2UgZG8gYXJyYXlcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldmVsT2ZEZXNjcmlwdGlvbiA9ICdTdWJjbGFzc2UnO1xyXG4gICAgICAgICAgICAgICAgfSAvLyBTZW7Do28gU3ViY2xhc3NlXHJcbiAgICAgICAgICAgICAgICByZWdpc3RlckFycmF5LnB1c2gobmV3IFJlZ2lzdGVyKGlkKyssIHBhcmVudElkLCBpdGVtLCBsZXZlbE9mRGVzY3JpcHRpb24pKTsgLy8gSW5zZXJlIG5vdm8gcmVnaXN0cm8gbm8gYXJyYXkgZGUgcmVnaXN0cm9zXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgdmFyIGNzdiA9IG5ldyBDU1YocmVnaXN0ZXJBcnJheSk7XHJcbiAgICBjb25zb2xlLmxvZyhjc3YuZ2V0UmVnaXN0ZXJzKCkpO1xyXG4gICAgY29uc29sZS5sb2coc3BsaXRQYXRoQXJyYXkpO1xyXG59LCBmYWxzZSk7XHJcbiJdfQ==
