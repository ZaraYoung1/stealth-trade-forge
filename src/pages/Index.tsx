import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TradingChart } from '@/components/TradingChart';
import { OrderBook } from '@/components/OrderBook';
import { OptionsChain } from '@/components/OptionsChain';
import { SecureTradingPanel } from '@/components/SecureTradingPanel';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Order Books */}
          <div className="lg:col-span-3 space-y-6">
            <OrderBook type="options" />
            <OrderBook type="futures" />
          </div>

          {/* Center Column - Chart and Options Chain */}
          <div className="lg:col-span-6 space-y-6">
            <TradingChart />
            <OptionsChain />
          </div>

          {/* Right Column - Secure Trading Panel */}
          <div className="lg:col-span-3">
            <SecureTradingPanel />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;