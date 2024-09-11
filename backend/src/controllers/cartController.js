import cartModel from '../models/cartModel.js'

const getCart = async (req, res) => {
  try {
    const cart = await cartModel.getCartByUserId(req.params.userId)
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }
    const cartItems = await cartModel.getCartItems(cart.id_cart)
    res.json({ cart, items: cartItems })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addItem = async (req, res) => {
  try {
    const cart = await cartModel.getCartByUserId(req.params.userId)
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }
    const newItem = await cartModel.addItemToCart(cart.id_cart, req.body)
    res.status(201).json(newItem)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateItem = async (req, res) => {
  try {
    const cart = await cartModel.getCartByUserId(req.params.userId)
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }
    const updatedItem = await cartModel.updateCartItem(cart.id_cart, req.body)
    res.json(updatedItem)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const removeItem = async (req, res) => {
  try {
    const cart = await cartModel.getCartByUserId(req.params.userId)
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }
    await cartModel.removeItemFromCart(cart.id_cart, req.params.productId)
    res.json({ message: 'Item removed from cart' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createCart = async (req, res) => {
  try {
    const newCart = await cartModel.createCart(req.params.userId)
    res.status(201).json(newCart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteCart = async (req, res) => {
  try {
    const cart = await cartModel.getCartByUserId(req.params.userId)
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }
    await cartModel.deleteCart(cart.id_cart)
    res.json({ message: 'Cart deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export default {
  getCart,
  addItem,
  updateItem,
  removeItem,
  createCart,
  deleteCart
}
