
let image=document.querySelector('img');
let title=document.getElementById('title');
let artist=document.getElementById('artist');
let progressContainer=document.getElementById('progress-container');
let progress=document.getElementById('progress');
let currentTimeEl=document.getElementById('current-time');
let durationEl=document.getElementById('duration');
let music=document.querySelector('audio');
let prevBtn=document.getElementById('prev');
let playBtn=document.getElementById('play1');
let nextBtn=document.getElementById('next');


let songs = [
    {
      name: 'jacinto-1',
      disPlayName: 'mangalavaram',
      artist: 'B. Ajaneesh Loknath',
    },
    {
      name: 'jacinto-2',
      disPlayName: 'Vikram',
      artist: 'anirudh',
    },
    {
      name: 'jacinto-3',
      disPlayName: 'salaar',
      artist: 'prabhas',
    },
    {
      name: 'jacinto-4',
      disPlayName: 'animal',
      artist: 'i dont know',
    },
    {
        name: 'jacinto-5',
        disPlayName: 'ROY',
        artist: 'i dont know',
      },
      {
        name: 'jacinto-6',
        disPlayName: 'animal',
        artist: 'i dont know',
      },
  ];

let isplaying=false;
// paly
function playSong(){
    isplaying=true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','pause');
    music.play();
}
function pauseSong(){
    isplaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','play');
    music.pause();
}

// paly event liserner taking tarner for palyin g next and prev paly butoon
playBtn.addEventListener('click', () => (isplaying ? pauseSong(): playSong()));



function loadSong(song){
    title.textContent = song.disPlayName;
    console.log(title.textContent)
    artist.textContent = song.artist;
    music.src = `${song.name}.mp3`;
    image.src = `${song.name}.jpg`;
}

let currentSongIndex=0;

function prevSong(){
    currentSongIndex--;
    if(currentSongIndex<0){
        currentSongIndex=songs.length-1;
    }
    console.log(currentSongIndex);
    loadSong(songs[currentSongIndex]);
    playSong();
}

function nextSong(){
    currentSongIndex++;
    if(currentSongIndex===songs.length){
        currentSongIndex=0;
    }
    console.log(currentSongIndex);
    loadSong(songs[currentSongIndex]);
    playSong();
}
loadSong(songs[currentSongIndex]);

function updateTime(e){
    if(isplaying){
        const { duration, currentTime }=e.srcElement;
        const progressPercentage=(currentTime/duration)*100;
        progress.style.width=`${progressPercentage}%`;
        const durationMin=Math.floor(duration/60);
        // console.log(durationMin);
        let durationSec=Math.floor(duration%60);
        if(durationSec<10){
            durationSec=`0${durationSec}`;
        }   
        // console.log(durationSec);     
        if(durationSec){
            durationEl.textContent=`${durationMin}:${durationSec}`;
        }
        const currentMin=Math.floor(currentTime/60);
        // console.log(currentMin);
        let currentSec=Math.floor(currentTime%60);
        if(currentSec<10){
            currentSec=`0${currentSec}`;
        }   
        // console.log(currentSec);  
        currentTimeEl.textContent=`${currentMin}:${currentSec}`;
    }


}
function setBar(e){
    // console.log(e);
    const width1=this.clientWidth;
    // console.log('width',width1);
    const clickX=e.offsetX;
    // console.log('clickX',clickX);
    const {duration}=music;
    // console.log(clickX/width1);
    // console.log((clickX/width1)*duration);
    music.currentTime=(clickX/width1)*duration;
}

prevBtn.addEventListener('click', () => prevSong());
nextBtn.addEventListener('click', () => nextSong());
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate',updateTime);
progressContainer.addEventListener('click', setBar);

