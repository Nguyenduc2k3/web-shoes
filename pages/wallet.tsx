// // pages/wallet.tsx
// import { useState } from 'react';
// import { connectWallet } from '../utils/connectWallet';

// const Wallet = () => {
//   const [walletAddress, setWalletAddress] = useState<string | null>(null);

//   const handleConnectWallet = async () => {
//     const wallet = await connectWallet();
//     if (wallet) {
//       setWalletAddress(wallet.publicKey.toString());
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <h1 className="text-3xl font-bold">Connect to Phantom Wallet</h1>
//       {walletAddress ? (
//         <p className="mt-4 text-lg">Wallet Address: {walletAddress}</p>
//       ) : (
//         <button
//           className="mt-4 px-4 py-2 text-white bg-blue-500 rounded"
//           onClick={handleConnectWallet}
//         >
//           Connect Wallet
//         </button>
//       )}
//     </div>
//   );
// };

// export default Wallet;





// import { useState } from "react";
// import axios from "axios";
// import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
// import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";

// const Wallet = () => {
//   const xKey = "YPguVA8niasnf_7l";
//   const [wallID, setWallID] = useState("");
//   const [network, setNetwork] = useState("devnet");
//   const [isLoaded, setLoaded] = useState(false);
//   const [dataFetched, setDataFetched] = useState();
//   const [connStatus, setConnStatus] = useState(false);

//   const solanaConnect = async () => {
//     console.log("clicked solana connect");
//     const { solana } = window;
//     if (!solana) {
//       alert("Please Install Solana");
//       return;
//     }

//     try {
//       const phantom = new PhantomWalletAdapter();
//       await phantom.connect();
//       const rpcUrl = clusterApiUrl(network);
//       const connection = new Connection(rpcUrl, "confirmed");
//       const wallet = {
//         address: phantom.publicKey.toString(),
//       };

//       if (wallet.address) {
//         console.log(wallet.address);
//         setWallID(wallet.address);
//         const accountInfo = await connection.getAccountInfo(
//           new PublicKey(wallet.address),
//           "confirmed"
//         );
//         console.log(accountInfo);
//         setConnStatus(true);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <div className="container-lg">
//         {!connStatus && (
//           <div className="card border border-primary rounded py-3 px-5 w-50 mx-auto">
//             <div className="card-body text-center">
//               <h2 className="card-title p-2">Connect Your Wallet</h2>
//               <p className="card-text p-1">
//                 You need to connect your wallet to deploy and interact with your
//                 contracts.
//               </p>
//               <button
//                 className="mt-4 px-4 py-2 text-white bg-blue-500 rounded"
//                 onClick={solanaConnect}
//               >
//                 Connect Phantom Wallet
//               </button>
//             </div>
//           </div>
//         )}
//         {connStatus && (
//           <div className="w-500 border border-primary rounded-3 mx-auto">
//             <div className="form-container p-3">
//               <form>
//                 <div className="row d-flex justify-content-center">
//                   <div className="col-12 p-2">
//                     <select
//                       name="network"
//                       className="form-control form-select"
//                       id=""
//                       onChange={(e) => setNetwork(e.target.value)}
//                     >
//                       <option value="devnet">Devnet</option>
//                       <option value="testnet">Testnet</option>
//                       <option value="mainnet-beta">Mainnet Beta</option>
//                     </select>
//                   </div>
//                   <div className="col-12 p-2">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Wallet Id"
//                       value={wallID}
//                     />
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Wallet;



import { useState } from "react";
import axios from "axios";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";

const Wallet = () => {
  const [wallID, setWallID] = useState("");
  const [network, setNetwork] = useState("devnet");
  const [connStatus, setConnStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const solanaConnect = async () => {
    console.log("clicked solana connect");
    const { solana } = window;
    if (!solana) {
      alert("Please Install Solana");
      return;
    }

    try {
      const phantom = new PhantomWalletAdapter();
      await phantom.connect();
      const rpcUrl = clusterApiUrl(network);
      const connection = new Connection(rpcUrl, "confirmed");
      const wallet = {
        address: phantom.publicKey.toString(),
      };

      if (wallet.address) {
        console.log(wallet.address);
        setWallID(wallet.address);
        const accountInfo = await connection.getAccountInfo(
          new PublicKey(wallet.address),
          "confirmed"
        );
        console.log(accountInfo);
        setConnStatus(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/user/login", {
        email,
        password,
        solanaPublicKey: wallID,
      });
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="container-lg">
        {!connStatus && (
          <div className="card border border-primary rounded py-3 px-5 w-50 mx-auto">
            <div className="card-body text-center">
              <h2 className="card-title p-2">Connect Your Wallet</h2>
              <p className="card-text p-1">
                You need to connect your wallet to deploy and interact with your
                contracts.
              </p>
              <button
                className="mt-4 px-4 py-2 text-white bg-blue-500 rounded"
                onClick={solanaConnect}
              >
                Connect Phantom Wallet
              </button>
            </div>
          </div>
        )}
        {connStatus && (
          <div className="w-500 border border-primary rounded-3 mx-auto">
            <div className="form-container p-3">
              <form>
                <div className="row d-flex justify-content-center">
                  <div className="col-12 p-2">
                    <select
                      name="network"
                      className="form-control form-select"
                      onChange={(e) => setNetwork(e.target.value)}
                    >
                      <option value="devnet">Devnet</option>
                      <option value="testnet">Testnet</option>
                      <option value="mainnet-beta">Mainnet Beta</option>
                    </select>
                  </div>
                  <div className="col-12 p-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Wallet Id"
                      value={wallID}
                      readOnly
                    />
                  </div>
                  <div className="col-12 p-2">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-12 p-2">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-12 p-2">
                    <button
                      type="button"
                      className="mt-4 px-4 py-2 text-white bg-blue-500 rounded"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
