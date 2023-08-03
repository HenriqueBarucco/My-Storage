import Navbar from '@/components/navbar';
import ProductCard from '@/components/product-card';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export default async function Home() {
    const session = await getServerSession(authOptions) as any;

    let products = await prisma.product.findMany({
        where: {
            userId: session?.user?.id
        }
    });

    return (
        <main className='flex flex-col h-screen'>
            <Navbar />
            <div className='flex-grow bg-base'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 m-4 lg:m-10">
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product as any}/>
                    ))}
                </div>
            </div>
        </main>
    );
}