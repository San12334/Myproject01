const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const employee_services = require("../services/employee_services")
const config = require("../../config")
const saltRounds = 10;

const createEmployee = {
    controller: async (req, res) => {
        let employee_obj = {...req.body}
        let password_hash = bcrypt.hashSync(employee_obj.password_hash, saltRounds);
        employee_obj.password_hash = password_hash
        let new_employee = await employee_services.create(employee_obj)
        res.respond(new_employee, 200, 'Employee created successfully.');
    }
}

const signIn = {
    controller: async (req, res) => {
        let {email,password} = req.body
        let found_user = await employee_services.getByEmail(email)

        if(found_user){

            let auth = await bcrypt.compare(password, found_user.password_hash); // true
            if(auth){
                let token = jwt.sign({token_type:"authentication_token", user_id:found_user._id, user_role: found_user.role }, config.jwtSecret, { algorithm: 'HS256'});
                res.respond({token}, 200, 'Token issued.');
            }else{
                res.respond("Authorization failed", 403, 'Try again');
            }

        }
        else{
            res.respond("Authorization failed", 403, 'Try again');
        }
    }
}

const listEmployee = {
    controller: async (req, res) => {
        let employees = await employee_services.listEmployees(req.query)
        res.respond(employees, 200, 'Employees fetched sucessfully');
    }
}

const getEmployeeDetails = {
    controller: async (req, res) => {
        let employee = await employee_services.getById(req.query.employee_id)
        if(employee){
            let employee_redacted = {...employee._doc}
            delete employee_redacted.password_hash
            res.respond(employee_redacted, 200, 'Employee fetched sucessfully');
        }else{
            res.respond({}, 404, 'Employee not found');
        }
    }
}

const getHierarchyList = {
    controller: async (req, res) => {
        let employees_hierachy = await employee_services.getByType(req.query.type)
        res.respond(employees_hierachy, 200, 'Employee fetched sucessfully');
    }
}

const updateEmployee = {
    controller: async (req, res) => {
        let update_obj = {...req.body}
        if(update_obj.password_hash){
            let password_hash = bcrypt.hashSync(update_obj.password_hash, saltRounds);
            update_obj.password_hash = password_hash
        }
        let updated_employee = await employee_services.updateEmployee(update_obj)
        if(updated_employee){
            res.respond("employee updated sucessfully", 200, 'Employee updated sucessfully');
        }
    }
}

const deleteEmployee = {
    controller: async (req, res) => {
        let deleted_employee = await employee_services.deleteEmployee(req.body.employee_id)
        if(deleted_employee){
            res.respond("employee deleted sucessfully", 200, 'Employee deleted sucessfully');
        }
    }
}

module.exports = { 
    createEmployee,
    listEmployee,
    getEmployeeDetails,
    getHierarchyList,
    updateEmployee,
    deleteEmployee,
    signIn
}