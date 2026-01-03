import CarCard from '@/components/CarCard';
import { prisma } from '@/lib/prisma';
import type { Car } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function CarsPage() {
    const cars = await prisma.car.findMany({
        orderBy: { pricePerDay: 'asc' }
    });

    return (
        <div className="min-h-screen py-24 px-4 max-w-7xl mx-auto">
            <div className="mb-20 animate-fade-in">
                <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-4 text-center">Notre Sélection</p>
                <h1 className="text-5xl md:text-8xl font-black mb-6 text-center tracking-tighter italic">LA <span className="text-gradient">FLOTTE</span></h1>
                <div className="w-24 h-[1px] bg-gold mx-auto mb-10"></div>
                <p className="text-gray-500 max-w-2xl mx-auto text-center font-light text-lg italic">
                    Chaque véhicule de notre collection est un chef-d'œuvre d'ingénierie,
                    entretenu avec une rigueur absolue pour votre plaisir.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {cars.map((car: Car) => (
                    <CarCard key={car.id} car={car} />
                ))}
            </div>
        </div>
    );
}
