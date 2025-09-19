import { useEffect, useRef } from 'react';

interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  timestamp: number;
}

export const TradingChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Generate mock candle data
    const generateCandles = (): Candle[] => {
      const candles: Candle[] = [];
      let lastPrice = 100;
      
      for (let i = 0; i < 50; i++) {
        const volatility = Math.random() * 4;
        const trend = Math.random() > 0.5 ? 1 : -1;
        const open = lastPrice;
        const close = open + (Math.random() * volatility * trend);
        const high = Math.max(open, close) + Math.random() * 2;
        const low = Math.min(open, close) - Math.random() * 2;
        
        candles.push({
          open,
          high,
          low,
          close,
          volume: Math.random() * 1000000,
          timestamp: Date.now() - (50 - i) * 3600000
        });
        
        lastPrice = close;
      }
      
      return candles;
    };

    const candles = generateCandles();
    const width = canvas.width;
    const height = canvas.height;
    const candleWidth = width / candles.length;
    
    // Find price range
    const prices = candles.flatMap(c => [c.high, c.low]);
    const minPrice = Math.min(...prices) * 0.98;
    const maxPrice = Math.max(...prices) * 1.02;
    const priceRange = maxPrice - minPrice;
    
    // Clear canvas
    ctx.fillStyle = '#050911';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = 'rgba(30, 41, 59, 0.3)';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i <= 10; i++) {
      const y = (height / 10) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw candles with holographic effect
    candles.forEach((candle, index) => {
      const x = index * candleWidth;
      const candleBodyWidth = candleWidth * 0.6;
      const wickX = x + candleWidth / 2;
      
      // Calculate positions
      const openY = height - ((candle.open - minPrice) / priceRange) * height;
      const closeY = height - ((candle.close - minPrice) / priceRange) * height;
      const highY = height - ((candle.high - minPrice) / priceRange) * height;
      const lowY = height - ((candle.low - minPrice) / priceRange) * height;
      
      const isGreen = candle.close > candle.open;
      
      // Create holographic gradient
      const gradient = ctx.createLinearGradient(x, 0, x + candleBodyWidth, height);
      if (isGreen) {
        gradient.addColorStop(0, '#00ff88');
        gradient.addColorStop(0.5, '#00ffcc');
        gradient.addColorStop(1, '#00ff88');
      } else {
        gradient.addColorStop(0, '#ff0066');
        gradient.addColorStop(0.5, '#ff3366');
        gradient.addColorStop(1, '#ff0066');
      }
      
      // Draw wick with glow
      ctx.shadowBlur = isGreen ? 10 : 8;
      ctx.shadowColor = isGreen ? '#00ffcc' : '#ff0066';
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(wickX, highY);
      ctx.lineTo(wickX, lowY);
      ctx.stroke();
      
      // Draw candle body with holographic effect
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.8;
      ctx.fillRect(
        x + (candleWidth - candleBodyWidth) / 2,
        Math.min(openY, closeY),
        candleBodyWidth,
        Math.abs(closeY - openY) || 1
      );
      
      // Add shimmer effect on hover position
      if (index === Math.floor(candles.length / 2)) {
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(
          x + (candleWidth - candleBodyWidth) / 2 - 2,
          Math.min(openY, closeY) - 2,
          candleBodyWidth + 4,
          Math.abs(closeY - openY) + 4 || 1
        );
      }
      
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    });
    
    // Draw price labels
    ctx.fillStyle = '#64748b';
    ctx.font = '10px JetBrains Mono';
    for (let i = 0; i <= 5; i++) {
      const price = minPrice + (priceRange / 5) * i;
      const y = height - ((price - minPrice) / priceRange) * height;
      ctx.fillText(price.toFixed(2), width - 50, y);
    }

  }, []);

  return (
    <div className="bg-card rounded-lg border border-border p-4 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">ETH/USDC</h3>
        <div className="flex items-center gap-4">
          <span className="text-sm font-mono text-muted-foreground">24H Volume:</span>
          <span className="text-sm font-mono text-profit">$2.4M</span>
        </div>
      </div>
      <canvas 
        ref={canvasRef}
        width={800}
        height={400}
        className="w-full h-auto rounded"
      />
      <div className="mt-4 flex justify-center gap-6 text-xs font-mono">
        <span className="text-muted-foreground">1m</span>
        <span className="text-muted-foreground">5m</span>
        <span className="text-muted-foreground">15m</span>
        <span className="text-primary border-b-2 border-primary pb-1">1H</span>
        <span className="text-muted-foreground">4H</span>
        <span className="text-muted-foreground">1D</span>
      </div>
    </div>
  );
};