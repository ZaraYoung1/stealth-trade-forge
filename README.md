# Stealth Trade Forge

A next-generation encrypted derivatives platform powered by advanced cryptographic technologies. Experience truly private trading where your strategies remain confidential until execution.

## Core Capabilities

- **Zero-Knowledge Trading**: Execute trades without revealing your positions
- **Encrypted Order Matching**: Orders remain private until they meet
- **Confidential Derivatives**: Trade complex instruments with complete privacy
- **Multi-Chain Support**: Seamless integration with leading wallet providers
- **Advanced Analytics**: Private market insights without data exposure

## Architecture

- **Frontend**: Modern React with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Wallet Integration**: Multi-provider support via RainbowKit
- **Blockchain**: Ethereum Sepolia Testnet
- **Cryptography**: Advanced FHE implementation
- **Smart Contracts**: Solidity with encrypted computation

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
