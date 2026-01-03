'use server'

import { prisma } from '@/lib/prisma';
import { sendTicketEmail } from '@/lib/mail';
import { redirect } from 'next/navigation';

export async function bookCar(formData: FormData) {
    const carId = formData.get('carId') as string;
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const pricePerDay = parseFloat(formData.get('pricePerDay') as string);

    // Calcul du prix total
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 car inclusive
    const totalPrice = diffDays * pricePerDay;

    // Génération du Ticket Code
    const ticketCode = `TKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Création de la réservation
    const reservation = await prisma.reservation.create({
        data: {
            carId,
            customerName: name,
            customerEmail: email,
            startDate: start,
            endDate: end,
            totalPrice,
            ticketCode,
            status: 'PENDING'
        },
        include: {
            car: true
        }
    });

    // Envoi de l'email
    await sendTicketEmail(
        email,
        ticketCode,
        reservation.car.name,
        startDate,
        endDate,
        totalPrice
    );

    // Redirection vers page succès
    redirect(`/booking-success?ticket=${ticketCode}`);
}
