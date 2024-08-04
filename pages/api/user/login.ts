// import { NextApiRequest, NextApiResponse } from 'next';
// import { User } from '../../../interfaces/user';
// import prisma from './../../../lib/prisma';
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { serialize } from "cookie";


// export default function Login(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     if (req.method === "POST") {
//         const user = req.body.user
//         if (!user) return
//         LoginUser(user, res)
//     }
// }

// async function LoginUser(user: User, res: NextApiResponse) {
//     try {
//         const secret = '12345'
//         const userCheck = await prisma.user.findFirst({
//             where: {
//                 email: user.email
//             }
//         })
//         if (!userCheck)
//             res.status(400).json('Email không hợp lệ')

//         const validPassword = await bcrypt.compare(
//             user.password,
//             String(userCheck?.password)
//         );
//         if (!validPassword)
//             res.status(400).json("Mật khẩu không đúng");

//         if (userCheck && validPassword) {
//             const token = jwt.sign(
//                 {
//                     id: userCheck?.id,
//                     email: userCheck?.email,
//                     firstName: userCheck?.firstName,
//                     lastName: userCheck?.lastName,
//                     admin: userCheck?.admin
//                 },
//                 secret
//             );
//             res.setHeader("Set-Cookie", serialize("token", token, { path: "/" }));

//             res.status(200).json({
//                 id: userCheck?.id,
//                 email: userCheck?.email,
//                 name: userCheck?.lastName,
//                 admin: userCheck?.admin
//             });
//         }
//     } catch (error) {
//         res.status(500).json(error)
//     }
// }



// import { NextApiRequest, NextApiResponse } from 'next';
// import { User } from '../../../interfaces/user';
// import prisma from './../../../lib/prisma';
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { serialize } from "cookie";

// export default async function Login(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     if (req.method === "POST") {
//         const user = req.body.user;
//         if (!user) return res.status(400).json({ error: 'User data is required' });
//         await LoginUser(user, res);
//     } else {
//         res.status(405).json({ error: 'Method not allowed' });
//     }
// }

// async function LoginUser(user: User, res: NextApiResponse) {
//     try {
//         const secret = process.env.JWT_SECRET || 'default_secret'; // Use environment variable for secret
//         const userCheck = await prisma.user.findUnique({
//             where: {
//                 email: user.email
//             }
//         });

//         if (!userCheck) {
//             return res.status(400).json({ error: 'Invalid email' });
//         }

//         const validPassword = await bcrypt.compare(
//             user.password,
//             userCheck.password
//         );

//         if (!validPassword) {
//             return res.status(400).json({ error: 'Invalid password' });
//         }

//         // Optionally check solanaPublicKey if provided
//         if (user.solanaPublicKey && user.solanaPublicKey !== userCheck.solanaPublicKey) {
//             return res.status(400).json({ error: 'Invalid Solana public key' });
//         }

//         if (userCheck && validPassword) {
//             const token = jwt.sign(
//                 {
//                     id: userCheck.id,
//                     email: userCheck.email,
//                     firstName: userCheck.firstName,
//                     lastName: userCheck.lastName,
//                     admin: userCheck.admin
//                 },
//                 secret,
//                 { expiresIn: '1h' } // Optional: Add expiration time for token
//             );

//             res.setHeader("Set-Cookie", serialize("token", token, { path: "/", httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600 }));
//             // Setting httpOnly and secure flags for production environments

//             res.status(200).json({
//                 id: userCheck.id,
//                 email: userCheck.email,
//                 firstName: userCheck.firstName,
//                 lastName: userCheck.lastName,
//                 admin: userCheck.admin
//             });
//         }
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }




// import type { NextApiRequest, NextApiResponse } from 'next';
// import bcrypt from 'bcrypt';
// import prisma from './../../../lib/prisma';
// import jwt from 'jsonwebtoken';
// import { serialize } from 'cookie';

// export default async function Login(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     if (req.method === 'POST') {
//         const user = req.body.user;
//         if (!user) {
//             return res.status(400).json({ error: 'User data is required' });
//         }
//         await loginUser(user, res);
//     } else {
//         res.status(405).json({ error: 'Method not allowed' });
//     }
// }

// async function loginUser(user: { email: string; password: string }, res: NextApiResponse) {
//     try {
//         const secret = '12345';
//         const userCheck = await prisma.user.findUnique({
//             where: {
//                 email: user.email,
//             },
//         });

