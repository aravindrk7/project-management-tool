const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


//Routes
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const teamRoutes = require('./routes/teamRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();


const port = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
});


app.get('/', (req, res) => {
    res.json({ message: 'Welcome' });
    
});

app.use(cors());
app.use(express.json());

app.use('/api/user',userRoutes);
app.use('/api/project',projectRoutes);
app.use('/api/team',teamRoutes);
app.use('/api/task',taskRoutes);

app.listen(port, () => {
    console.log(`Server running in ${port}`);
});