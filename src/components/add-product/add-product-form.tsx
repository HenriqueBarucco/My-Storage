import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { saveImage } from '@/lib/image';
import { useState } from 'react';

export default function AddProduct({ closeModel }: any) {
    const [loading, setLoading] = useState(false);

    const formSchema = z.object({
        name: z.string().nonempty({ message: 'Nome do produto é obrigatório.' }),
        description: z.string().nonempty({ message: 'Descrição do produto é obrigatória.' }),
        location: z.string(),
        isAtBox: z.boolean(),
        isDesire: z.boolean(),
        image: z.any().refine((value) => value.length > 0),
        quantity: z.number(),
        price: z.number(),
        category: z.string(),
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            await fetch('/api/product', {
                method: 'POST',
                body: JSON.stringify({
                    ...data,
                    image: await getImageUrl(data?.image[0]),
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            closeModel();
        } catch (error: any) {
            setLoading(false);
            console.error(error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-2 w-full"
        >
            <div className="join join-vertical">
                <span>Nome do produto</span>
                <input
                    className="input input-bordered input-sm"
                    {...register('name', { required: true })}
                />
                {errors.name && (
                    <span className="text-red-500">
                        {errors.name.message?.toString()}
                    </span>
                )}
            </div>
            <div className="join join-vertical">
                <span>Descrição</span>
                <textarea
                    className="textarea textarea-bordered"
                    {...register('description', { required: true })}
                />
            </div>
            <div className="flex flex-row space-x-3 items-end">
                <div className="join join-vertical w-4/5">
                    <span>Localização</span>
                    <input
                        type="text"
                        className="input input-bordered input-sm"
                        {...register('location', { required: true })}
                    />
                    {errors.location && (
                        <span className="text-red-500">
                            {errors.location.message?.toString()}
                        </span>
                    )}
                </div>
                <div className="join join-vertical w-auto">
                    <div className="input-group">
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-6 h-6 stroke-primary"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                                />
                            </svg>
                        </span>
                        <input
                            type="checkbox"
                            className="checkbox checkbox-lg"
                            {...register('isAtBox', { required: true })}
                        />
                    </div>
                </div>
                <div className="join join-vertical w-auto">
                    <div className="input-group">
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-6 h-6 stroke-primary"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                />
                            </svg>
                        </span>
                        <input
                            type="checkbox"
                            className="checkbox checkbox-lg"
                            {...register('isDesire', { required: true })}
                        />
                    </div>
                </div>
            </div>
            <div className="join join-vertical">
                <span>Imagem</span>
                <input
                    type="file"
                    className="file-input file-input-bordered file-input-sm w-full file-input-text-primary"
                    accept='image/*'
                    {...register('image', { required: true })}
                />
            </div>
            <div className="flex flex-row space-x-3">
                <div className="join join-vertical w-1/3">
                    <span>Quantidade</span>
                    <input
                        type="number"
                        className="input input-bordered input-sm"
                        defaultValue={1}
                        {...register('quantity', { required: true, setValueAs: (value) => Number(value) })}
                    />
                </div>
                <div className="join join-vertical w-auto">
                    <span>Preço</span>
                    <div className="input-group">
                        <span className="text-primary">R$</span>
                        <input
                            type="number"
                            className="input input-bordered input-sm w-auto"
                            defaultValue={0}
                            {...register('price', { required: true, setValueAs: (value) => Number(value)  })}
                        />
                    </div>
                </div>
            </div>
            <div className="join join-vertical">
                <span>Categoria</span>
                <select
                    className="select select-bordered max-w"
                    {...register('category', { required: true })}
                >
                    <option disabled selected>Selecione uma categoria</option>
                    <option>Eletrônico</option>
                    <option>Cabo</option>
                </select>
            </div>
            <button className="btn btn-primary" type='submit'>
                {loading && <span className="loading loading-spinner"/>}
                Salvar
            </button>
        </form>
    );
}

async function getImageUrl(file: any) {
    const response = await saveImage(file);
    if (response.filename) {
        return response.filename;
    }
    throw new Error('Erro ao salvar imagem');
}
