import Navbar from '@/components/navbar';
import ProductCard from '@/components/product-card';

export default function Home() {
    return (
        <main className='flex flex-col h-screen'>
            <Navbar />
            <div className='flex-grow bg-slate-700 flex justify-center items-center'>
                <ProductCard/>
            </div>
        </main>
    );
}
