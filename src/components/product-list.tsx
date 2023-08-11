'use client';

import { Product } from '@prisma/client';
import { useEffect, useState } from 'react';
import ProductCard from './product-card';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function ProductsList({ products }: { products: Product[] }) {
    const [ productsList, setProductsList ] = useState(products);
    const [desire, setDesire] = useState(false);
    
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const search = searchParams.get('search');

    useEffect(() => {
        if (search) {
            setProductsList(
                products.filter((product) =>
                    product.name.toLowerCase().includes(search.toLowerCase()),
                ),
            );
        } else {
            router.replace(pathname);
            setProductsList(products);
        }
    }, [search, pathname, router, products]);

    return (
        <>
            <div className="tabs justify-center pt-8">
                <a
                    className={`tab tab-lifted ${desire ? '' : 'tab-active'}`}
                    onClick={() => desire && setDesire(!desire)}
                >
                    Meus Produtos
                </a>
                <a
                    className={`tab tab-lifted ${desire ? 'tab-active' : ''}`}
                    onClick={() => !desire && setDesire(!desire)}
                >
                    Lista de Desejos
                </a>
            </div>
            <div className="flex flex-wrap max-w-full p-14 lg:justify-center">
                {
                    productsList.filter(product => product.desire != !desire).map((product) => (
                        <ProductCard key={product.id} product={product as any} />
                    ))
                }
            </div>
        </>
    );
}
