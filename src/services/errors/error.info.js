export const generateProductErrorInfo = (product) => {
  return `One or more of the following fields are missing or invalid: 
  List of requiered properties:
  - title: string, received ${product.title}
  - description: string, received ${product.description}
  - price: number, received ${product.price}
  - stock: number, received ${product.stock}
  - code: string, received ${product.code}
  - category: string, received ${product.category}
  `
}
