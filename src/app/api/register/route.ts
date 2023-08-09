import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { email, name, password } = (await req.json()) as {
            username: string;
            name: string;
            email: string;
            password: string;
        };
        const hashed_password = await hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                name,
                password: hashed_password,
            },
        });

        return NextResponse.json({
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({
                status: 'error',
                message: error.message,
            }),
            { status: 500 },
        );
    }
}
