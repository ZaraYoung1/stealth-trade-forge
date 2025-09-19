# Vercel Deployment Guide for Stealth Trade Forge

This guide provides step-by-step instructions for deploying Stealth Trade Forge to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Environment variables ready

## Step-by-Step Deployment

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"

### 2. Import GitHub Repository

1. In the "Import Git Repository" section, search for `ZaraYoung1/stealth-trade-forge`
2. Click "Import" next to the repository
3. Vercel will automatically detect it as a Vite project

### 3. Configure Project Settings

#### Build Settings
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Add the following environment variables in the Vercel dashboard:

```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
```

### 4. Deploy

1. Click "Deploy" to start the deployment process
2. Wait for the build to complete (usually 2-3 minutes)
3. Your app will be available at the provided Vercel URL

### 5. Custom Domain (Optional)

1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate to be issued

## Environment Variables Configuration

### Required Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_CHAIN_ID` | `11155111` | Ethereum Sepolia Testnet Chain ID |
| `VITE_RPC_URL` | `https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990` | RPC endpoint for Sepolia |
| `VITE_WALLET_CONNECT_PROJECT_ID` | `2ec9743d0d0cd7fb94dee1a7e6d33475` | WalletConnect project ID |

### Optional Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_INFURA_API_KEY` | `b18fb7e6ca7045ac83c41157ab93f990` | Infura API key for additional RPC calls |
| `VITE_APP_NAME` | `Stealth Trade Forge` | Application name |
| `VITE_APP_DESCRIPTION` | `Encrypted Derivatives Exchange` | Application description |

## Build Configuration

### Vercel Configuration File

Create a `vercel.json` file in the project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "env": {
    "VITE_CHAIN_ID": "11155111",
    "VITE_RPC_URL": "https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990",
    "VITE_WALLET_CONNECT_PROJECT_ID": "2ec9743d0d0cd7fb94dee1a7e6d33475"
  }
}
```

## Deployment Checklist

- [ ] Repository connected to Vercel
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] Build successful
- [ ] Application accessible
- [ ] Wallet connection working
- [ ] Custom domain configured (if applicable)

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Environment Variables Not Working**
   - Ensure variables start with `VITE_`
   - Redeploy after adding new variables
   - Check variable names for typos

3. **Wallet Connection Issues**
   - Verify WalletConnect project ID
   - Check RPC URL is accessible
   - Ensure correct chain ID

4. **Network Issues**
   - Verify Sepolia testnet configuration
   - Check RPC endpoint availability
   - Ensure wallet is connected to Sepolia

### Build Logs

To view build logs:
1. Go to your project in Vercel dashboard
2. Click on the deployment
3. View "Build Logs" tab

### Performance Optimization

1. **Enable Edge Functions** (if needed)
2. **Configure Caching** for static assets
3. **Optimize Images** and assets
4. **Enable Compression**

## Post-Deployment

### Testing

1. **Wallet Connection**: Test with MetaMask, Rainbow, etc.
2. **Network Switching**: Ensure users can switch to Sepolia
3. **Responsive Design**: Test on mobile and desktop
4. **Performance**: Check loading times and responsiveness

### Monitoring

1. **Analytics**: Set up Vercel Analytics
2. **Error Tracking**: Monitor for runtime errors
3. **Performance**: Track Core Web Vitals
4. **Uptime**: Monitor application availability

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys
2. **HTTPS**: Ensure SSL is enabled
3. **CORS**: Configure appropriate CORS settings
4. **Rate Limiting**: Implement if necessary

## Support

For deployment issues:
- Check Vercel documentation
- Review build logs
- Contact Vercel support
- Check GitHub repository issues

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [WalletConnect Setup](https://docs.walletconnect.com/)
- [Ethereum Sepolia Testnet](https://sepolia.dev/)
