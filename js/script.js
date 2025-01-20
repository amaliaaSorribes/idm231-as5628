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
}