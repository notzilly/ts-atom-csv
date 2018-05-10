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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VzZXJzL1ppbGx5L0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsdC9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwidmFyIFJlZ2lzdGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUmVnaXN0ZXIobGVnYWN5SWQsIHBhcmVudElkLCB0aXRsZSwgbGV2ZWxPZkRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5sZWdhY3lJZCA9IGxlZ2FjeUlkO1xyXG4gICAgICAgIHRoaXMucGFyZW50SWQgPSBwYXJlbnRJZDtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5sZXZlbE9mRGVzY3JpcHRpb24gPSBsZXZlbE9mRGVzY3JpcHRpb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVnaXN0ZXI7XHJcbn0oKSk7XHJcbnZhciBDU1YgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBDU1YocmVnaXN0ZXJzKSB7XHJcbiAgICAgICAgdGhpcy5oZWFkZXIgPSAnbGVnYWN5SWQscGFyZW50SWQscXViaXRQYXJlbnRTbHVnLGlkZW50aWZpZXIsYWNjZXNzaW9uTnVtYmVyLHRpdGxlLGxldmVsT2ZEZXNjcmlwdGlvbixleHRlbnRBbmRNZWRpdW0scmVwb3NpdG9yeSxhcmNoaXZhbEhpc3RvcnksYWNxdWlzaXRpb24sc2NvcGVBbmRDb250ZW50LGFwcHJhaXNhbCxhY2NydWFscyxhcnJhbmdlbWVudCxhY2Nlc3NDb25kaXRpb25zLHJlcHJvZHVjdGlvbkNvbmRpdGlvbnMsbGFuZ3VhZ2Usc2NyaXB0LGxhbmd1YWdlTm90ZSxwaHlzaWNhbENoYXJhY3RlcmlzdGljcyxmaW5kaW5nQWlkcyxsb2NhdGlvbk9mT3JpZ2luYWxzLGxvY2F0aW9uT2ZDb3BpZXMscmVsYXRlZFVuaXRzT2ZEZXNjcmlwdGlvbixwdWJsaWNhdGlvbk5vdGUsZGlnaXRhbE9iamVjdFVSSSxnZW5lcmFsTm90ZSxzdWJqZWN0QWNjZXNzUG9pbnRzLHBsYWNlQWNjZXNzUG9pbnRzLG5hbWVBY2Nlc3NQb2ludHMsZ2VucmVBY2Nlc3NQb2ludHMsZGVzY3JpcHRpb25JZGVudGlmaWVyLGluc3RpdHV0aW9uSWRlbnRpZmllcixydWxlcyxkZXNjcmlwdGlvblN0YXR1cyxsZXZlbE9mRGV0YWlsLHJldmlzaW9uSGlzdG9yeSxsYW5ndWFnZU9mRGVzY3JpcHRpb24sc2NyaXB0T2ZEZXNjcmlwdGlvbixzb3VyY2VzLGFyY2hpdmlzdE5vdGUscHVibGljYXRpb25TdGF0dXMscGh5c2ljYWxPYmplY3ROYW1lLHBoeXNpY2FsT2JqZWN0TG9jYXRpb24scGh5c2ljYWxPYmplY3RUeXBlLGFsdGVybmF0aXZlSWRlbnRpZmllcnMsYWx0ZXJuYXRpdmVJZGVudGlmaWVyTGFiZWxzLGV2ZW50RGF0ZXMsZXZlbnRUeXBlcyxldmVudFN0YXJ0RGF0ZXMsZXZlbnRFbmREYXRlcyxldmVudEFjdG9ycyxldmVudEFjdG9ySGlzdG9yaWVzLGN1bHR1cmVcXG4nO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJzID0gcmVnaXN0ZXJzO1xyXG4gICAgfVxyXG4gICAgQ1NWLnByb3RvdHlwZS5nZXRSZWdpc3RlcnNBc0NTViA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY29udGVudCA9ICcnOyAvLyBTdHJpbmcgdmF6aWFcclxuICAgICAgICB0aGlzLnJlZ2lzdGVycy5mb3JFYWNoKGZ1bmN0aW9uIChyZWdpc3Rlcikge1xyXG4gICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5jb25jYXQocmVnaXN0ZXIubGVnYWN5SWQudG9TdHJpbmcoKSwgJywnLCAocmVnaXN0ZXIucGFyZW50SWQgPiAwID8gcmVnaXN0ZXIucGFyZW50SWQudG9TdHJpbmcoKSA6ICcnKSwgJywsLCwnLCByZWdpc3Rlci50aXRsZSwgJywnLCByZWdpc3Rlci5sZXZlbE9mRGVzY3JpcHRpb24sICcsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCxcXG4nKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH07XHJcbiAgICBDU1YucHJvdG90eXBlLmRvd25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjc3YgPSB0aGlzLmhlYWRlciArIHRoaXMuZ2V0UmVnaXN0ZXJzQXNDU1YoKTsgLy8gQ29uY2F0ZW5hIGhlYWRlciBjb20gcmVnaXN0cm9zXHJcbiAgICAgICAgLy8gQ3JpYSBlbGVtZW50byAnYScgXHJcbiAgICAgICAgLy8gU2V0YSBwcm9wcmllZGFkZXMgcGFyYSBkb3dubG9hZFxyXG4gICAgICAgIC8vIE5vbWUgZG8gYXJxdWl2byBkZWZhdWx0IMOpIGF0b20uY3N2XHJcbiAgICAgICAgLy8gQ2xpY2Egbm8gZWxlbWVudG8gZSBkZXBvaXMgcmVtb3ZlIG8gbWVzbW9cclxuICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaHJlZicsICdkYXRhOnRleHQvcGxhaW47Y2hhcnNldD11dGYtOCwnICsgZW5jb2RlVVJJQ29tcG9uZW50KGNzdikpO1xyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsICdhdG9tLmNzdicpO1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgIGVsZW1lbnQuY2xpY2soKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBDU1Y7XHJcbn0oKSk7XHJcbnZhciBmaWxlcGlja2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVwaWNrZXInKTsgLy8gRmlsZXBpY2tlclxyXG52YXIgZG93bmxvYWRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWRvd25sb2FkJyk7IC8vIEJvdMOjbyBkZSBkb3dubG9hZFxyXG52YXIgY3N2OyAvLyBEZWNsYXJhw6fDo28gZG8gQ1NWXHJcbmRvd25sb2FkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHsgY3N2LmRvd25sb2FkKCk7IH0pOyAvLyBBbyBjbGljYXIgbm8gYm90w6NvIG8gYXJxdWl2byDDqSBiYWl4YWRvXHJcbmZpbGVwaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIHZhciBmaWxlcyA9IGUudGFyZ2V0LmZpbGVzOyAvLyBGaWxlcyBkbyBpbnB1dFxyXG4gICAgaWYgKGZpbGVzLmxlbmd0aCA+IDApIHsgLy8gU2UgaG91dmVyIHBlbG8gbWVub3MgdW0gYXJxdWl2byBzZWxlY2lvbmFkb1xyXG4gICAgICAgIHZhciBwYXRoQXJyYXkgPSBbXTsgLy8gQXJyYXkgcXVlIHZhaSBjb250ZXIgYXMgc3RyaW5ncyBkb3MgY2FtaW5ob3MgZG9zIGFycXVpdm9zXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykgeyAvLyBQZWdhIHRvZG9zIG9zIGNhbWluaG9zIHJlbGF0aXZvc1xyXG4gICAgICAgICAgICBwYXRoQXJyYXkucHVzaChmaWxlc1tpXS53ZWJraXRSZWxhdGl2ZVBhdGgpOyAvLyBDb2xvY2Egbm8gYXJyYXkgZGUgc3RyaW5ncyBwYXRoQXJyYXlcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHNwbGl0UGF0aEFycmF5XzEgPSBbXTsgLy8gRXN0cnV0dXJhIGRvIGRpcmV0w7NyaW8gKGFycmF5IGRlIGFycmF5IGRlIHN0cmluZ3MpXHJcbiAgICAgICAgcGF0aEFycmF5LmZvckVhY2goZnVuY3Rpb24gKHBhdGgpIHtcclxuICAgICAgICAgICAgc3BsaXRQYXRoQXJyYXlfMS5wdXNoKHBhdGguc3BsaXQoJy8nKSk7IC8vIFNlcGFyYSBzdHJpbmdzIG5hICcvJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBpZF8xID0gMTsgLy8gbGVnYWN5SWQgZGUgY2FkYSBub3ZhIGluc2Vyw6fDo29cclxuICAgICAgICB2YXIgcmVnaXN0ZXJBcnJheV8xID0gW107IC8vIEFycmF5IGRlIGNvbnRyb2xlIHF1ZSBjb250w6ltIG9iamV0b3MgKGZ1dHVyYXMgbGluaGFzIGRvIGNzdilcclxuICAgICAgICBzcGxpdFBhdGhBcnJheV8xLmZvckVhY2goZnVuY3Rpb24gKHBhdGgpIHtcclxuICAgICAgICAgICAgcGF0aC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZWdpc3RlckFycmF5SWQgPSAwOyAvLyBpZCBkbyBhcnJheSBkZSByZWdpc3Ryb3NcclxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRJZCA9IDA7IC8vIGlkIGRvIHBhaSBkYXF1ZWxlIHJlZ2lzdHJvXHJcbiAgICAgICAgICAgICAgICB2YXIgc2VhcmNoSW5kZXggPSBpbmRleCAtIDE7IC8vIHNlYXJjaEluZGV4IFxyXG4gICAgICAgICAgICAgICAgLy8gUGVyY29ycmVyIGFycmF5IGRvIGZpbSBwcm8gaW7DrWNpbyBlIHRlc3RhciBzZSBvIGl0ZW0gZXhpc3RlIG5vIHJlZ2lzdGVyQXJyYXlcclxuICAgICAgICAgICAgICAgIC8vIENhc28gc2ltLCBhY2Vzc2FyIHJlZ2lzdGVyQXJyYXkgZSBidXNjYXIgbyBsZWdhY3lJZCBkbyBlbGVtZW50byBlbSBxdWVzdMOjb1xyXG4gICAgICAgICAgICAgICAgLy8gQ2FzbyBuw6NvLCB0ZXN0YXIgbyBwcsOzeGltbyBhdMOpIGVuY29udHJhclxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKHNlYXJjaEluZGV4ICE9IC0xKSB7IC8vIEVucXVhbnRvIHNlYXJjaEluZGV4IGZvciBtYWlvciBvdSBpZ3VhbCBhIDBcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlckFycmF5SWQgPSByZWdpc3RlckFycmF5XzEubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBlbGVtZW50LnRpdGxlOyB9KS5pbmRleE9mKGFycmF5W3NlYXJjaEluZGV4XSk7IC8vIEd1YXJkYSBpZCBkbyBhcnJheSBkZSByZWdpc3Ryb3MgcXVlIGNvbnTDqW0gYXF1ZWxlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlZ2lzdGVyQXJyYXlJZCA+IC0xKSB7IC8vIFNlIHJlZ2lzdGVyQXJyYXlJZCBmb3IgdsOhbGlkbyAoZXhpc3RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRJZCA9IHJlZ2lzdGVyQXJyYXlfMVtyZWdpc3RlckFycmF5SWRdLmxlZ2FjeUlkOyAvLyBHdWFyZGEgcGFyZW50SWQgZG8gcmVnaXN0cm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vIFNhaSBkbyBsYcOnbyB3aGlsZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hJbmRleC0tOyAvLyBEZWNyZW1lbnRhIHNlYXJjaEluZGV4XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmVnaXN0ZXJBcnJheV8xLm1hcChmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gZWxlbWVudC50aXRsZTsgfSkuaW5kZXhPZihpdGVtKSA8IDApIHsgLy8gU2UgbyBpdGVtIG7Do28gZXhpc3RpciBubyByZWdpc3RlckFycmF5XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxldmVsT2ZEZXNjcmlwdGlvbiA9ICcnOyAvLyBJdGVtLCBjbGFzc2Ugb3Ugc3ViY2xhc3NlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5Lmxlbmd0aCAtIDEgPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWxPZkRlc2NyaXB0aW9uID0gJ0l0ZW0nO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gLy8gSXRlbSBzZSBmb3IgbyDDumx0aW1vIMOtbmRpY2UgZG8gYXJyYXlcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsT2ZEZXNjcmlwdGlvbiA9ICdDbGFzc2UnO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gLy8gQ2xhc3NlIHNlIGZvciBvIHByaW1laXJvIMOtbmRpY2UgZG8gYXJyYXlcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWxPZkRlc2NyaXB0aW9uID0gJ1N1YmNsYXNzZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSAvLyBTZW7Do28gU3ViY2xhc3NlXHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJBcnJheV8xLnB1c2gobmV3IFJlZ2lzdGVyKGlkXzErKywgcGFyZW50SWQsIGl0ZW0sIGxldmVsT2ZEZXNjcmlwdGlvbikpOyAvLyBJbnNlcmUgbm92byByZWdpc3RybyBubyBhcnJheSBkZSByZWdpc3Ryb3NcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY3N2ID0gbmV3IENTVihyZWdpc3RlckFycmF5XzEpOyAvLyBJbnN0YW5jaWEgQ1NWXHJcbiAgICAgICAgZG93bmxvYWRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTsgLy8gSGFiaWxpdGEgYm90w6NvIGRlIGRvd25sb2FkXHJcbiAgICB9XHJcbn0sIGZhbHNlKTtcclxuIl19
