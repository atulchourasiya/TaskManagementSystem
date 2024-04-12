const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
	title: {
		type: String,
		required:true
	},
	description: {
		type: String,
		required:true
	},
	duedate: {
		type: String,
		required:true
	},
	status:{
		type : String,
		enum: ['Pending', 'Completed'],
		default : 'Pending'
	}
});

const Task = mongoose.model('task', taskSchema);
module.exports = Task;
