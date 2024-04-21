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
