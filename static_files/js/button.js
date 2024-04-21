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
        recordButton.textContent = 'Record';
    } else {
        mediaRecorder.start();
        recordButton.textContent = 'Stop';
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