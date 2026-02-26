const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not set')
    }

    const connection = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000
    })

    console.log('✓ MongoDB Connected')
    return connection
  } catch (error) {
    console.error('✗ MongoDB Connection Error:', error.message)
    process.exit(1)
  }
}

module.exports = connectDB
