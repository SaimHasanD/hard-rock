// calling A.P.I to get the song
const enterButton = event => {
    if (event.key === 'Enter') {
        document.getElementById('searchButton').click();
    }
}
const searchSongs = async () => {
    const searchText = document.getElementById('searchText').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    displaySpinner();
    // get data
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    }
    catch (error) {
        displayError('Something went wrong!! please try again latter');
    }
}

const displaySongs = (songs) => {
    const songContainer = document.getElementById('songContainer');
    songContainer.textContent = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio
                    controls
                    src="${song.preview}">
                    Your browser does not support the
                    <code>audio</code> element.  
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `
        songContainer.appendChild(songDiv);
        displaySpinner();
    });
}

// get song lyrics

//using fetch
const getLyric = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    // get lyric
    fetch(url)
        .then(res => res.json())
        .then(data => displayLyrics(data.lyrics))
        .catch(error => displayError("Sorry!! We don't find this lyric, Try again later"))
}

//using async await
// const getLyric = async (artist, title) =>{
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
//     // get lyric
//     const res = await fetch(url)
//     const data = await res.json();
//     displayLyrics(data.lyrics);
// }

// show lyrics on display
const displayLyrics = lyric => {
    const newDiv = document.getElementById('songLyrics')
    newDiv.innerText = lyric;
}

// Display error massage
const displayError = error => {
    const errorText = document.getElementById('errorText');
    errorText.innerText = error;
}

const displaySpinner = () => {
    const spinner = document.getElementById('loadingSpinner');
    const songs = document.getElementById('songContainer');
    spinner.classList.toggle('d-none');
    songs.classList.toggle('d-none');
}



{/* <audio controls>
    <source src="${song.preview}" type="audio/mpeg">
</audio> */}