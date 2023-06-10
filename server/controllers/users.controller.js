const Users = require('../models/users.model')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.json({ message: 'you need token to get data!' })
    }
    else {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: 'authentication failed' });
            }
            else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}


const usersController = {
    //post
    postRegister: async (req, res) => {
        const { username, email, password } = req.body

        const existedUsername = await Users.findOne({ username: username });
        const existedMail = await Users.findOne({ email: email })

        if (existedUsername) {
            res.json({ message: 'username already existed' })
            return
        }
        if (existedMail) {
            res.json({ message: 'email already used' })
            return
        }

        const salt = await bcrypt.genSalt(10)//500ms
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new Users({
            username: username,
            email: email,
            password: hashedPassword,
            isAdmin: true,
        })

        await newUser.save()
        res.json({ message: 'user sign up succesfully' })

    },

//login
    postLogin: async (req,res)=>{
        console.log('back: ',req.body);
        const {username, password} = req.body
        const existedUsername = await Users.findOne({username:username});
    
        if(!existedUsername){
            res.json({auth:false, message:'username not found'});
            return
        }
        else{
            const isValid = await bcrypt.compare(password, existedUsername.password)
            const id = existedUsername._id
            //username password
            //access token - KWT
            //refresh token
            const token = jwt.sign({id:id}, process.env.SECRET_KEY, {
                expiresIn:'7d'
            })
            if(!isValid){
                res.json({auth:false, message:'password is incorrect'})
            }
            else{
                res.json({auth:true,token:token, user:{
                
                        id:existedUsername._id,
                        username:existedUsername.username,
                        email:existedUsername.email,
                        isAdmin:existedUsername.isAdmin,
                    
                }, message:'signed in succesfully'})
            }
        } 
    },



    AdminPostLogin:async(req,res)=>{
        const {username,password} = req.body
        const existedUsername = await Users.findOne({username:username});

        if(!existedUsername){
            res.json({auth:false, message:'username not found'});
            return
        }
        else{
            if(existedUsername.isAdmin==false){
                const isValid = await bcrypt.compare(password, existedUsername.password)
                const id = existedUsername._id
                const token = jwt.sign({id:id}, process.env.SECRET_KEY, {
                    expiresIn:'7d'
                })
                if(!isValid){
                    res.json({auth:false, message:'password is incorrect'})
                }
                else{
                    res.json({auth:true,token:token, user:{
                    
                            id:existedUsername._id,
                            username:existedUsername.username,
                            email:existedUsername.email,
                            isAdmin:existedUsername.isAdmin,
                        
                    }, message:'signed in succesfully'})
                }


            }
        }
    

    },


    getAllUsers:async(req,res)=>{
        const users = await Users.find()
        res.json({users:users})
    }

}

module.exports = usersController