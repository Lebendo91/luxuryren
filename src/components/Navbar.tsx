import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { getSettingsMap } from '@/actions/settings';

export default async function Navbar() {
    const settings = await getSettingsMap();
    const appName = settings['app_name'] || "Luxury Rental";

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="bg-gold p-2 rounded-lg transform transition-transform group-hover:rotate-12">
                            <ShieldCheck className="h-6 w-6 text-black" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                                {appName.split(' ')[0]}
                            </span>
                            <span className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase">
                                {appName.split(' ')[1] || 'RENTAL'}
                            </span>
                        </div>
                    </Link>

                    <div className="hidden md:block">
                        <div className="flex items-baseline space-x-10">
                            <Link href="/" className="text-gray-400 hover:text-white text-xs font-bold tracking-[0.2em] uppercase transition-all relative group">
                                Accueil
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all group-hover:w-full"></span>
                            </Link>
                            <Link href="/cars" className="text-gray-400 hover:text-white text-xs font-bold tracking-[0.2em] uppercase transition-all relative group">
                                La Flotte
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all group-hover:w-full"></span>
                            </Link>
                            <Link href="/admin" className="text-gray-400 hover:text-white text-xs font-bold tracking-[0.2em] uppercase transition-all relative group">
                                Admin
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all group-hover:w-full"></span>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <Link href="/cars">
                            <button className="bg-white/5 border border-white/10 text-white hover:bg-gold hover:text-black hover:border-gold px-6 py-2 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300">
                                Réserver
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
