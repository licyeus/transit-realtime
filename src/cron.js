import cron from 'cron'
import { scrapeBusData } from './scraper'

scrapeBusData()

const job = new cron.CronJob('*/1 * * * *', scrapeBusData, null, true)
