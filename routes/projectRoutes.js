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

router.post('/add', async (req, res) => {
    const newProject = new Project(req.body);
    // const newProject = new Work({
    //     category: req.body.category,
    //     subCategory: req.body.subCategory,
    //     status: req.body.status,
    //     title: req.body.title,
    //     earning: req.body.earning,
    //     email: req.body.email,
    //     startdate: Date.now()
    // });
    try {
        const savedProject = await newProject.save();
        res.json(savedProject);
    }
    catch (err) {
        res.json({ message: err });
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
        const project = await Project.findOne({ _id: req.params.id })
            .lean()
            .populate('members', '-password')
            .exec()
            .then(project => {
                res.json(project);
            })
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        // let projects = await Project.find().or([{ "members.id": req.params.id }, { "head.id": req.params.id }]).lean();
        let projects = await Project.find().or([{ "members": req.params.id }, { "head.id": req.params.id }])
            .lean()
            .populate('tasks', 'status')
            .populate('members', '-password')
            .exec()
            .then(projects => {
                if (!projects) {
                    return null;
                }
                return res.json(projects.map(project => {
                    return {
                        ...project,
                        days_left: getDaysLeft(project.due_date),
                        total_task: project.tasks.length,
                        task_done: project.tasks.filter(task => task.status === 'completed').length
                    };
                }))
            });

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

module.exports = router;