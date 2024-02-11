document.addEventListener('DOMContentLoaded', () => {
    customControls();
    selectFromList();
})

const customControls = () =>{

    const container = document.querySelector('.video-container');
    const video = container.querySelector('video');
    const playPauseBtn = container.querySelector('.play-pause i');

    playPauseBtn.addEventListener('click', () => {
        video.paused ? video.play() : video.pause();
    })
    
    video.addEventListener('click', () => {
        video.paused ? video.play() : video.pause();
    })

    video.addEventListener('play', () => {
        playPauseBtn.classList.replace('fa-play', 'fa-pause');
    })
    
    video.addEventListener('pause', () => {
        playPauseBtn.classList.replace('fa-pause', 'fa-play');
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
            if(video.classList.contains('active')){
                let src = video.children[0].getAttribute('src');
                mainVideo.src = src;
                let text = video.children[1].innerHTML;
                title.innerHTML = text;
            };
        }
    })
}