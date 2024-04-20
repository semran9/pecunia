// src/components/FirstPage.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactMic } from 'react-mic';

const FirstPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const history = useHistory();

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onData = (recordedData) => {
    // You can use this callback to handle the recorded audio data
    console.log('Recording data is captured', recordedData);
    setAudioData(recordedData);
  };

  const onStop = (recordedBlob) => {
    // You can use this callback to handle the recorded audio blob
    console.log('Recording is stopped', recordedBlob);
    setAudioData(recordedBlob);
  };

  const handleButtonClick = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
      history.push('/second', { audioData });
    }
  };

  return (
    <div>
      <h1>First Page</h1>
      <button onClick={handleButtonClick}>{isRecording ? 'Stop Recording' : 'Start Recording'}</button>
      {isRecording && <ReactMic record={isRecording} onData={onData} onStop={onStop} />}
    </div>
  );
};

export default FirstPage;
