function OpenHome() {

}

function OpenLista() {

}

function OpenLogin() {

}

function InitHome() {
    let div = document.getElementById("row");
    if (div) {
        getJSON('./list', function (err, data) {
            if (err !== null) {
                alert('Falha ao conectar ao servidor');
            } else {
                if (data.data) {
                    let last = data.data.pop();
                    last = JSON.parse(last);
                    div.innerHTML = createCast(last.title, last.descricao, last.title.replace(new RegExp(" ", "g"), "-"), last.title.replace(new RegExp(" ", "g"), "-"), "last_cast_div", "col-1", "last_cast");
                    let id = 0;
                    data.data.forEach(e => {
                        e = JSON.parse(e);
                        if (id < 12) {
                            if (id < 2) {
                                div.innerHTML += createCast(e.title, e.descricao, e.title.replace(new RegExp(" ", "g"), "-"), e.title.replace(new RegExp(" ", "g"), "-"));
                            } else {
                                if (id < 2) {
                                    div.innerHTML += createCast(e.title, e.descricao, e.title.replace(new RegExp(" ", "g"), "-"), e.title.replace(new RegExp(" ", "g"), "-"), "old_cast_div", "col-3", "old_cast");
                                } else {
                                    div.innerHTML += createListCast(e.title, e.descricao, e.title.replace(new RegExp(" ", "g"), "-"), e.title.replace(new RegExp(" ", "g"), "-"));
                                }
                            }
                            id++;
                        }
                    });
                }
            }
        });
    } else {
        setTimeout(() => {
            InitHome();
        }, 500);
    }
}

function createCast(title, desc, img, audio, clas1 = "old_cast_div", clas2 = "col-2", clas3 = "old_cast") {
    return "" +
        "<div class=\"" + clas1 + " " + clas2 + "\" style=\"background-image: url('./data/" + img + "/img.png'); \" >" +
        "<div class=\"" + clas3 + "\" >" +
        "<table style=\"width: calc(100% - 25px);\">" +
        "<tr>" +
        "<td><b>" + title + "</b></td>" +
        "</tr>" +
        "<tr>" +
        "<td>" + desc + "</td>" +
        "</tr>" +
        "</table>" +
        "</div >" +
        "<div class=\"play_on_img\" onclick=\"playfile('" + audio + "')\">" +
        "<img src=\"./home/img/play_cast.png\" width=\"80px\">" +
        "</div>" +
        "</div>";
}

function createListCast(title, desc, img, audio) {
    return "" +
        "<div class=\"list_cast_div col-4\">" +
        "<div class=\"list_cast_img\"style=\"background-image: url('./data/" + img + "/img.png'); \" >" +
        "<div class=\"play_on_img\" onclick=\"playfile('" + audio + "')\">" +
        "<img src=\"./home/img/play_cast.png\" width=\"80px\">" +
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
InitHome();