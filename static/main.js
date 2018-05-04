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
    var csv = new String('legacyId,parentId,qubitParentSlug,identifier,accessionNumber,title,levelOfDescription,extentAndMedium,repository,archivalHistory,acquisition,scopeAndContent,appraisal,accruals,arrangement,accessConditions,reproductionConditions,language,script,languageNote,physicalCharacteristics,findingAids,locationOfOriginals,locationOfCopies,relatedUnitsOfDescription,publicationNote,digitalObjectURI,generalNote,subjectAccessPoints,placeAccessPoints,nameAccessPoints,genreAccessPoints,descriptionIdentifier,institutionIdentifier,rules,descriptionStatus,levelOfDetail,revisionHistory,languageOfDescription,scriptOfDescription,sources,archivistNote,publicationStatus,physicalObjectName,physicalObjectLocation,physicalObjectType,alternativeIdentifiers,alternativeIdentifierLabels,eventDates,eventTypes,eventStartDates,eventEndDates,eventActors,eventActorHistories,culture\n');
    console.log(registerArray);
    console.log(splitPathArray);
}, false);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VzZXJzL1ppbGx5L0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsdC9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJ2YXIgUmVnaXN0ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBSZWdpc3RlcihsZWdhY3lJZCwgcGFyZW50SWQsIHRpdGxlLCBsZXZlbE9mRGVzY3JpcHRpb24pIHtcclxuICAgICAgICB0aGlzLmxlZ2FjeUlkID0gbGVnYWN5SWQ7XHJcbiAgICAgICAgdGhpcy5wYXJlbnRJZCA9IHBhcmVudElkO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLmxldmVsT2ZEZXNjcmlwdGlvbiA9IGxldmVsT2ZEZXNjcmlwdGlvbjtcclxuICAgIH1cclxuICAgIHJldHVybiBSZWdpc3RlcjtcclxufSgpKTtcclxudmFyIGZpbGVwaWNrZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZXBpY2tlcicpOyAvLyBGaWxlcGlja2VyXHJcbmZpbGVwaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIHZhciBmaWxlcyA9IGUudGFyZ2V0LmZpbGVzOyAvLyBGaWxlcyBkbyBpbnB1dFxyXG4gICAgdmFyIHBhdGhBcnJheSA9IFtdOyAvLyBBcnJheSBxdWUgdmFpIGNvbnRlciBhcyBzdHJpbmdzIGRvcyBjYW1pbmhvcyBkb3MgYXJxdWl2b3NcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHsgLy8gUGVnYSB0b2RvcyBvcyBjYW1pbmhvcyByZWxhdGl2b3NcclxuICAgICAgICBwYXRoQXJyYXkucHVzaChmaWxlc1tpXS53ZWJraXRSZWxhdGl2ZVBhdGgpOyAvLyBDb2xvY2Egbm8gYXJyYXkgZGUgc3RyaW5ncyBwYXRoQXJyYXlcclxuICAgIH1cclxuICAgIHZhciBzcGxpdFBhdGhBcnJheSA9IFtdOyAvLyBFc3RydXR1cmEgZG8gZGlyZXTDs3JpbyAoYXJyYXkgZGUgYXJyYXkgZGUgc3RyaW5ncylcclxuICAgIHBhdGhBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChwYXRoKSB7XHJcbiAgICAgICAgc3BsaXRQYXRoQXJyYXkucHVzaChwYXRoLnNwbGl0KCcvJykpOyAvLyBTZXBhcmEgc3RyaW5ncyBuYSAnLydcclxuICAgIH0pO1xyXG4gICAgdmFyIGlkID0gMTsgLy8gbGVnYWN5SWQgZGUgY2FkYSBub3ZhIGluc2Vyw6fDo29cclxuICAgIHZhciByZWdpc3RlckFycmF5ID0gW107IC8vIEFycmF5IGRlIGNvbnRyb2xlIHF1ZSBjb250w6ltIG9iamV0b3MgKGZ1dHVyYXMgbGluaGFzIGRvIGNzdilcclxuICAgIHNwbGl0UGF0aEFycmF5LmZvckVhY2goZnVuY3Rpb24gKHBhdGgpIHtcclxuICAgICAgICBwYXRoLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4LCBhcnJheSkge1xyXG4gICAgICAgICAgICB2YXIgcmVnaXN0ZXJBcnJheUlkID0gMDsgLy8gaWQgZG8gYXJyYXkgZGUgcmVnaXN0cm9zXHJcbiAgICAgICAgICAgIHZhciBwYXJlbnRJZCA9IDA7IC8vIGlkIGRvIHBhaSBkYXF1ZWxlIHJlZ2lzdHJvXHJcbiAgICAgICAgICAgIHZhciBzZWFyY2hJbmRleCA9IGluZGV4IC0gMTsgLy8gc2VhcmNoSW5kZXggXHJcbiAgICAgICAgICAgIC8vIFBlcmNvcnJlciBhcnJheSBkbyBmaW0gcHJvIGluw61jaW8gZSB0ZXN0YXIgc2UgbyBpdGVtIGV4aXN0ZSBubyByZWdpc3RlckFycmF5XHJcbiAgICAgICAgICAgIC8vIENhc28gc2ltLCBhY2Vzc2FyIHJlZ2lzdGVyQXJyYXkgZSBidXNjYXIgbyBsZWdhY3lJZCBkbyBlbGVtZW50byBlbSBxdWVzdMOjb1xyXG4gICAgICAgICAgICAvLyBDYXNvIG7Do28sIHRlc3RhciBvIHByw7N4aW1vIGF0w6kgZW5jb250cmFyXHJcbiAgICAgICAgICAgIHdoaWxlIChzZWFyY2hJbmRleCAhPSAtMSkgeyAvLyBFbnF1YW50byBzZWFyY2hJbmRleCBmb3IgbWFpb3Igb3UgaWd1YWwgYSAwXHJcbiAgICAgICAgICAgICAgICByZWdpc3RlckFycmF5SWQgPSByZWdpc3RlckFycmF5Lm1hcChmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gZWxlbWVudC50aXRsZTsgfSkuaW5kZXhPZihhcnJheVtzZWFyY2hJbmRleF0pOyAvLyBHdWFyZGEgaWQgZG8gYXJyYXkgZGUgcmVnaXN0cm9zIHF1ZSBjb250w6ltIGFxdWVsZVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlZ2lzdGVyQXJyYXlJZCA+IC0xKSB7IC8vIFNlIHJlZ2lzdGVyQXJyYXlJZCBmb3IgdsOhbGlkbyAoZXhpc3RlKVxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudElkID0gcmVnaXN0ZXJBcnJheVtyZWdpc3RlckFycmF5SWRdLmxlZ2FjeUlkOyAvLyBHdWFyZGEgcGFyZW50SWQgZG8gcmVnaXN0cm9cclxuICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8gU2FpIGRvIGxhw6dvIHdoaWxlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hJbmRleC0tOyAvLyBEZWNyZW1lbnRhIHNlYXJjaEluZGV4XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJlZ2lzdGVyQXJyYXkubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBlbGVtZW50LnRpdGxlOyB9KS5pbmRleE9mKGl0ZW0pIDwgMCkgeyAvLyBTZSBvIGl0ZW0gbsOjbyBleGlzdGlyIG5vIHJlZ2lzdGVyQXJyYXlcclxuICAgICAgICAgICAgICAgIHZhciBsZXZlbE9mRGVzY3JpcHRpb24gPSAnJzsgLy8gSXRlbSwgY2xhc3NlIG91IHN1YmNsYXNzZVxyXG4gICAgICAgICAgICAgICAgaWYgKGFycmF5Lmxlbmd0aCAtIDEgPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXZlbE9mRGVzY3JpcHRpb24gPSAnSXRlbSc7XHJcbiAgICAgICAgICAgICAgICB9IC8vIEl0ZW0gc2UgZm9yIG8gw7psdGltbyDDrW5kaWNlIGRvIGFycmF5XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWxPZkRlc2NyaXB0aW9uID0gJ0NsYXNzZSc7XHJcbiAgICAgICAgICAgICAgICB9IC8vIENsYXNzZSBzZSBmb3IgbyBwcmltZWlybyDDrW5kaWNlIGRvIGFycmF5XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXZlbE9mRGVzY3JpcHRpb24gPSAnU3ViY2xhc3NlJztcclxuICAgICAgICAgICAgICAgIH0gLy8gU2Vuw6NvIFN1YmNsYXNzZVxyXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJBcnJheS5wdXNoKG5ldyBSZWdpc3RlcihpZCsrLCBwYXJlbnRJZCwgaXRlbSwgbGV2ZWxPZkRlc2NyaXB0aW9uKSk7IC8vIEluc2VyZSBub3ZvIHJlZ2lzdHJvIG5vIGFycmF5IGRlIHJlZ2lzdHJvc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHZhciBjc3YgPSBuZXcgU3RyaW5nKCdsZWdhY3lJZCxwYXJlbnRJZCxxdWJpdFBhcmVudFNsdWcsaWRlbnRpZmllcixhY2Nlc3Npb25OdW1iZXIsdGl0bGUsbGV2ZWxPZkRlc2NyaXB0aW9uLGV4dGVudEFuZE1lZGl1bSxyZXBvc2l0b3J5LGFyY2hpdmFsSGlzdG9yeSxhY3F1aXNpdGlvbixzY29wZUFuZENvbnRlbnQsYXBwcmFpc2FsLGFjY3J1YWxzLGFycmFuZ2VtZW50LGFjY2Vzc0NvbmRpdGlvbnMscmVwcm9kdWN0aW9uQ29uZGl0aW9ucyxsYW5ndWFnZSxzY3JpcHQsbGFuZ3VhZ2VOb3RlLHBoeXNpY2FsQ2hhcmFjdGVyaXN0aWNzLGZpbmRpbmdBaWRzLGxvY2F0aW9uT2ZPcmlnaW5hbHMsbG9jYXRpb25PZkNvcGllcyxyZWxhdGVkVW5pdHNPZkRlc2NyaXB0aW9uLHB1YmxpY2F0aW9uTm90ZSxkaWdpdGFsT2JqZWN0VVJJLGdlbmVyYWxOb3RlLHN1YmplY3RBY2Nlc3NQb2ludHMscGxhY2VBY2Nlc3NQb2ludHMsbmFtZUFjY2Vzc1BvaW50cyxnZW5yZUFjY2Vzc1BvaW50cyxkZXNjcmlwdGlvbklkZW50aWZpZXIsaW5zdGl0dXRpb25JZGVudGlmaWVyLHJ1bGVzLGRlc2NyaXB0aW9uU3RhdHVzLGxldmVsT2ZEZXRhaWwscmV2aXNpb25IaXN0b3J5LGxhbmd1YWdlT2ZEZXNjcmlwdGlvbixzY3JpcHRPZkRlc2NyaXB0aW9uLHNvdXJjZXMsYXJjaGl2aXN0Tm90ZSxwdWJsaWNhdGlvblN0YXR1cyxwaHlzaWNhbE9iamVjdE5hbWUscGh5c2ljYWxPYmplY3RMb2NhdGlvbixwaHlzaWNhbE9iamVjdFR5cGUsYWx0ZXJuYXRpdmVJZGVudGlmaWVycyxhbHRlcm5hdGl2ZUlkZW50aWZpZXJMYWJlbHMsZXZlbnREYXRlcyxldmVudFR5cGVzLGV2ZW50U3RhcnREYXRlcyxldmVudEVuZERhdGVzLGV2ZW50QWN0b3JzLGV2ZW50QWN0b3JIaXN0b3JpZXMsY3VsdHVyZVxcbicpO1xyXG4gICAgY29uc29sZS5sb2cocmVnaXN0ZXJBcnJheSk7XHJcbiAgICBjb25zb2xlLmxvZyhzcGxpdFBhdGhBcnJheSk7XHJcbn0sIGZhbHNlKTtcclxuIl19
