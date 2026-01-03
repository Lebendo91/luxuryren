import Link from 'next/link';
import { ShieldCheck, Instagram, Facebook, Twitter } from 'lucide-react';
import { getSettingsMap } from '@/actions/settings';

export default async function Footer() {
    const settings = await getSettingsMap();

    const address = settings['contact_address'] || "88 Avenue des Champs-Élysées, Paris";
    const phone = settings['contact_phone'] || "+33 1 23 45 67 89";
    const email = settings['contact_email'] || "contact@luxury-rental.fr";
    const instagram = settings['social_instagram'] || "#";
    const facebook = settings['social_facebook'] || "#";
    const twitter = settings['social_twitter'] || "#";
    const appName = settings['app_name'] || "Luxury Rental";

    return (
        <footer className="bg-charcoal border-t border-white/5 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="md:col-span-1 space-y-6">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="bg-gold p-2 rounded-lg">
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
                    <p className="text-gray-500 text-sm italic">
                        L'excellence automobile à votre portée. Vivez des moments inoubliables au volant des plus belles machines au monde.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Navigation</h4>
                    <ul className="space-y-4 text-gray-500 text-sm">
                        <li><Link href="/" className="hover:text-gold transition-colors">Accueil</Link></li>
                        <li><Link href="/cars" className="hover:text-gold transition-colors">La Flotte</Link></li>
                        <li><Link href="/admin" className="hover:text-gold transition-colors">Administration</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Contact</h4>
                    <ul className="space-y-4 text-gray-500 text-sm">
                        <li>{address}</li>
                        <li>{phone}</li>
                        <li>{email}</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Suivez-nous</h4>
                    <div className="flex space-x-4">
                        <a href={instagram} className="bg-white/5 p-3 rounded-xl hover:bg-gold hover:text-black transition-all">
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a href={facebook} className="bg-white/5 p-3 rounded-xl hover:bg-gold hover:text-black transition-all">
                            <Facebook className="h-5 w-5" />
                        </a>
                        <a href={twitter} className="bg-white/5 p-3 rounded-xl hover:bg-gold hover:text-black transition-all">
                            <Twitter className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                <p>© {new Date().getFullYear()} {appName}. Tous droits réservés.</p>
                <div className="flex space-x-6 mt-4 md:mt-0 italic">
                    <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</Link>
                    <Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
                </div>
            </div>
        </footer>
    );
}
