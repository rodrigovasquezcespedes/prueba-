import favoriteModel from '../models/favoriteModel.js'

const addFavorite = async (req, res) => {
  const { idUser, idProduct } = req.body
  try {
    const favorite = await favoriteModel.addFavorite(idUser, idProduct)
    res.status(201).json(favorite)
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar a favoritos', error })
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
