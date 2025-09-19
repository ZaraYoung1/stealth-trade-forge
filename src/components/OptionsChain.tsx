import { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface OptionData {
  strike: number;
  callBid: number;
  callAsk: number;
  callVolume: number;
  putBid: number;
  putAsk: number;
  putVolume: number;
  encrypted: boolean;
}

export const OptionsChain = () => {
  const [selectedExpiry, setSelectedExpiry] = useState('2024-01-26');
  
  // Generate mock options chain data
  const generateOptionsChain = (): OptionData[] => {
    const currentPrice = 2450;
    const options: OptionData[] = [];
    
    for (let i = -5; i <= 5; i++) {
      const strike = currentPrice + (i * 50);
      options.push({
        strike,
        callBid: Math.max(0, (currentPrice - strike) + Math.random() * 20),
        callAsk: Math.max(0, (currentPrice - strike) + Math.random() * 25),
        callVolume: Math.floor(Math.random() * 1000),
        putBid: Math.max(0, (strike - currentPrice) + Math.random() * 20),
        putAsk: Math.max(0, (strike - currentPrice) + Math.random() * 25),
        putVolume: Math.floor(Math.random() * 1000),
        encrypted: Math.random() > 0.5
      });
    }
    
    return options;
  };

  const optionsData = generateOptionsChain();

  const formatValue = (value: number | string, encrypted: boolean) => {
    if (encrypted) {
      return <span className="encrypted">███.██</span>;
    }
    return typeof value === 'number' ? value.toFixed(2) : value;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Options Chain</h3>
          <select 
            value={selectedExpiry}
            onChange={(e) => setSelectedExpiry(e.target.value)}
            className="px-3 py-1 rounded-md bg-secondary text-foreground text-sm font-mono border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="2024-01-26">Jan 26, 2024</option>
            <option value="2024-02-02">Feb 02, 2024</option>
            <option value="2024-02-09">Feb 09, 2024</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th colSpan={4} className="px-4 py-2 text-center bg-gradient-profit/10">
                <div className="flex items-center justify-center gap-2 text-profit">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">CALLS</span>
                </div>
              </th>
              <th className="px-4 py-2 bg-secondary">
                <span className="text-sm font-mono text-muted-foreground">STRIKE</span>
              </th>
              <th colSpan={4} className="px-4 py-2 text-center bg-gradient-loss/10">
                <div className="flex items-center justify-center gap-2 text-loss">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-sm font-semibold">PUTS</span>
                </div>
              </th>
            </tr>
            <tr className="text-xs font-mono text-muted-foreground">
              <th className="px-2 py-2 text-left">Volume</th>
              <th className="px-2 py-2 text-right">Bid</th>
              <th className="px-2 py-2 text-right">Ask</th>
              <th className="px-2 py-2 text-right">IV</th>
              <th className="px-2 py-2 text-center bg-secondary"></th>
              <th className="px-2 py-2 text-left">IV</th>
              <th className="px-2 py-2 text-left">Bid</th>
              <th className="px-2 py-2 text-left">Ask</th>
              <th className="px-2 py-2 text-right">Volume</th>
            </tr>
          </thead>
          <tbody>
            {optionsData.map((option, index) => {
              const isATM = index === Math.floor(optionsData.length / 2);
              return (
                <tr
                  key={option.strike}
                  className={`border-b border-border/50 hover:bg-secondary/20 transition-colors ${
                    isATM ? 'bg-gradient-holo/5' : ''
                  }`}
                >
                  <td className="px-2 py-2 text-xs font-mono text-muted-foreground">
                    {formatValue(option.callVolume, false)}
                  </td>
                  <td className="px-2 py-2 text-sm font-mono text-profit text-right">
                    {formatValue(option.callBid, option.encrypted)}
                  </td>
                  <td className="px-2 py-2 text-sm font-mono text-profit text-right">
                    {formatValue(option.callAsk, option.encrypted)}
                  </td>
                  <td className="px-2 py-2 text-xs font-mono text-muted-foreground text-right">
                    {formatValue((20 + Math.random() * 10), option.encrypted)}%
                  </td>
                  <td className={`px-2 py-2 text-center font-mono font-bold ${
                    isATM ? 'text-primary bg-gradient-holo/10' : 'text-foreground bg-secondary'
                  }`}>
                    {option.strike}
                  </td>
                  <td className="px-2 py-2 text-xs font-mono text-muted-foreground">
                    {formatValue((20 + Math.random() * 10), option.encrypted)}%
                  </td>
                  <td className="px-2 py-2 text-sm font-mono text-loss">
                    {formatValue(option.putBid, option.encrypted)}
                  </td>
                  <td className="px-2 py-2 text-sm font-mono text-loss">
                    {formatValue(option.putAsk, option.encrypted)}
                  </td>
                  <td className="px-2 py-2 text-xs font-mono text-muted-foreground text-right">
                    {formatValue(option.putVolume, false)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};