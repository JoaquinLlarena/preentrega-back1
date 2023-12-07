const fs = require('node:fs')

const path = './src/mockDB/Productos.json'

class ProductManagerFile{
    constructor(){
        this.path = path
    }

    readFile = async () => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(data)            
        } catch (error) {
            return []
        }        
    }

    getProducts = async () => {
        try {
            return await this.readFile()
        } catch (error) {
            return 'No se encuentran productos'
        }
    }

    
    getProduct = async (id) => {
        try {
            const products = await this.readFile()
            if(!products) return 'No hay productos'
            return products.find(product => product.id === id)                     
        } catch (error) {
            return  new Error(error)
        }
    }
    
    
    async agregarProducto(producto) {
        let listadoProductos = await this.readFile();
        producto.id = 1
        listadoProductos = [...listadoProductos, producto];
        await fs.promises.writeFile (this.path,JSON.stringify(listadoProductos, null, 2))
        return "USTED AGREGO CON EXITO ESTE PRODUCTO";
      }

    async update(pid, updateToProduct){
        let products = await this.readFile()

        const productIndex = products.findIndex(product => pid === product.id)
        if (productIndex !== -1) { // ! = =
            products[productIndex] = updateToProduct
        }
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8')
        return 'producto acualizado'
    }
    
}


module.exports = ProductManagerFile
