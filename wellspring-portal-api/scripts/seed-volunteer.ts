import mongoose from 'mongoose';
import Volunteer from '../src/models/Volunteer';
import Case from '../src/models/Case';
import Task from '../src/models/Task';

(async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/wellspring');
    const v = await Volunteer.create({ name: 'Asha Gupta', email: 'asha@example.com', skills: ['Transport', 'Hindi'], availability: 'Weekends' });
    const c = await Case.create({ familyName: 'Sharma Family', hospital: 'AIIMS', status: 'active', assignedVolunteerId: v.id });
    await Task.create({ title: 'Hospital drop', assignedTo: v.id, caseId: c.id, status: 'pending' });
    console.log('Seeded volunteer/case/task');
    await mongoose.disconnect();
})();
