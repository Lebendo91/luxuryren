import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Gauge, Zap, GitFork, Fuel, Gauge as Speed, ChevronLeft } from 'lucide-react';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import { getCarReservations } from '@/actions/reservations';

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let car = null;
    let existingReservations = [];

    try {
        const [carData, reservationsData] = await Promise.all([
            prisma.car.findUnique({ where: { id: id } }),
            getCarReservations(id)
        ]);
        car = carData;
        existingReservations = reservationsData;
    } catch (error) {
        console.error('Error fetching car details:', error);
    }

    if (!car) {
        return notFound();
    }

    return (
        <div className="min-h-screen pb-32">
            {/* Cinematic Hero */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 z-10" />
                <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover animate-pulse duration-[8000ms]"
                />
                <div className="absolute top-10 left-10 z-20">
                    <Link href="/cars" className="flex items-center space-x-2 text-white/40 hover:text-gold transition-all group">
                        <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Retour à la flotte</span>
                    </Link>
                </div>
                <div className="absolute bottom-0 left-0 p-8 md:p-20 z-20 max-w-7xl mx-auto w-full">
                    <p className="text-gold text-xs font-bold tracking-[0.5em] uppercase mb-4 animate-slide-right">{car.brand}</p>
                    <h1 className="text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter leading-none animate-fade-up italic">{car.name}</h1>
                    <div className="flex items-center space-x-6 animate-fade-up">
                        <div className="bg-gold text-black px-6 py-2 rounded-full font-black text-xl italic tracking-tighter">
                            {car.pricePerDay}€ <span className="text-xs font-bold">/ JOUR</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-20 grid grid-cols-1 lg:grid-cols-3 gap-20">
                <div className="lg:col-span-2 space-y-20">
                    <section>
                        <p className="text-gold text-[10px] font-bold tracking-[0.5em] uppercase mb-8">Performances</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            <div className="glass-card p-8 rounded-2xl flex flex-col items-center">
                                <Zap className="h-8 w-8 text-gold mb-4" />
                                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Puissance</p>
                                <p className="text-4xl font-black italic tracking-tighter">{car.power} <span className="text-xs">CH</span></p>
                            </div>
                            <div className="glass-card p-8 rounded-2xl flex flex-col items-center">
                                <Speed className="h-8 w-8 text-gold mb-4" />
                                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">0 - 100 KM/H</p>
                                <p className="text-4xl font-black italic tracking-tighter">{car.acceleration}<span className="text-xs uppercase">s</span></p>
                            </div>
                            <div className="glass-card p-8 rounded-2xl flex flex-col items-center">
                                <Gauge className="h-8 w-8 text-gold mb-4" />
                                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Vitesse Max</p>
                                <p className="text-4xl font-black italic tracking-tighter">{car.maxSpeed} <span className="text-xs">KM/H</span></p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <p className="text-gold text-[10px] font-bold tracking-[0.5em] uppercase mb-8">L'Art de l'Ingénierie</p>
                        <p className="text-gray-400 leading-relaxed text-xl font-light italic">
                            "{car.description}"
                        </p>
                        <div className="grid grid-cols-2 gap-12 mt-12 border-t border-white/10 pt-12">
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Transmission</p>
                                <p className="text-lg font-bold">{car.transmission}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Catégorie</p>
                                <p className="text-lg font-bold">{car.category}</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-28 bg-white/[0.03] backdrop-blur-3xl rounded-3xl p-10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter italic">Demande de <span className="text-gold">Réservation</span></h3>
                        <BookingForm car={car} existingReservations={existingReservations} />
                    </div>
                </div>
            </div>
        </div>
    );
}
