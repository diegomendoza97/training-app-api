const User = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secretJWT = 'test';

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, salt);
        return newPassword;
    } catch (err) {
        console.log(err);
        return err;
    }
};

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    console.log(req.body)
    try {
        // const hashedPassword = await hashPassword(password);
        const userFound = await User.findOne({email: email});
        if (!userFound) {
            return res.json({
                status: 404,
                message: 'User not found',
                data: null
            });
        }

        const passwordsAreEqual = await bcrypt.compare(password, userFound.password);
        if (!passwordsAreEqual) {
            return res.json({
                status: 401,
                message: 'Email or passwords incorrect'
            });
        }
        
    
        userFound.password = null;
        const token = jwt.sign({userFound}, secretJWT);
        return res.json({
            status: 200,
            message: 'User found',
            data: {...userFound, token}
        });
    } catch(err) {
        console.log(err);
        return res.json({
            status: 400,
            message: err,
            data: undefined
        });
    }
});

router.post('/create', (req, res) => {
    const {email, fullName ,password} = req.body;
    console.log(req.body);
    User.findOne({email: email}, async(err, user) => {
        if (err) {
            console.log(err);
            const hashedPassword = await hashPassword(password); 
            const newUser = await User.create({email, name: fullName, password: hashedPassword});
            res.json({
                status: 201, 
                message: 'User successfully created',
                data: newUser
            });
        } else if (!user) {
            const hashedPassword = await hashPassword(password); 
            const newUser = await User.create({email, name: fullName, password: hashedPassword});
            res.json({
                status: 201, 
                message: 'User successfully created',
                data: newUser
            });
        } else {
            console.log(err);
            console.log(user);
            res.json({
                status: 400,
                message: 'User already exists',
                data: null
            })
        }
    })
});

module.exports = router;