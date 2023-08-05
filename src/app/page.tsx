import Navbar from '@/components/navbar';
import ProductsList from '@/components/product-list';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export default async function Home() {
    const session = await getServerSession(authOptions) as any;

    let products = await prisma.product.findMany({
        where: {
            userId: session?.user?.id,
        },
        orderBy: {
            name: 'asc'
        },
    });

    return (
        <main className='flex flex-col h-screen'>
            <Navbar name={session?.user?.name}/>
            <div className='flex-grow bg-base'>
                <ProductsList products={products}/>
            </div>
        </main>
    );
}