import Navbar from '@/components/navbar';
import ProductView from '@/components/view-product/view-product-card';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export default async function Product({ params }: { params: { id: string } }) {
    const session = (await getServerSession(authOptions)) as any;

    let product = await prisma.product.findUnique({
        where: {
            id: params.id,
            userId: session?.user?.id,
            deleted: null,
        },
    });

    return (
        <main className="flex flex-col h-screen">
            <Navbar name={session?.user?.name} />
            <div className="flex-grow bg-base flex items-center justify-center">
                {product && <ProductView product={product} />}
            </div>
        </main>
    );
}
