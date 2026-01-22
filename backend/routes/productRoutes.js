const express = require("express");
const Product = require("../models/Product");
const {protect, admin} = require ("../middleware/authMiddleware");

const router = express.Router();

// @Route POST /api/products
// @desc create a new product
// @access Private/Admin
router.post("/", protect, admin, async (req, res) => {
    try {
        const {
            name, 
            description, 
            price, 
            discountPrice, 
            countInStock, 
            category, 
            images, 
            isFeatured, 
            isPublished, 
            weight, 
            sku
        
        } = req.body;

        const product = new Product(
            {name, description, price, discountPrice, countInStock, category, images, isFeatured, isPublished, weight, sku, user: req.user._id, // Reference to the admin user who created it

            }
        );

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
});

// @route PUT /api/products/.id
// @desc update an existing product ID
// @access Private/admin
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const {
            name, 
            description, 
            price, 
            discountPrice, 
            countInStock, 
            category, 
            images, 
            isFeatured, 
            isPublished, 
            weight, 
            sku,
        
        } = req.body;

        // find prduct by ID
        const product = await Product.findById(req.params.id);

        if (product) {
            // update product fields
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.discountPrice = discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.category = category || product.category;
            product.images = images || product.images;
            product.isFeatured = isFeatured || product.isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.isPublished = isPublished || product.isPublished !== undefined ? isPublished : product.isPublished;
            product.weight = weight || product.weight;
            product.sku = sku || product.sku;


            // save the updated product to the db
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({message: "Product not found"});
        }
    } catch(error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
});

// @route DELETE /api/products/:id
// @desc Delete a product by ID
// @desc Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        // find the product by Id
        const product = await Product.findById(req.params.id);

        if(product) {
            // remove the product from the db
            await product.deleteOne();
            res.json({message: "Product removed"});
        } else {
            res.status(404).json({message: "Product not found"})
        }
    } catch(errror) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// @route Get /api/products
// @ desc Get all products with optional many filters
// @access public
router.get("/", async (req, res) => {
    try {
        const {collection, minPrice, maxPrice, sortBy, search, category, limit} = req.query;

        let query = {};

        // Filter logic
        if(collection && collection.toLocaleLowerCase() !== "all") {
            query.collections = collection;
        }

        if(category && category.toLocaleLowerCase() !== "all") {
            query.category = category;
        }

        if(minPrice || maxPrice) {
            query.price = {};
            if(minPrice) query.price.$gte = Number(minPrice);
            if(maxPrice) query.price.$gte = Number(maxPrice)
        }

        if(search) {
            query.$or = [
                {name: {$regex: search, $options: "i"}},
                {description: {$regex: search, $options: "i"}},
            ];
        }

        // sort logic
        let sort = {};
        if(sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = {price: 1};
                    break;
                case "priceDesc":
                    sort = {price: -1};
                    break;
                case "popularity":
                    sort = {rating: -1};
                    break;
                default:
                    break;    
            }
        }


        // fecth products and apply sorting and limit
        let products = await Product.find(query)
        .sort(sort)
        .limit(Number(limit) || 0);
        res.json(products);

    } catch(error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
});


// @route GET /api/products/best-seller
// @desc Retrieve the product with highest rating
// @access public
router.get("/best-seller", async (req, res) => {
    try {
        const bestSeller = await Product.findOne().sort({rating: -1});
        if(bestSeller) {
            res.json(bestSeller);
        } else {
            res.status(404).json({message: "No best seller found"})
        }
    } catch(error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
});

// @route GET /api/products/new-arrivals


// @route get /api/products/:id
// @desc get a single product by iD
// @access public
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product) {
            res.json(product);

        } else {
            res.status(404).json({message: "Product Not found"})
        }
    } catch(error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
});

// @route get /api/products/similar/:id
// @desc retriev similar products based on teh current product's gender and category
// @access public
router.get("/similar/:id", async (req, res) => {
    const {id} = req.params;
    
    try {
        const product = await Product.findById(id);

        if(!product) {
            return res.status(404).json({message: "Product not found"});
        }

        const similarProducts = await Product.find({
            _id: { $ne: id }, // Exclude the current product id
            category: product.category,
        }).limit(4);

        res.json(similarProducts);
    } catch(error) {
        console.error(error);
        res.status(500).send("Server Error") 
    }
});


module.exports = router;