'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateReservationStatus(id: string, status: string) {
    const reservation = await prisma.reservation.update({
        where: { id },
        data: { status },
    });

    revalidatePath('/admin');
    return reservation;
}

export async function getRecentReservations(limit: number = 10) {
    return await prisma.reservation.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { car: true }
    });
}
export async function getCarReservations(carId: string) {
    return await prisma.reservation.findMany({
        where: {
            carId,
            status: { in: ['CONFIRMED', 'PICKED_UP', 'PENDING'] } // Only active or pending reservations
        },
        orderBy: { startDate: 'asc' }
    });
}
