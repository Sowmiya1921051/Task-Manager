import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterPage = () => {
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormInputs) => {
        try {
            await registerUser(data);
            navigate('/');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-ethereal p-6">
            <div className="glass-card p-10 w-full max-w-md animate-fade-in">
                <div className="text-center mb-10">
                   
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Create Workspace</h2>
                    <p className="text-slate-500 font-bold text-sm mt-2 opacity-80 uppercase tracking-widest">Start your journey today</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                        <input
                            {...register('name')}
                            className="block w-full rounded-2xl border-white/60 bg-white/40 backdrop-blur-md shadow-inner transition-all focus:ring-2 focus:ring-indigo-200 focus:bg-white/60 text-slate-700 font-medium p-4 outline-none border"
                            type="text"
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-rose-500 text-xs mt-2 font-bold">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                        <input
                            {...register('email')}
                            className="block w-full rounded-2xl border-white/60 bg-white/40 backdrop-blur-md shadow-inner transition-all focus:ring-2 focus:ring-indigo-200 focus:bg-white/60 text-slate-700 font-medium p-4 outline-none border"
                            type="email"
                            placeholder="Enter your email address"
                        />
                        {errors.email && <p className="text-rose-500 text-xs mt-2 font-bold">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Password</label>
                        <input
                            {...register('password')}
                            className="block w-full rounded-2xl border-white/60 bg-white/40 backdrop-blur-md shadow-inner transition-all focus:ring-2 focus:ring-indigo-200 focus:bg-white/60 text-slate-700 font-medium p-4 outline-none border"
                            type="password"
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-rose-500 text-xs mt-2 font-bold">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full py-4 text-lg mt-4 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Creating Account...' : 'Get Started'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500 font-bold">
                        Already part of a workspace?{' '}
                        <Link to="/login" className="text-indigo-600 hover:text-indigo-500 transition-colors border-b-2 border-indigo-100 hover:border-indigo-400">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
