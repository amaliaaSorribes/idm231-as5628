function on() {
    const container = document.getElementById('overlayContainer');
    const overlay = document.createElement('div');
    overlay.className = "overlay";

    const textDiv = document.createElement('div');
    textDiv.className = "text";
    textDiv.innerHTML = `
      <h2>Instructions</h2>
      <div class="x-container">
        <div class="line line1"></div>
        <div class="line line2"></div>
      </div>
      <div class="text-inside">
      <p><strong>To play an album based on a specific date:</strong></p>
      <ol>
        <li><strong>Enter a Date:</strong> Use the date input field to select a date. You can type the date directly or use the calendar picker.</li>
        <li><strong>Submit:</strong> Click the "Submit" button.</li>
        <li><strong>Listen:</strong> The album associated with the zodiac sign for that date will begin playing automatically and a CD icon appearing below.</li>
        <li><strong>View Details:</strong> The song details (title, artist, album name, and release date) along with the zodiac sign roulette at the bottom of the page will update.</li>
        <li><strong>Stop Playback:</strong> Click on the currently playing album to stop the music.</li>
      </ol>
      <p><strong>Alternatively, you can explore the albums by clicking on any of them directly.</strong></p>
      </div>
    `;
    overlay.appendChild(textDiv);
    container.appendChild(overlay);
    const cross = document.getElementsByClassName('x-container')[0];
    cross.addEventListener('click',  off);
  }
  
  function off() {
    const overlay = document.getElementsByClassName("overlay")[0];
    if (overlay) {
      overlay.remove();
    }
  }