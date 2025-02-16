const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'blackbear - idfc (Lyrics).mp3',
        displayName : 'blackbear - idfc',
        cover : 'idfc-cover.jpg',
        artist1 : 'blackbear',
    },
    {
        path: 'Anywhere You Go.mp3',
        displayName : 'AnyWhere You Go',
        cover : 'Anywhere You Go.jpeg',
        artist1 : 'Clubhouse',
    }
]

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}

function pauseMusic(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}


function loadMusic(song){
    music.src=song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist1;
    image.src = song.cover;
    background.src = song.cover;
    // jsmediatags.read(song.path, {
    //     onSuccess: function(tag) {
    //         const tags = tag.tags;
    //         if (tags.picture) {
    //             const base64String = tags.picture.data.reduce((data, byte) => data + String.fromCharCode(byte), '');
    //             const base64 = "data:" + tags.picture.format + ";base64," + window.btoa(base64String);
    //             image.src = base64;
    //             background.src = base64;
    //         }
    //     },
    //     onError: function(error) {
    //         console.log('Error reading tags:', error.type, error.info);
    //     }
    // });
}


function changeMusic (direction){
    musicIndex = (musicIndex + direction + songs.length)%songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}


function updateProgressBar(){
    const {duration, currentTime} = music;
    const progressPercent = (currentTime/duration)*100;
    progress.style.width = `${progressPercent}%`;
    const formatTime = (time) => String(Math.floor(time)).padStart(2,'0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click',() => changeMusic(-1));
nextBtn.addEventListener('click',() => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click',setProgressBar);

loadMusic(songs[musicIndex]);