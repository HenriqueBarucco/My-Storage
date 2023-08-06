import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions) as any;

    try {
        const { name, description, location, isAtBox, image, quantity, price, observation  } = (await req.json()) as {
            name: string;
            description: string;
            location: string;
            isAtBox: boolean;
            image: string;
            quantity: string;
            price: string;
            observation: string;
    };

        const product = await prisma.product.create({
            data: {
                name,
                description,
                location,
                image,
                quantity: parseInt(quantity),
                price: parseFloat(price),
                observations: observation,
                isAtBox,
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
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions) as any;

    try {
        const { id } = (await req.json()) as {id: string};

        await prisma.product.delete({
            where: {
                id: id,
                userId: session.user.id,
            }
        });

        return NextResponse.json({message: 'Product deleted'});
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({
                status: 'error',
                message: error.message,
            }),
            { status: 500 }
        );
    }
}
