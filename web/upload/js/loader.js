
function startLoader() {
    var svg = document.getElementById('loaderHolderBG')
    svg.style.opacity = 1;
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.backgroundColor = "#10101055";
    svg.style.width = "100vw";
    svg.style.height = "100vh";
    var svg = document.getElementById('loaderHolder')
    svg.style.opacity = 1;
}

function stopLoader() {
    var svg = document.getElementById('loaderHolderBG')
    svg.style.opacity = 0;
    svg.style.top = "-200px";
    svg.style.left = "calc(50vw - 50px)";
    svg.style.backgroundColor = "#30303030";
    svg.style.width = "100px";
    svg.style.height = "100px";
    var svg = document.getElementById('loaderHolder')
    svg.style.opacity = 0;
}

function initLoader() {
    // create svg element
    var cx = 50;
    var cy = 50;
    var r = 40;
    var percent = 100;

    var icolor = "#808080f0";
    var fcolor = "#30303030";

    var svg = document.getElementById('loader')
    svg.classList.add("svg-circle");
    svg.setAttribute("data-percent", percent);
    svg.setAttribute("width", cx * 2);
    svg.setAttribute("height", cy * 2);
    svg.innerHTML = "";
    //svg.innerHTML += "<defs><conicalGradient id='loaderStroke' x1='0%' y1='0%' x2='100%' y2='0%'><stop offset='0%' stop-color='" + icolor + "' /> <stop offset='100%' stop-color='" + fcolor + "' /></defs>";
    svg.innerHTML += "<defs><linearGradient id='loaderStroke' x1='0%' y1='0%' x2='100%' y2='0%'><stop offset='0%' stop-color='" + icolor + "' /> <stop offset='100%' stop-color='" + fcolor + "' /></defs>";
    svg.innerHTML += "<circle cx='" + cx + "' cy='" + cy + "' r='" + r + "'/>";

    var rc = 2 * r * Math.PI;
    var rd = percent * rc / 100;

    svg.style.strokeDasharray = rd;
}













// percent returner

// Create a class for the element
function setSVGPercentGraph(id, height = 100, width = 100) {
    if (document.getElementById(id) == undefined) {
        setTimeout(() => {
            setSVGPercentGraph(id, height, width);
        }, 100);
        return;
    }
    var svg = document.getElementById(id);

    var cx = width / 2;
    var cy = height / 2;
    var r = ((cx > cy) ? cy : cx) - 8;
    var percent = svg.getAttribute('percent') || 30;

    var upcolor = svg.getAttribute('front-color') || "var(--perc-up)";//cor da barra superior
    var dwcolor = svg.getAttribute('back-color') || "var(--perc-dw)";

    svg.setAttribute('class', 'svg-circle');
    var rstring = new Date().getTime();

    svg.style.stroke = "url(#" + rstring + ")"

    var rc = 2 * r * Math.PI;
    var rd = percent * rc / 100;

    svg.innerHTML = "";
    //svg.innerHTML += "<defs><linearGradient id='" + rstring + "' x1='0%' y1='0%' x2='100%' y2='0%'><stop offset='0%' stop-color='" + upcolor + "' /> <stop offset='100%' stop-color='" + dwcolor + "' /></defs>";
    svg.innerHTML += "<circle cx='" + cx + "' cy='" + cy + "' r='" + r + "' style=\"stroke:" + dwcolor + "; stroke-dasharray:" + rc + " 999; stroke-width:5\" />";
    svg.innerHTML += "<circle cx='" + cx + "' cy='" + cy + "' r='" + r + "' style=\"stroke:" + upcolor + "; stroke-dasharray:" + rd + " 999; stroke-width:12\" />";
    svg.innerHTML += "<text x='0' y='0' dominant-baseline='middle' text-anchor='middle'>" + percent + "%</text>";


    //svg.style.strokeDasharray = rd;

}


function menuCancel() {
    var h = document.getElementById("sub_menu_over");
    if (h != undefined) {
        document.getElementById("sub_menu_over").style.opacity = 0;
        document.getElementById("sub_menu_over").style.top = "-100vh";
        setTimeout(() => {
            h.innerHTML = "";
        }, 1000)
    }
}
