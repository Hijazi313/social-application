const {UserInputError, AuthenticationError} = require("apollo-server-express")
const {hash, compare } = require("bcryptjs");
const {sign} = require("jsonwebtoken");

const {validateUserLogin}  = require("../../utils/validators")

const User = require("../../models/userSchema");

const generateAuthToken = ({_id, email, name})=>{
    return sign({
        _id,
        email,
        name
    }, process.env.JWT_KEY,
    {expiresIn: '1h'}
    )
}
module.exports = {
        Mutation:{
            createUser:async (parent, {createUserInput: {name, email, password}}, context, info)=>{
                const user = await User.findOne({email});
                if(user) throw new UserInputError(`User with ${email} already exists`)
                password = await hash(password, 12);
                const newUser  = new User({
                    name, email, password 
                });
                return await newUser.save() 
 
            },
            login: async (parent, {email, password})=>{
                const {errors, valid}  = validateUserLogin(email, password)
                const user = await User.findOne({email})

                if(!user){
                    errors.general = 'User not Found'
                    throw new AuthenticationError('Wrong Credentials', { errors })
                }

                const match = await compare(password, user.password);
                if(!match){
                    errors.general = 'Wrong Credentials'
                    throw new AuthenticationError('Wrong Credentials', { errors })
                }

                const token = generateAuthToken(user);
                return {user, token}
            }
        }
}