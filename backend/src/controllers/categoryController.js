import categoryModel from '../models/categoryModel.js';

const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCategory = async (req, res) => {
    try {
        const category = await categoryModel.getCategoryById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCategory = async (req, res) => {
    try {
        const newCategory = await categoryModel.createCategory(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await categoryModel.updateCategory(req.params.id, req.body);
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        await categoryModel.deleteCategory(req.params.id);
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export default { getCategories, getCategory, createCategory, updateCategory, deleteCategory } 
