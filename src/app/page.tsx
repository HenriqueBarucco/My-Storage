import Navbar from '@/components/navbar';
import ProductCard from '@/components/product-card';

export default function Home() {
    return (
        <main className='flex flex-col h-screen'>
            <Navbar />
            <div className='flex-grow bg-base'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 m-10 gap-6'>
                    {productList.map((product, index) => (
                        <ProductCard key={index} product={product as any}/>
                    ))}
                </div>
            </div>
        </main>
    );
}

const productList = [
    {
        name: 'Produto 1',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi obcaecati ducimus laboriosam rerum labore...',
        categories: ['Categoria 1', 'Categoria 2'],
    },
    {
        name: 'Produto 2',
        description: 'Produto muito bom',
        categories: ['Categoria 2'],
    }
];