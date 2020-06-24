if(process.env.NODE_ENV !== 'productio'){
    require('dotenv').config()
}
 const API =
 process.env.API
 const express = require('express')
 const app = express()
 app.use(express.json())
 app.use(express.static('public'))

 app.post('/weather', (req, res) => {
 console.log(req.body)
 })

 app.listen(3000, () => {
   console.log('Server started') 
 })