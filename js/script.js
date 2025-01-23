//// @ts-check

/*
function play(song, artist, degrees) {
    const audio = document.getElementById(artist);
    let title = document.getElementById('title');
    let allAudios = document.querySelectorAll('audio');
    let zodiac = document.getElementById('zodiac');
    if (audio.paused) {
        allAudios.forEach(audio => { 
            audio.pause(); 
        });
        audio.play();
        title.textContent = song+" - "+artist; 
        zodiac.style.transform = "rotate("+degrees+"deg)";
    } else {
        audio.pause();
        title.textContent = "Title - Artist";
        zodiac.style.transform = "rotate(0deg)";
    } 
}*/

const albums = [
    {
        zodiac : "capricorn",
        artist: "Pole.",
        song: "Tus Besos",
        degrees: "75",
        audioSrc: "songs/Tus_Besos-Pole..mp3",
        imgSrc: "images/pole.jpg"
    },
    {
        zodiac : "aquarius",
        artist: "84",
        song: "Esquinas de Madrid",
        degrees: "45",
        audioSrc: "songs/Esquinas_de_Madrid-84.mp3",
        imgSrc: "images/84.jpg"
    },
    {
        zodiac : "pisces",
        artist: "Astola",
        song: "No Parezco un Artista",
        degrees: "15",
        audioSrc: "songs/No_Parezco_un_Artista-Astola.mp3",
        imgSrc: "images/astola.jpg"
    },
    {
        zodiac : "aries",
        artist: "El Canto del Loco",
        song: "Volver a Disfrutar",
        degrees: "-15",
        audioSrc: "songs/Volver_a_Disfrutar-El_Canto_Del_Loco.mp3",
        imgSrc: "images/canto.jpg"
    },
    {
        zodiac : "taurus",
        artist: "El Niño de la Hipoteca",
        song: "Que te vaya bien",
        degrees: "-45",
        audioSrc: "songs/Que_te_vaya_bien-El_Niño_de_la_Hipoteca.mp3",
        imgSrc: "images/hipoteca.jpg"
    },
    {
        zodiac : "gemini",
        artist: "Estopa",
        song: "Fin de Semana",
        degrees: "-75",
        audioSrc: "songs/Fin_de_Semana-Estopa.mp3",
        imgSrc: "images/estopa.jpg"
    },
    {
        zodiac : "cancer",
        artist: "La La Love You",
        song: "Himno(para los que están jodidos)",
        degrees: "-105",
        audioSrc: "songs/Himno(para_los_que_están_jodidos)-La_La_Love_You.mp3",
        imgSrc: "images/lalalove.jpg"
    },
    {
        zodiac : "leo",
        artist: "Melendi",
        song: "Desde mi ventana",
        degrees: "-135",
        audioSrc: "songs/Desde_mi_ventana-Melendi.mp3",
        imgSrc: "images/melendi.jpg"
    },
    {
        zodiac : "virgo",
        artist: "La Maravillosa Orquesta del Alcohol",
        song: "La Vieja Banda",
        degrees: "-165",
        audioSrc: "songs/La_Vieja_Banda-La_Maravillosa_Orquesta_del_Alcohol.mp3",
        imgSrc: "images/moda.jpg"
    },
    {
        zodiac : "libra",
        artist: "SFDK",
        song: "La Amalgama",
        degrees: "-195",
        audioSrc: "songs/La_Amalgama-SFDK.mp3",
        imgSrc: "images/sfdk.jpg"
    },
    {
        zodiac : "scorpio",
        artist: "C.Tangana",
        song: "Nominao",
        degrees: "-225",
        audioSrc: "songs/Nominao-C.Tangana.mp3",
        imgSrc: "images/tangana.jpg"
    },
    {
        zodiac : "sagittarius",
        artist: "Yami Safdie",
        song: "Tengo",
        degrees: "-255",
        audioSrc: "songs/Tengo-Yami_Safdie.mp3",
        imgSrc: "images/yami.jpg"
    }
];

function getInfo(zodiac) {
    for (let album of albums) {
        if (album.zodiac == zodiac) {
            let info = [album.artist, album.song, album.degrees, album.audioSrc];
            return info;
        }
    }
}

let prevArtist = "";
let flag = -1;

function play(zodiac) {
    const artist = getInfo(zodiac)[0];
    const song = getInfo(zodiac)[1];
    const degrees = getInfo(zodiac)[2];
    const audioSrc = getInfo(zodiac)[3];

    const audio = document.getElementById('my_audio');
    const title = document.getElementById('title');
    const source = document.getElementById('my_source');
    let zodiacCircle = document.getElementById('zodiac');
    if (prevArtist!=artist || flag==-1) {
        source.src = audioSrc;
        audio.load(); 
        audio.play();
        title.textContent = song+" - "+artist; 
        zodiacCircle.style.transform = "rotate("+degrees+"deg)";
        prevArtist = artist;
        flag = 0;
    } else {
        audio.pause();
        flag = -1;
    } 
}