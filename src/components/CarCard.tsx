import Link from 'next/link';
import { Car } from '@prisma/client';
import { Button } from './ui/button';
import { Zap, Gauge, ArrowRight } from 'lucide-react';

interface CarCardProps {
    car: Car;
}

export default function CarCard({ car }: CarCardProps) {
    return (
        <div className="group glass-card rounded-2xl overflow-hidden p-2">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] uppercase font-bold tracking-widest text-gold">
                        {car.category}
                    </span>
                </div>
            </div>

            <div className="p-5">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <p className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">{car.brand}</p>
                        <h3 className="text-2xl font-bold text-white group-hover:text-gold transition-colors">{car.name}</h3>
                    </div>
                    <div className="text-right">
                        <div className="bg-gold/10 px-3 py-1 rounded-lg border border-gold/20">
                            <span className="text-xl font-bold text-gold">{car.pricePerDay}€</span>
                            <span className="text-[10px] text-gray-400 block -mt-1">/ jour</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-3 p-3 bg-white/[0.03] rounded-xl border border-white/5">
                        <Zap className="h-4 w-4 text-gold" />
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Puissance</p>
                            <p className="text-sm font-bold">{car.power} ch</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white/[0.03] rounded-xl border border-white/5">
                        <Gauge className="h-4 w-4 text-gold" />
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">0-100</p>
                            <p className="text-sm font-bold">{car.acceleration}s</p>
                        </div>
                    </div>
                </div>

                <Link href={`/cars/${car.id}`} className="block">
                    <Button className="w-full bg-white text-black hover:bg-gold hover:text-black font-bold h-12 rounded-xl transition-all group/btn">
                        Détails & Réservation
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}
