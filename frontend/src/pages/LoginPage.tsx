import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            await login(data);
            navigate('/');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-ethereal p-6">
            <div className="glass-card p-10 w-full max-w-md animate-fade-in">
                <div className="text-center mb-10">
                    
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
                    <p className="text-slate-500 font-bold text-sm mt-2 opacity-80 uppercase tracking-widest">Login to your workspace</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                        {isSubmitting ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500 font-bold">
                        New around here?{' '}
                        <Link to="/register" className="text-indigo-600 hover:text-indigo-500 transition-colors border-b-2 border-indigo-100 hover:border-indigo-400">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
