import { Button } from '@/components/ui/button';
import { Logo } from './Logo';
import { Wallet, Shield, Lock } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = () => {
    // Simulate wallet connection
    const mockAddress = '0x' + Math.random().toString(16).substring(2, 10).toUpperCase() + '...';
    setWalletAddress(mockAddress);
    setWalletConnected(true);
  };

  return (
    <header className="border-b border-border bg-gradient-encrypted backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-profit" />
              <span className="text-muted-foreground">Fully Homomorphic Encryption</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-mono text-primary">SECURE</span>
            </div>

            {!walletConnected ? (
              <Button 
                onClick={connectWallet}
                className="bg-gradient-holo text-background font-semibold hover:opacity-90 transition-opacity"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary border border-border">
                <div className="w-2 h-2 rounded-full bg-profit animate-pulse" />
                <span className="font-mono text-sm text-foreground">{walletAddress}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-holo bg-clip-text text-transparent holo-shimmer">
            Confidential Derivatives with FHE
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Trade options and futures with complete privacy - orders remain encrypted until execution
          </p>
        </div>
      </div>
    </header>
  );
};