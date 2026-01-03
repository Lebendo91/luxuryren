'use client'

import { useState, useMemo } from 'react';
import { Car, Reservation } from '@prisma/client';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { bookCar } from '@/actions/book-car';
import { Loader2, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { addDays, format, isBefore, isAfter } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function BookingForm({
    car,
    existingReservations = []
}: {
    car: Car,
    existingReservations?: Reservation[]
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [dateFrom, setDateFrom] = useState<Date | undefined>();
    const [dateTo, setDateTo] = useState<Date | undefined>();

    // Gestion des dates d'ouverture des Popovers
    const [isStartOpen, setIsStartOpen] = useState(false);
    const [isEndOpen, setIsEndOpen] = useState(false);

    // Dates désactivées (Passées + Réservations)
    const disabledDays = useMemo(() => {
        const disabled: any[] = [
            { before: new Date() } // Dates passées
        ];

        existingReservations.forEach(res => {
            disabled.push({
                from: new Date(res.startDate),
                to: new Date(res.endDate)
            });
        });

        return disabled;
    }, [existingReservations]);

    // Calcul du prix total
    const totalPrice = useMemo(() => {
        if (!dateFrom || !dateTo) return 0;

        // Validation basique
        if (isBefore(dateTo, dateFrom)) return 0;

        const diffTime = Math.abs(dateTo.getTime() - dateFrom.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays * car.pricePerDay;
    }, [dateFrom, dateTo, car.pricePerDay]);

    const onSelectStart = (date: Date | undefined) => {
        setDateFrom(date);
        setIsStartOpen(false); // Ferme le calendrier après sélection

        // Si la date de fin est avant la nouvelle date de début, on la reset
        if (date && dateTo && isBefore(dateTo, date)) {
            setDateTo(undefined);
            toast.info("La date de fin a été réinitialisée car elle était antérieure au début.");
        } else if (date && !dateTo) {
            // Optionnel : Ouvrir automatiquement la date de fin ?
            // setIsEndOpen(true);
        }
    };

    const onSelectEnd = (date: Date | undefined) => {
        setDateTo(date);
        setIsEndOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!dateFrom || !dateTo) {
            toast.error("Veuillez sélectionner des dates valides.");
            return;
        }

        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        formData.set('startDate', format(dateFrom, 'yyyy-MM-dd'));
        formData.set('endDate', format(dateTo, 'yyyy-MM-dd'));

        try {
            await bookCar(formData);
        } catch (error) {
            console.error("Booking error:", error);
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <input type="hidden" name="carId" value={car.id} />
            <input type="hidden" name="pricePerDay" value={car.pricePerDay} />

            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    {/* BOUTON DÉBUT */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                            Début
                        </label>
                        <Popover open={isStartOpen} onOpenChange={setIsStartOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal h-14 bg-white/5 border-white/10 hover:bg-gold/10 hover:text-gold hover:border-gold/50 transition-all rounded-xl",
                                        !dateFrom && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-3 h-5 w-5 opacity-50" />
                                    {dateFrom ? (
                                        format(dateFrom, "dd MMM yyyy", { locale: fr })
                                    ) : (
                                        <span>Départ</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-[#0a0a0a] border-white/10" align="start">
                                <Calendar
                                    mode="single"
                                    selected={dateFrom}
                                    onSelect={onSelectStart}
                                    disabled={disabledDays}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* BOUTON FIN */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                            Fin
                        </label>
                        <Popover open={isEndOpen} onOpenChange={setIsEndOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal h-14 bg-white/5 border-white/10 hover:bg-gold/10 hover:text-gold hover:border-gold/50 transition-all rounded-xl",
                                        !dateTo && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-3 h-5 w-5 opacity-50" />
                                    {dateTo ? (
                                        format(dateTo, "dd MMM yyyy", { locale: fr })
                                    ) : (
                                        <span>Retour</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-[#0a0a0a] border-white/10" align="end">
                                <Calendar
                                    mode="single"
                                    selected={dateTo}
                                    onSelect={onSelectEnd}
                                    disabled={[
                                        ...disabledDays,
                                        // On empêche de sélectionner une date avant le début
                                        ...(dateFrom ? [{ before: dateFrom }] : [])
                                    ]}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Votre Nom</label>
                        <Input
                            required
                            name="name"
                            placeholder="John Doe"
                            className="bg-white/5 border-white/10 focus:border-gold h-12 rounded-xl"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Email</label>
                        <Input
                            required
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            className="bg-white/5 border-white/10 focus:border-gold h-12 rounded-xl"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Récapitulatif</p>
                        {dateFrom && dateTo ? (
                            <p className="text-sm text-gray-300 font-medium animate-in fade-in">
                                {format(dateFrom, 'dd MMM', { locale: fr })} <ArrowRight className="inline mx-1 h-3 w-3" /> {format(dateTo, 'dd MMM', { locale: fr })}
                            </p>
                        ) : (
                            <p className="text-sm text-gray-600 italic">Sélectionnez vos dates...</p>
                        )}
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-gold font-bold uppercase tracking-widest leading-none mb-1">Total</p>
                        <p className="text-3xl font-black italic tracking-tighter text-white">{totalPrice}€</p>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading || !dateFrom || !dateTo}
                    className="w-full btn-premium h-14 text-lg"
                >
                    {isLoading ? <Loader2 className="animate-spin h-6 w-6" /> : (
                        <div className="flex items-center space-x-3">
                            <CalendarIcon className="h-5 w-5" />
                            <span>Réserver Maintenant</span>
                        </div>
                    )}
                </Button>

                <p className="text-[10px] text-center text-gray-500 font-bold uppercase tracking-widest opacity-50">
                    Paiement sécurisé en agence • Annulation gratuite 24h avant
                </p>
            </div>
        </form>
    )
}
