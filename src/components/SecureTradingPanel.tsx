import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStealthTradeContract } from '@/hooks/useContract';
import { useAccount } from 'wagmi';
import { TrendingUp, TrendingDown, Lock, Eye } from 'lucide-react';
import { toast } from 'sonner';

export const SecureTradingPanel = () => {
  const { address, isConnected } = useAccount();
  const { createOrder, openPosition, closePosition, isPending } = useStealthTradeContract();
  
  const [orderForm, setOrderForm] = useState({
    symbol: '',
    quantity: '',
    price: '',
    orderType: 'buy' as 'buy' | 'sell'
  });
  
  const [positionForm, setPositionForm] = useState({
    symbol: '',
    quantity: '',
    entryPrice: '',
    positionType: 'long' as 'long' | 'short'
  });

  const handleCreateOrder = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      const hash = await createOrder(
        orderForm.symbol,
        orderForm.quantity,
        orderForm.price,
        orderForm.orderType
      );
      
      toast.success(`Order created successfully! Hash: ${hash}`);
      
      // Reset form
      setOrderForm({
        symbol: '',
        quantity: '',
        price: '',
        orderType: 'buy'
      });
    } catch (error) {
      toast.error('Failed to create order');
      console.error(error);
    }
  };

  const handleOpenPosition = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      const hash = await openPosition(
        positionForm.symbol,
        positionForm.quantity,
        positionForm.entryPrice,
        positionForm.positionType
      );
      
      toast.success(`Position opened successfully! Hash: ${hash}`);
      
      // Reset form
      setPositionForm({
        symbol: '',
        quantity: '',
        entryPrice: '',
        positionType: 'long'
      });
    } catch (error) {
      toast.error('Failed to open position');
      console.error(error);
    }
  };

  if (!isConnected) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Secure Trading Panel
          </CardTitle>
          <CardDescription>
            Connect your wallet to access encrypted trading features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Lock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Wallet connection required for secure trading
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Order Creation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Create Encrypted Order
          </CardTitle>
          <CardDescription>
            Create orders with encrypted data using FHE technology
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="symbol">Symbol</Label>
              <Input
                id="symbol"
                placeholder="BTC-USD"
                value={orderForm.symbol}
                onChange={(e) => setOrderForm({ ...orderForm, symbol: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="orderType">Type</Label>
              <Select
                value={orderForm.orderType}
                onValueChange={(value: 'buy' | 'sell') => 
                  setOrderForm({ ...orderForm, orderType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="1.0"
                value={orderForm.quantity}
                onChange={(e) => setOrderForm({ ...orderForm, quantity: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="50000"
                value={orderForm.price}
                onChange={(e) => setOrderForm({ ...orderForm, price: e.target.value })}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleCreateOrder}
            disabled={isPending || !orderForm.symbol || !orderForm.quantity || !orderForm.price}
            className="w-full"
          >
            {isPending ? 'Creating...' : 'Create Encrypted Order'}
          </Button>
        </CardContent>
      </Card>

      {/* Position Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            Open Position
          </CardTitle>
          <CardDescription>
            Open encrypted positions with private data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="posSymbol">Symbol</Label>
              <Input
                id="posSymbol"
                placeholder="ETH-USD"
                value={positionForm.symbol}
                onChange={(e) => setPositionForm({ ...positionForm, symbol: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="positionType">Position</Label>
              <Select
                value={positionForm.positionType}
                onValueChange={(value: 'long' | 'short') => 
                  setPositionForm({ ...positionForm, positionType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="long">Long</SelectItem>
                  <SelectItem value="short">Short</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="posQuantity">Quantity</Label>
              <Input
                id="posQuantity"
                type="number"
                placeholder="1.0"
                value={positionForm.quantity}
                onChange={(e) => setPositionForm({ ...positionForm, quantity: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="entryPrice">Entry Price</Label>
              <Input
                id="entryPrice"
                type="number"
                placeholder="3000"
                value={positionForm.entryPrice}
                onChange={(e) => setPositionForm({ ...positionForm, entryPrice: e.target.value })}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleOpenPosition}
            disabled={isPending || !positionForm.symbol || !positionForm.quantity || !positionForm.entryPrice}
            className="w-full"
          >
            {isPending ? 'Opening...' : 'Open Encrypted Position'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
