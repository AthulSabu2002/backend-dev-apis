const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const connectDb = async () =>{
  try{
      const connect = await mongoose.connect(process.env.MONGO_URI);
      console.log("Database Connected: ", connect.connection.host, connect.connection.name)
  }
  catch(err){
      console.log(err);
      process.exit();
  }
};

connectDb();

const userSchema = new mongoose.Schema({
  username: { type: String, required: true }
})
const User = mongoose.model('User', userSchema)

const exerciseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true }
})
const Exercise = mongoose.model('Exercise', exerciseSchema)


app.post('/api/users', async (req, res) => {
  try {
    const user = new User({ username: req.body.username })
    await user.save()
    res.json({ username: user.username, _id: user._id })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: 'Could not create user' })
  }
})

app.get('/api/users', async (req, res) => {
  const users = await User.find({}, 'username _id')
  res.json(users)
})

app.post('/api/users/:_id/exercises', async (req, res) => {
  const { description, duration, date } = req.body
  const user = await User.findById(req.params._id)
  if (!user) return res.json({ error: 'User not found' })

  let exerciseDate = date ? new Date(date) : new Date()
  if (exerciseDate.toString() === 'Invalid Date') exerciseDate = new Date()

  const exercise = new Exercise({
    userId: user._id,
    description,
    duration: parseInt(duration),
    date: exerciseDate
  })
  await exercise.save()
  res.json({
    _id: user._id,
    username: user.username,
    date: exercise.date.toDateString(),
    duration: exercise.duration,
    description: exercise.description
  })
})

app.get('/api/users/:_id/logs', async (req, res) => {
  const { from, to, limit } = req.query
  const user = await User.findById(req.params._id)
  if (!user) return res.json({ error: 'User not found' })

  let filter = { userId: user._id }
  if (from || to) {
    filter.date = {}
    if (from) filter.date.$gte = new Date(from)
    if (to) filter.date.$lte = new Date(to)
  }

  let query = Exercise.find(filter).select('description duration date -_id')
  if (limit) query = query.limit(parseInt(limit))

  const log = await query.exec()
  res.json({
    _id: user._id,
    username: user.username,
    count: log.length,
    log: log.map(e => ({
      description: e.description,
      duration: e.duration,
      date: e.date.toDateString()
    }))
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})