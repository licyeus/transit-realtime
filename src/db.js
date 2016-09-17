import pg from 'pg'

export const connectToDatabase = config =>
  new Promise(resolve => {
    const client = new pg.Client(config)
    client.connect(err => {
      if (err) { throw err }
      resolve(client)
    })
  })

export const query = (client, querystr, args = []) =>
  new Promise(resolve => {
    client.query(querystr, args, (err, result) => {
      if (err) { throw err }
      resolve(result)
    })
  })

export const closeConnection = client =>
  new Promise(resolve => {
    client.end(err => {
      if (err) { throw err }
      resolve()
    })
  })

