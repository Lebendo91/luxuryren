import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default async function BookingSuccessPage({
    searchParams
}: {
    searchParams: Promise<{ ticket: string }>
}) {
    const { ticket } = await searchParams;

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full glass-card rounded-[2.5rem] p-10 text-center animate-fade-in relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-premium-gradient"></div>

                <div className="flex justify-center mb-10">
                    <div className="bg-gold/10 p-5 rounded-full border border-gold/20">
                        <CheckCircle className="h-12 w-12 text-gold" />
                    </div>
                </div>

                <h1 className="text-4xl font-black italic tracking-tighter mb-4 uppercase">Réservation <span className="text-gradient">Confirmée</span></h1>
                <p className="text-gray-500 mb-10 font-light italic">
                    Votre demande a été traitée avec le plus grand soin.
                </p>

                <div className="bg-white/[0.03] p-10 rounded-3xl border border-white/5 mb-10 shadow-inner">
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.4em] mb-4">Code de Transaction</p>
                    <p className="text-4xl font-black text-gold tracking-widest font-mono italic animate-glow rounded-xl py-4">{ticket}</p>
                </div>

                <p className="text-sm text-gray-400 mb-8">
                    Un email contenant ce ticket a été envoyé.
                    Veuillez le présenter en agence pour finaliser votre location.
                </p>

                <Link href="/">
                    <Button className="w-full bg-white text-black hover:bg-gray-200">
                        Retour à l'accueil
                    </Button>
                </Link>
            </div>
        </div>
    )
}
