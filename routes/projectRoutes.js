const router = require('express').Router();
const Project = require('../models/projectModel');

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
router.get('/favorites', async (req, res) => {
    try {
        const favorites = await Project.find({ favorite: true });
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


// router.delete('/delete', auth, async (req, res) => {
//     try {
//         const deletedUser = await User.findByIdAndDelete(req.user);
//         res.json(deletedUser);
//     } catch (error) {
//         res
//             .status(500)
//             .json({ error: error.message });
//     }
// });


module.exports = router;