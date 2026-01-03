'use client';

import { useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { updateSettings } from '@/actions/settings';

export default function SettingsForm({ initialSettings }: { initialSettings: any[] }) {
    const [settings, setSettings] = useState(initialSettings);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (key: string, value: string) => {
        setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await updateSettings(settings.map(({ key, value }) => ({ key, value })));
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    const groups = ['APP', 'CONTACT', 'SOCIAL', 'SEO'];
    const groupLabels: Record<string, string> = {
        'APP': 'Application & Global',
        'CONTACT': 'Informations de Contact',
        'SOCIAL': 'Réseaux Sociaux',
        'SEO': 'Référencement (SEO)'
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-16">
            {groups.map(group => (
                <div key={group} className="space-y-8">
                    <div className="flex items-center space-x-4">
                        <div className="h-px flex-1 bg-white/5"></div>
                        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gold/50">{groupLabels[group]}</h3>
                        <div className="h-px flex-1 bg-white/5"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {settings.filter(s => s.group === group).map(setting => (
                            <div key={setting.id} className="glass-card p-6 rounded-2xl border border-white/5 space-y-3">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                                    {setting.key.replace(/_/g, ' ')}
                                </label>
                                <input
                                    type="text"
                                    value={setting.value}
                                    onChange={(e) => handleChange(setting.key, e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none transition-all font-medium text-sm"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div className="fixed bottom-12 right-12 flex items-center space-x-6">
                {showSuccess && (
                    <div className="flex items-center space-x-2 text-green-500 font-bold text-sm animate-in fade-in slide-in-from-bottom-4">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Paramètres enregistrés</span>
                    </div>
                )}
                <button
                    type="submit"
                    disabled={isSaving}
                    className="btn-premium flex items-center space-x-3 shadow-2xl shadow-gold/20"
                >
                    <Save className="h-5 w-5" />
                    <span>{isSaving ? 'Enregistrement...' : 'Enregistrer'}</span>
                </button>
            </div>
        </form>
    );
}
