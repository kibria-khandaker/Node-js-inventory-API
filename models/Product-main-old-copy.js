// const mongoose = require("mongoose")

// // Schema design ---------------------- 5
// const productSchema = mongoose.Schema({
//     name: {
//       type: String,
//       required: [true, "Please Provide a product name"],
//       trim: true,
//       unique: [true, " name must be unique"],
//       minLength: [3, "name will minimum 3 characters"],
//       maxLength: [20, "name will minimum 3 characters"],
//     },
//     description: {
//       type: String,
//       required: [true, "Please Provide a product description"],
//     },
//     price: {
//       type: Number,
//       required: [true, "Please Provide price of product"],
//       min: [0, "Price can't be nagative it will minimum 0 amount"]
//     },
//     unit: {
//       type: String,
//       required: [true, "Please Provide a product unit"],
//       enum: {
//         values: ["kg", "litre", "pcs"],
//         message: "Unit value can't be {VALUE}, must be kg/liter/pcs"
//       }
//     },
//     quantity: {
//       type: Number,
//       required: [true, "Please Provide a product quantity"],
//       min: [0, "quantity can't be nagative it will minimum 0 quantity"],
//       validate: {
//         validator: (value) => {
//           const isInteger = Number.isInteger(value);
//           if (isInteger) {
//             return true
//           } else {
//             return false
//           }
//         }
//       },
//       message: "Quantity must be integer"
//     },
//     status: {
//       type: String,
//       required: true,
//       enum: {
//         values: ["in-stack", "out-of-stock", "discontinued"],
//         message: "Status can't be {VALUE}"
//       }
//     },
//     // createdAt: {
//     //   type: Date,
//     //   default: Date.now,
//     // },
//     // updatedAt: {
//     //   type: Date,
//     //   default: Date.now,
//     // },
//     // supplier: {
//     //   type: mongoose.Schema.Types.ObjectId,
//     //   ref: "Supplier"
//     // },
//     // categories: [{
//     //   name: {
//     //     type: String,
//     //     required: true
//     //   },
//     //   _id: mongoose.Schema.Types.ObjectId,
//     // }]
  
//   }, {
//     timestamps: true,
//   })
  
//   // Mongoose middleware for saving data: pre / post ------------- 7
//   productSchema.pre('save', function (next) {
//     console.log("Before Saving data");
//     if (this.quantity == 0) {
//       this.status = "out-of-stock"
//     }
//     next()
//   })
  
//   productSchema.post('save', function (doc, next) {
//     console.log("After Saving data");
//     next()
//   })
  
//   // ------------- 8
//   productSchema.methods.logger = function () {
//     console.log(`Data saved for :- ${this.name}`);
//   }
  
//   // Model make -------------------- 6
//   const Product = mongoose.model('Product', productSchema)



// module.exports = Product;