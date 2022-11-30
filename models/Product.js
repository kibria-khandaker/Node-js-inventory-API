const mongoose = require("mongoose")
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;


const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide a product name"],
    trim: true,
    unique: [true, " name must be unique"],
    lowercase: true,
    minLength: [3, "name will minimum 3 characters"],
    maxLength: [20, "name will minimum 3 characters"],
  },
  description: {
    type: String,
    required: [true, "Please Provide a product description"],
  },
  unit: {
    type: String,
    required: [true, "Please Provide a product unit"],
    enum: {
      values: ["kg", "litre", "pcs", "bag"],
      message: "Unit value can't be {VALUE}, must be kg/liter/pcs/bag"
    }
  },
  imageUrl: [{
    type: String,
    required: [true, "Please Provide a product unit"],
    validate: {
      validator: (value) => {
        if(!Array.isArray(value)){
          return false;
        }
        let isValid = true;
        value.forEach(url => {
          if(!validator.isURL(url)){
            isValid =  false;
          }
        });
        return isValid;
      },
      message: "Please provide valid image urls"
    }
  }],
  categories: {
    type: String,
    required: true
  },
  brand: {
    name: {
      type: String,
      required: true
    },
    id: {
      type: ObjectId,
      ref: "Brand",
      required: true
    }
  }
}, {
  timestamps: true,
})

productSchema.pre('save', function (next) {
  console.log("Before Saving data");
  if (this.quantity == 0) {
    this.status = "out-of-stock"
  }
  next()
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;