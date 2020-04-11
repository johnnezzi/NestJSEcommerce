import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  seller: {
    type: Boolean,
    default: false,
  },
  address: {
    addr1: String,
    addr2: String,
    city: String,
    county: String,
    postcode: String,
    country: String,
  },
  created: {
    type: Date,
    default: Date.now
  }
})