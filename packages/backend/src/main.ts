import fastify from "fastify";
import connectDB, { prisma } from "./helpers/connectMongoDB";
const app = fastify()

require('dotenv').config()


app.get('/', async function (request, reply) {

  const newUser = await prisma.text.create({
    data: {
      text: "",
      addedDate: new Date()

    },
  })

  const text = await prisma.text.count()  
    reply.send({ allText: text })
  })




app.listen({ port: 3000 }, (error, adress) => {
    if(error) throw error
    connectDB()
    console.log(`Project running on ${adress}`)

})