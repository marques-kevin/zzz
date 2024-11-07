import React, { useRef, useEffect } from "react";

export const WaveVisualizer: React.FC<{
  audioRef: React.RefObject<HTMLAudioElement>;
}> = ({ audioRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current || !canvasRef.current) return;

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    const source = audioContext.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    const dataArray = new Uint8Array(analyser.fftSize);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawWave = () => {
      analyser.getByteTimeDomainData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "blue";

      ctx.beginPath();

      const sliceWidth = canvas.width / dataArray.length;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
      requestAnimationFrame(drawWave);
    };

    drawWave();

    return () => {
      audioContext.close();
    };
  }, [audioRef]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        style={{ border: "1px solid black" }}
      />
    </div>
  );
};

export default WaveVisualizer;
