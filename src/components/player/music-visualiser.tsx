import React, { useEffect, useRef, useState } from "react";

export const MusicVisualizer: React.FC<{ audioSrc: string }> = ({
  audioSrc,
}) => {
  const audioRef = useRef(null);
  const [frequencyData, setFrequencyData] = useState(new Uint8Array(64));

  useEffect(() => {
    if (!audioRef.current) return;

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 128;

    const source = audioContext.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateFrequencyData = () => {
      analyser.getByteFrequencyData(dataArray);
      setFrequencyData([...dataArray]);
      requestAnimationFrame(updateFrequencyData);
    };

    updateFrequencyData();

    return () => {
      audioContext.close();
    };
  }, [audioSrc]);

  return (
    <div>
      <audio ref={audioRef} src={audioSrc} controls />
      <div style={{ display: "flex" }}>
        {frequencyData.map((value, index) => (
          <div
            key={index}
            style={{
              width: "10px",
              height: `${value}px`,
              background: "blue",
              margin: "1px",
              transition: "height 0.1s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MusicVisualizer;
