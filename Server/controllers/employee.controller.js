import Employee from "../models/employee.model.js";
import bcrypt from 'bcrypt';

// admin create new employee
export const createNewEmployee = async (req,res) => {
    try {
        if(req.user.role !== 'admin') return res.message({
            message: 'Access Denied! Only Admin Can Create Employees',
            success: false
        })

        // fetch all fields
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

        // check if employee already exists
        const employeeAlreadyExists = await Employee.findOne({ email })

        if(employeeAlreadyExists) return res.status(400).json({
            message: 'Employee Already Exists',
            success: false
        })

        // hashing the password of the employee
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new employee
        const employee = new Employee({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            role: 'employee',
            department,
            position,
            salary
        })

        await employee.save();
        res.status(201).json({
            message: 'Employee Created SuccessFully',
            success: false,
            data: employee
        })
         
    } catch (error) {
        console.error("Error Creating Employee:", error.message)
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

// get all employees
export const getAllEmployees = async (req,res) => {
    try {
        if(req.user.role !== 'admin') return res.message({
            message: 'Access Denied! Only Admin Can Create Employees',
            success: false
        })

        // get all employees
        const getEmployees = await Employee.find({ role: 'employee'}).select("-password")

        if(!getEmployees) return res.status(400).json({
            message: 'Error getting employees',
            success: false
        })

        res.status(200).json({
            message: 'Here are the employee info',
            success: true,
            data: getEmployees
        })
        
    } catch (error) {
        console.error("Error Getting Employee:", error.message)
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

// get any epmloyee by ID
export const getEmployeeById = async (req,res) => {
    try {
        if(req.user.role !== 'admin') return res.message({
            message: 'Access Denied! Only Admin Can Create Employees',
            success: false
        })

        // fetch employee id
        const { id } = req.params;
        if(!id) return res.status(400).json({
            message: 'Id not Found'
        })

        // get employee info
        const getEmployeeInfo = await Employee.findById(id).select("-password")

        if(!getEmployeeInfo) return res.status(400).json({
            message: 'Employee Info Not Found',
            success: false
        })

        res.status(200).json({
            message: "Employee Fetched SuccessFully",
            success: true,
            data: getEmployeeInfo
        })
        
    } catch (error) {
        console.error("Error Fetching Employee")
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        })
    }
}

// update employee info by id
export const updateEmployeeInfo = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: 'Access Denied! Only Admin Can Update Employees',
                success: false
            });
        }

        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Employee ID not found',
                success: false
            });
        }

        const updates = req.body;

        const updatedEmployee = await Employee.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true
        }).select("-password");

        if (!updatedEmployee) {
            return res.status(404).json({
                message: "Employee not found",
                success: false
            });
        }

        res.status(200).json({
            message: 'Employee info updated successfully',
            success: true,
            data: updatedEmployee
        });
    } catch (error) {
        console.error("Error Updating Employee:", error.message);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

// delete employee info by id
export const deleteEmployeeInfo = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: 'Access Denied! Only Admin Can Update Employees',
                success: false
            });
        }

        const { id } = req.params;

        if(!id) return res.status(400).json({
            message: "Id Not Found"
        })

        const deleteEmployee = await Employee.findByIdAndDelete(id)

        if(!deleteEmployee) return res.status(400).json({
            message: 'Error Deleting Employee',
            success: false
        })

        res.status(200).json({
            message: 'Employee Deleted',
            success: true
        })
        
    } catch (error) {
        console.error("Error Deleting Employee:", error.message);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}


// employee get own info
export const getOwnProfile = async (req, res) => {
    try {
        // req.user is already set by the auth middleware
        const user = req.user;

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                department: user.department,
                position: user.position,
                salary: user.salary,
                dateOfJoining: user.dateOfJoining
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch profile"
        });
    }
};

// update employee info by employee
export const updateSelfInfo = async (req,res) => {
    try {
        if (req.user.role !== 'employee') {
            return res.status(403).json({
                message: 'Access Denied! Only Employee Can Update Self Info',
                success: false
            });
        }
        const userId = req.user.id;

        // check if userId not found
        if(!userId) return res.status(400).json({
            message: 'User Id Not Found',
            success: false
        })

        // fetch fields for update
        const { name, email, phoneNumber } = req.body

        // update employee info
        const updateInfo = await Employee.findByIdAndUpdate(
            userId,
            { name, email, phoneNumber },
            { new: true }
        ).select("-password")

        if(!updateInfo) return res.status(400).json({
            message: 'Error Updating Info',
            success: false
        })

        res.status(200).json({
            message: 'Employee Info Updated Successfully',
            success: true
        })
        
    } catch (error) {
        console.error("Error Updating Employee Info:", error.message);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}
