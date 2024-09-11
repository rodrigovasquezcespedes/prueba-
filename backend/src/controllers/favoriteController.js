import favoriteModel from '../models/favoriteModel.js'

const addFavorite = async (req, res) => {
  const { id_user, id_product } = req.body
  try {
    const favorite = await favoriteModel.addFavorite(id_user, id_product)
    res.status(201).json(favorite)
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar a favoritos', error })
  }
}

const getFavoritesByUserId = async (req, res) => {
  const { id_user } = req.params
  try {
    const favorites = await favoriteModel.getFavoritesByUserId(id_user)
    res.status(200).json(favorites)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los favoritos', error })
  }
}

const removeFavorite = async (req, res) => {
  const { id_favorite } = req.params
  try {
    const deletedFavorite = await favoriteModel.removeFavorite(id_favorite)
    res.status(200).json({ message: 'Favorito eliminado', deletedFavorite })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar de favoritos', error })
  }
}

export default {
  addFavorite,
  getFavoritesByUserId,
  removeFavorite
}
