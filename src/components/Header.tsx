import { Button } from '@/components/ui/button';
import { Logo } from './Logo';
import { Wallet, Shield, Lock } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export const Header = () => {
  const { isConnected, address } = useAccount();

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

            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === 'authenticated');

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': 'true',
                      style: {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <Button 
                            onClick={openConnectModal}
                            className="bg-gradient-holo text-background font-semibold hover:opacity-90 transition-opacity"
                          >
                            <Wallet className="w-4 h-4 mr-2" />
                            Connect Wallet
                          </Button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <Button onClick={openChainModal} variant="destructive">
                            Wrong network
                          </Button>
                        );
                      }

                      return (
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={openChainModal}
                            className="flex items-center gap-2 px-3 py-2 rounded-md bg-secondary border border-border"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 12,
                                  height: 12,
                                  borderRadius: 999,
                                  overflow: 'hidden',
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    style={{ width: 12, height: 12 }}
                                  />
                                )}
                              </div>
                            )}
                            {chain.name}
                          </Button>

                          <Button
                            onClick={openAccountModal}
                            className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary border border-border"
                          >
                            <div className="w-2 h-2 rounded-full bg-profit animate-pulse" />
                            <span className="font-mono text-sm text-foreground">
                              {account.displayName}
                            </span>
                          </Button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-holo bg-clip-text text-transparent holo-shimmer">
            Stealth Trade Forge
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Trade options and futures with complete privacy - orders remain encrypted until execution
          </p>
        </div>
      </div>
    </header>
  );
};