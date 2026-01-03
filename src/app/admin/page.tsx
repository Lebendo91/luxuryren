import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { TrendingUp, Users, Clock, Plus, Car as CarIcon, FileText, Settings } from 'lucide-react';
import Link from 'next/link';
import FleetManager from '@/components/FleetManager';
import ReservationStatus from '@/components/ReservationStatus';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const reservations = await prisma.reservation.findMany({
        orderBy: { createdAt: 'desc' },
        include: { car: true }
    });

    const cars = await prisma.car.findMany({
        orderBy: { createdAt: 'desc' }
    });

    const stats = {
        totalRevenue: reservations.reduce((acc: number, curr: any) => acc + curr.totalPrice, 0),
        totalBookings: reservations.length,
        pending: reservations.filter((r: any) => r.status === 'PENDING').length,
        activeCars: cars.filter((c: any) => c.available).length
    };

    return (
        <div className="min-h-screen py-24 px-4 max-w-7xl mx-auto space-y-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-4">Administration</p>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">Tableau de <span className="text-gradient">Bord</span></h1>
                </div>
                <Link href="/admin/add-car">
                    <button className="btn-premium flex items-center space-x-3">
                        <Plus className="h-5 w-5" />
                        <span>Nouveau Véhicule</span>
                    </button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="glass-card p-10 rounded-3xl space-y-6">
                    <div className="h-14 w-14 bg-gold/10 rounded-2xl flex items-center justify-center border border-gold/20">
                        <TrendingUp className="h-7 w-7 text-gold" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Revenu Total</p>
                        <h3 className="text-4xl font-black italic">{stats.totalRevenue.toLocaleString()}€</h3>
                    </div>
                </div>
                <div className="glass-card p-10 rounded-3xl space-y-6">
                    <div className="h-14 w-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                        <Users className="h-7 w-7 text-white" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Réservations</p>
                        <h3 className="text-4xl font-black italic">{stats.totalBookings}</h3>
                    </div>
                </div>
                <div className="glass-card p-10 rounded-3xl space-y-6">
                    <div className="h-14 w-14 bg-gold/10 rounded-2xl flex items-center justify-center border border-gold/20">
                        <Clock className="h-7 w-7 text-gold" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">En Attente</p>
                        <h3 className="text-4xl font-black italic">{stats.pending}</h3>
                    </div>
                </div>
                <div className="glass-card p-10 rounded-3xl space-y-6">
                    <div className="h-14 w-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                        <CarIcon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">La Flotte</p>
                        <h3 className="text-4xl font-black italic">{cars.length}</h3>
                    </div>
                </div>
            </div>

            {/* Content sections */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-16">

                {/* Fleet Management - Client Component */}
                <div className="xl:col-span-2 space-y-10">
                    <div className="flex justify-between items-end">
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter">Gestion de la <span className="text-gold">Flotte</span></h2>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{cars.length} Véhicules</p>
                    </div>
                    <FleetManager cars={cars} />
                </div>

                {/* Recent Activities */}
                <div className="space-y-10">
                    <div className="flex justify-between items-end">
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter">Activités <span className="text-gold">Récentes</span></h2>
                        <Link href="/admin/reservations" className="text-[10px] font-bold text-gold uppercase tracking-widest hover:text-white transition-colors">
                            Voir tout
                        </Link>
                    </div>
                    <div className="space-y-8">
                        {reservations.slice(0, 10).map((res: any) => (
                            <div key={res.id} className="glass-card rounded-3xl p-8 border border-white/5 space-y-4 relative group">
                                <div className={cn(
                                    "absolute top-0 right-0 h-1 w-24 opacity-20",
                                    res.status === 'PENDING' && "bg-orange-500",
                                    res.status === 'CONFIRMED' && "bg-blue-500",
                                    res.status === 'PICKED_UP' && "bg-purple-500",
                                    res.status === 'RETURNED' && "bg-green-500",
                                    res.status === 'CANCELLED' && "bg-red-500"
                                )}></div>

                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{res.ticketCode}</p>
                                        <h4 className="text-xl font-bold uppercase tracking-tighter">{res.customerName}</h4>
                                    </div>
                                    <ReservationStatus
                                        reservationId={res.id}
                                        initialStatus={res.status}
                                    />
                                </div>

                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                    <CarIcon className="h-4 w-4 text-gold" />
                                    <span>{res.car.brand} {res.car.name}</span>
                                </div>

                                <div className="pt-4 border-t border-white/5 flex justify-between items-center px-1">
                                    <span className="text-[10px] text-gray-500 font-bold uppercase">{format(new Date(res.startDate), 'dd MMM', { locale: fr })}</span>
                                    <span className="text-gold font-black italic">{res.totalPrice}€</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Quick Links / Settings Section */}
            <div className="pt-24 border-t border-white/5 space-y-12">
                <div className="flex flex-col md:row justify-between items-end gap-6">
                    <div>
                        <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-4">Paramètres</p>
                        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">Configuration <span className="text-gradient">Système</span></h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                    <Link href="/mentions-legales" className="glass-card p-8 rounded-3xl border border-white/5 hover:border-gold/50 transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-gold/10 transition-colors">
                                <FileText className="h-6 w-6 text-gray-400 group-hover:text-gold transition-colors" />
                            </div>
                            <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Public</span>
                        </div>
                        <h4 className="text-lg font-bold uppercase italic mb-2 leading-none">Mentions Légales</h4>
                        <p className="text-xs text-gray-500">Éditer ou consulter les mentions légales</p>
                    </Link>

                    <Link href="/confidentialite" className="glass-card p-8 rounded-3xl border border-white/5 hover:border-gold/50 transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-gold/10 transition-colors">
                                <FileText className="h-6 w-6 text-gray-400 group-hover:text-gold transition-colors" />
                            </div>
                            <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Public</span>
                        </div>
                        <h4 className="text-lg font-bold uppercase italic mb-2 leading-none">Confidentialité</h4>
                        <p className="text-xs text-gray-500">Politique de gestion des cookies et données</p>
                    </Link>

                    <Link href="/admin/settings" className="glass-card p-8 rounded-3xl border border-white/5 hover:border-gold/50 transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-gold/10 transition-colors">
                                <Settings className="h-6 w-6 text-gray-400 group-hover:text-gold transition-colors" />
                            </div>
                            <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Privé</span>
                        </div>
                        <h4 className="text-lg font-bold uppercase italic mb-2 leading-none">Paramètres</h4>
                        <p className="text-xs text-gray-500">Configuration globale de la plateforme</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
