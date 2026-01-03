export async function getSettingsMap() {
    try {
        const settings = await prisma.setting.findMany();
        return settings.reduce((acc: Record<string, string>, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});
    } catch (error) {
        console.error('Error fetching settings:', error);
        return {};
    }
}

export async function getSettingValue(key: string, defaultValue: string = '') {
    const setting = await prisma.setting.findUnique({
        where: { key }
    });
    return setting?.value || defaultValue;
}

export async function updateSetting(key: string, value: string) {
    const setting = await prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value, group: 'GENERAL' } // Default group if not exists
    });

    revalidatePath('/');
    return setting;
}

export async function updateSettings(settings: { key: string, value: string }[]) {
    const promises = settings.map(s => prisma.setting.update({
        where: { key: s.key },
        data: { value: s.value }
    }));

    await Promise.all(promises);
    revalidatePath('/');
}

export async function seedDefaultSettings() {
    const defaultSettings = [
        // CONTACT
        { key: 'contact_address', value: '88 Avenue des Champs-Élysées, Paris', group: 'CONTACT' },
        { key: 'contact_phone', value: '+33 1 23 45 67 89', group: 'CONTACT' },
        { key: 'contact_email', value: 'contact@luxury-rental.fr', group: 'CONTACT' },

        // SOCIAL
        { key: 'social_instagram', value: '#', group: 'SOCIAL' },
        { key: 'social_facebook', value: '#', group: 'SOCIAL' },
        { key: 'social_twitter', value: '#', group: 'SOCIAL' },

        // APP
        { key: 'app_name', value: 'Luxury Rental', group: 'APP' },
        { key: 'currency', value: '€', group: 'APP' },
        { key: 'min_rental_days', value: '1', group: 'APP' },

        // SEO
        { key: 'seo_title', value: 'Luxury Rental - Location de Voitures de Sport', group: 'SEO' },
        { key: 'seo_description', value: 'Louez les voitures les plus exclusives au monde.', group: 'SEO' },
    ];

    for (const s of defaultSettings) {
        await prisma.setting.upsert({
            where: { key: s.key },
            update: {}, // Don't overwrite if already exists
            create: s
        });
    }
}
