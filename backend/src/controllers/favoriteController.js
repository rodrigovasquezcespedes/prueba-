import favoriteModel from '../models/favoriteModel.js'

const addFavorite = async (req, res) => {
  const { idUser, idProduct } = req.body
  if (!idUser || !idProduct) {
    return res.status(400).json({ message: 'Faltan datos necesarios' })
  }

  try {
    const result = await favoriteModel.addFavorite(idUser, idProduct)
    res.status(201).json({ message: 'Producto agregado a favoritos', result })
  } catch (error) {
    console.error('Error al agregar a favoritos:', error)
    res.status(500).json({ message: 'Error al agregar a favoritos' })
  }
}

const getFavoritesByUserId = async (req, res) => {
  const { idUser } = req.params
  try {
    const favorites = await favoriteModel.getFavoritesByUserId(idUser)
    res.status(200).json(favorites)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los favoritos', error })
  }
}

const removeFavorite = async (req, res) => {
  const { idFavorite } = req.params
  try {
    const deletedFavorite = await favoriteModel.removeFavorite(idFavorite)
    if (!deletedFavorite) {
      return res.status(404).json({ message: 'Favorito no encontrado' })
    }
    res.status(200).json({ message: 'Favorito eliminado', deletedFavorite })
  } catch (error) {
    console.error('Error al eliminar de favoritos:', error)
    res.status(500).json({ message: 'Error al eliminar de favoritos', error })
  }
}

export default {
  addFavorite,
  getFavoritesByUserId,
  removeFavorite
}
