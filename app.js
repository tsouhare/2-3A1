// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

const restaurantsData = require("./restaurant.json").results

// require express-handlebars here
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get("/", (req, res) => {
  // past the restaurant data into 'index' partial template
  res.render("index", { restaurantsData })
})

app.get("/search", (req, res) => {
  if (!req.query.keywords) {
    return res.redirect("/")
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  const filterRestaurantsData = restaurantsData.filter(
    data =>
      data.name.toLowerCase().includes(keyword) ||
      data.category.includes(keyword)
  )

  res.render("index", { restaurantsData: filterRestaurantsData, keywords })
})

app.get("/restaurants/:restaurantId", (req, res) => {
  const { restaurantId } = req.params
  const restaurantData = restaurantsData.find(
    data => data.id === Number(restaurantId)
  )
  res.render("show", { restaurantData })
})


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})