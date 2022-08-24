import fastify from "fastify";
const app = fastify()

require('dotenv').config()


app.listen({ port: 3000 }, (error, adress) => {
    if(error) throw error
    console.log(`Project running on ${adress}`)

})