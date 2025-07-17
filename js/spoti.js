import { albums } from './albums.js';
import { makeButtons } from './script.js'

  const loginBtn = document.getElementById('login-btn');

  loginBtn.addEventListener('click', async () => {
  const codeVerifier = await generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  localStorage.setItem('code_verifier', codeVerifier);

  const args = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: scopes,
    redirect_uri: redirectUri,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge
  });

  window.location = `https://accounts.spotify.com/authorize?${args}`;
});

const clientId = 'a66300df53bc4500939e08d0680425e1';
const redirectUri = 'https://zodiacwrapped.netlify.app/'; 
const scopes = 'user-library-read';

async function getAccessToken(code) {
  const codeVerifier = localStorage.getItem('code_verifier');

  const body = new URLSearchParams({
    client_id: clientId,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier
  });

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString()
  });

  const data = await response.json();
  return data.access_token;
}

async function fetchLikedSongs(token) {
  const response = await fetch('https://api.spotify.com/v1/me/tracks?limit=12', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  const loginBtn = document.getElementById('login-btn');

  loginBtn.textContent = 'Logged in';
  loginBtn.disabled = true;

  data.items.forEach((item, index) => {
    const track = item.track;
    const artists = track.artists;
    const artistNames = artists.map(artist => artist.name).join(', ');

    const album = track.album;
    const albumName = album.name;
    const albumCover = album.images[0]?.url;
    const releaseDate = album.release_date;
    const previewUrl = track.preview_url;

    const zodiacalbum = albums[index];

    zodiacalbum.artist = artistNames;
    zodiacalbum.song = track;
    zodiacalbum.audioSrc = previewUrl;
    zodiacalbum.imgSrc = albumCover;
    zodiacalbum.albumName = albumName;
    zodiacalbum.releaseDate = releaseDate;

  });
}

makeButtons();

async function handleRedirect() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  if (code) {
    window.history.replaceState({}, document.title, '/'); // Clean URL
    const token = await getAccessToken(code);
    await fetchLikedSongs(token);
  }
}

handleRedirect();