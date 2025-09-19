# Stealth Trade Forge

A revolutionary encrypted derivatives exchange built with Fully Homomorphic Encryption (FHE) technology. Trade options and futures with complete privacy - order books remain encrypted until execution.

## Features

- **Fully Homomorphic Encryption**: All trading data remains encrypted during computation
- **Private Order Books**: Orders are encrypted until matching occurs
- **Real-time Trading**: Execute trades with complete privacy
- **Multi-wallet Support**: Connect with Rainbow, MetaMask, and other popular wallets
- **Secure Derivatives**: Trade options and futures with encrypted positions

## Technology Stack

- **Frontend**: React, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **Blockchain**: Ethereum Sepolia Testnet
- **Encryption**: Zama FHE (Fully Homomorphic Encryption)
- **Smart Contracts**: Solidity with FHE support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ZaraYoung1/stealth-trade-forge.git
cd stealth-trade-forge
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

### Environment Variables

Create a `.env` file with the following variables:

```env
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
```

## Smart Contract

The project includes a Solidity smart contract (`StealthTradeForge.sol`) that implements:

- Encrypted order management
- Private position tracking
- Secure trade execution
- FHE-based computations

### Contract Features

- **Order Management**: Create, match, and execute encrypted orders
- **Position Tracking**: Open and close encrypted positions
- **Trade Execution**: Secure trade matching with FHE
- **Balance Management**: Encrypted trader balances
- **Reputation System**: Encrypted trader reputation scores

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # React components
├── lib/                # Utility functions and configurations
├── hooks/              # Custom React hooks
├── pages/              # Page components
└── main.tsx           # Application entry point

contracts/
└── StealthTradeForge.sol  # Smart contract
```

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider

## Security

This project implements state-of-the-art privacy features:

- **FHE Encryption**: All sensitive data remains encrypted
- **Zero-Knowledge Proofs**: Verify trades without revealing details
- **Secure Matching**: Orders are matched without exposing information
- **Private Balances**: Account balances are encrypted

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue on GitHub or contact the development team.
