document.addEventListener('DOMContentLoaded', function() {
    const video1 = document.getElementById('video1');
    const video2 = document.getElementById('video2');
    const audio = document.getElementById('audio');
    const displayText = document.getElementById('displayText');
    let isPlayingFirstVideo = true;

    // Ensure video1 autoplays and loops on page load
    video1.play().catch((error) => {
        console.error('Error playing video1:', error);
    });

    audio.onended = function() {
        video2.style.display = 'none';
        video2.pause();
        video2.currentTime = 0;
        video1.style.display = 'block';
        video1.play();
        displayText.textContent = "Don't hit the cherry";
        isPlayingFirstVideo = true;
    };

    video1.onclick = function() {
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
