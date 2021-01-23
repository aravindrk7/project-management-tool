const router = require('express').Router();
const Task = require('../models/taskModel');

const auth = require('./../middlewares/auth');

// Add a new Task
router.post('/add', async (req, res) => {
    console.log(req.body);
    console.log(req.body.assigned_by);
    const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        start_date: req.body.start_date,
        due_date: req.body.due_date,
        assigned_by: req.body.assigned_by,
        assigned_to: req.body.assigned_to,
        associated_project: req.body.associated_project
    });
    try {
        const savedTask = await newTask.save();
        res.json(savedTask);
    }
    catch (err) {
        res.json({ message: err });
    }

});

router.patch('/:id/:status', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { status: req.params.status });
        res.json(updatedTask);
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
});
router.get('/user/:id', async (req, res) => {
    try {
        const tasks = await Task.find({ "assigned_to": req.params.id });
        const splitedTasks = splitDueTime(tasks);
        res.json(splitedTasks);
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
});
router.get('/project/:id', async (req, res) => {
    try {
        const tasks = await Task.find({ "associated_project": req.params.id }).lean();
        let tasksNew = tasks.map(task => {
            return { ...task, days_left: getDaysLeft(task.due_date) };
        });
        const splitedTasks = splitStatus(tasksNew);
        res.json(splitedTasks);
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
});
router.patch('/:id/like/:value', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { like: req.params.value }).lean();
        res.json(updatedTask);
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
});

const splitStatus = (tasks) => {
    const current = new Date();
    let total = 0;
    let splitedTasks = {
        'open': [],
        'inProgress': [],
        'completed': [],
    };
    tasks.filter(task => {
        if (task.status == 'open') {
            splitedTasks['open'].push(task);
            total++;
        }
        else if (task.status == 'inProgress') {
            splitedTasks['inProgress'].push(task);
            total++;
        }
        else {
            splitedTasks['completed'].push(task);
            total++;
        }
    });
    return { total: total, splitedTasks: splitedTasks };
};
const splitDueTime = (tasks) => {
    const current = new Date();
    let total = 0;
    let splitedTasks = {
        'Past Due': [],
        'Today': [],
        'Tomorrow': [],
        'Upcoming': []
    };
    tasks.filter(task => {
        if (getSimplefiedDate(current) > getSimplefiedDate(task.due_date)) {
            splitedTasks['Past Due'].push(task);
            total++;
        }
        else if (getSimplefiedDate(current) == getSimplefiedDate(task.due_date)) {
            splitedTasks['Today'].push(task);
            total++;
        }
        else if (getSimplefiedDate(new Date(current.getTime() + 86400000)) == getSimplefiedDate(task.due_date)) {
            splitedTasks['Tomorrow'].push(task);
            total++;
        }
        else {
            splitedTasks['Upcoming'].push(task);
            total++;
        }
    });
    return { total: total, splitedTasks: splitedTasks };
};
const getSimplefiedDate = (date) => {
    return withoutTime(date);
};

const withoutTime = (date) => {
    date = date.setHours(0, 0, 0, 0);
    return date;
}

const getDaysLeft = (dueDate) => {
    const diffInTime = dueDate.getTime() - new Date().getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays;
};

// router.delete('/delete', auth, async (req, res) => {
//     try {
//         const deletedTask = await Task.findByIdAndDelete(req.user);
//         res.json(deletedTask);
//     } catch (error) {
//         res
//             .status(500)
//             .json({ error: error.message });
//     }
// });


module.exports = router;