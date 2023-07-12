import ErrorHandler from "../middlewares/error.js";
import {Task} from "../models/task.js"

export const newTask = async (req, res) => {

    try {
        const {title, description} = req.body;
        const task = await Task.create({
            title,
            description,
            user: req.user
        })

        res.status(201).json({
            sucess: true, 
            task
        });
    } catch (error) {
        next(error)
    }
}

export const allTasks = async (req, res, next) => {
    try {
        const id = req.user._id;
        const task = await Task.find({user: id});

        if (!task) {
            return next(new ErrorHandler("Invalid User!", 404))
        }

        res.json({
            sucess: true, 
            task
        })
    } catch (error) {
        next(error)
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const {id} = req.params;
        const task = await Task.findById(id);
        if (!task) return next(new ErrorHandler());

        task.isCompleted = !task.isCompleted;
        await task.save();

        res.json({
            sucess: true,
            task
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const {id} = req.params;
        const task = await Task.findById(id);
        if (!task) return next(new ErrorHandler("Invalid Id!", 404))

        await task.deleteOne();

        res.json({
            sucess: true,
            task
        })
    } catch (error) {
        next(error)
    }
}