const baseUrl = 'https://localhost:7090/api/SalesOrderDetail'

export const getByProductId = (productId) => {
    return fetch(`${baseUrl}/GetByProductId/${productId}`).then(res => res.json())
}