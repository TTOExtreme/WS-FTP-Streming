function UploadOpenHome() {
    window.location = "../"
}

function UploadOpenLista() {
    window.location = "../lista"
}

function UploadOpenLogin() {
    window.location = "../login"
}

function Logout() {
    ck_kill();
    window.location = "../";
}


function initUploadArea() {
    let dropArea = document.getElementById('drop-area');

    dropArea.addEventListener('dragenter', preventDefaults, false)
    dropArea.addEventListener('dragleave', preventDefaults, false)
    dropArea.addEventListener('dragover', preventDefaults, false)
    dropArea.addEventListener('drop', preventDefaults, false)
}


function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

function clichFile() {
    console.log('File(s) clicked');
}


let fileAudio;
let fileAudioName;
let fileImg;
let fileImgName;


function dropFile(ev) {
    console.log('File(s) dropped');

    ev.preventDefault()
    ev.stopPropagation()

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < ev.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (ev.dataTransfer.items[0].kind === 'file') {
                fileAudio = ev.dataTransfer.items[0].getAsFile();
                document.getElementById("drop-area").innerHTML = "Arquivo selecionado: " + fileAudio.name;
                return;
                //console.log('... file[' + i + '].name = ' + file.name);

            }
        }
    } /*else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < ev.dataTransfer.files.length; i++) {
            console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
        }
    }//*/
}

function dropFileImg(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    if (ev.dataTransfer.items) {
        for (let i = 0; i < ev.dataTransfer.items.length; i++) {
            if (ev.dataTransfer.items[0].kind === 'file') {
                fileImg = ev.dataTransfer.items[0].getAsFile();
                document.getElementById("drop-area-img").innerHTML = "Arquivo selecionado: " + fileImg.name;
                return;
            }
        }
    }
}
function dragFile(ev) {
    console.log('File(s) in drop zone');
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}

function uploadData() {

    document.getElementById("uploading_text").innerHTML = "";
    var formData = new FormData();
    // Fields in the post
    formData.append("img", fileImg);
    formData.append("audio", fileAudio);

    fetch('../api/uploadAudioFiles', {
        body: formData,
        method: 'POST',// or 'PUT',
    }).then((response) => {
        if (response.status == 200) {
            console.log("Uploaded concluido");
            fetch('../api/uploadAudioData', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(
                    {
                        fileAudio: fileAudio.name,
                        fileImg: fileImg.name,
                        title: document.getElementById("title_input").value,
                        description: document.getElementById("description_input").value,
                        biggerbox: document.getElementById("biggerbox_input").checked,
                        folder: new Date().getTime()
                    })
            })
                //.then(response1 => response1.json())
                .then((data) => {
                    if (data.status == 200) {
                        document.getElementById("uploading_text").innerHTML = "Upload Concluido";
                    }
                })

        }
    });
}