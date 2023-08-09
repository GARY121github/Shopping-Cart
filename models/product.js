const mongoose = require('mongoose');
const Reviews = require('./review');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    img: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        min: 0
    },
    desc: {
        type: String,
        trim: true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

productSchema.post("findOneAndDelete", async function (product) {
    if (product.reviews.length > 0) {
        await Reviews.deleteMany({ _id: { $in: product.reviews } });
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;