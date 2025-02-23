//// @ts-check

const albums = [
    {
        zodiac : "capricorn",
        artist: "Pole.",
        song: "Tus Besos",
        degrees: "75",
        audioSrc: "songs/Tus_Besos-Pole..mp3",
        imgSrc: "images/pole.jpg",
        albumName: "Esta Vida Es Un Jaleo",
        releaseDate: "2022"
    },
    {
        zodiac : "aquarius",
        artist: "84",
        song: "Esquinas de Madrid",
        degrees: "45",
        audioSrc: "songs/Esquinas_de_Madrid-84.mp3",
        imgSrc: "images/84.jpg",
        albumName: "El Burdel de las Sirenas",
        releaseDate: "2010"
    },
    {
        zodiac : "pisces",
        artist: "Astola",
        song: "No Parezco un Artista",
        degrees: "15",
        audioSrc: "songs/No_Parezco_un_Artista-Astola.mp3",
        imgSrc: "images/astola.jpg",
        albumName: "Canciones Perdidas",
        releaseDate: "2015"
    },
    {
        zodiac : "aries",
        artist: "El Canto del Loco",
        song: "Volver a Disfrutar",
        degrees: "-15",
        audioSrc: "songs/Volver_a_Disfrutar-El_Canto_Del_Loco.mp3",
        imgSrc: "images/canto.jpg",
        albumName: "Estados de Animo",
        releaseDate: "2003"
    },
    {
        zodiac : "taurus",
        artist: "El Niño de la Hipoteca",
        song: "Que te vaya bien",
        degrees: "-45",
        audioSrc: "songs/Que_te_vaya_bien-El_Niño_de_la_Hipoteca.mp3",
        imgSrc: "images/hipoteca.jpg",
        albumName: "Que te vaya bien",
        releaseDate: "2009"
    },
    {
        zodiac : "gemini",
        artist: "Estopa",
        song: "Fin de Semana",
        degrees: "-75",
        audioSrc: "songs/Fin_de_Semana-Estopa.mp3",
        imgSrc: "images/estopa.jpg",
        albumName: "¿La Calle Es Tuya?",
        releaseDate: "2004"
    },
    {
        zodiac : "cancer",
        artist: "La La Love You",
        song: "Himno(para los que están jodidos)",
        degrees: "-105",
        audioSrc: "songs/Himno(para_los_que_están_jodidos)-La_La_Love_You.mp3",
        imgSrc: "images/lalalove.jpg",
        albumName: "Blockbuster",
        releaseDate: "2023"
    },
    {
        zodiac : "leo",
        artist: "Melendi",
        song: "Desde mi ventana",
        degrees: "-135",
        audioSrc: "songs/Desde_mi_ventana-Melendi.mp3",
        imgSrc: "images/melendi.jpg",
        albumName: "Sin noticias de Holanda",
        releaseDate: "2006"
    },
    {
        zodiac : "virgo",
        artist: "La Maravillosa Orquesta del Alcohol",
        song: "La Vieja Banda",
        degrees: "-165",
        audioSrc: "songs/La_Vieja_Banda-La_Maravillosa_Orquesta_del_Alcohol.mp3",
        imgSrc: "images/moda.jpg",
        albumName: "Salvavida (de las Balas Perdidas)",
        releaseDate: "2017"
    },
    {
        zodiac : "libra",
        artist: "SFDK",
        song: "La Amalgama",
        degrees: "-195",
        audioSrc: "songs/La_Amalgama-SFDK.mp3",
        imgSrc: "images/sfdk.jpg",
        albumName: "Redención",
        releaseDate: "2018"
    },
    {
        zodiac : "scorpio",
        artist: "C.Tangana",
        song: "Nominao",
        degrees: "-225",
        audioSrc: "songs/Nominao-C.Tangana.mp3",
        imgSrc: "images/tangana.jpg",
        albumName: "El Madrileño",
        releaseDate: "2021"
    },
    {
        zodiac : "sagittarius",
        artist: "Yami Safdie",
        song: "Tengo",
        degrees: "-255",
        audioSrc: "songs/Tengo-Yami_Safdie.mp3",
        imgSrc: "images/yami.jpg",
        albumName: "SUR",
        releaseDate: "2023"
    }
];

function getInfo(zodiac) {
    for (let album of albums) {
        if (album.zodiac == zodiac) {
            let info = [album.artist, album.song, album.degrees, album.audioSrc, album.albumName, album.releaseDate];
            return info;
        }
    }
}

