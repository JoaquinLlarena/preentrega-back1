const { Router } = require ('express')
const ProductManagerFile = require('../managers/productManagerFile')

const router = Router()

const productService = new ProductManagerFile()


router
    .get('/', async (req, res)=> {
        const products = await productService.getProducts()
        res.send(
        products
        )
    })
    .get('/:pid', async (req, res)=> {
        const {pid} = req.params
        const product = await productService.getProduct(parseInt(pid))
        if (!product) {
            return res.status(400).send({
                status: 'error', 
                mensagge: 'No se encuentra el producto'
            })
        }
        res.send({
            status: 'success',
            payload: product
        })
    })



    .post("/", async (req, res) => {
        const productoNuevo = {
          title: req.body.title,
          description: req.body.description,
          code: req.body.code,
          price: req.body.price,
          status: req.body.status  || true,
          stock: req.body.stock,
          category: req.body.category,
          thumbnails: req.body.thumbnails  || [] ,
        };
        res.send(await productService.agregarProducto(productoNuevo));
      })





    .put('/:pid', async (req, res)=> {
        const {pid} = req.params
        res.send('put product '+pid)
    })
    .delete('/:pid', async (req, res)=> {
        const {pid} = req.params
        res.send('delete product '+pid)
    })

module.exports = router