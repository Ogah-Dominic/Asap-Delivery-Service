const router = require('express').Router();

const { 
    createMenu,
    getOneMenue,
    getAllMenu,
    updateMenu,
    deleteMenu,
    getAllMenuInDatabase, 
    getAllRestMenu} = require("../controllers/menuController")
    const { isAdmin, userAuth,isRole } = require("../middleware/authmiddleware")

router.route('/:id/create-menu/:categoryId').post(userAuth,isRole, createMenu)
router.route('/menu/getone/:id').get(getOneMenue)
router.route('/menu/getall/:restId').get(getAllMenu )
router.route('/menu/getall/').get(getAllMenuInDatabase )
router.route('/menu/update/:id').put(isRole,updateMenu )
router.route('/menu/delete').delete(userAuth, deleteMenu )
router.route('/rest/get-all-menu').get(userAuth, getAllRestMenu)

module.exports = router