import fastify from "fastify";
import { ReplyDefault } from "fastify/types/utils";

const app = fastify()


app.get('/', function (request, reply) {


    
    reply.send({ hello: 'world' })
  })


app.listen({ port: 3000 }, (error, adress) => {
    if(error) throw error

    console.log(`Project running on ${adress}`)

})