window.onload = () => {
    var filepicker = document.getElementById('filepicker'); // Filepicker

    filepicker.addEventListener('change', (e) => { // Evento que mapeia cada nova pasta
        var files = (<HTMLInputElement>e.target).files;
        
        var filelist = document.getElementById('filelist');

        console.log(files);

        for (let i = 0; i < files.length; i++) { // Printa na tela os arquivos
            let file = files[i];
            let item = document.createElement("li");
            item.innerHTML = file.webkitRelativePath;
            filelist.appendChild(item);
        }

    }, false);
    
}
