const router = require('express').Router();
const Project = require('../models/projectModel');
const Task = require('../models/taskModel');

const auth = require('./../middlewares/auth');

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
});
router.get('/favorites/:id', async (req, res) => {
    try {
        const favorites = await Project.find({ $and: [{ $or: [{ "members.id": req.params.id }, { "head.id": req.params.id }] }, { favorite: true }] }, { name: 1 });
        res.json(favorites);
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
});
router.patch('/add-favorites/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, { favorite: true });
        res.json(project);
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
});
router.patch('/remove-favorites/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, { favorite: false });
        res.json(project);
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findOne({ _id: req.params.id });
        res.json(project);
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
});
// router.get('/user/:id', async (req, res) => {
//     try {
//         let projects = await Project.find().or([{ "members.id": req.params.id }, { "head.id": req.params.id }]).lean()
//         let projectsNew = projects.map(project => {
//             // console.log(await Task.find({ '_id': { $in: project.tasks } }).exec());
//             return {
//                 ...project, list: getData(project),
//             }
//         });
//         res.json(projectsNew);
//     } catch (error) {
//         res
//             .status(500)
//             .json({ error: error.message });
//     }
// });
// const getData = (project) => {
//     Task.find({ '_id': { $in: project.tasks } }).exec().then(response => {
//         return response;
//     })
// }
router.get('/user/:id', async (req, res) => {
    try {
        let projects = await Project.find().or([{ "members.id": req.params.id }, { "head.id": req.params.id }]).lean();
        let projectsNew = projects.map(project => {
            return {
                ...project,
                days_left: getDaysLeft(project.due_date),
                task_done: 20
            };
        });
        res.json(projectsNew);
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
});

const getDaysLeft = (dueDate) => {
    const diffInTime = dueDate.getTime() - new Date().getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays;
};
const getTaskCompletedCount = (id) => {
    let tasks = Task.find({ "associated_project.id": id }).lean();
    return tasks;
};


module.exports = router;