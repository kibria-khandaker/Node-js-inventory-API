const Product = require('../models/Product');
const Brand = require('../models/Brand');

// exports.getProductsService = async (limit) => {
// const products = await Product.find({}).limit(+limit)
// return products
// }
//or-->  query sort by name , quantity, price ...
exports.getProductsService = async (filters, queries) => {
    // const products = await Product.find({}).select('name description').sort(queries.sortBy)
    const products = await Product.find(filters)
        // const products = await Product.find({})
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)

    const total = await Product.countDocuments(filters)
    const page = Math.ceil(total / queries.limit)

    return { total, page, products }
}
//or--> any query not only limit , sort, price ...
// exports.getProductsService = async (query) => {
//     const products = await Product.find(query)
//     return products
// }

exports.createProductsService = async (data) => {
    const product = await Product.create(data);
    // step 1: _id, brand
    // step 2: update Brand model
    //update Brand  

    const { _id: productId, brand } = product;

    const res = await Brand.updateOne(
        { _id: brand.id },
        { $push: { products: productId } }
    )
    // console.log(res.nModified);
    console.log(res);
    return product;
};

exports.updateProductByIdService = async (productId, data) => {

    const product = await Product.findById(productId);
    const result = await product.set(data).save()
    // Or
    // const result = await Product.updateOne({ _id: productId }, { $set: data },{
    //     runValidators:true
    // });


    // const result = await Product.updateOne({ _id: productId }, { $inc: data }, {
    //     runValidators: true
    // });

    // const result = await Product.updateOne({ _id: productId }, { $inc: data }, {
    //     runValidators: true
    // });

    return result;
}

exports.bulkUpdateProductsService = async (data) => {
    // console.log(data.ids, data.data);
    // const result = await Product.updateMany({ _id: data.ids }, data.data, {
    //     runValidators: true
    // });

    const products = [];
    data.ids.forEach(product => {
        products.push(Product.updateOne({ _id: product.id }, product.data));
    })
    const result = await Promise.all(products);
    console.log(result);
    return result;
}

exports.deleteProductByIdService = async (id) => {
    // const product = await Product.findById(productId);
    // const result = await product.set(data).save()

    // const result = await Product.updateOne({ _id: productId }, { $set: data },{
    //     runValidators:true
    // });

    const result = await Product.deleteOne({ _id: id });
    return result;
}

exports.bulkDeleteProductsService = async (ids) => {

    // Delete all items
    // const result = await Product.deleteMany({});
    // console.log(data.ids, data.data);

    // Delete By ids
    const result = await Product.deleteMany({ _id: ids });
    return result;
}