//         if (!userCheck) {
//             return res.status(400).json({ error: 'Invalid email' });
//         }

//         const validPassword = await bcrypt.compare(
//             user.password,
//             userCheck.password
//         );

//         if (!validPassword) {
//             return res.status(400).json({ error: 'Invalid password' });
//         }

//         const token = jwt.sign(
//             {
//                 id: userCheck.id,
//                 email: userCheck.email,
//                 firstName: userCheck.firstName,
//                 lastName: userCheck.lastName,
//                 admin: userCheck.admin,
//                 solanaPublicKey: userCheck.solanaPublicKey,
//             },
//             secret
//         );

//         res.setHeader('Set-Cookie', serialize('token', token, { path: '/' }));
//         res.status(200).json({
//             id: userCheck.id,
//             email: userCheck.email,
//             name: userCheck.lastName,
//             admin: userCheck.admin,
//             solanaPublicKey: userCheck.solanaPublicKey,
//         });
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }




// import type { NextApiRequest, NextApiResponse } from 'next';
// import bcrypt from 'bcrypt';
// import prisma from './../../../lib/prisma';
// import jwt from 'jsonwebtoken';
// import { serialize } from 'cookie';

// export default async function Login(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         const { email, password, solanaPublicKey } = req.body;
//         if (!email || !password || !solanaPublicKey) {
//             return res.status(400).json({ error: 'Email, password, and Solana public key are required' });
//         }
//         await loginUser({ email, password, solanaPublicKey }, res);
//     } else {
//         res.status(405).json({ error: 'Method not allowed' });
//     }
// }

// async function loginUser(user: { email: string; password: string; solanaPublicKey: string }, res: NextApiResponse) {
//     try {
//         const secret = '12345';
//         const userCheck = await prisma.user.findUnique({
//             where: {
//                 email: user.email,
//             },
//         });

//         if (!userCheck) {
//             return res.status(400).json({ error: 'Invalid email' });
//         }

//         const validPassword = await bcrypt.compare(
//             user.password,
//             userCheck.password
//         );

//         if (!validPassword) {
//             return res.status(400).json({ error: 'Invalid password' });
//         }

//         if (user.solanaPublicKey !== userCheck.solanaPublicKey) {
//             return res.status(400).json({ error: 'Invalid Solana public key' });
//         }

//         const token = jwt.sign(
//             {
//                 id: userCheck.id,
//                 email: userCheck.email,
//                 firstName: userCheck.firstName,
//                 lastName: userCheck.lastName,
//                 admin: userCheck.admin,
//                 solanaPublicKey: userCheck.solanaPublicKey,
//             },
//             secret
//         );

//         res.setHeader('Set-Cookie', serialize('token', token, { path: '/' }));
//         res.status(200).json({
//             id: userCheck.id,
//             email: userCheck.email,
//             name: userCheck.lastName,
//             admin: userCheck.admin,
//             solanaPublicKey: userCheck.solanaPublicKey,
//         });
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }




import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prisma from './../../../lib/prisma';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password, solanaPublicKey } = req.body;
        if (!email || !password || !solanaPublicKey) {
            return res.status(400).json({ error: 'Email, password, and Solana public key are required' });
        }
        await loginUser({ email, password, solanaPublicKey }, res);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

async function loginUser(user: { email: string; password: string; solanaPublicKey: string }, res: NextApiResponse) {
    try {
        const secret = '12345';
        const userCheck = await prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });

        if (!userCheck) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        const validPassword = await bcrypt.compare(
            user.password,
            userCheck.password
        );

        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        if (user.solanaPublicKey !== userCheck.solanaPublicKey) {
            return res.status(400).json({ error: 'Invalid Solana public key' });
        }

        const token = jwt.sign(
            {
                id: userCheck.id,
                email: userCheck.email,
                firstName: userCheck.firstName,
                lastName: userCheck.lastName,
                admin: userCheck.admin,
                solanaPublicKey: userCheck.solanaPublicKey,
            },
            secret
        );

        res.setHeader('Set-Cookie', serialize('token', token, { path: '/' }));
        res.status(200).json({
            id: userCheck.id,
            email: userCheck.email,
            name: userCheck.lastName,
            admin: userCheck.admin,
            solanaPublicKey: userCheck.solanaPublicKey,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
