
const jwtSecret = process.env.SECRET_KEY || "0a6b944d-d2fb-46fc-a85e-0295c986cd9f"

const MongoURI = "mongodb+srv://imhotep_user:z3mWb4wKRnW3wSYN@cluster0.zqfbflf.mongodb.net"

module.exports = {
    jwtSecret,
    MongoURI,
};