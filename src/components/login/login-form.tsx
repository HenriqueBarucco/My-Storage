'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

export default function LoginForm() {
    const [loading, setLoading] = useState(false);

    const formSchema = z.object({
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
        setLoading(true);
        signIn('credentials', {
            email: data.email,
            password: data.password,
            callbackUrl: '/',
        });
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Faça o seu login!</h1>
                    <p className="py-6">Para acessar o seu estoque pessoal, realize o login agora mesmo em nossa plataforma.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                            </div>
                            <div className="form-control mt-6 space-y-3">
                                <button className="btn btn-primary">
                                    {loading && <span className="loading loading-spinner"/>}
                                    Entrar
                                </button>
                                <Link href={'/register'} className='label-text-alt link link-hover text-center'>
                                    Não possuí uma conta? Crie uma agora mesmo.
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
