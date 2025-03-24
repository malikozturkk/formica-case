import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const travelsData = [
    {
      departure: 'İstanbul',
      arrival: 'Ankara',
      departureTime: new Date('2025-04-17 09:00:00.000'),
      arrivalTime: new Date('2025-04-17 13:00:00.000'),
      amount: 1200,
      createdAt: new Date('2025-03-21 16:56:34.122'),
      updatedAt: new Date('2025-03-21 09:56:31.000'),
    },
    {
      departure: 'İstanbul',
      arrival: 'Ankara',
      departureTime: new Date('2025-04-17 10:00:00.000'),
      arrivalTime: new Date('2025-04-17 14:00:00.000'),
      amount: 1300,
      createdAt: new Date('2025-03-21 17:01:13.360'),
      updatedAt: new Date('2025-03-21 17:01:13.360'),
    },
    {
      departure: 'İstanbul',
      arrival: 'Ankara',
      departureTime: new Date('2025-04-17 11:00:00.000'),
      arrivalTime: new Date('2025-04-17 15:00:00.000'),
      amount: 1100,
      createdAt: new Date('2025-03-21 17:01:13.360'),
      updatedAt: new Date('2025-03-21 17:01:13.360'),
    },
    {
      departure: 'İstanbul',
      arrival: 'Ankara',
      departureTime: new Date('2025-04-17 12:00:00.000'),
      arrivalTime: new Date('2025-04-17 16:00:00.000'),
      amount: 1000,
      createdAt: new Date('2025-03-21 17:01:13.360'),
      updatedAt: new Date('2025-03-21 17:01:13.360'),
    },
    {
      departure: 'İstanbul',
      arrival: 'Ankara',
      departureTime: new Date('2025-04-17 13:00:00.000'),
      arrivalTime: new Date('2025-04-17 17:00:00.000'),
      amount: 850,
      createdAt: new Date('2025-03-21 17:01:13.360'),
      updatedAt: new Date('2025-03-21 17:01:13.360'),
    },
    {
      departure: 'İstanbul',
      arrival: 'Ankara',
      departureTime: new Date('2025-04-17 14:00:00.000'),
      arrivalTime: new Date('2025-04-17 18:00:00.000'),
      amount: 530,
      createdAt: new Date('2025-03-21 17:01:13.360'),
      updatedAt: new Date('2025-03-21 17:01:13.360'),
    },
    {
      departure: 'İstanbul',
      arrival: 'Ankara',
      departureTime: new Date('2025-04-17 15:00:00.000'),
      arrivalTime: new Date('2025-04-17 19:00:00.000'),
      amount: 525,
      createdAt: new Date('2025-03-21 17:01:13.360'),
      updatedAt: new Date('2025-03-21 17:01:13.360'),
    },
    {
      departure: 'İstanbul',
      arrival: 'Ankara',
      departureTime: new Date('2025-04-17 16:00:00.000'),
      arrivalTime: new Date('2025-04-17 20:00:00.000'),
      amount: 500,
      createdAt: new Date('2025-03-21 17:01:13.360'),
      updatedAt: new Date('2025-03-21 17:01:13.360'),
    },
    {
      departure: 'İstanbul',
      arrival: 'Ankara',
      departureTime: new Date('2025-04-17 17:00:00.000'),
      arrivalTime: new Date('2025-04-17 21:00:00.000'),
      amount: 700,
      createdAt: new Date('2025-03-21 17:01:13.360'),
      updatedAt: new Date('2025-03-21 17:01:13.360'),
    },
    {
      departure: 'İstanbul',
      arrival: 'Ankara',
      departureTime: new Date('2025-04-17 18:00:00.000'),
      arrivalTime: new Date('2025-04-17 22:00:00.000'),
      amount: 750,
      createdAt: new Date('2025-03-21 17:01:13.360'),
      updatedAt: new Date('2025-03-21 17:01:13.360'),
    },
    {
      departure: 'İstanbul',
      arrival: 'Ankara',
      departureTime: new Date('2025-04-17 19:00:00.000'),
      arrivalTime: new Date('2025-04-17 23:00:00.000'),
      amount: 800,
      createdAt: new Date('2025-03-21 17:01:13.360'),
      updatedAt: new Date('2025-03-21 17:01:13.360'),
    },
    {
      departure: 'İstanbul',
      arrival: 'Ankara',
      departureTime: new Date('2025-04-17 20:00:00.000'),
      arrivalTime: new Date('2025-04-18 00:00:00.000'),
      amount: 850,
      createdAt: new Date('2025-03-21 17:01:13.360'),
      updatedAt: new Date('2025-03-21 17:01:13.360'),
    },
    {
      departure: 'İstanbul',
      arrival: 'Ankara',
      departureTime: new Date('2025-04-17 21:00:00.000'),
      arrivalTime: new Date('2025-04-18 01:00:00.000'),
      amount: 999.99,
      createdAt: new Date('2025-03-21 10:02:17.000'),
      updatedAt: new Date('2025-03-21 10:02:19.000'),
    },
  ]

  for (const travel of travelsData) {
    await prisma.travels.create({
      data: travel,
    })
  }

  const usersData = [
    {
      firstName: 'Malik',
      lastName: 'Öztürk',
      email: 'malik@malik.com',
      password: '123123a',
      refreshToken: null,
      balance: 10000,
      createdAt: new Date('2025-03-21 16:56:34.122'),
      updatedAt: new Date('2025-03-21 09:56:31.000'),
    },
    {
      firstName: 'Test',
      lastName: 'Öztürk',
      email: 'test@malik.com',
      password: '123123b',
      refreshToken: null,
      balance: 2500,
      createdAt: new Date('2025-03-21 17:01:13.360'),
      updatedAt: new Date('2025-03-21 17:01:13.360'),
    },
    {
      firstName: 'Kemal',
      lastName: 'Atatürk',
      email: 'ataturk@ata.com',
      password: '1881a',
      refreshToken: null,
      balance: 500000,
      createdAt: new Date('2025-03-21 17:01:13.360'),
      updatedAt: new Date('2025-03-21 17:01:13.360'),
    },
  ]

  for (const user of usersData) {
    await prisma.users.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    })
  }

  console.log('Seed data for travels and users has been inserted.')
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
