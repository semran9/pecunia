import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactMic } from 'react-mic';
import circularButtonImage from '/static_files\images\sexy_man.png'; // Import circular button image

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
        <button className="circular-button" onClick={handleButtonClick}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
          <img src={circularButtonImage} alt="Circular Button" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
        </button>
        <img
          src="overlay-image.png" // Replace with your overlay image path
          alt="Overlay Image"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
        {isRecording && <ReactMic record={isRecording} onData={onData} onStop={onStop} />}
      </div>
    </div>
  );
};

export default FirstPage;
