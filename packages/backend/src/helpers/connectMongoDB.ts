import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function connectDB() {
  await prisma.$connect().catch((e: any) => console.log(e)).finally(() => console.log('MongoDB Connection Success.'))
}

export default connectDB
export { prisma }