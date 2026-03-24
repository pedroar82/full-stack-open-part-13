require('dotenv').config()
const { Sequelize, Model, DataTypes, Op } = require('sequelize')
const express = require('express')
const app = express()

app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

class Blogs extends Model {}
Blogs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      default: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blogs',
  },
)


app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blogs.create(req.body)
    return res.json(blog)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blogs.findAll()  
  res.json(blogs)
})

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const deleted = await Blogs.destroy({
      where: { id: req.params.id },
      force: true,
    })
    if (deleted === 0) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    res.status(204)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})