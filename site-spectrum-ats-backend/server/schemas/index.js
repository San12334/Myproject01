const employee_schema = require("./employee_schema")

module.exports = (db) => {

    db.model("employee", employee_schema);
    
    return db;

}