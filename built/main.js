window.onload = function () {
    var filepicker = document.getElementById('filepicker'); // Filepicker
    filepicker.addEventListener('change', function (e) {
        var files = e.target.files;
        var filelist = document.getElementById('filelist');
        console.log(files);
        for (var i = 0; i < files.length; i++) { // Printa na tela os arquivos
            var file = files[i];
            var item = document.createElement("li");
            item.innerHTML = file.webkitRelativePath;
            filelist.appendChild(item);
        }
    }, false);
};
