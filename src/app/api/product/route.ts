import { authOptions } from '@/lib/auth';
import { saveImage } from '@/lib/image';
import { prisma } from '@/lib/prisma';
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
            isDesire,
            image,
            quantity,
            price,
            category,
        } = (await req.json()) as {
            name: string;
            description: string;
            location: string;
            isAtBox: boolean;
            isDesire: boolean;
            image: string;
            quantity: string;
            price: string;
            category: string;
        };
        const imageSaved = await saveImage(image);

        console.log('imagem:', imageSaved);

        /* const product = await prisma.product.create({
            data: {
                name,
                description,
                location,
                image,
                quantity: parseInt(quantity),
                price: parseFloat(price),
                category,
                isAtBox,
                desire: isDesire,
                userId: session.user.id,
            },
        }); */

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
