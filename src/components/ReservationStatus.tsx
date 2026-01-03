'use client';

import { useState } from 'react';
import { ChevronDown, CheckCircle2, Clock, Car, XCircle, RotateCcw } from 'lucide-react';
import { updateReservationStatus } from '@/actions/reservations';
import { cn } from '@/lib/utils';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const statuses = [
    { id: 'PENDING', label: 'En attente', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { id: 'CONFIRMED', label: 'Confirmé', icon: CheckCircle2, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { id: 'PICKED_UP', label: 'En location', icon: Car, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { id: 'RETURNED', label: 'Terminé', icon: RotateCcw, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    { id: 'CANCELLED', label: 'Annulé', icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
];

export default function ReservationStatus({
    reservationId,
    initialStatus
}: {
    reservationId: string,
    initialStatus: string
}) {
    const [currentStatus, setCurrentStatus] = useState(initialStatus);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleStatusChange = async (newStatus: string) => {
        setIsLoading(true);
        setOpen(false);
        try {
            await updateReservationStatus(reservationId, newStatus);
            setCurrentStatus(newStatus);
        } catch (error) {
            console.error('Failed to update status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const activeStatus = statuses.find(s => s.id === currentStatus) || statuses[0];
    const Icon = activeStatus.icon;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    disabled={isLoading}
                    className={cn(
                        "flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-all duration-300 group outline-none",
                        activeStatus.bg,
                        activeStatus.border,
                        isLoading && "opacity-50 cursor-not-allowed"
                    )}
                >
                    <Icon className={cn("h-3 w-3", activeStatus.color)} />
                    <span className={cn("text-[8px] font-black uppercase tracking-widest", activeStatus.color)}>
                        {isLoading ? 'Mise à jour...' : activeStatus.label}
                    </span>
                    <ChevronDown className={cn("h-3 w-3 text-gray-400 group-hover:text-white transition-transform", open && "rotate-180")} />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0 bg-zinc-950 border-white/10" align="end">
                <div className="py-1">
                    {statuses.map((status) => {
                        const SIcon = status.icon;
                        return (
                            <button
                                key={status.id}
                                onClick={() => handleStatusChange(status.id)}
                                className={cn(
                                    "w-full flex items-center space-x-3 px-4 py-3 hover:bg-white/5 transition-colors text-left",
                                    currentStatus === status.id && "bg-white/5"
                                )}
                            >
                                <SIcon className={cn("h-4 w-4", status.color)} />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-300">
                                    {status.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </PopoverContent>
        </Popover>
    );
}
