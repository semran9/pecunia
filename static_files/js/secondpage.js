import React, { useState, useEffect } from 'react';

const SecondPage = ({ location }) => {
  const [transcription, setTranscription] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Initial loading state is true

  useEffect(() => {
    // Simulating transcription process with a timeout
    const timeout = setTimeout(() => {
      // Assuming the transcription data is received from the location prop
      const { audioData } = location.state;
      const transcribedText = transcribeAudio(audioData);
      setTranscription(transcribedText);
      setIsLoading(false); // Set loading state to false after transcription
    }, 3000); // Simulating a 3-second transcription process

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, [location.state]);

  const transcribeAudio = (audioData) => {
    // Simulated transcription function
    // Replace this with your actual transcription logic
    return 'This is the transcribed text from the audio recording.';
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Second Page</h1>
      {isLoading ? (
        <div style={{ height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Loading...</p>
          <img href="./osaka-spin.gif"></img>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h2>Transcription:</h2>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
};

export default SecondPage;
