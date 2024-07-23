// // connectWallet.ts
// import { PublicKey } from '@solana/web3.js';

// export const connectWallet = async () => {
//   try {
//     const { solana } = window as any;

//     if (solana && solana.isPhantom) {
//       const response = await solana.connect();
//       return {
//         publicKey: new PublicKey(response.publicKey.toString()),
//       };
//     } else {
//       alert('Solana object not found! Get a Phantom Wallet 👻');
//     }
//   } catch (error) {
//     console.error('Error connecting to Phantom Wallet:', error);
//   }
// };
