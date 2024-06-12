const categoryModel = require('../models/categoryModel');
const menuModel = require('../models/menuModel');

const newCategory = async (req, res) => {
    try {
        const { title } = req.body;

        // Validate that the 'title' is provided
        if (!title) {
            return res.status(400).json({ error: 'Invalid data provided' });
        }

        // Create a new category instance without any menus
        const newCategory = new categoryModel({ title });

        // Save the new category to the database
        const savedCategory = await newCategory.save();

        res.status(201).json({
            message: 'Category created successfully',
            data: savedCategory
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error creating category',
            details: error.message
        });
    }
};


const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();

        if (categories.length === null) {
            return res.status(404).json({
                message: 'There are no data in category database'
            })
        }
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            error: 'Error retrieving categories',
            details: error.message
        });
    }
};


const getAllCategoriesByRestaurant = async (req, res) => {
    try {
        const categories = await menuModel.find({restaurant: req.params.id}).where("category").equals(req.params.catId);

        if (categories.length === null) {
            return res.status(404).json({
                message: 'There are no data in category database'
            })
        }
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            error: 'Error retrieving categories',
            details: error.message
        });
    }
};


const oneCategory = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id).populate('menus');
        if (!category) {
            return res.status(404).json({
                message: 'Category not found'
            })
        }

        res.status(200).json(category);

    } catch (error) {
        res.status(500).json({
            error: 'Error retrieving categories',
            details: error.message
        });
    }
}



module.exports = {
    newCategory,
    getAllCategories,
    oneCategory,
    getAllCategoriesByRestaurant
};