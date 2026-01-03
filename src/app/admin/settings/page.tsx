import { getSettings, seedDefaultSettings } from '@/actions/settings';
import SettingsForm from '@/components/SettingsForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminSettings() {
    let settings = await getSettings();

    // Seed if empty
    if (settings.length === 0) {
        await seedDefaultSettings();
        settings = await getSettings();
    }

    return (
        <div className="min-h-screen py-24 px-4 max-w-7xl mx-auto space-y-16">
            <div className="space-y-6">
                <Link href="/admin" className="inline-flex items-center space-x-2 text-gold hover:text-white transition-colors group">
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Retour au tableau de bord</span>
                </Link>

                <div>
                    <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-4">Administration</p>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">Config<span className="text-gradient">uration</span></h1>
                </div>
            </div>

            <SettingsForm initialSettings={settings} />
        </div>
    );
}
