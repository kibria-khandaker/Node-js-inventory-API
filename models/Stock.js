const mongoose = require("mongoose")
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = mongoose.Schema({
  productId: {
    type: ObjectId,
    required: true,
    ref: 'Product'
  },
  name: {
    type: String,
    required: [true, "Please Provide a stock name"],
    trim: true,
    unique: [true, " name must be unique"],
    lowercase: true,
    minLength: [3, "name will minimum 3 characters"],
    maxLength: [20, "name will minimum 3 characters"],
  },
  description: {
    type: String,
    required: [true, "Please Provide a stock description"],
  },
  unit: {
    type: String,
    required: [true, "Please Provide a stock unit"],
    enum: {
      values: ["kg", "litre", "pcs", "bag"],
      message: "Unit value can't be {VALUE}, must be kg/liter/pcs/bag"
    }
  },
  imageURLs: [{
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        if (!Array.isArray(value)) {
          return false;
        }
        let isValid = true;
        value.forEach(url => {
          if (!validator.isURL(url)) {
            isValid = false;
          }
        });
        return isValid;
      },
      message: "Please provide valid image urls"
    }
  }],
  price: {
    type: number,
    require: true,
    min: [0, "Product price can not nagative"]
  },
  quantity: {
    type: number,
    require: true,
    min: [0, "Product quantity can not nagative"]
  },
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
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["in-stack", "out-of-stock", "discontinued"],
      message: "Status can't be {VALUE}"
    }
  },
  store: {
    name: {
      type: String,
      trim: true,
      required: [true, "plz provide a store name"],
      lowercase: true,
      enum: {
        values: ["dhaka", "chattogram", "rajshahi", "sylhet", "khulna", "barishal", "rangpur", "maymanshing"],
        message: "{VALUE} is not a valid name"
      }
    },
    id: {
      type: ObjectId,
      required: true,
      ref: 'Store'
    }
  },
  suppliedBy: {
    name: {
      type: String,
      trim: true,
      required: [true, "plz provide a supplier name"],
      lowercase: true,
    },
    id: {
      type: ObjectId,
      required: true,
      ref: 'Supplied'
    }
  }

}, {
  timestamps: true,
})

stockSchema.pre('save', function (next) {
  console.log("Before Saving data");
  if (this.quantity == 0) {
    this.status = "out-of-stock"
  }
  next()
})

const Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock;