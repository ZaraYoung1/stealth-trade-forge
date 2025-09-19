import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Zap, Lock } from 'lucide-react';
import { toast } from 'sonner';

export const TradingPanel = () => {
  const [orderType, setOrderType] = useState<'market' | 'limit'>('limit');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [leverage, setLeverage] = useState('1');

  const handleSubmitOrder = () => {
    if (!amount || (orderType === 'limit' && !price)) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success(
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Order Encrypted & Submitted</span>
        <span className="text-xs text-muted-foreground">
          Your {side} order is protected by FHE encryption
        </span>
      </div>
    );
    
    // Reset form
    setAmount('');
    setPrice('');
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Place Order</h3>
      </div>

      <div className="p-4">
        <Tabs defaultValue="spot" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary">
            <TabsTrigger value="spot">Spot</TabsTrigger>
            <TabsTrigger value="futures">Futures</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
          </TabsList>

          <TabsContent value="spot" className="space-y-4">
            {/* Order Type Selection */}
            <div className="flex gap-2">
              <Button
                variant={side === 'buy' ? 'default' : 'outline'}
                onClick={() => setSide('buy')}
                className={side === 'buy' ? 'bg-gradient-profit text-background' : ''}
                size="sm"
              >
                Buy
              </Button>
              <Button
                variant={side === 'sell' ? 'default' : 'outline'}
                onClick={() => setSide('sell')}
                className={side === 'sell' ? 'bg-gradient-loss text-background' : ''}
                size="sm"
              >
                Sell
              </Button>
            </div>

            {/* Order Type */}
            <div className="flex gap-2">
              <Button
                variant={orderType === 'limit' ? 'secondary' : 'outline'}
                onClick={() => setOrderType('limit')}
                size="sm"
                className="flex-1"
              >
                Limit
              </Button>
              <Button
                variant={orderType === 'market' ? 'secondary' : 'outline'}
                onClick={() => setOrderType('market')}
                size="sm"
                className="flex-1"
              >
                Market
              </Button>
            </div>

            {/* Price Input (for limit orders) */}
            {orderType === 'limit' && (
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm text-muted-foreground">
                  Price (USDC)
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="font-mono bg-secondary border-border"
                />
              </div>
            )}

            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm text-muted-foreground">
                Amount (ETH)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="font-mono bg-secondary border-border"
              />
            </div>

            {/* Total */}
            <div className="p-3 rounded-md bg-secondary/50 border border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-mono font-semibold text-foreground">
                  {amount && price ? (parseFloat(amount) * parseFloat(price)).toFixed(2) : '0.00'} USDC
                </span>
              </div>
            </div>

            {/* Encryption Status */}
            <div className="flex items-center gap-2 p-3 rounded-md bg-gradient-encrypted border border-primary/20">
              <Lock className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">
                Order will be encrypted using FHE until execution
              </span>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmitOrder}
              className={`w-full font-semibold ${
                side === 'buy' 
                  ? 'bg-gradient-profit hover:opacity-90' 
                  : 'bg-gradient-loss hover:opacity-90'
              } text-background transition-opacity`}
            >
              <Shield className="w-4 h-4 mr-2" />
              {side === 'buy' ? 'Encrypted Buy' : 'Encrypted Sell'}
            </Button>
          </TabsContent>

          <TabsContent value="futures" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="leverage" className="text-sm text-muted-foreground">
                Leverage
              </Label>
              <div className="flex gap-2">
                {['1', '2', '5', '10', '20'].map((lev) => (
                  <Button
                    key={lev}
                    variant={leverage === lev ? 'secondary' : 'outline'}
                    onClick={() => setLeverage(lev)}
                    size="sm"
                    className="flex-1"
                  >
                    {lev}x
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="text-center text-muted-foreground py-8">
              <Zap className="w-12 h-12 mx-auto mb-2 text-primary" />
              <p className="text-sm">Futures trading with encrypted orders</p>
              <p className="text-xs mt-1">Connect wallet to start trading</p>
            </div>
          </TabsContent>

          <TabsContent value="options" className="space-y-4">
            <div className="text-center text-muted-foreground py-8">
              <Shield className="w-12 h-12 mx-auto mb-2 text-primary" />
              <p className="text-sm">Options trading with complete privacy</p>
              <p className="text-xs mt-1">All strategies remain confidential</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};