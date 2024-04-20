// src/components/FirstPage.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactMic } from 'react-mic';

const FirstPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [buttonColor, setButtonColor] = useState('red');
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
      <h1>First Page</h1>
      <button style={{ backgroundColor: buttonColor }} onClick={handleButtonClick}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {isRecording && <ReactMic record={isRecording} onData={onData} onStop={onStop} />}
    </div>
  );
};

export default FirstPage;
