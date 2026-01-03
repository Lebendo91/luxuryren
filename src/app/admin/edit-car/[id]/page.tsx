import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditCarForm from '@/components/EditCarForm';

export default async function EditCarPageRoute({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    const car = await prisma.car.findUnique({
        where: { id }
    });

    if (!car) {
        return notFound();
    }

    return <EditCarForm carData={car} params={{ id }} />;
}
