import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export default function AddProduct() {
        
    const formSchema = z.object({
        name: z.string()
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: any) => {
        //console.log(data);
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6 w-full">
            <div className="join join-vertical">
                <span>Nome do produto</span>
                <input type="text" className="input input-bordered" />
            </div>
            <div className="join join-vertical">
                <span>Descrição</span>
                <textarea className="textarea textarea-bordered"/>
            </div>
            <div className="join join-vertical">
                <span>Localização</span>
                <input type="text" className="input input-bordered" />
            </div>
            <div className="join join-vertical">
                <span>Imagem</span>
                <input type="text" className="input input-bordered" />
            </div>
            {/* CHECK BOX DO IS AT BOX*/ }
            <div className="join join-horizontal space-x-3">
                <div className="join join-vertical w-1/3">
                    <span>Quantidade</span>
                    <input type="number" className="input input-bordered" />
                </div>
                <div className="join join-vertical w-auto">
                    <span>Preço</span>
                    <div className="input-group">
                        <span>R$</span>
                        <input type="number" className="input input-bordered w-full"/>
                    </div>
                </div>
            </div>

            <div className="join join-vertical">
                <span>Observação</span>
                <textarea className="textarea textarea-bordered"/>
            </div>
            {/*Categorias*/ }
            <div className='flex justify-end'>
                <a className='btn' type="submit" {...register('name', { required: 'Username is required' })}>
                    Salvar
                </a>
            </div>
        </form>
    );
}