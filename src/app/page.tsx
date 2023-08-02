import Navbar from '@/components/navbar';
import ProductCard from '@/components/product-card';

export default function Home() {
    return (
        <main className='flex flex-col h-screen'>
            <Navbar />
            <div className='flex-grow bg-base-100'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 m-10 gap-6'>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </main>
    );
}
