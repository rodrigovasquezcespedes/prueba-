import cartModel from '../models/cartModel.js'

const createCart = async (req, res) => {
  const { idUser } = req.body
  try {
    const cart = await cartModel.createCart(idUser)
    res.status(201).json(cart)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el carrito', error })
  }
}

const getCartByUserId = async (req, res) => {
  const { idUser } = req.params
  try {
    const cart = await cartModel.getCartByUserId(idUser)
    const items = await cartModel.getCartItems(cart.id_cart)
    res.status(200).json({ cart, items })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el carrito', error })
  }
}

const addItemToCart = async (req, res) => {
  const { idCart, idProduct, quantity } = req.body
  try {
    const cartItem = await cartModel.addItemToCart(
      idCart,
      idProduct,
      quantity
    )
    res.status(201).json(cartItem)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al añadir el producto al carrito', error })
  }
}

const removeItemFromCart = async (req, res) => {
  const { idCartItem } = req.params
  try {
    const deletedItem = await cartModel.removeItemFromCart(idCartItem)
    res
      .status(200)
      .json({ message: 'Producto eliminado del carrito', deletedItem })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al eliminar el producto del carrito', error })
  }
}

export default {
  createCart,
  getCartByUserId,
  addItemToCart,
  removeItemFromCart
}