function createCD(artist, container){
    const myDivSpecific = document.getElementById('myDiv'+artist);
    myDivSpecific.style.marginRight = "65px";

    const cd = document.createElement('img');
    cd.src = "images/cd.png";
    cd.className = "cd";
    cd.id = "cd"+artist;

    const itemSpecific = document.getElementById('item'+artist);
    itemSpecific.appendChild(cd);

    container.style.maxWidth = "1300px";
}

function deleteCD(cdPrev, prevArtist){
    cdPrev.remove();
    const myDivSpecific = document.getElementById('myDiv'+prevArtist);
    myDivSpecific.style.marginRight = "0px";
}

let prevArtist = "";
let flag = -1;

function play(zodiac) {
    const artist = getInfo(zodiac)[0];
    const song = getInfo(zodiac)[1];
    const degrees = getInfo(zodiac)[2];
    const audioSrc = getInfo(zodiac)[3];
    const albumName = getInfo(zodiac)[4];
    const releaseDate = getInfo(zodiac)[5];

    const audio = document.getElementById('my_audio');
    const title = document.getElementById('title');
    let source = document.getElementById('my_source');
    let zodiacCircle = document.getElementById('zodiac');
    const cdPrev = document.getElementById('cd'+prevArtist);
    let container = document.getElementById('container');
    const description  = document.getElementById('description');
    source.src = audioSrc;

    if (prevArtist!=artist && prevArtist!=null) {
        audio.load();
    }

    if (prevArtist!=artist || flag==-1) {
        if (prevArtist!=artist || (prevArtist==artist && flag==-1)) {
            createCD(artist, container);
        } 

        if (flag==0 && cdPrev!=null) {
            deleteCD(cdPrev, prevArtist);
        }

        audio.play();
        title.textContent = song+" - "+artist; 
        description.innerHTML = "<u>Album Name:</u> "+albumName+"<br><br><u>Release date</u>: "+releaseDate;
        zodiacCircle.style.transform = "rotate("+degrees+"deg)";
        prevArtist = artist;
        flag = 0;
    } else {
        audio.pause();
        title.textContent = "Title - Artist";	
        description.textContent = "Album Name, Release date";
        zodiacCircle.style.transform = "rotate(0deg)";
        if (cdPrev!=null){
            deleteCD(cdPrev, prevArtist);
            container.style.maxWidth = "1200px";
        }
        flag = -1;
    } 
}

function makeButtons() {
    const container = document.getElementById('container');

    for (let album of albums) {
        const div = document.createElement('div');
        div.className = "myDiv";
        div.id = "myDiv"+album.artist;

        const item = document.createElement('div');
        item.className = "item";
        item.id = "item"+album.artist;

        const image = document.createElement('img');
        image.src = album.imgSrc;
        image.className = "album";

        const header3 = document.createElement('h3');
        header3.textContent = album.zodiac.toUpperCase();
        
        item.appendChild(image);
        div.appendChild(item);
        div.appendChild(header3);

        div.addEventListener('click',  () => play(album.zodiac));
        
        container.appendChild(div);
    }
}

makeButtons();

/**
 * @description
 * Given a month and day, determine the corresponding Zodiac sign.
 * @param {number} month - month of the year (1-12)
 * @param {number} day - day of the month (1-31)
 * @returns {string} the corresponding Zodiac sign
 */
function getZodiac(month, day) {
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      return 'Capricorn';
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
      return 'Sagittarius';
    } else if ((month === 10 && day >= 24) || (month === 11 && day <= 21)) {
      return 'Scorpio';
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) {
      return 'Libra';
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      return 'Virgo';
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      return 'Leo';
    } else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
      return 'Cancer';
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) {
      return 'Gemini';
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
      return 'Taurus';
    } else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
      return 'Aries';
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
      return 'Pisces';
    } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
      return 'Aquarius';
    } else return null;
  }

  function parseDate(event) {
    event.preventDefault();
    const date = document.getElementById("dateUser");
    var input = date.value;
    if (input != date.defaultValue) {
        const month = parseInt(input.split('-')[1]);
        const day = parseInt(input.split('-')[2]);
        play(getZodiac(month,day).toLowerCase());
        date.value = date.defaultValue;
    }
  }

  function getInput(){
    const submit = document.getElementById("submit");
    submit.addEventListener('click',  parseDate);
  }

  getInput();