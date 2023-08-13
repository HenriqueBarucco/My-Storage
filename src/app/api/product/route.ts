import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Product } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const session = (await getServerSession(authOptions)) as any;

    try {
        const {
            name,
            description,
            location,
            isAtBox,
            desire,
            image,
            quantity,
            price,
            category,
        } = (await req.json()) as Product;

        const product = await prisma.product.create({
            data: {
                name,
                description,
                location,
                image,
                quantity,
                price,
                category,
                isAtBox,
                desire,
                userId: session.user.id,
            },
        });

        return NextResponse.json(product);
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

export async function DELETE(req: Request) {
    const session = (await getServerSession(authOptions)) as any;

    try {
        const { id } = (await req.json()) as { id: string };

        await prisma.product.delete({
            where: {
                id: id,
                userId: session.user.id,
            },
        });

        return NextResponse.json({ message: 'Product deleted' });
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

export async function PATCH(req: Request) {
    const session = (await getServerSession(authOptions)) as any;

    try {
        const { id } = (await req.json()) as { id: string };

        const product = await prisma.product.findUnique({
            where: {
                id: id,
                userId: session.user.id,
            },
        });

        const isAtBox = product?.isAtBox;

        await prisma.product.update({
            where: {
                id: id,
                userId: session.user.id,
            },
            data: {
                isAtBox: !isAtBox,
            },
        });

        return NextResponse.json({
            message: `Product now is ${
                !isAtBox ? 'at the box.' : 'out of the box.'
            }`,
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

export async function PUT(req: Request) {
    const session = (await getServerSession(authOptions)) as any;

    try {
        const { id } = (await req.json()) as { id: string };

        await prisma.product.update({
            where: {
                id: id,
                userId: session.user.id,
            },
            data: {
                desire: false,
            },
        });

        return NextResponse.json({
            message: 'Product now is not a desire anymore.',
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
