// Add Your Spotify application's client ID here
const clientId = ''; 

// The redirect URI for your application
const redirectUri = 'https://www.tanwtjammming.surge.sh';

// The user's access token
let userAccessToken = "";

const Spotify = {
    // Method to get the user's access token
    getAccessToken: function () {
        // If the user's access token is already set, return it
        if (userAccessToken) {
            return userAccessToken;
        }
        // Try to match the access token and expiry time in the URL
        const accessTokenUrl = window.location.href.match(/access_token=([^&]*)/);
        const urlExpiryTime = window.location.href.match(/expires_in=([^&]*)/);
        // If the access token and expiry time are found in the URL
        if (accessTokenUrl && urlExpiryTime) {
            // Set the user's access token
            userAccessToken = accessTokenUrl[1];
            // Set the access token's expiry time
            const expiresIn = Number(urlExpiryTime[1]);
            // Clear the user's access token after it expires
            window.setTimeout(() => userAccessToken = "", expiresIn * 1000);
            // Clear the access token from the URL
            window.history.pushState('Access Token', null, "/");
        } else {
            // If the access token and expiry time are not in the URL, redirect the user to the Spotify authorization page
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },
    // Method to search for tracks on Spotify
    search: function(term) {
        // Get the user's access token
        const accessToken = this.getAccessToken();
        // Fetch the search results from the Spotify API
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            // Convert the response to JSON
            return response.json();
        }).then(jsonResponse => {
            // If no tracks are found in the response, return an empty array
            if (!jsonResponse.tracks) {
                return [];
            }
            // Map the tracks in the response to an array of track objects
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },
    // Method to save a playlist to the user's Spotify account
    savePlayListName: function(name, trackUris){
        // If the playlist name or track URIs are not provided, return
        if(!name || !trackUris.length){
            return;
        }
        // Get the user's access token
        const accessToken = this.getAccessToken();
        // Set the headers for the request
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        // Fetch the user's Spotify ID
        return fetch("https://api.spotify.com/v1/me", {headers: headers})
        .then(response => response.json())
        .then(jsonResponse => {
            // Set the user's Spotify ID
            userId = jsonResponse.id;
            // Create a new playlist in the user's Spotify account
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json()
            ).then(jsonResponse => {
                // Get the ID of the new playlist
                const playlistId = jsonResponse.id;
                // Add the tracks to the new playlist
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                });
            });
        });
    }
};

// Export the Spotify object
export { Spotify };
