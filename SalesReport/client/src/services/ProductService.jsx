const baseUrl = 'https://localhost:7090/api/Product'

export const getAllProducts = () => {
    return fetch(`${baseUrl}`).then(res => res.json())
}