'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

export default function RegisterForm() {
    const formSchema = z.object({
        name: z.string().min(3, {message: 'Nome deve conter no mínimo 3 caracteres.'}),
        email: z.string().email({message: 'Email inválido.'}),
        password: z.string().min(6, {message: 'Senha deve conter no mínimo 6 caracteres.'}),
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FieldValues) => {
        console.error(data);
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Crie a sua conta!</h1>
                    <p className="py-6">Faça o seu cadastro agora mesmo para ter o seu estoque pessoal em nossa plataforma.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Nome</span>
                                </label>
                                <input
                                    className="input input-bordered"
                                    type="text"
                                    placeholder="Nome"
                                    {...register('name', { required: true })}
                                />
                                {errors.name && (
                                    <span className="text-red-500 text-sm">
                                        {errors.name.message?.toString()}
                                    </span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    className="input input-bordered"
                                    type="text"
                                    placeholder="Email"
                                    {...register('email', { required: true })}
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-sm">
                                        {errors.email.message?.toString()}
                                    </span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Senha</span>
                                </label>
                                <input
                                    className="input input-bordered"
                                    type="password"
                                    placeholder="Senha"
                                    {...register('password', { required: true })}
                                />
                                {errors.password && (
                                    <span className="text-red-500 text-sm">
                                        {errors.password.message?.toString()}
                                    </span>
                                )}
                                <Link href={'/login'}>
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Já possuí uma conta? Entre com ela clicando aqui.</a>
                                    </label>
                                </Link>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Cadastrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}