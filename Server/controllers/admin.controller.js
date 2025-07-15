import Employee from '../models/employee.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// signup for admin
export const adminSignUp = async (req,res) => {
    try {
        const { 
            name, 
            email, 
            password, 
            phoneNumber, 
            department, 
            position, 
            salary  } = req.body

        // check if all fields are given
        if(!name ||
            !email ||
            !password ||
            !phoneNumber ||
            !department ||
            !position ||
            !salary ) return res.status(400).json({
                message: 'All Fields Are Required',
                success: false
            })

        // check if admin already exists
        const adminAlreadyExists = await Employee.findOne({ email })
        if(adminAlreadyExists) return res.status(400).json({
            message: "Admin Already Exists",
            success: false
        })

        // hashing the password
        const hashedPassword = await bcrypt.hash(password,10);

        // create new admin
        const admin = new Employee({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            role: 'admin',
            department,
            position,
            salary
        })

        await admin.save()

        // assign the jwt token
        const token = jwt.sign({ id: admin._id, role: admin.role}, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        res.status(201).json({
            message: `Welcome ${name}`,
            success: true,
            token,
            user: { id: admin._id, name: admin.name, role: admin.role }
        })
        
    } catch (error) {
        console.error("Error SignUp")
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

// login for both employee and login
export const employeeLogin = async (req,res) => {
    try {
        const { email, password } = req.body

        // checl if credentils are correct
        const user = await Employee.findOne({ email })
        if(!user) return res.status(400).json({
            message: "Invalid Credentials"
        })

        // check if the password matches
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if(!isPasswordMatched) return res.status(400).json({
            message: "Invaid Credentials",
            success: false
        })

        // assigining the token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.status(200).json({
            message: "Login SuccessFull",
            token,
            user: { id: user._id, name: user.name, role: user.role }
        })

    } catch (error) {
        console.error("Error Login:", error.message)
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}