import Hero from '@/components/Hero';
import CarCard from '@/components/CarCard';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Car } from '@prisma/client';

export default async function Home() {
  let featuredCars = [];
  try {
    featuredCars = await prisma.car.findMany({
      take: 3,
      orderBy: { pricePerDay: 'desc' }
    });
  } catch (error) {
    console.error('Error fetching featured cars:', error);
  }

  return (
    <div className="flex flex-col gap-32 pb-32">
      <Hero />

      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="animate-slide-right">
            <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-4">Collection Privée</p>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">LES PIÈCES <span className="text-gradient underline decoration-white/10 underline-offset-8">MAÎTRESSES</span></h2>
            <p className="text-gray-500 max-w-xl text-lg font-light leading-relaxed">
              Une sélection rigoureuse de supercars pour ceux qui refusent le compromis.
              Vivez l'excellence technologique et le design de pointe.
            </p>
          </div>
          <Link href="/cars" className="hidden md:flex items-center text-white/40 hover:text-gold text-sm font-bold tracking-widest uppercase transition-all group">
            Catalogue complet <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredCars.map((car: any) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="md:hidden mt-12 text-center">
          <Link href="/cars" className="inline-flex items-center text-gold font-bold uppercase tracking-widest text-sm">
            Voir tout le catalogue <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-white/[0.02] border-y border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div className="space-y-4">
            <div className="text-gold text-3xl font-black italic">01</div>
            <h3 className="text-xl font-bold uppercase tracking-widest">Prestige</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Seulement les modèles les plus récents et les plus exclusifs du marché.</p>
          </div>
          <div className="space-y-4">
            <div className="text-gold text-3xl font-black italic">02</div>
            <h3 className="text-xl font-bold uppercase tracking-widest">Sur Mesure</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Un service conciergerie dédié pour répondre à toutes vos exigences.</p>
          </div>
          <div className="space-y-4">
            <div className="text-gold text-3xl font-black italic">03</div>
            <h3 className="text-xl font-bold uppercase tracking-widest">Passion</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Plus qu'une location, une immersion dans l'univers de la haute performance.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
