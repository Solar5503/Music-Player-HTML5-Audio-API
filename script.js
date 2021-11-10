const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const progressVolume = document.getElementById('progress-volume');
const progressVolumeContainer = document.getElementById(
  'progress-volume-container'
);

//Song titles
const songs = ['hey', 'summer', 'ukulele'];

//Keep track of song
let songIndex = 1;

//Initially load song details into DOM
loadSong(songs[songIndex]);

//Set volume 50% by default
audio.volume = 0.5;

//Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

//Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}
//Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause();
}

//Previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}
//Next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

//Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

//Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

//Set progress bar of volume
function setProgressVolume(e) {
  const clickX = e.offsetX;
  const width = this.clientWidth;
  audio.volume = clickX / 100;
  const progressPercent = (clickX / width) * 100;
  progressVolume.style.width = `${progressPercent}%`;
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) pauseSong();
  else playSong();
});

//Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//Time/song update
audio.addEventListener('timeupdate', updateProgress);

//Click on progress bar
progressContainer.addEventListener('click', setProgress);

//Song ends
audio.addEventListener('ended', nextSong);

//Click on progress bar of volume
progressVolumeContainer.addEventListener('click', setProgressVolume);
