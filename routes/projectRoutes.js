const router = require('express').Router();
const Project = require('../models/projectModel');
const Task = require('../models/taskModel');
const multer = require('multer');
const auth = require('./../middlewares/auth');

// Multer for storing photos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/projectAvatars');
    },
    filename: function (req, file, cb) {
        cb(null, getCurrentTime() + '_' + file.originalname)
    }
});
const upload = multer({ storage: storage });
function getCurrentTime() {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    return dateTime = date + '_' + time;
}

// router.get('/', async (req, res) => {
//     try {
//         const projects = await Project.find();
//         res.json(projects);
//     } catch (error) {
//         res
//             .status(500)
//             .json({ error: error.message });
//     }
// });



// Add a new Project
router.post('/add', upload.single('displayPicture'), async (req, res) => {
    console.log(req.body);
    // const newProject = new Project({
    //     name: req.body.name,
    //     description: req.body.description,
    //     start_date: req.body.start_date,
    //     due_date: req.body.due_date,
    //     created_by: req.body.created_by,
    //     head: req.body.head,
    //     displayPicture: req.file.filename

    // });
    // try {
    //     const savedProject = await newProject.save();
    //     res.json(savedProject);
    // }
    // catch (err) {
    //     res.json({ message: err });
    // }

});

// Favorites
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

// Get Project Details
router.get('/:id', async (req, res) => {
    try {
        await Project.findOne({ _id: req.params.id })
            .lean()
            .populate('head', '-password')
            .populate('tasks')
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

// Get all projects of user
router.get('/user/:id', async (req, res) => {
    try {
        await Project.find().or([{ "members": req.params.id }, { "head": req.params.id }])
            .lean()
            .populate('head', '-password')
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