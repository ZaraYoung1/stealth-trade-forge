import { useEffect, useState } from 'react';

interface TickerItem {
  symbol: string;
  strike: number;
  type: 'CALL' | 'PUT';
  expiry: string;
  bid: number;
  ask: number;
  iv: number;
  encrypted: boolean;
}

export const Footer = () => {
  const [tickerItems, setTickerItems] = useState<TickerItem[]>([]);

  useEffect(() => {
    // Generate mock ticker data
    const generateTicker = (): TickerItem[] => {
      const items: TickerItem[] = [];
      const symbols = ['ETH', 'BTC', 'SOL', 'AVAX'];
      const currentDate = new Date();
      
      for (let i = 0; i < 20; i++) {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const basePrice = symbol === 'BTC' ? 45000 : symbol === 'ETH' ? 2450 : symbol === 'SOL' ? 100 : 60;
        const strike = basePrice + (Math.floor(Math.random() * 10) - 5) * (basePrice * 0.01);
        
        items.push({
          symbol,
          strike,
          type: Math.random() > 0.5 ? 'CALL' : 'PUT',
          expiry: new Date(currentDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          bid: Math.random() * 100,
          ask: Math.random() * 100 + 5,
          iv: 20 + Math.random() * 40,
          encrypted: Math.random() > 0.3
        });
      }
      
      return items;
    };

    setTickerItems(generateTicker());
    
    // Update ticker periodically
    const interval = setInterval(() => {
      setTickerItems(generateTicker());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const formatValue = (value: number | string, encrypted: boolean) => {
    if (encrypted) {
      return '████';
    }
    return typeof value === 'number' ? value.toFixed(2) : value;
  };

  return (
    <footer className="border-t border-border bg-gradient-encrypted backdrop-blur-xl overflow-hidden">
      <div className="py-3 relative">
        <div className="flex ticker-scroll">
          {/* Duplicate items for seamless loop */}
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-4 whitespace-nowrap ${
                item.encrypted ? 'encrypted' : ''
              }`}
            >
              <span className="font-mono text-sm font-semibold text-foreground">
                {item.symbol}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded ${
                item.type === 'CALL' 
                  ? 'bg-gradient-profit text-background' 
                  : 'bg-gradient-loss text-background'
              }`}>
                {item.type}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                ${formatValue(item.strike, item.encrypted)}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {item.expiry}
              </span>
              <span className="font-mono text-xs text-profit">
                B:{formatValue(item.bid, item.encrypted)}
              </span>
              <span className="font-mono text-xs text-loss">
                A:{formatValue(item.ask, item.encrypted)}
              </span>
              <span className="font-mono text-xs text-primary">
                IV:{formatValue(item.iv, item.encrypted)}%
              </span>
              <span className="text-muted-foreground">•</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-profit animate-pulse" />
              <span className="text-xs text-muted-foreground">
                All orders encrypted with Fully Homomorphic Encryption (FHE)
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Documentation</a>
              <a href="#" className="hover:text-primary transition-colors">API</a>
              <a href="#" className="hover:text-primary transition-colors">Security</a>
              <a href="#" className="hover:text-primary transition-colors">Audit Reports</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};