import { useEffect, useRef } from 'react';

export const Logo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let morphProgress = 0;
    let direction = 1;

    const draw = () => {
      ctx.clearRect(0, 0, 60, 60);

      // Gradient for the logo
      const gradient = ctx.createLinearGradient(0, 0, 60, 60);
      gradient.addColorStop(0, '#00ffcc');
      gradient.addColorStop(0.5, '#9945ff');
      gradient.addColorStop(1, '#00ffcc');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00ffcc';

      // Morph between candlestick and lock
      if (morphProgress < 0.5) {
        // Draw candlestick
        const candleProgress = 1 - (morphProgress * 2);
        ctx.globalAlpha = candleProgress;
        
        // Candlestick body
        ctx.fillStyle = gradient;
        ctx.fillRect(25, 20, 10, 20);
        
        // Candlestick wicks
        ctx.beginPath();
        ctx.moveTo(30, 15);
        ctx.lineTo(30, 20);
        ctx.moveTo(30, 40);
        ctx.lineTo(30, 45);
        ctx.stroke();
      } else {
        // Draw lock
        const lockProgress = (morphProgress - 0.5) * 2;
        ctx.globalAlpha = lockProgress;
        
        // Lock body
        ctx.fillStyle = gradient;
        ctx.fillRect(20, 30, 20, 20);
        
        // Lock shackle
        ctx.beginPath();
        ctx.arc(30, 30, 8, Math.PI, 0, false);
        ctx.stroke();
        
        // Keyhole
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(30, 38, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      // Update morph progress
      morphProgress += 0.01 * direction;
      if (morphProgress >= 1 || morphProgress <= 0) {
        direction *= -1;
      }

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-3">
      <canvas 
        ref={canvasRef} 
        width={60} 
        height={60}
        className="w-12 h-12"
      />
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-holo bg-clip-text text-transparent">
          CryptoVault
        </span>
        <span className="text-xs text-muted-foreground font-mono">FHE Exchange</span>
      </div>
    </div>
  );
};