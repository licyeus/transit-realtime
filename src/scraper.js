import axios from 'axios'
import { connectToDatabase, query, closeConnection } from './db'

require('dotenv').config({ silent: true })

const AGENCIES = [
  98,    // Seattle Children\'s Hospital Shuttle
  3,     // Pierce Transit
  97,    // Everett Transit
  1,     // Metro Transit
  95,    // Washington State Ferries
  'KMD', // Kingcounty Marine Division
  19,    // Intercity Transit
  40,    // Sound Transit
  23,    // City of Seattle
  99,    // GO Transit
  29     // Community Transit
]

const DB_CONFIG = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST
}

export async function scrapeBusData () {
  try {
    const client = await connectToDatabase(DB_CONFIG)

    for (const agencyId of AGENCIES) {
      try {
        const url = `http://api.onebusaway.org/api/where/vehicles-for-agency/${agencyId}.json\?key\=${process.env.ONEBUSAWAY_API_KEY}`
        console.log(`scraping ${url}`)
        const response = await axios.get(url)
        const result = await query(client, 'insert into responses (url, response) values ($1, $2)', [url, response.data])
        console.log(`done`)
      } catch (err) {
        console.error(err)
      }
    }

    await closeConnection(client)
  } catch (err) {
    console.error(err)
  }
}
scrapeBusData()
