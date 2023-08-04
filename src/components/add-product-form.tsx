import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export default function AddProduct() {
    const formSchema = z.object({
        name: z.string(),
        description: z.string(),
        location: z.string(),
        image: z.string(),
        quantity: z.string(),
        price: z.string(),
        observation: z.string(),
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: any) => {
        try {
            const res = await fetch('/api/product', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(res);
        } catch (error: any) {
            console.error(error);
        }
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2 w-full">
            <div className="join join-vertical">
                <span>Nome do produto</span>
                <input className="input input-bordered input-sm" {...register('name', { required: true})}/>
                {errors.name && <span className="text-red-500">{errors.name.message?.toString()}</span>}
            </div>
            <div className="join join-vertical">
                <span>Descrição</span>
                <textarea className="textarea textarea-bordered" {...register('description', { required: true})}/>
            </div>
            <div className="join join-vertical">
                <span>Localização</span>
                <input type="text" className="input input-bordered input-sm" {...register('location', { required: true})}/>
            </div>
            <div className="join join-vertical">
                <span>Imagem</span>
                <input type="text" className="input input-bordered input-sm" {...register('image', { required: true})}/>
            </div>
            {/* CHECK BOX DO IS AT BOX*/ }
            <div className="flex flex-row space-x-3">
                <div className="join join-vertical w-1/3">
                    <span>Quantidade</span>
                    <input type="text" className="input input-bordered input-sm" {...register('quantity', { required: true})}/>
                </div>
                <div className="join join-vertical w-auto">
                    <span>Preço</span>
                    <div className="input-group">
                        <span>R$</span>
                        <input type="text" className="input input-bordered input-sm w-full" {...register('price', { required: true})}/>
                    </div>
                </div>
            </div>

            <div className="join join-vertical">
                <span>Observação</span>
                <textarea className="textarea textarea-bordered" {...register('observation', { required: true})}/>
            </div>
            {/*Categorias*/ }
            <input className='btn btn-primary' type="submit" value={'Salvar'}/>
        </form>
    );
}