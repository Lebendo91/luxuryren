import Link from 'next/link';
import { Button } from './ui/button';
import { MousePointer2 } from 'lucide-react';

export default function Hero() {
    return (
        <div className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden">
            {/* Deep Shadow Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/20 to-black" />

            {/* Background Media */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40" />
                <img
                    src="https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2670&auto=format&fit=crop"
                    alt="Luxury Sport Car Detail"
                    className="w-full h-full object-cover scale-110 animate-pulse duration-[10000ms]"
                />
            </div>

            <div className="relative z-20 text-center max-w-5xl mx-auto px-4">
                <div className="mb-6 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold tracking-[0.2em] uppercase animate-fade-in">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                    </span>
                    <span>Expérience Exclusive</span>
                </div>

                <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.9] tracking-tighter animate-fade-up">
                    L'<span className="text-gradient">ADRÉNALINE</span><br />
                    <span className="text-white/90">SUR MESURE</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed animate-fade-up">
                    Dominez l'asphalte avec notre sélection ultra-limitée de supercars.
                    Performance brute, luxe absolu, service inégalé.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 animate-fade-up">
                    <Link href="/cars">
                        <button className="btn-premium group">
                            Explorer la Flotte
                            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                        </button>
                    </Link>
                    <Link href="/contact" className="text-white/60 hover:text-white flex items-center space-x-2 transition-all group">
                        <span className="border-b border-white/20 group-hover:border-white transition-all">En savoir plus</span>
                        <MousePointer2 className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce">
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-gold"></div>
            </div>
        </div>
    )
}
