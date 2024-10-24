const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models/index');

class UserService {

    async Create(userData) {
        const { firstname, lastname, email, phone,  password, } = userData;
    
        // Check if the user already exists
        const exisitngUser = await db.Users.findOne(
            { where: 
                { email: email } 
            });
        
        if(exisitngUser != null) return {message : `appoliogize for any Inconvenience but we already have a user with this ${email}, please pick another email, thanks.`}
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = await db.Users.create(
            { 
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: phone,
                hashpassword: hashedPassword,
                isActive: true,
                isDeleted: false
            }
        );

        return { id: newUser.id, name: `${newUser.firstname + ' ' +  newUser.lastname}`};
    }
    
    async login(userData) {
        const { email, password } = userData;

        var user = await db.Users.findOne({
            where: {email : email},
        });

        if (user === null) {
            console.log("invalid login attempt")
        }
        
        if (!password || !user.hashpassword) {
            throw new Error('Data and hash arguments required'); 
        }

        const passwordMatch = await bcrypt.compare(password, user.hashpassword);
        if (!passwordMatch) {
            throw new Error('Invalid username or password');
        }
        const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: config.expiresIn });
        return token;
    }

    async GetAll()
    {
        var users = await db.Users.findAll();

        return users;
    }

    async GetWithId(userId)
    {
        var user = await db.Users.findByPk(userId);
        return user;
    }

    async Delete(userId)
    {
        const user = await db.Users.findByPk(userId);

        if(user == null) return {message : `Apologize for any inconvinence but we dont have any user with this id ${userId}`};

        user.isActive = false;

        const response = {message : `user associated with id : ${userId} has deleted.`};

        await user.save();

        return response;
    }

}

module.exports =  new UserService();