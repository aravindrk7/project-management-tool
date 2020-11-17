const router = require('express').Router();
const Task = require('../models/taskModel');

const auth = require('./../middlewares/auth');

router.patch('/update', async (req, res) => {
    console.log("updated");
    // try {
    //     const updatedTask = await Task.findByIdAndUpdate(req.params.id, { status: req.params.status });
    //     res.json(updatedTask);
    // } catch (error) {
    //     res
    //         .status(500)
    //         .json({ error: error.message });
    // }
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
router.get('/all/:id', async (req, res) => {
    try {
        const tasks = await Task.find({ "assigned_to.id": req.params.id });
        const splitedTasks = splitDueTime(tasks);
        res.json(splitedTasks);
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
});
router.get('/user/:id', async (req, res) => {
    try {
        const tasks = await Task.find({ "assigned_to.id": req.params.id });
        const splitedTasks = splitStatus(tasks);
        res.json(splitedTasks);
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