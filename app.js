document.addEventListener('DOMContentLoaded', function() {
    const video1 = document.getElementById('video1');
    const video2 = document.getElementById('video2');
    const audio = document.getElementById('audio');
    const displayText = document.getElementById('displayText');
    let isPlayingFirstVideo = true;

    video1.onended = function() {
        video1.pause();
        video1.currentTime = 0;
        video2.style.display = 'block';
        video2.play();
        audio.play();
        displayText.textContent = "Happy now? She is crying";
        isPlayingFirstVideo = false;
    };

    video2.onended = function() {
        video2.pause();
        video2.currentTime = 0;
        video1.style.display = 'block';
        video1.play();
        audio.pause();
        audio.currentTime = 0;
        displayText.textContent = "Don't hit the cherry";
        isPlayingFirstVideo = true;
    };

    window.playSecondVideoAndSound = function() {
        if (isPlayingFirstVideo) {
            video1.style.display = 'none';
            video2.style.display = 'block';
            video2.play();
            audio.play();
            displayText.textContent = "Happy now? She is crying";
            isPlayingFirstVideo = false;
        }
    };
});
