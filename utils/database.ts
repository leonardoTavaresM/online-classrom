import { Collection, MongoClient } from 'mongodb'

interface ConnectType {
  db: Collection
  client: MongoClient
}

const client = new MongoClient(process.env.DATABASE_URL ?? 'default_value', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export default async function connect(): Promise<ConnectType> {
  //verificar se ja existe uma conexao, dai ai sim, se conectar
  //as funcoes serveless sao disparadas varias vezes
  if (!client.isConnected()) await client.connect()

  const db = client.db('teach-other').collection('users')
  return { db, client }
}
