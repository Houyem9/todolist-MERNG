// Modules
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
mongoose.set('strictQuery', false)
const MONGODB_URL = process.env.MONGODB_LOCAL
// Connect to the DB
export const mongodb = mongoose.connect(MONGODB_URL).
catch(error => console.log(error));