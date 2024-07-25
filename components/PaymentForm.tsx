// import axios from "axios";
// import { useState } from "react";
// import Button from "./Button";
// import { DataVoucherProps } from "../interfaces/voucher";
// import Cookies from "js-cookie";

// export default function PaymentForm({
//   price,
//   voucher,
// }: {
//   voucher?: DataVoucherProps;
//   price: number;
// }) {
//   const [amount, setAmount] = useState(price.toString());
//   const [bankCode, setBankCode] = useState("Ví Phantom");
//   const [orderDescription, setOrderDescription] = useState("");
//   const [orderType, setOrderType] = useState("Mua hàng");
//   const [language, setLanguage] = useState("vn");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post<{ paymentUrl: string }>(
//         "/api/payment",
//         {
//           amount,
//           bankCode,
//           orderDescription,
//           orderType,
//           language,
//           voucher,
//         }
//       );

//       // Redirect to payment URL
//       window.location.href = response.data.paymentUrl;
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center w-[350px]">
//       <div className="w-full max-w-md space-y-8 shadow">
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label
//               htmlFor="amount"
//               className="block text-sm font-medium text-white"
//             >
//               Số tiền
//             </label>
//             <input disabled
//               id="amount"
//               name="amount"
//               type="number"
//               value={amount}
//               className="block w-full px-3 py-2 bg-transparent text-white mt-1 border border-white/30 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="bankCode"
//               className="block text-sm font-medium text-white"
//             >
//               Mã ngân hàng
//             </label>
//             <input disabled
//               id="bankCode"
//               name="bankCode"
//               type="text"
//               value={bankCode}
//               onChange={(e) => setBankCode(e.target.value)}
//               className="block w-full px-3 py-2 bg-transparent text-white mt-1 border border-white/30 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="orderDescription"
//               className="block text-sm font-medium text-white"
//             >
//               Mô tả đơn hàng
//             </label>
//             <textarea
//               id="orderDescription"
//               name="orderDescription"
//               value={orderDescription}
//               onChange={(e) => setOrderDescription(e.target.value)}
//               className="block w-full px-3 py-2 bg-transparent text-white mt-1 border border-white/30 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="orderType"
//               className="block text-sm font-medium text-white"
//             >
//               Loại đơn hàng
//             </label>
//             <input disabled
//               id="orderType"
//               name="orderType"
//               type="text"
//               value={orderType}
//               onChange={(e) => setOrderType(e.target.value)}
//               className="block w-full px-3 py-2 bg-transparent text-white mt-1 border border-white/30 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="language"
//               className="block text-sm font-medium text-white"
//             >
//               Ngôn ngữ
//             </label>
//             <select
//               id="language"
//               name="language"
//               value={language}
//               onChange={(e) => setLanguage(e.target.value)}
//               className="block w-full px-3 py-2 bg-transparent text-white mt-1 border border-white/30 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
//             >
//               <option value="vn">Tiếng Việt</option>
//               <option value="en">English</option>
//             </select>
//           </div>

//           <div>
//             <Button label="Thanh toán" submit className="w-full" />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



import axios from "axios";
import { useState } from "react";
import Button from "./Button";
import { DataVoucherProps } from "../interfaces/voucher";
import { Connection, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';

export default function PaymentForm({
  price,
  voucher,
}: {
  voucher?: DataVoucherProps;
  price: number;
}) {
  const [amount, setAmount] = useState(price.toString());
  const [bankCode, setBankCode] = useState("Ví Phantom");
  const [orderDescription, setOrderDescription] = useState("");
  const [orderType, setOrderType] = useState("Mua hàng");
  const [language, setLanguage] = useState("vn");
  const [status, setStatus] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        await window.solana.connect();
        setWalletConnected(true);
        setStatus("Wallet connected");
      } catch (err) {
        console.error("Connection Error:", err);
        setStatus("Failed to connect wallet");
      }
    } else {
      setStatus("Phantom wallet not detected");
    }
  };

  const sendSolPayment = async () => {
    if (!window.solana || !walletConnected) {
      setStatus("Please connect your wallet first.");
      return;
    }

    try {
      const connection = new Connection("https://api.devnet.solana.com", "confirmed");
      const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      const destPubkey = new PublicKey("5i4CEJ5hpwtS1F3bRBdmnkbw17xXpgBqN2GrQV5XBKG7");
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: window.solana.publicKey,
          toPubkey: destPubkey,
          lamports,
        })
      );
      transaction.feePayer = window.solana.publicKey;

      const { blockhash } = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash;

      const signedTransaction = await window.solana.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());
      await connection.confirmTransaction(signature);

      setStatus(`Transaction successful with signature: ${signature}`);
    } catch (err) {
      console.error("Transaction Error:", err);
      setStatus(`Transaction failed: ${err.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (walletConnected) {
        // Handle Solana payment
        await sendSolPayment();
      } else {
        // Process traditional payment
        const response = await axios.post<{ paymentUrl: string }>(
          "/api/payment",
          {
            amount,
            bankCode,
            orderDescription,
            orderType,
            language,
            voucher,
          }
        );

        // Redirect to payment URL
        window.location.href = response.data.paymentUrl;
      }
    } catch (error) {
      console.error(error);
      setStatus(`Payment failed: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center w-[350px]">
      <div className="w-full max-w-md space-y-8 shadow">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-white">
              Số tiền
            </label>
            <input
              disabled
              id="amount"
              name="amount"
              type="number"
              value={amount}
              className="block w-full px-3 py-2 bg-transparent text-white mt-1 border border-white/30 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="bankCode" className="block text-sm font-medium text-white">
              Mã ngân hàng
            </label>
            <input
              disabled
              id="bankCode"
              name="bankCode"
              type="text"
              value={bankCode}
              onChange={(e) => setBankCode(e.target.value)}
              className="block w-full px-3 py-2 bg-transparent text-white mt-1 border border-white/30 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="orderDescription" className="block text-sm font-medium text-white">
              Mô tả đơn hàng
            </label>
            <textarea
              id="orderDescription"
              name="orderDescription"
              value={orderDescription}
              onChange={(e) => setOrderDescription(e.target.value)}
              className="block w-full px-3 py-2 bg-transparent text-white mt-1 border border-white/30 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="orderType" className="block text-sm font-medium text-white">
              Loại đơn hàng
            </label>
            <input
              disabled
              id="orderType"
              name="orderType"
              type="text"
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="block w-full px-3 py-2 bg-transparent text-white mt-1 border border-white/30 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="language" className="block text-sm font-medium text-white">
              Ngôn ngữ
            </label>
            <select
              id="language"
              name="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="block w-full px-3 py-2 bg-transparent text-white mt-1 border border-white/30 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            >
              <option value="vn">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <Button label="Thanh toán" submit className="w-full" />
          </div>
        </form>

        <div className="mt-4 text-center text-white">
          <button onClick={connectWallet} className="button-9">
            Connect Wallet
          </button>
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
}
