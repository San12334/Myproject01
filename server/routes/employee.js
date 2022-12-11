const express = require("express");
const router = express.Router();
const employee_controller = require("../controllers/employee_controller")

router.post("/createEmployee", employee_controller.createEmployee.controller)
router.post("/signIn", employee_controller.signIn.controller)
router.post("/updateEmployee", employee_controller.updateEmployee.controller)
router.post("/deleteEmployee", employee_controller.deleteEmployee.controller)



router.get("/listEmployee", employee_controller.listEmployee.controller)
router.get("/getEmployeeDetails", employee_controller.getEmployeeDetails.controller)
router.get("/getHierarchyList", employee_controller.getHierarchyList.controller)


module.exports = router
