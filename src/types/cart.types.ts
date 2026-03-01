export interface CartItem {
  id: string
  quantity: number
  Medicine: {
    id: string
    name: string
    price: number
    image: string
    manufacturer: string
  }
}