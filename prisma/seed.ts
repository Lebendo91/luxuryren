const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Nettoyage de la base de données existante pour éviter les doublons au ré-seed
  await prisma.reservation.deleteMany({})
  await prisma.car.deleteMany({})

  const cars = [
    {
      name: "911 GT3 RS",
      brand: "Porsche",
      category: "Supercar",
      pricePerDay: 1200,
      image: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop",
      description: "L'ultime voiture de piste homologuée pour la route. Précision chirurgicale et performance brute.",
      power: 525,
      acceleration: 3.2,
      maxSpeed: 296,
      transmission: "PDK"
    },
    {
      name: "Huracán STO",
      brand: "Lamborghini",
      category: "Supercar",
      pricePerDay: 1500,
      image: "https://images.unsplash.com/photo-1621275471769-e6aa344546d5?q=80&w=2073&auto=format&fit=crop",
      description: "Une super sportive créée dans un seul but : offrir les sensations et la technologie d'une véritable voiture de course.",
      power: 640,
      acceleration: 3.0,
      maxSpeed: 310,
      transmission: "LDF 7 rapports"
    },
    {
      name: "F8 Tributo",
      brand: "Ferrari",
      category: "Supercar",
      pricePerDay: 1400,
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
      description: "Le V8 le plus puissant et le plus performant jamais monté sur une Ferrari de série non-limitée.",
      power: 720,
      acceleration: 2.9,
      maxSpeed: 340,
      transmission: "F1 Dual-Clutch"
    },
    {
      name: "RS6 Avant",
      brand: "Audi",
      category: "Sport Break",
      pricePerDay: 800,
      image: "https://images.unsplash.com/photo-1603584173870-7f2a744ea23d?q=80&w=2546&auto=format&fit=crop",
      description: "L'alliance parfaite entre utilité quotidienne et performances de supercar. Le loup déguisé en agneau.",
      power: 600,
      acceleration: 3.6,
      maxSpeed: 250,
      transmission: "Tiptronic 8 rapports"
    },
    {
      name: "720S Spider",
      brand: "McLaren",
      category: "Convertible",
      pricePerDay: 1600,
      image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2070&auto=format&fit=crop",
      description: "Une supercar qui défie les lois de la physique avec une légèreté et une aérodynamique révolutionnaires.",
      power: 720,
      acceleration: 2.9,
      maxSpeed: 341,
      transmission: "SSG 7 rapports"
    }
  ]

  for (const car of cars) {
    await prisma.car.create({
      data: car
    })
  }

  console.log('Seed executed successfully with refreshed images')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
