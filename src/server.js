const express = require ('express')
const productsRouter = require('./routes/products.router.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

 //products

app.use('/api/products', productsRouter)

//carts

app.use('/api/carts', ()=>{} )


app.listen(8080, () => {
    console.log('corriendo en el puerto 8080')
})