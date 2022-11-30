const {
    getProductsService,
    createProductsService,
    updateProductByIdService,
    bulkUpdateProductsService,
    deleteProductByIdService,
    bulkDeleteProductsService
} = require("../services/product.services")

exports.getProducts = async (req, res, next) => {
    try {

        // const products = await Product.find({ $or: [{ _id: "6345b253f029c0126066ae52" }, "coco"] })
        // const products = await Product.find({ status:{$ne:"out-of-stock"} })
        // const products = await Product.find({ quantity:{$gt:100} })
        // const products = await Product.find({ quantity:{$gte:100} })
        // const products = await Product.find({ name: { $in:[ "coco", "Chal"]} })
        // const products = await Product.find({}, 'name quantity')
        // const products = await Product.find({}, '-name -quantity')
        // const products = await Product.find({}).limit(2)
        // const products = await Product.find({}).sort({quantity:-1})
        // const products = await Product.find({}).sort({quantity:1})
        // const products = await Product.find({}).select({name:1})

        // const products = await Product.where("name").equals("Chal").where("quantity").gt(100)
        // const products = await Product
        // .where("name").equals(/\w/)
        // .where("quantity").gt(100)
        // .limit(3).sort({quantity:-1})

        // const products = await Product.find({})       
        // res.status(200).json({
        //     status: "success",
        //     data: products
        // })       

        // const product = await Product.findById("63368cd66902e306102b8254")
        // res.status(200).json({
        //   status: "success",
        //   data: product
        // })

        // const products = await getProductsService(req.query.limit)

        // console.log('query object is 111:-',req.query);

        let filters = { ...req.query };
        
        // sort , page, limit -> exclude 
        //Node-Mongo Advanced Crash Course class(7.4-7.5)
        // http://localhost:5000/api/v1/product?status=in-stack&page=2&limit=3&sort=1 
        const excludeFields = ['sort', 'page', 'limit']
        excludeFields.forEach(filed => delete filters[filed])

        // gt, lt, gte, lte theke $ symble ke sranu
        //-ok---> http://localhost:5000/api/v1/product?price[lt]=50
        let filtersString = JSON.stringify(filters)
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g , match=>`$${match}`)

        // console.log(JSON.parse(filtersString));
        filters = JSON.parse(filtersString)

        const queries = {}

        // http://localhost:5000/api/v1/product?sort=price,quentity 
        if (req.query.sort) {
            const sortBy=req.query.sort.split(',').join(' ')
            queries.sortBy=sortBy
            console.log(sortBy);
        }

        // http://localhost:5000/api/v1/product?sort=price,quentity&fields=name,description 
        // http://localhost:5000/api/v1/product?sort=price,quentity&fields=name,description,-_id 
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            queries.fields=fields
            console.log(fields);
        }

        if (req.query.page) {
            // 50 product
            // each page 10 product
            // page 1 --> 1-10
            // page 2 --> 11-20
            // page 3 --> 21-30  --->page 3 skip 1-20   ---> page 3 - page 2 = -(2*10)
            // page 4 --> 31-40  --->page 4 skip 1-30   ---> page 4 - page 3 = -(3*10)
            // page 5 --> 41-50  --->page 5 skip 1-40   ---> page 5 - page 4 = -(4*10)
            // http://localhost:5000/api/v1/product?page=3&limit=2

            const {page=1, limit=5} = req.query;  // "3" sting hisebe number gulu thake need convert number
            const skip = (page -1)*parseInt(limit);
            queries.skip=skip
            queries.limit=parseInt(limit)

        }
        // console.log('ordinal array object:-', req.query);
        // console.log('query object is 222:-',filters);

        // const products = await getProductsService(req.query)
        const products = await getProductsService(filters,queries)

        res.status(200).json({
            status: "success",
            data: products
        })


    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the data",
            error: error.message,
        })
    }
}

exports.createProduct = async (req, res, next) => {
    // res.send('it working')
    // console.log(req.body);

    try {
        //we can do two way to save or create data in MDB

        // save way 1
        // const product = new Product(req.body)
        // const result = await product.save()

        // create way 2
        // const result = await Product.create(req.body)

        // if need anything before save data to MDB 3
        // const product = new Product(req.body)
        // if (product.quantity == 0) {
        //   product.status = "out-of-stock"
        // }
        const result = await createProductsService(req.body)
        result.logger()


        res.status(200).json({
            status: "Success",
            message: "Data inserted Successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Data inserted Failed",
            error: error.message
        })
    }

}

exports.updateProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateProductByIdService(id, req.body)
        res.status(200).json({
            status: "Success",
            message: "Data Successfully Update of product",
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Product Update Failed",
            error: error.message
        })
    }
}

exports.bulkUpdateProduct = async (req, res, next) => {
    try {
        console.log(req.body);
        const result = await bulkUpdateProductsService(req.body)

        res.status(200).json({
            status: "Success",
            message: "Data Successfully Bulk-Update of product",

        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Product Bulk-Update Failed",
            error: error.message
        })
    }
}

exports.bulkDeleteProduct = async (req, res, next) => {
    try {
        console.log(req.body);
        const result = await bulkDeleteProductsService(req.body.ids)
        // const result = await bulkDeleteProductsService(req.body)
        res.status(200).json({
            status: "Success",
            message: "Data Successfully Bulk-Delete of product",

        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Product Bulk-Delete Failed",
            error: error.message
        })
    }
}

exports.deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteProductByIdService(id)

        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Could not Deleted Your Single product"
            })
        }

        // console.log(result);
        // console.log(req.body);
        // const result = await bulkUpdateProductsService(req.body)

        res.status(200).json({
            status: "Success",
            message: "Data Successfully Deleted Your Single product",

        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Product Failed to Delete",
            error: error.message
        })
    }
}




