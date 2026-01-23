import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';
import Button from '../components/Button';
import { Loader2 } from 'lucide-react';

export default function RegisterUser() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', location: '', phoneNumber: '', role: 'user' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data } = await registerUser(formData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.dispatchEvent(new Event('storage'));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-xl">
                <h2 className="mb-2 text-2xl font-bold text-slate-900">Create Account</h2>
                <p className="mb-6 text-slate-600">Join ELT to hire talent or find work</p>

                {error && (
                    <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
                        <input
                            type="text"
                            required
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Location</label>
                        <input
                            type="text"
                            required
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Phone Number</label>
                        <input
                            type="tel"
                            required
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">I am here to:</label>
                        <select
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="user">Hire Talent</option>
                            <option value="worker">Find Work</option>
                        </select>
                    </div>

                    <Button type="submit" className="w-full py-3" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : 'Create Account'}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
