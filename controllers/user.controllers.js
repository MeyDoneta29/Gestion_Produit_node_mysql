import bcrypt from 'bcrypt';
import {User} from '../models/index.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    // Hash the password before saving to the database
    const mdpHashed = await bcrypt.hash(password, 10);

    User.create({
         name,
         email,
         password: mdpHashed 
        })
        .then(user => {
            res.status(201).json({ message: 'User registered successfully', user });
        })
        .catch(error => {
            res.status(500).json({ message: 'Error registering user', error });
        });
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    //verfie le mail existe ou pas
    await User.findOne({ where: { email } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            //compare le mot de passe entré avec le mot de passe hashé dans la base de données
            const isPasswordValid = bcrypt.compare(password, user.password);
            //si le mot de passe n'est pas valide, retourne une erreur
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = jwt.sign({id:user.id},
                process.env.SECRET_KEY,
                {expiresIn: '1d'}
            )
            return res.status(200).json({ message: 'Login successful', token });
        })
        .catch(error => {
            res.status(500).json({ message: 'Error logging in', error });
        });





    /*
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const isValidePwdn = bcrypt.compare(password, user.password);
   */
}