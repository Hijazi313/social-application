const {verify} = require("jsonwebtoken");
const {AuthenticationError} = require("apollo-server-express");

module.exports = (context)=>{
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        const token = authHeader.split("Bearer ")[1];
        if(token){
            try{
                const user = verify(token, process.env.JWT_KEY)
                return user
            }
            catch(error){
                throw new AuthenticationError("Invalid/Expired Token")
            }
        }
        throw new Error("Authentication error must be \"Bearer [token]")
    }
    throw new Error("Authorization header must be provided")
}