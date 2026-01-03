import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function MentionsLegales() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto space-y-12">
                <Link href="/" className="inline-flex items-center space-x-2 text-gold hover:text-white transition-colors group">
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Retour à l'accueil</span>
                </Link>

                <div className="space-y-4">
                    <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase">Informations</p>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">Mentions <span className="text-gradient">Légales</span></h1>
                </div>

                <div className="glass-card p-8 md:p-12 rounded-3xl space-y-10 text-gray-400 leading-relaxed border border-white/5">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-black italic uppercase text-white tracking-tight">1. Éditeur du site</h2>
                        <p>
                            Le site <span className="text-white font-bold">Luxury Rental</span> est édité par la société LUXURY RENTAL SAS,
                            au capital de 1 000 000 €, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 123 456 789.
                        </p>
                        <ul className="space-y-2 list-none">
                            <li><span className="text-white font-bold">Siège social :</span> 88 Avenue des Champs-Élysées, 75008 Paris</li>
                            <li><span className="text-white font-bold">Directeur de la publication :</span> Jean De La Roche</li>
                            <li><span className="text-white font-bold">Email :</span> contact@luxury-rental.fr</li>
                            <li><span className="text-white font-bold">Téléphone :</span> +33 1 23 45 67 89</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black italic uppercase text-white tracking-tight">2. Hébergement</h2>
                        <p>
                            Le site est hébergé par la société Vercel Inc., située au 340 S Lemon Ave #4133 Walnut, CA 91789, USA.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black italic uppercase text-white tracking-tight">3. Propriété intellectuelle</h2>
                        <p>
                            L'ensemble du contenu de ce site (textes, images, vidéos, logos) est la propriété exclusive de LUXURY RENTAL SAS
                            ou de ses partenaires. Toute reproduction, même partielle, est strictement interdite sans autorisation préalable.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black italic uppercase text-white tracking-tight">4. Responsabilité</h2>
                        <p>
                            Luxury Rental s'efforce d'assurer l'exactitude des informations diffusées sur ce site. Toutefois, nous ne saurions être
                            tenus responsables des omissions ou des inexactitudes. L'utilisateur utilise le site à ses seuls risques.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
