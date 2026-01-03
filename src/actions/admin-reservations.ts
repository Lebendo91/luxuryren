'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getReservations() {
    try {
        const reservations = await prisma.reservation.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                car: true
            }
        });
        return reservations;
    } catch (error) {
        console.error("Error fetching reservations:", error);
        return [];
    }
}

export async function updateReservationStatus(id: string, status: string) {
    try {
        await prisma.reservation.update({
            where: { id },
            data: { status }
        });
        revalidatePath('/admin/reservations');
        return { success: true };
    } catch (error) {
        console.error("Error updating reservation:", error);
        return { success: false, error: "Failed to update reservation" };
    }
}
