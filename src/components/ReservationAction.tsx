'use client';

import { updateReservationStatus } from '@/actions/admin-reservations';
import { Button } from '@/components/ui/button';
import { Check, X, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ReservationAction({ id, currentStatus }: { id: string, currentStatus: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdate = async (status: string) => {
        setIsLoading(true);
        const result = await updateReservationStatus(id, status);
        if (result.success) {
            toast.success(`Réservation ${status === 'CONFIRMED' ? 'confirmée' : 'annulée'}`);
        } else {
            toast.error("Erreur lors de la mise à jour");
        }
        setIsLoading(false);
    };

    if (currentStatus === 'CANCELLED') return <span className="text-xs font-bold text-gray-600 uppercase">Annulée</span>;
    if (currentStatus === 'CONFIRMED') return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => handleUpdate('CANCELLED')}
            disabled={isLoading}
            className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
        >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Annuler"}
        </Button>
    );

    return (
        <div className="flex items-center gap-2">
            <Button
                size="sm"
                onClick={() => handleUpdate('CONFIRMED')}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white border-0"
            >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            </Button>
            <Button
                size="sm"
                variant="destructive"
                onClick={() => handleUpdate('CANCELLED')}
                disabled={isLoading}
            >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
            </Button>
        </div>
    );
}
