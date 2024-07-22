// pages/wallet.tsx
import { useState } from 'react';
import { connectWallet } from '../utils/connectWallet';

const Wallet = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleConnectWallet = async () => {
    const wallet = await connectWallet();
    if (wallet) {
      setWalletAddress(wallet.publicKey.toString());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">Connect to Phantom Wallet</h1>
      {walletAddress ? (
        <p className="mt-4 text-lg">Wallet Address: {walletAddress}</p>
      ) : (
        <button
          className="mt-4 px-4 py-2 text-white bg-blue-500 rounded"
          onClick={handleConnectWallet}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Wallet;
