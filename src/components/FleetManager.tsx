'use client'

import { Trash2, Power, Eye, Edit, Car as CarIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteCar, toggleAvailability } from '@/actions/admin';

interface FleetManagerProps {
    cars: any[];
}

export default function FleetManager({ cars }: FleetManagerProps) {
    const router = useRouter();

    const handleDelete = async (id: string) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
            await deleteCar(id);
            router.refresh();
        }
    };

    return (
        <div className="grid grid-cols-1 gap-6">
            {cars.map((car) => (
                <div key={car.id} className="glass-card rounded-[2rem] p-6 flex flex-col md:flex-row items-center gap-8 group">
                    <div className="h-32 w-full md:w-56 overflow-hidden rounded-2xl border border-white/5 relative">
                        <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        {!car.available && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
                                <span className="text-[10px] font-black uppercase tracking-widest text-red-500 border border-red-500 px-3 py-1 rounded-full">Indisponible</span>
                            </div>
                        )}
                    </div>
                    <div className="flex-1 space-y-2 text-center md:text-left">
                        <p className="text-gold text-[10px] font-bold tracking-[0.3em] uppercase">{car.brand}</p>
                        <h3 className="text-2xl font-black italic tracking-tighter uppercase">{car.name}</h3>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            <span>{car.category}</span>
                            <span className="text-white/20">•</span>
                            <span>{car.pricePerDay}€/jour</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href={`/admin/edit-car/${car.id}`} title="Modifier le véhicule">
                            <button className="h-12 w-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center hover:bg-gold hover:text-black transition-all">
                                <Edit className="h-5 w-5" />
                            </button>
                        </Link>
                        <Link href={`/cars/${car.id}`} title="Voir sur le site">
                            <button className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                <Eye className="h-5 w-5" />
                            </button>
                        </Link>
                        <button
                            onClick={() => toggleAvailability(car.id, !car.available)}
                            title={car.available ? "Désactiver" : "Activer"}
                            className={`h-12 w-12 rounded-xl border flex items-center justify-center transition-all ${car.available
                                ? 'bg-green-500/10 border-green-500/20 text-green-500 hover:bg-green-500 hover:text-white'
                                : 'bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white'
                                }`}
                        >
                            <Power className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleDelete(car.id);
                            }}
                            className="h-12 w-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all z-20 relative"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            ))}
            {cars.length === 0 && (
                <div className="glass-card rounded-[2rem] p-20 text-center text-gray-600 italic">
                    La flotte est vide. Ajoutez votre premier véhicule !
                </div>
            )}
        </div>
    );
}
