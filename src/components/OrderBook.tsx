import { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';

interface Order {
  price: number;
  amount: number;
  total: number;
  encrypted: boolean;
}

export const OrderBook = ({ type }: { type: 'options' | 'futures' }) => {
  const [decrypted, setDecrypted] = useState(false);

  // Generate mock order data
  const generateOrders = (isBuy: boolean): Order[] => {
    const basePrice = 2450;
    const orders: Order[] = [];
    
    for (let i = 0; i < 8; i++) {
      const priceOffset = (i + 1) * 0.5 * (isBuy ? -1 : 1);
      const price = basePrice + priceOffset;
      const amount = Math.random() * 10 + 0.5;
      
      orders.push({
        price,
        amount,
        total: price * amount,
        encrypted: !decrypted
      });
    }
    
    return orders;
  };

  const buyOrders = generateOrders(true);
  const sellOrders = generateOrders(false);

  const formatValue = (value: number, encrypted: boolean) => {
    if (encrypted) {
      return '█'.repeat(8) + Math.random().toString(36).substring(2, 4);
    }
    return value.toFixed(2);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            {type === 'options' ? 'Options Book' : 'Futures Book'}
          </h3>
          <button
            onClick={() => setDecrypted(!decrypted)}
            className="flex items-center gap-2 px-3 py-1 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
          >
            {decrypted ? (
              <Unlock className="w-4 h-4 text-profit" />
            ) : (
              <Lock className="w-4 h-4 text-primary" />
            )}
            <span className="text-xs font-mono">
              {decrypted ? 'DECRYPTED' : 'ENCRYPTED'}
            </span>
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Headers */}
        <div className="grid grid-cols-3 gap-4 text-xs font-mono text-muted-foreground mb-2">
          <span>Price</span>
          <span className="text-center">Amount</span>
          <span className="text-right">Total</span>
        </div>

        {/* Sell Orders */}
        <div className="space-y-1 mb-4">
          {sellOrders.map((order, index) => (
            <div
              key={`sell-${index}`}
              className={`grid grid-cols-3 gap-4 text-sm font-mono py-1 px-2 rounded ${
                order.encrypted ? 'encrypted' : ''
              }`}
              style={{
                background: `linear-gradient(90deg, transparent, rgba(255, 0, 102, ${
                  order.encrypted ? 0.1 : 0.05
                }))`
              }}
            >
              <span className="text-loss">
                {formatValue(order.price, order.encrypted)}
              </span>
              <span className="text-center text-foreground">
                {formatValue(order.amount, order.encrypted)}
              </span>
              <span className="text-right text-muted-foreground">
                {formatValue(order.total, order.encrypted)}
              </span>
            </div>
          ))}
        </div>

        {/* Current Price */}
        <div className="py-2 px-2 mb-4 bg-gradient-holo rounded text-center">
          <span className="text-lg font-bold text-background">
            {decrypted ? '$2,450.00' : '████████'}
          </span>
        </div>

        {/* Buy Orders */}
        <div className="space-y-1">
          {buyOrders.map((order, index) => (
            <div
              key={`buy-${index}`}
              className={`grid grid-cols-3 gap-4 text-sm font-mono py-1 px-2 rounded ${
                order.encrypted ? 'encrypted' : ''
              }`}
              style={{
                background: `linear-gradient(90deg, transparent, rgba(0, 255, 136, ${
                  order.encrypted ? 0.1 : 0.05
                }))`
              }}
            >
              <span className="text-profit">
                {formatValue(order.price, order.encrypted)}
              </span>
              <span className="text-center text-foreground">
                {formatValue(order.amount, order.encrypted)}
              </span>
              <span className="text-right text-muted-foreground">
                {formatValue(order.total, order.encrypted)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};