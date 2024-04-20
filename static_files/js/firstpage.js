// src/components/FirstPage.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactMic } from 'react-mic';

const FirstPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [buttonColor, setButtonColor] = useState('white');
  const [audioData, setAudioData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    let timeout;
    if (buttonColor === 'green') {
      timeout = setTimeout(() => {
        history.push('/second', { audioData });
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [buttonColor, history, audioData]);

  const startRecording = () => {
    setIsRecording(true);
    setButtonColor('red');
  };

  const stopRecording = () => {
    setIsRecording(false);
    setButtonColor('green');
  };

  const onData = (recordedData) => {
    console.log('Recording data is captured', recordedData);
    setAudioData(recordedData);
  };

  const onStop = (recordedBlob) => {
    console.log('Recording is stopped', recordedBlob);
    setAudioData(recordedBlob);
  };

  const handleButtonClick = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  return (
    <div>
      <img src="top-image.png" alt="Top Image" className="top-image" />
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button
          style={{ backgroundColor: buttonColor, color: 'black', position: 'relative', zIndex: 1 }}
          onClick={handleButtonClick}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <img
          src="overlay-image.png" // Replace with your overlay image path
          alt="Overlay Image"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
        />
        {isRecording && <ReactMic record={isRecording} onData={onData} onStop={onStop} />}
      </div>
    </div>
  );
};

export default FirstPage;