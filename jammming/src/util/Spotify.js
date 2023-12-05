const clientId = '76d76cdbe87145fbb17b52373f2f1b00'; 
// const redirectUri = 'http://localhost:3000/';
const redirectUri = 'https://www.tanwtjammming.surge.sh';

let userAccessToken = "";

const Spotify = {
    getAccessToken: function () {
        if (userAccessToken) {
            return userAccessToken;
        }
        const accessTokenUrl = window.location.href.match(/access_token=([^&]*)/);
        const urlExpiryTime = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenUrl && urlExpiryTime) {
            userAccessToken = accessTokenUrl[1];
            const expiresIn = Number(urlExpiryTime[1]);
            window.setTimeout(() => userAccessToken = "", expiresIn * 1000);
            window.history.pushState('Access Token', null, "/");
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },
    search: function(term) {
        const accessToken = this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },
    savePlayListName: function(name, trackUris){
        if(!name || !trackUris.length){
            return;
        }
        const accessToken = this.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch("https://api.spotify.com/v1/me", {headers: headers})
        .then(response => response.json())
        .then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                });
            });
        });
    }
};

export { Spotify };
