let mediaRecorder;
let audioChunks = [];
navigator.mediaDevices.getUserMedia({ audio: true })
.then(stream => {
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = event => {
    audioChunks.push(event.data);
    };

    const recordButton = document.getElementById('recordBtn');
    recordButton.onclick = () => {
    if (mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        window.location = 'results';
    } else {
        mediaRecorder.start();
        // recordButton.textContent = 'Stop'; REPLACE WITH REGULAR MIC
        audioChunks = [];
    }
    };

    mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const formData = new FormData();
    formData.append('audioData', audioBlob);
    fetch('/upload', {
        method: 'POST',
        body: formData,
    }).then(response => response.text()).then(data => console.log(data));
    };
});


document.addEventListener('DOMContentLoaded', function() {
    const recordButton = document.getElementById('recordBtn');
    const microphoneImage = document.querySelector('.microphone');

    // Track if the button has been clicked once
    let isFirstClick = true;

    // Define the paths for the images
    const micImage = 'images/mic.png';
    const stopImage = 'images/osaka-spin.gif';
    const loadImage = 'images/red_mic.png';

    // Function to toggle between images
    function toggleImage() {
        if (isFirstClick) {
            microphoneImage.src = loadImage;
            isFirstClick = false; // Set isFirstClick to false
        } else {
            microphoneImage.src = stopImage;
            recordButton.disabled = true; // Disable the button
        }
    }

    // Add click event listener to the button
    recordButton.addEventListener('click', toggleImage);
});
