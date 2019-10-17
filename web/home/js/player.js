let pl_instance;
let pl_source;
let pl_title;
let pl_timer;
let pl_playbutton;

function pl_Init() {
    pl_playbutton = document.getElementById("pl_Play");
    pl_timer = document.getElementById("pl_Timer");
    pl_instance = document.getElementById("pl_instance");
    pl_source = document.getElementById("pl_instance_source");
    pl_title = document.getElementById("pl_title");
    document.getElementById("pl_ScrollBar").addEventListener("click", seek);
}

function playfile(title, folder) {
    if (document.getElementById("navigation_list")) {
        document.getElementById("navigation_list").style.bottom = "68px";
    }
    document.getElementById("player").style.bottom = "0px";
    pl_title.innerText = title;
    pl_source.setAttribute("src", ((window.location.pathname.indexOf("list") > 0) ? "." : "") + "./data/" + folder + "/audio.mp3");
    document.getElementById("pl_Download").setAttribute("href", ((window.location.pathname.indexOf("list") > 0) ? "." : "") + "./data/" + folder + "/audio.mp3");
    document.getElementById("pl_Download").setAttribute("download", title + ".mp3")
    pl_instance.load();
    pl_instance.play();
    pl_playbutton.setAttribute("src", ((window.location.pathname.indexOf("list") > 0) ? "." : "") + "./home/img/pause.png");
}
function playerClose() {
    pl_instance.pause();
    if (document.getElementById("navigation_list")) {
        document.getElementById("navigation_list").style.bottom = "0px";
    }
    document.getElementById("player").style.bottom = "";
}


function calculateScroll() {
    let pl_ScrollBar = document.getElementById("pl_ScrollBar");
    if (pl_ScrollBar) {

        let buffered = pl_instance.buffered;
        let loaded;
        let played;

        if (buffered.length) {
            loaded = 100 * buffered.end(0) / pl_instance.duration;
            played = 100 * pl_instance.currentTime / pl_instance.duration;
            loaded = loaded.toFixed(2);
            played = played.toFixed(2);
        }
        pl_ScrollBar.style.setProperty("--scroll", played + "%");

        pl_timer.innerHTML = TimerFactorate(pl_instance.currentTime, pl_instance.duration);
    }
}

function seek(evt) {
    let percent = (evt.offsetX / this.offsetWidth) * pl_instance.duration;
    let s = pl_instance;
    s.currentTime = percent;
}

function pl_play() {
    if (pl_instance.paused) {
        pl_instance.play();
        pl_playbutton.setAttribute("src", ((window.location.pathname.indexOf("list") > 0) ? "." : "") + "./home/img/pause.png");
    } else {
        pl_instance.pause();
        pl_playbutton.setAttribute("src", ((window.location.pathname.indexOf("list") > 0) ? "." : "") + "./home/img/play.png");
    }
}
function pl_Update() {
    calculateScroll();
}

function TimerFactorate(time, max) {
    let ret = secondsToHms(time) + "/" + secondsToHms(max);
    return ret;
}
function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = (h > 9) ? "" + h : "0" + h;
    var mDisplay = (m > 9) ? "" + m : "0" + m;
    var sDisplay = (s > 9) ? "" + s : "0" + s;
    return mDisplay + ":" + sDisplay;
}