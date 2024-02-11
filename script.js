document.addEventListener('DOMContentLoaded', () => {
    customControls();
    selectFromList();
})

const customControls = () => {

    const container = document.querySelector('.video-container');
    const video = container.querySelector('video');
    const progressBar = container.querySelector('.progress-bar');
    const playPauseBtn = container.querySelector('.play-pause i');
    const skipBackwardBtn = container.querySelector('.skip-backward i');
    const skipForwardBtn = container.querySelector('.skip-forward i');
    const volumeBtn = container.querySelector('.volume i');
    const volumeSlider = container.querySelector('.left input');

    //Move progress bar
    video.addEventListener('timeupdate', e => setProgressBar(e));

    const setProgressBar = (e) => {
        let { currentTime, duration } = e.target;
        let percent = (currentTime / duration) * 100;
        progressBar.style.width = `${percent}%`;
    }

    //Play-pause proceed
    playPauseBtn.addEventListener('click', () => playPauseVid());
    video.addEventListener('click', () => playPauseVid());

    video.addEventListener('play', () => {
        playPauseBtn.classList.replace('fa-play', 'fa-pause');
    });

    video.addEventListener('pause', () => {
        playPauseBtn.classList.replace('fa-pause', 'fa-play');
    });

    const playPauseVid = () => {
        video.paused ? video.play() : video.pause();
    }

    //Skip video
    const skipBackwardFunc = () => video.currentTime -= 5;
    const skipForwardFunc = () => video.currentTime += 5;

    skipBackwardBtn.addEventListener('click', () => skipBackwardFunc());
    skipForwardBtn.addEventListener('click', () => skipForwardFunc());

    //Mute and unmute video
    const muteUnmuteVid = () => {
        if (!volumeBtn.classList.contains('fa-volume-high')) {
            video.volume = 0.5
            volumeBtn.classList.replace('fa-volume-xmark', 'fa-volume-high');
        } else {
            video.volume = 0.0;
            volumeBtn.classList.replace('fa-volume-high', 'fa-volume-xmark');
        }
    };

    volumeBtn.addEventListener('click', () => muteUnmuteVid());

    //Proceed by keyboard
    document.addEventListener('keydown', (event) => {
        switch (event.code) {
            case 'Space':
                playPauseVid();
                break;
            case 'ArrowLeft':
                skipBackwardFunc();
                break;
            case 'ArrowRight':
                skipForwardFunc();
                break;
            case 'KeyM':
                muteUnmuteVid();
                break;
            default:
                '';
                break;
        }
    })

};

const selectFromList = () => {
    let listVideo = document.querySelectorAll('.video-list .vid');
    let mainVideo = document.querySelector('.main-video video');
    let title = document.querySelector('.main-video .title');
    let progressBar = document.querySelector('.progress-bar');
    const playPauseBtn = document.querySelector('.play-pause i');



    listVideo.forEach(video => {
        video.onclick = () => {
            listVideo.forEach(vid => vid.classList.remove('active'));
            video.classList.add('active');
            if (video.classList.contains('active')) {
                let src = video.children[0].getAttribute('src');
                mainVideo.src = src;
                let text = video.children[1].innerHTML;
                title.innerHTML = text;

                progressBar.style.width = '0%';
                playPauseBtn.classList.replace('fa-pause', 'fa-play');
            };
        }
    })
}