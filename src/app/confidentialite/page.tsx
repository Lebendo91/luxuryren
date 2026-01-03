import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function Confidentialite() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto space-y-12">
                <Link href="/" className="inline-flex items-center space-x-2 text-gold hover:text-white transition-colors group">
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Retour à l'accueil</span>
                </Link>

                <div className="space-y-4">
                    <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase">Sécurité</p>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">Confiden<span className="text-gradient">tialité</span></h1>
                </div>

                <div className="glass-card p-8 md:p-12 rounded-3xl space-y-10 text-gray-400 leading-relaxed border border-white/5">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-black italic uppercase text-white tracking-tight">1. Collecte des données</h2>
                        <p>
                            Nous collectons les informations que vous nous fournissez lors de l'utilisation de nos services,
                            notamment votre nom, adresse email, numéro de téléphone et informations relatives au permis de conduire
                            pour la finalisation de vos réservations.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black italic uppercase text-white tracking-tight">2. Utilisation des données</h2>
                        <p>
                            Vos données sont utilisées exclusivement pour :
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Gérer vos réservations de véhicules</li>
                            <li>Assurer la sécurité de nos prestations</li>
                            <li>Vous contacter en cas de nécessité relative à votre location</li>
                            <li>Améliorer nos services et votre expérience utilisateur</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black italic uppercase text-white tracking-tight">3. Conservation des données</h2>
                        <p>
                            Vos données à caractère personnel sont conservées uniquement pendant la durée nécessaire aux finalités pour lesquelles
                            elles sont collectées, conformément à la réglementation en vigueur (RGPD).
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black italic uppercase text-white tracking-tight">4. Vos droits</h2>
                        <p>
                            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition
                            au traitement de vos données. Pour exercer ces droits, contactez-nous à : <span className="text-gold italic">dpo@luxury-rental.fr</span>.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
