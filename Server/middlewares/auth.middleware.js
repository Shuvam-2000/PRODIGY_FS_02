import jwt from 'jsonwebtoken';
import Employee from '../models/employee.model.js';

export const userAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: 'No token provided',
                success: false
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Employee.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'User Not Found',
                success: false
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid Token',
            success: false
        });
    }
};
