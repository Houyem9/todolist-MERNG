// Modules
import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

// Imports
import { schema } from './graphql/schema/index.js'
import { createPubSub, createYoga } from 'graphql-yoga'
import { mongodb } from './config/mongodb.js'

dotenv.config()

const PORT = process.env.PORT_LOCAL

// initialize the server
const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ }))



const pubsub = createPubSub()
// GraphQL yoga Config
const yoga = createYoga({
  schema,
  context: async () => {
      const contextData = {}
      contextData.pubsub = pubsub

      return contextData
  },
})

app.use('/graphql', yoga)
// If no API routes are hit
app.get('*', (req, res) => {
  res.send({ message: 'todolist API server' })
})


// Connect to mongodb then Start the Server 
mongodb
  .then(() => app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`)))
  .catch((err) => console.error(err))
