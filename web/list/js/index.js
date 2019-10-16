function OpenHome() {
    window.location += "../";
}

function OpenLista() {
    window.location += "../list/";
}

function OpenLogin() {
    window.location += "../login/";
}

function OpenUpload() {
    window.location += "../upload/";
}

function Logout() {
    ck_kill();
    window.location += "";
}

let offset_global = 0;

function InitHome(offset = 0) {
    offset_global += offset;
    if (offset_global < 0) { offset_global = 0; }
    if (offset_global == 0) {
        document.getElementById("anterior_button").setAttribute("class", "header_button_disabled");
        document.getElementById("anterior_button").setAttribute("onclick", "");
    } else {
        document.getElementById("anterior_button").setAttribute("class", "header_button");
        document.getElementById("anterior_button").setAttribute("onclick", "InitHome(-20)");
    }
    let div = document.getElementById("row");
    div.innerHTML = "";
    if (div) {
        getList(offset_global, (data) => {
            if (data) {
                if (data.length < 20) {
                    document.getElementById("proximo_button").setAttribute("class", "header_button_disabled");
                    document.getElementById("proximo_button").setAttribute("onclick", "");
                } else {
                    document.getElementById("proximo_button").setAttribute("class", "header_button");
                    document.getElementById("proximo_button").setAttribute("onclick", "InitHome(20)");
                }
                data.forEach(e => {
                    div.innerHTML += createListCast(e.title, e.description, e.folder, e.folder);
                });
            }
        });
    } else {
        setTimeout(() => {
            InitHome();
        }, 500);
    }
}

function createListCast(title, desc, img, audio) {
    return "" +
        "<div class=\"list_cast_div col-4\">" +
        "<div class=\"list_cast_img\"style=\"background-image: url('../data/" + img + "/image.png'); \" >" +
        "<div class=\"play_on_img\" onclick=\"playfile('" + title + "','" + audio + "')\">" +
        "<img src=\"../home/img/play_cast.png\" width=\"80px\">" +
        "</div>" +
        "</div>" +
        "<div class='list_cast_title'><b>" + title + "</b></div>" +
        "<div class=\"list_cast\" >" +
        "<table style=\"width: calc(100% - 25px);\">" +
        "<tr>" +
        "<td>" + desc + "</td>" +
        "</tr>" +
        "</table>" +
        "</div >" +
        "</div>";
}

function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function getList(offset, callback) {
    fetch("../api/list-all", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify({ offset: offset })
    }).then((response) => {
        if (response.status == 200) {
            response.json().then(function (json) {
                callback(json);
            });
        }
    })
}

function getJS(url, callback) {
    var script = document.createElement('script');
    script.onload = function () {
        callback();
    };
    script.src = url;

    document.head.appendChild(script);
}
