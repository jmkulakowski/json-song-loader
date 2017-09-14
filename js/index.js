/**
 * index.js
 * --------
 * The main functions that run your application. Create new object instances 
 * using custom classes. Write functions that make decisions for your
 * application.
 */

// Get Songs from JSON file
fetchJSONFile('data/songs.json', success);


/**------------------------------------------------------------*
 * Core Functions                                              *
 *-------------------------------------------------------------*/

/**
 * fetchJSONFile
 * -------------
 * Request a JSON file and execute a callback with the parsed result 
 * once it is available
 */
function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                let data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
}

/**
 * Success
 * -------
 * Callback function for a successful retrieval of a JSON file request
 */
function success(data) {
    // do something with your data
    console.log(data);

    let song;
    for(song in data) {
    	if (data.hasOwnProperty(song) ) {
	    	console.log(data[song]);
	    	buildSong(data[song]);
		}
    }
}

/**
 * Build Song
 * ----------
 * Build a song from data and insert into the DOM
 */
function buildSong(songData) {
    let song = document.createElement('div');
    song.classList.add('song');
    let title = songData.title,
    	key = songData.key,
    	tempo = songData.tempo,
    	preview = songData.preview,
    	media = songData.media;
    song.innerHTML = '<h2>' + title + '</h2> ' + 
    				 '<ul>' +
    				 '<li>' + key + '</li>' +
    				 '<li>' + tempo + '</li>' +
    				 '<li>' + preview + '</li>' +
      				 '<li>' + media + '</li>' +
      				 '</ul>';

    document.querySelector('.container').appendChild(song);
}