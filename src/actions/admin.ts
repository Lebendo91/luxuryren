'use server'

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { revalidatePath } from 'next/cache';

export async function addCar(formData: FormData) {
    const name = formData.get('name') as string;
    const brand = formData.get('brand') as string;
    const category = formData.get('category') as string;
    const pricePerDay = parseFloat(formData.get('pricePerDay') as string);
    const description = formData.get('description') as string;
    const power = parseInt(formData.get('power') as string);
    const acceleration = parseFloat(formData.get('acceleration') as string);
    const maxSpeed = parseInt(formData.get('maxSpeed') as string);
    const transmission = formData.get('transmission') as string;

    // Image Upload Handling
    const file = formData.get('image') as File;
    let imagePath = '';

    if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const path = join(process.cwd(), 'public', 'uploads', filename);

        await writeFile(path, buffer);
        imagePath = `/uploads/${filename}`;
    }

    await prisma.car.create({
        data: {
            name,
            brand,
            category,
            pricePerDay,
            image: imagePath,
            description,
            power,
            acceleration,
            maxSpeed,
            transmission
        }
    });

    revalidatePath('/admin');
    revalidatePath('/cars');
    redirect('/admin');
}

export async function deleteCar(id: string) {
    const car = await prisma.car.findUnique({ where: { id } });

    if (car?.image.startsWith('/uploads/')) {
        try {
            const filePath = join(process.cwd(), 'public', car.image);
            await unlink(filePath);
        } catch (error) {
            console.error('Error deleting image file:', error);
        }
    }

    await prisma.car.delete({ where: { id } });
    revalidatePath('/admin');
    revalidatePath('/cars');
}

export async function toggleAvailability(id: string, available: boolean) {
    await prisma.car.update({
        where: { id },
        data: { available }
    });
    revalidatePath('/admin');
    revalidatePath('/cars');
    revalidatePath(`/cars/${id}`);
}

export async function updateCar(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    const brand = formData.get('brand') as string;
    const category = formData.get('category') as string;
    const pricePerDay = parseFloat(formData.get('pricePerDay') as string);
    const description = formData.get('description') as string;
    const power = parseInt(formData.get('power') as string);
    const acceleration = parseFloat(formData.get('acceleration') as string);
    const maxSpeed = parseInt(formData.get('maxSpeed') as string);
    const transmission = formData.get('transmission') as string;

    const car = await prisma.car.findUnique({ where: { id } });
    if (!car) throw new Error('Car not found');

    // Image Upload Handling (Optional)
    const file = formData.get('image') as File;
    let imagePath = car.image;

    if (file && file.size > 0) {
        // Delete old image if it was a local upload
        if (car.image.startsWith('/uploads/')) {
            try {
                const oldPath = join(process.cwd(), 'public', car.image);
                await unlink(oldPath);
            } catch (e) { console.error(e); }
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const path = join(process.cwd(), 'public', 'uploads', filename);
        await writeFile(path, buffer);
        imagePath = `/uploads/${filename}`;
    }

    await prisma.car.update({
        where: { id },
        data: {
            name,
            brand,
            category,
            pricePerDay,
            image: imagePath,
            description,
            power,
            acceleration,
            maxSpeed,
            transmission
        }
    });

    revalidatePath('/admin');
    revalidatePath('/cars');
    revalidatePath(`/cars/${id}`);
    redirect('/admin');
}
