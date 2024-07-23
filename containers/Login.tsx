// import Link from "next/link";
// import { useRouter } from "next/router";
// import { SyntheticEvent, useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUserCheck } from "../redux/apiReq";

// const Login = () => {
//   const [email, setEmail] = useState<string>();
//   const [password, setPassword] = useState<string>();
//   const [typePass, setTypePass] = useState("password");

//   const router = useRouter();
//   const dispatch = useDispatch();

//   const errLogin = useSelector(
//     (state: any) => state.auth.login.error?.response.data
//   );

//   const handleLogin = async (e: SyntheticEvent) => {
//     e.preventDefault();
//     try {
//       if (email && password) {
//         const userLogin = {
//           email,
//           password,
//         };
//         await loginUserCheck(userLogin, dispatch, router);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="w-[90%] lg:w-2/4 xl:w-2/5 mx-auto bg-[rgb(22,28,36)] rounded-xl py-8 md:py-16 text-xl px-5 md:px-12 flex flex-col justify-center z-50">
//       <div>
//         <h1 className="text-3xl font-bold text-white text-center">
//           Chào mừng trở lại
//         </h1>
//       </div>
//       <form
//         onSubmit={(e) => handleLogin(e)}
//         className="flex flex-col space-y-10 mt-14"
//       >
//         <div className="relative">
//           <input
//             type="email"
//             id="email"
//             autoComplete="off"
//             className={`bg-transparent border-b-gray-400 border-b-2 w-full outline-none transition-colors peer focus:border-b-green-500 focus:text-green-500 ${
//               email ? "text-gray-400" : "text-green-500"
//             }`}
//             onChange={(e) => setEmail(e?.target?.value)}
//           />
//           <label
//             htmlFor="email"
//             className={`absolute mb-1 cursor-text peer-focus:text-sm peer-focus:bottom-8 text-gray-400 peer-focus:text-green-500 peer-focus:left-0 transition-all duration-300 ${
//               email
//                 ? "left-0 bottom-8 text-gray-500 text-sm"
//                 : "left-1 bottom-1"
//             }`}
//           >
//             Email
//           </label>
//         </div>
//         <div className="relative">
//           <input
//             type={typePass}
//             id="password"
//             autoComplete="off"
//             className={`bg-transparent  border-b-gray-400 border-b-2 w-full outline-none transition-colors peer focus:border-b-green-500 focus:text-green-500 ${
//               password ? "text-gray-400" : "text-green-500"
//             }`}
//             onChange={(e) => setPassword(e?.target?.value)}
//           />
//           <label
//             htmlFor="password"
//             className={`absolute cursor-text mb-1 peer-focus:text-sm peer-focus:bottom-8 text-gray-400 peer-focus:text-green-500 peer-focus:left-0 transition-all duration-300 ${
//               password
//                 ? "left-0 bottom-8 text-gray-500 text-sm"
//                 : "left-1 bottom-1"
//             }`}
//           >
//             Mật khẩu
//           </label>
//           {typePass === "password" ? (
//             <AiOutlineEyeInvisible
//               className="absolute text-gray-400 right-10 select-none cursor-pointer bottom-3"
//               onClick={() => setTypePass("text")}
//             />
//           ) : (
//             <AiOutlineEye
//               className="absolute text-primary select-none right-10 cursor-pointer bottom-3"
//               onClick={() => setTypePass("password")}
//             />
//           )}
//         </div>
//         <i className="block text-red-500 text-sm">{errLogin}</i>
//         <div className="mt-10 flex justify-evenly ">
//           <Link href="/">
//             <button
//               type="button"
//               className="bg-gray-400 w-[116px] md:w-[204px] flex items-center justify-center text-white md:px-14 px-3 lg:w-fit text-lg rounded-full py-2 hover:bg-gray-500 font-semibold"
//             >
//               <p>Trở về</p>
//             </button>
//           </Link>
//           <button
//             type="submit"
//             className="bg-[rgb(0,171,85)] w-[116px] md:w-[204px] px-3 text-white md:px-14 text-lg rounded-full py-2 hover:bg-opacity-75 font-semibold"
//           >
//             Đăng nhập
//           </button>
//         </div>
//       </form>

//       <div className="text-gray-400 items-center justify-center mt-5 text-base flex ">
//         Bạn chưa có tài khoản?{" "}
//         <Link href="/sign-up">
//           <p className="hover:underline ml-1 cursor-pointer text-primary hover:text-opacity-80">
//             Đăng ký
//           </p>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Login;





// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";
// import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
// import Link from "next/link";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [wallID, setWallID] = useState("");
//   const [network, setNetwork] = useState("devnet");
//   const [connStatus, setConnStatus] = useState(false);
//   const [typePass, setTypePass] = useState("password");

