'use client';

import { signOut } from 'next-auth/react';
import Image from 'next/image';
import AddProductModal from './add-product/add-product-modal';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar({ name }: { name: string }) {
    const router = useRouter();
    const pathname = usePathname();

    const handleInputChange = (event: any) => {
        const { value } = event.target;
        router.push(pathname + '?search=' + value);
    };

    return (
        <div className="navbar bg-base-200">
            <div className="flex-1">
                <Link href={'/'} className="btn btn-ghost normal-case text-xl">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        className="w-6 h-6 stroke-primary"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                    </svg>
                    My Storage
                </Link>
            </div>
            <div className="flex-none gap-2">
                <AddProductModal />
                <div className="form-control">
                    <input
                        type="text"
                        placeholder="Procurar"
                        className="input input-bordered w-24 md:w-auto"
                        onKeyUp={handleInputChange}
                    />
                </div>
                <div className="dropdown dropdown-end">
                    <h1>{name}</h1>
                </div>
                <div className="dropdown dropdown-end">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <Image
                                src={'https://images.henriquebarucco.com.br/X22Lv.png'}
                                alt={name}
                                width={720}
                                height={720}
                            />
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
                    >
                        <li onClick={() => signOut()}>
                            <a>Sair</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
