(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VzZXJzL1ppbGx5L0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsdC9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGZpbGVwaWNrZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZXBpY2tlcicpOyAvLyBGaWxlcGlja2VyXHJcbmZpbGVwaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIHZhciBmaWxlcyA9IGUudGFyZ2V0LmZpbGVzO1xyXG4gICAgdmFyIGZpbGVsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVsaXN0Jyk7XHJcbiAgICB2YXIgcGF0aEFycmF5ID0gW107XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7IC8vIFBlZ2EgdG9kb3Mgb3MgY2FtaW5ob3MgcmVsYXRpdm9zXHJcbiAgICAgICAgcGF0aEFycmF5LnB1c2goZmlsZXNbaV0ud2Via2l0UmVsYXRpdmVQYXRoKTsgLy8gQ29sb2NhIG51bSBhcnJheSBkZSBzdHJpbmdzXHJcbiAgICB9XHJcbiAgICB2YXIgc3BsaXRQYXRoQXJyYXkgPSBbXTsgLy8gRXN0cnV0dXJhIGRvIGRpcmV0w7NyaW9cclxuICAgIHBhdGhBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChwYXRoKSB7XHJcbiAgICAgICAgc3BsaXRQYXRoQXJyYXkucHVzaChwYXRoLnNwbGl0KCcvJykpOyAvLyBTZXBhcmEgc3RyaW5ncyBuYSAnLydcclxuICAgIH0pO1xyXG4gICAgdmFyIGNzdiA9IG5ldyBTdHJpbmcoJ2xlZ2FjeUlkLHBhcmVudElkLHF1Yml0UGFyZW50U2x1ZyxpZGVudGlmaWVyLGFjY2Vzc2lvbk51bWJlcix0aXRsZSxsZXZlbE9mRGVzY3JpcHRpb24sZXh0ZW50QW5kTWVkaXVtLHJlcG9zaXRvcnksYXJjaGl2YWxIaXN0b3J5LGFjcXVpc2l0aW9uLHNjb3BlQW5kQ29udGVudCxhcHByYWlzYWwsYWNjcnVhbHMsYXJyYW5nZW1lbnQsYWNjZXNzQ29uZGl0aW9ucyxyZXByb2R1Y3Rpb25Db25kaXRpb25zLGxhbmd1YWdlLHNjcmlwdCxsYW5ndWFnZU5vdGUscGh5c2ljYWxDaGFyYWN0ZXJpc3RpY3MsZmluZGluZ0FpZHMsbG9jYXRpb25PZk9yaWdpbmFscyxsb2NhdGlvbk9mQ29waWVzLHJlbGF0ZWRVbml0c09mRGVzY3JpcHRpb24scHVibGljYXRpb25Ob3RlLGRpZ2l0YWxPYmplY3RVUkksZ2VuZXJhbE5vdGUsc3ViamVjdEFjY2Vzc1BvaW50cyxwbGFjZUFjY2Vzc1BvaW50cyxuYW1lQWNjZXNzUG9pbnRzLGdlbnJlQWNjZXNzUG9pbnRzLGRlc2NyaXB0aW9uSWRlbnRpZmllcixpbnN0aXR1dGlvbklkZW50aWZpZXIscnVsZXMsZGVzY3JpcHRpb25TdGF0dXMsbGV2ZWxPZkRldGFpbCxyZXZpc2lvbkhpc3RvcnksbGFuZ3VhZ2VPZkRlc2NyaXB0aW9uLHNjcmlwdE9mRGVzY3JpcHRpb24sc291cmNlcyxhcmNoaXZpc3ROb3RlLHB1YmxpY2F0aW9uU3RhdHVzLHBoeXNpY2FsT2JqZWN0TmFtZSxwaHlzaWNhbE9iamVjdExvY2F0aW9uLHBoeXNpY2FsT2JqZWN0VHlwZSxhbHRlcm5hdGl2ZUlkZW50aWZpZXJzLGFsdGVybmF0aXZlSWRlbnRpZmllckxhYmVscyxldmVudERhdGVzLGV2ZW50VHlwZXMsZXZlbnRTdGFydERhdGVzLGV2ZW50RW5kRGF0ZXMsZXZlbnRBY3RvcnMsZXZlbnRBY3Rvckhpc3RvcmllcyxjdWx0dXJlXFxuJyk7XHJcbiAgICB2YXIgaWQgPSAxO1xyXG4gICAgdmFyIGN0cmxBcnJheSA9IFtdO1xyXG4gICAgc3BsaXRQYXRoQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAocGF0aCkge1xyXG4gICAgICAgIHBhdGguZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgIHZhciBjdHJsQXJyYXlJZCA9IDA7XHJcbiAgICAgICAgICAgIHZhciBwYXJlbnRJZCA9IDA7XHJcbiAgICAgICAgICAgIC8vIFBlcmNvcnJlciBhcnJheSBkbyBmaW0gcHJvIGluw61jaW8gZSB0ZXN0YXIgc2UgbyBpdGVtIGV4aXN0ZSBubyBjdHJsQXJyYXlcclxuICAgICAgICAgICAgLy8gQ2FzbyBzaW0sIGFjZXNzYXIgY3RybEFycmF5IGUgYnVzY2FyIG8gbGVnYWN5SWQgZG8gZWxlbWVudG8gZW0gcXVlc3TDo29cclxuICAgICAgICAgICAgLy8gQ2FzbyBuw6NvLCB0ZXN0YXIgbyBwcsOzeGltbyBhdMOpIGVuY29udHJhclxyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gaW5kZXggLSAxO1xyXG4gICAgICAgICAgICB3aGlsZSAob2Zmc2V0ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBjdHJsQXJyYXlJZCA9IGN0cmxBcnJheS5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIGVsZW1lbnQudGl0bGU7IH0pLmluZGV4T2YoYXJyYXlbb2Zmc2V0XSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3RybEFycmF5SWQgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudElkID0gY3RybEFycmF5W2N0cmxBcnJheUlkXS5sZWdhY3lJZDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9mZnNldC0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhcnJheS5sZW5ndGggLSAxID09IGluZGV4KSB7IC8vIFNlIG8gaXRlbSBmb3IgbyDDumx0aW1vIG5vIGFycmF5LCBpbnNlcmUgY29tbyAnSXRlbSdcclxuICAgICAgICAgICAgICAgIGN0cmxBcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBsZWdhY3lJZDogaWQrKyxcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRJZDogcGFyZW50SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGl0ZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWxPZkRlc2NyaXB0aW9uOiAnSXRlbSdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgY3N2ID0gY3N2LmNvbmNhdChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjdHJsQXJyYXkubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBlbGVtZW50LnRpdGxlOyB9KS5pbmRleE9mKGl0ZW0pIDwgMCkgeyAvLyBTZSBvIGl0ZW0gbsOjbyBmb3IgbyDDumx0aW1vIGUgbsOjbyBleGlzdGlyIG5vIGFycmF5XHJcbiAgICAgICAgICAgICAgICBjdHJsQXJyYXkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVnYWN5SWQ6IGlkKyssXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50SWQ6IHBhcmVudElkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpdGVtLFxyXG4gICAgICAgICAgICAgICAgICAgIGxldmVsT2ZEZXNjcmlwdGlvbjogJ0ZvbGRlcidcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgY3N2ID0gY3N2LmNvbmNhdChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmxvZyhjdHJsQXJyYXkpO1xyXG4gICAgY29uc29sZS5sb2coc3BsaXRQYXRoQXJyYXkpO1xyXG59LCBmYWxzZSk7XHJcbiJdfQ==
