const express = require('express');
const router = express.Router();
const brandController = require("../controllers/brand.controller");

// router.route('/bulk-update').patch(brandController.bulkUpdateBrand)
// router.route('/bulk-delete').delete(brandController.bulkDeleteBrand)

router.route('/')
    .get(brandController.getBrands)
    .post(brandController.createBrand)

router.route('/:id')
    .get(brandController.getBrandById)
    .patch(brandController.updateBrandById)
    // .delete(brandController.deleteBrandById)

module.exports = router;