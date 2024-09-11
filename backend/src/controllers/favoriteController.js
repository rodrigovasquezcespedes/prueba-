import favoriteModel from '../models/favoriteModel.js';

export const getFavorites = async (req, res) => {
    try {
        const favorites = await favoriteModel.getFavoritesByUserId(req.params.userId);
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addFavorite = async (req, res) => {
    try {
        const newFavorite = await favoriteModel.addFavorite(req.params.userId, req.body.productId);
        res.status(201).json(newFavorite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFavorite = async (req, res) => {
    try {
        await favoriteModel.removeFavorite(req.params.userId, req.params.productId);
        res.json({ message: 'Product removed from favorites' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
