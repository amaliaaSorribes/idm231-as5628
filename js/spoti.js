
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
  const response = await fetch('https://api.spotify.com/v1/me/tracks?limit=10', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  const loginBtn = document.getElementById('login-btn');

  loginBtn.textContent = 'Logged in';
  loginBtn.disabled = true;

  for (const item of data.items) {
  const track = item.track;
  const artists = track.artists;
  const artistIds = artists.map(artist => artist.id);

  //const artistResponse = await fetch(`https://api.spotify.com/v1/artists?ids=${artistIds.join(',')}`, {
  //  headers: {
  //    Authorization: `Bearer ${token}`
  //  }
  //});

  //const artistData = await artistResponse.json();

  //console.log(sharedGenres);

  console.log(track.name +" by "+ artists.map(a => a.name).join(', '));

  //console.log(artistData); //remove later
}}

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