//   const router = useRouter();

//   const solanaConnect = async () => {
//     console.log("clicked solana connect");
//     const { solana } = window;
//     if (!solana) {
//       alert("Please install a Solana wallet extension like Phantom.");
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

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!connStatus) {
//       alert("Please connect your Phantom wallet first");
//       return;
//     }

//     try {
//       const response = await axios.post("/api/user/login", {
//         email,
//         password,
//         solanaPublicKey: wallID,
//       });
//       console.log("Login successful:", response.data);
//       // Perform any actions upon successful login, like redirecting
//       router.push('/dashboard'); // Example redirect
//     } catch (error) {
//       console.error("Login error:", error);
//     }
//   };

//   return (
//     <div className="w-[90%] lg:w-2/4 xl:w-2/5 mx-auto bg-[rgb(22,28,36)] rounded-xl py-8 md:py-16 text-xl px-5 md:px-12 flex flex-col justify-center z-50 min-h-screen py-2">
//       <div>
//         <h1 className="text-3xl font-bold text-white text-center">
//           Chào mừng trở lại
//         </h1>
//       </div>
//       <form onSubmit={handleLogin} className="flex flex-col space-y-10 mt-14">
//         {!connStatus && (
//           <div className="flex flex-col items-center mb-6">
//             <h2 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h2>
//             <p className="text-gray-300 mb-4">
//               You need to connect your wallet to deploy and interact with your contracts.
//             </p>
//             <button
//               type="button"
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//               onClick={solanaConnect}
//             >
//               Connect Phantom Wallet
//             </button>
//           </div>
//         )}
//         {connStatus && (
//           <>
//             <div className="relative mb-4">
//               <input
//                 type="email"
//                 id="email"
//                 autoComplete="off"
//                 className={`bg-transparent border-b-gray-400 border-b-2 w-full outline-none transition-colors peer focus:border-b-green-500 focus:text-green-500 ${
//                   email ? "text-gray-400" : "text-green-500"
//                 }`}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <label
//                 htmlFor="email"
//                 className={`absolute cursor-text peer-focus:text-sm peer-focus:bottom-8 text-gray-400 peer-focus:text-green-500 peer-focus:left-0 transition-all duration-300 ${
//                   email
//                     ? "left-0 bottom-8 text-gray-500 text-sm"
//                     : "left-1 bottom-1"
//                 }`}
//               >
//                 Email
//               </label>
//             </div>
//             <div className="relative mb-4">
//               <input
//                 type={typePass}
//                 id="password"
//                 autoComplete="off"
//                 className={`bg-transparent border-b-gray-400 border-b-2 w-full outline-none transition-colors peer focus:border-b-green-500 focus:text-green-500 ${
//                   password ? "text-gray-400" : "text-green-500"
//                 }`}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <label
//                 htmlFor="password"
//                 className={`absolute cursor-text peer-focus:text-sm peer-focus:bottom-8 text-gray-400 peer-focus:text-green-500 peer-focus:left-0 transition-all duration-300 ${
//                   password
//                     ? "left-0 bottom-8 text-gray-500 text-sm"
//                     : "left-1 bottom-1"
//                 }`}
//               >
//                 Mật khẩu
//               </label>
//               {typePass === "password" ? (
//                 <AiOutlineEyeInvisible
//                   className="absolute text-gray-400 right-10 select-none cursor-pointer bottom-3"
//                   onClick={() => setTypePass("text")}
//                 />
//               ) : (
//                 <AiOutlineEye
//                   className="absolute text-primary select-none right-10 cursor-pointer bottom-3"
//                   onClick={() => setTypePass("password")}
//                 />
//               )}
//             </div>
//             <div className="text-red-500 text-sm mb-4">
//               {/* Display login error message here */}
//             </div>
//             <div className="flex justify-evenly mb-6">
//               <button
//                 type="button"
//                 className="bg-gray-400 px-6 text-white rounded-full py-2 hover:bg-gray-500"
//                 onClick={() => router.push('/')}
//               >
//                 Trở về
//               </button>
//               <button
//                 type="submit"
//                 className="bg-green-500 px-6 text-white rounded-full py-2 hover:bg-opacity-75"
//               >
//                 Đăng nhập
//               </button>
//             </div>
//           </>
//         )}
//       </form>
//       <div className="text-gray-400 text-base flex justify-center mt-5">
//         Bạn chưa có tài khoản?{" "}
//         <Link href="/sign-up">
//           <p className="hover:underline ml-1 cursor-pointer text-primary hover:text-opacity-80">Đăng ký</p>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wallID, setWallID] = useState("");
  const [network, setNetwork] = useState("devnet");
  const [connStatus, setConnStatus] = useState(false);
  const [typePass, setTypePass] = useState("password");
  const [error, setError] = useState("");

  const router = useRouter();

  const isValidPublicKey = (publicKey) => {
    try {
      new PublicKey(publicKey);
      return true;
    } catch (e) {
      return false;
    }
  };

  const solanaConnect = async () => {
    console.log("clicked solana connect");
    const { solana } = window;
    if (!solana) {
      alert("Please install a Solana wallet extension like Phantom.");
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
  
      if (wallet.address && isValidPublicKey(wallet.address)) {
        console.log(wallet.address);
        setWallID(wallet.address);
        const accountInfo = await connection.getAccountInfo(
          new PublicKey(wallet.address),
          "confirmed"
        );
        console.log(accountInfo);
        setConnStatus(true);
        setError(""); // Clear any previous error
        alert(`Kết nối thành công đến ví: ${wallet.address}`); // Success message
      } else {
        setError("Invalid wallet address. Please try again.");
        setConnStatus(false);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to connect to the wallet. Please try again.");
    }
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!connStatus) {
      alert("Please connect your Phantom wallet first");
      return;
    }

    try {
      const response = await axios.post("/api/user/login", {
        email,
        password,
        solanaPublicKey: wallID,
      });
      console.log("Login successful:", response.data);
      router.push('/dashboard'); // Example redirect
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials and wallet.");
    }
  };

  return (
    <div className="w-[90%] lg:w-2/4 xl:w-2/5 mx-auto bg-[rgb(22,28,36)] rounded-xl py-8 md:py-16 text-xl px-5 md:px-12 flex flex-col justify-center z-50 min-h-screen py-2">
      <div>
        <h1 className="text-3xl font-bold text-white text-center">
          Chào mừng trở lại
        </h1>
      </div>
      <form onSubmit={handleLogin} className="flex flex-col space-y-10 mt-14">
        {!connStatus && (
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h2>
            <p className="text-gray-300 mb-4">
              You need to connect your wallet to deploy and interact with your contracts.
            </p>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={solanaConnect}
            >
              Connect Phantom Wallet
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        )}
        {connStatus && (
          <>
            <div className="relative mb-4">
              <input
                type="email"
                id="email"
                autoComplete="off"
                className={`bg-transparent border-b-gray-400 border-b-2 w-full outline-none transition-colors peer focus:border-b-green-500 focus:text-green-500 ${
                  email ? "text-gray-400" : "text-green-500"
                }`}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label
                htmlFor="email"
                className={`absolute cursor-text peer-focus:text-sm peer-focus:bottom-8 text-gray-400 peer-focus:text-green-500 peer-focus:left-0 transition-all duration-300 ${
                  email
                    ? "left-0 bottom-8 text-gray-500 text-sm"
                    : "left-1 bottom-1"
                }`}
              >
                Email
              </label>
            </div>
            <div className="relative mb-4">
              <input
                type={typePass}
                id="password"
                autoComplete="off"
                className={`bg-transparent border-b-gray-400 border-b-2 w-full outline-none transition-colors peer focus:border-b-green-500 focus:text-green-500 ${
                  password ? "text-gray-400" : "text-green-500"
                }`}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label
                htmlFor="password"
                className={`absolute cursor-text peer-focus:text-sm peer-focus:bottom-8 text-gray-400 peer-focus:text-green-500 peer-focus:left-0 transition-all duration-300 ${
                  password
                    ? "left-0 bottom-8 text-gray-500 text-sm"
                    : "left-1 bottom-1"
                }`}
              >
                Mật khẩu
              </label>
              {typePass === "password" ? (
                <AiOutlineEyeInvisible
                  className="absolute text-gray-400 right-10 select-none cursor-pointer bottom-3"
                  onClick={() => setTypePass("text")}
                />
              ) : (
                <AiOutlineEye
                  className="absolute text-primary select-none right-10 cursor-pointer bottom-3"
                  onClick={() => setTypePass("password")}
                />
              )}
            </div>
            <div className="text-red-500 text-sm mb-4">
              {error && <p>{error}</p>}
            </div>
            <div className="flex justify-evenly mb-6">
              <button
                type="button"
                className="bg-gray-400 px-6 text-white rounded-full py-2 hover:bg-gray-500"
                onClick={() => router.push('/')}
              >
                Trở về
              </button>
              <button
                type="submit"
                className="bg-green-500 px-6 text-white rounded-full py-2 hover:bg-opacity-75"
              >
                Đăng nhập
              </button>
            </div>
          </>
        )}
      </form>
      <div className="text-gray-400 text-base flex justify-center mt-5">
        Bạn chưa có tài khoản?{" "}
        <Link href="/sign-up">
          <p className="hover:underline ml-1 cursor-pointer text-primary hover:text-opacity-80">Đăng ký</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
