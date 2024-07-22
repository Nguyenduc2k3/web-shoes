// import type { NextApiRequest, NextApiResponse } from 'next'
// import { newUser } from './../../../interfaces/user.d';
// import bcrypt from "bcrypt";
// import prisma from './../../../lib/prisma';


// export default function register(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     if (req.method === 'POST') {
//         const user = req.body.user
//         if(!user) return
//         CreateAccount(res, user)
//     }
// }

// async function CreateAccount(res: NextApiResponse, user: newUser) {
//     //Tiêu chuẩn mã hóa 10 ký tự
//     const salt = await bcrypt.genSalt(10);
//     try {
//         // Kiểm tra email
//         const users = await prisma.user.findFirst({
//             where: {
//                 email: user.email,
//             },
//         });
//         if (users) res.status(500).json('Email already exists')

//         //   Mã hóa pass
//         const hashed = await bcrypt.hash(user.password, salt);

//         const regis = await prisma.user.create({
//             data: {
//                 email: user.email,
//                 password: hashed,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//             },
//         });
//         await prisma.profile.create({
//             data: {
//                 user: { connect: { email: regis.email } }
//             }
//         })
//         res.status(200).json("Register Successfully!");

//     } catch (error) {
//         res.status(500).json(error)
//     }
// }





import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prisma from './../../../lib/prisma';
import { newUser } from './../../../interfaces/user.d';
import { Keypair } from '@solana/web3.js'; // Import Keypair từ thư viện Solana

export default async function register(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const user = req.body.user;
        if (!user) {
            return res.status(400).json({ error: 'User data is required' });
        }
        try {
            await CreateAccount(res, user);
        } catch (error) {
            console.error('Register error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

async function CreateAccount(res: NextApiResponse, user: newUser) {
    const salt = await bcrypt.genSalt(10);

    try {
        // Kiểm tra email
        const existingUser = await prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Mã hóa password
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // Tạo cặp khóa công khai và khóa riêng
        const keypair = Keypair.generate();
        const solanaPublicKey = keypair.publicKey.toString();

        // Tạo người dùng mới
        const newUser = await prisma.user.create({
            data: {
                email: user.email,
                password: hashedPassword,
                firstName: user.firstName,
                lastName: user.lastName,
                solanaPublicKey: solanaPublicKey, // Lưu khóa công khai vào cơ sở dữ liệu
            },
        });

        // Tạo hồ sơ người dùng
        await prisma.profile.create({
            data: {
                user: { connect: { email: newUser.email } },
            },
        });

        res.status(200).json({ message: 'Register Successfully!' });

    } catch (error) {
        console.error('CreateAccount error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
