document.addEventListener('DOMContentLoaded', () => {
    customControls();
    selectFromList();
})

const customControls = () => {

    const container = document.querySelector('.video-container');
    const video = container.querySelector('video');
    const progressBar = container.querySelector('.progress-bar');
    const playPauseBtn = container.querySelector('.play-pause i');
    const skipBackward = container.querySelector('.skip-backward i');
    const skipForward = container.querySelector('.skip-forward i');

    //Move progress bar
    video.addEventListener('timeupdate', e => {
        let { currentTime, duration } = e.target;
        let percent = (currentTime / duration) * 100;
        progressBar.style.width = `${percent}%`;
    })


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

    skipBackward.addEventListener('click', () => skipBackwardFunc());
    skipForward.addEventListener('click', () => skipForwardFunc());

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

    listVideo.forEach(video => {
        video.onclick = () => {
            listVideo.forEach(vid => vid.classList.remove('active'));
            video.classList.add('active');
            if (video.classList.contains('active')) {
                let src = video.children[0].getAttribute('src');
                mainVideo.src = src;
                let text = video.children[1].innerHTML;
                title.innerHTML = text;
            };
        }
    })
}