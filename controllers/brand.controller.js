const { createBrandService, getBrandsService, getBrandByIdService, updateBrandByIdService } = require("../services/brand.services")

exports.createBrand = async (req, res, next) => {
    try {
        const result = await createBrandService(req.body);
        res.status(200).json({
            status: "success",
            message: "Successfully created the brand",
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: "Couldn't create the Brand"
        })
    }
}

exports.getBrands = async (req, res, next) => {
    try {
        const brands = await getBrandsService(data);
        res.status(200).json({
            status: "success",
            data: brands,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: "Couldn't create the Brand"
        })
    }
}

exports.getBrandById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const brand = await getBrandByIdService(id);
        if (!brand) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't find Brand the with the ID"
            })
        }
        res.status(200).json({
            status: "success",
            data: brand,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: "Couldn't create the Brand"
        })
    }
}

exports.updateBrandById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await updateBrandByIdService(id, req.body);

        console.log(result);

        // if (!result.modifiedCount)
        if (!result.nModified) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't update the Brand the with the ID"
            })
        }
        res.status(200).json({
            status: "success",
            message: "Successfully update the brand",
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: "Couldn't update the Brand"
        })
    }
}

