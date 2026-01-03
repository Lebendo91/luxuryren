import { getReservations, updateReservationStatus } from '@/actions/admin-reservations';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';
import { ArrowLeft, Check, X, Clock, Car as CarIcon, Calendar } from 'lucide-react';
import ReservationAction from '@/components/ReservationAction';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-dynamic';

export default async function AdminReservations() {
    const reservations = await getReservations();

    return (
        <div className="min-h-screen py-24 px-4 max-w-7xl mx-auto space-y-12">
            <div className="space-y-6">
                <Link href="/admin" className="inline-flex items-center space-x-2 text-gold hover:text-white transition-colors group">
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Retour au tableau de bord</span>
                </Link>

                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-4">Gestion</p>
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">Les <span className="text-gradient">Réservations</span></h1>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {reservations.map((res: any) => (
                    <div key={res.id} className="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors border border-white/5">

                        {/* Status bar */}
                        <div className={cn(
                            "absolute left-0 top-6 bottom-6 w-1 rounded-r-full",
                            res.status === 'PENDING' && "bg-orange-500",
                            res.status === 'CONFIRMED' && "bg-green-500",
                            res.status === 'CANCELLED' && "bg-red-500"
                        )}></div>

                        <div className="flex-1 space-y-2 ml-4">
                            <div className="flex items-center gap-3">
                                <span className="text-gold font-mono text-sm tracking-wider">{res.ticketCode}</span>
                                <Badge variant="outline" className={cn(
                                    "text-[10px] font-bold uppercase tracking-widest border-0",
                                    res.status === 'PENDING' && "bg-orange-500/10 text-orange-500",
                                    res.status === 'CONFIRMED' && "bg-green-500/10 text-green-500",
                                    res.status === 'CANCELLED' && "bg-red-500/10 text-red-500"
                                )}>
                                    {res.status}
                                </Badge>
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-tight text-white">{res.customerName}</h3>
                            <div className="flex items-center text-xs text-gray-500 gap-4">
                                <span className="flex items-center gap-1"><CarIcon className="h-3 w-3" /> {res.car.brand} {res.car.name}</span>
                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {format(new Date(res.startDate), 'dd MMM')} - {format(new Date(res.endDate), 'dd MMM yyyy')}</span>
                            </div>
                        </div>

                        <div className="text-right px-4">
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Total</p>
                            <p className="text-2xl font-black italic text-white">{res.totalPrice}€</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <ReservationAction id={res.id} currentStatus={res.status} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
