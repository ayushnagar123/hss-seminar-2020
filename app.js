
if(process.env.NODE_ENV!== 'production'){
    require('dotenv').config()
}
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.use('/',express.static(__dirname+'/public'))

app.get('/',(req,res)=>{
    res.render('index.html')
})

app.post('/',(req,res)=>{
    res.send('stripe')
})

app.listen(port,()=>{
    console.log('listening at port: ',port)
})