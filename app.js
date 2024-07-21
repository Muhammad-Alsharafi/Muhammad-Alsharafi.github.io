document.addEventListener('DOMContentLoaded', function() {
    const tabCherry = document.getElementById('tabCherry');
    const tabDuck = document.getElementById('tabDuck');
    const contentCherry = document.getElementById('contentCherry');
    const contentDuck = document.getElementById('contentDuck');

    tabCherry.addEventListener('click', function() {
        setActiveTab(tabCherry, contentCherry);
    });

    tabDuck.addEventListener('click', function() {
        setActiveTab(tabDuck, contentDuck);
    });

    function setActiveTab(tab, content) {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        content.classList.add('active');
    }

    const video1 = document.getElementById('video1');
    const video2 = document.getElementById('video2');
    const audioCherry = document.getElementById('audioCherry');
    const displayTextCherry = document.getElementById('displayTextCherry');
    let isPlayingFirstVideoCherry = true;

    video1.play();

    audioCherry.onended = function() {
        video2.style.display = 'none';
        video2.pause();
        video2.currentTime = 0;
        video1.style.display = 'block';
        video1.play();
        displayTextCherry.textContent = "Don't hit the cherry";
        isPlayingFirstVideoCherry = true;
    };

    video1.onclick = function() {
        if (isPlayingFirstVideoCherry) {
            video1.style.display = 'none';
            video2.style.display = 'block';
            video2.play();
            audioCherry.play();
            displayTextCherry.textContent = "Happy now? She is crying 😑";
            isPlayingFirstVideoCherry = false;
        }
    };

    const video3 = document.getElementById('video3');
    const video4 = document.getElementById('video4');
    const audioDuck = document.getElementById('audioDuck');
    const displayTextDuck = document.getElementById('displayTextDuck');
    let isPlayingFirstVideoDuck = true;

    video3.play();

    audioDuck.onended = function() {
        video4.style.display = 'none';
        video4.pause();
        video4.currentTime = 0;
        video3.style.display = 'block';
        video3.play();
        displayTextDuck.textContent = "Don't touch the duck, he is very tickly";
        isPlayingFirstVideoDuck = true;
    };

    video3.onclick = function() {
        if (isPlayingFirstVideoDuck) {
            video3.style.display = 'none';
            video4.style.display = 'block';
            video4.play();
            audioDuck.play();
            displayTextDuck.textContent = "Oh great! He is laughing now";
            isPlayingFirstVideoDuck = false;
        }
    };
});
