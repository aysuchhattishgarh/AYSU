require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const studentRoutes = require('./routes/student.routes');
const galaryRoutes = require('./routes/gallery.routes')
const pdfRoutes = require('./routes/pdf.routes');
const eventRoutes = require('./routes/event.routes');
const contact1route = require('./routes/contact1.routes');
const contact2route = require('./routes/contact2.routes')

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/gallery', galaryRoutes);
app.use('/api/pdf',pdfRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/contact1',contact1route)
app.use('/api/contact2',contact2route);

app.get('/', (req, res) => { 
  res.send('API is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
    