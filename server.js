const express = require('express')
const session = require('express-session')
require('dotenv').config()
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const { exphbs, engine } = require('express-handlebars')
// const routes = require('./routes');
const sequelize = require('./config/connection')
const app = express()
const PORT = process.env.PORT || 5432



const sessionConfig = {
    secret: process.env.DB_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
    cookie: {
        httpOnly: true,
    },
  }


app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({extended : true}))
// app.use(routes);
app.use(session(sessionConfig))


sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`)
    })
})