const router = require('express').Router();
const Team = require('../models/teamModel');

const auth = require('../middlewares/auth');

router.get('/', async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const team = await Team.findOne({ _id: req.params.id });
        res.json(team);
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