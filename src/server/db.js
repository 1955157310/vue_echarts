const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const PORT = 4000;

// 连接MongoDB数据库
mongoose.connect('mongodb://localhost/admin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// 定义student模型
const Student = mongoose.model('Student', {
  id: String,
  name: String,
  gender: String,
  cLass: String,
  picture: String,
  xueyuan: String
});

// 定义course模型
const Course = mongoose.model('Course', {
  text_name: String,
  text_score: String,
  text_teacher: String,
  text_address: String,
  email: String,
  type:String,
  isshow:Boolean
});
const Mainitem = mongoose.model('Mainitem', {
  stid:String,
  c_name: String,
  c_score: String,
  c_teacher: String,
  c_address: String,
  c_email: String,
  c_type:String,
});
app.use(bodyParser.json());
app.use(cors());

// 获取所有学生信息
app.get('/student', async (req, res) => {
  const student = await Student.find().exec();
  res.json(student);
});

// 添加新的学生
app.post('/student', async (req, res) => {
  const newStudent = new Student(req.body);
  const savedStudent = await newStudent.save();
  res.json(savedStudent);
});

app.get('/mainitem', async (req, res) => {
  const getmain = await Mainitem.find().exec();
  res.json(getmain);
});

app.post('/mainitem',async(req,res)=>{
  const newMAin = new Mainitem(req.body);
  const saveMAin = await newMAin.save();
  res.json(saveMAin);
})
app.delete('/mainitem', async (req, res) => {
  const stid = req.query.stid; // 获取查询参数中的name值
  const c_name = req.query.c_name; // 获取查询参数中的condition1值


  const deletedItem = await Mainitem.deleteMany({ stid: stid, c_name: c_name }).exec();
  
  if (deletedItem) {
    res.json(deletedItem);
  } else {
    res.status(404).json({ error: '未找到符合条件的数据。' });
  }
});

// 删除学生
app.delete('/student/:id', async (req, res) => {
  const deletedStudent = await Student.findByIdAndDelete(req.params.id).exec();
  res.json(deletedStudent);
});

// 更新学生
app.put('/student/:text_name', async (req, res) => {
  const updatedStudent = await Student.findByIdAndUpdate(req.params.text_name, req.body, { new: true }).exec();
  res.json(updatedStudent);
});

// 获取所有课程信息
app.get('/course', async (req, res) => {
  const courses = await Course.find().exec();
  res.json(courses);
});

// 添加新的课程
app.post('/course', async (req, res) => {
  const newCourse = new Course(req.body);
  const savedCourse = await newCourse.save();
  res.json(savedCourse);
});

// 删除课程
app.delete('/course/:id', async (req, res) => {
  const deletedCourse = await Course.findByIdAndDelete(req.params.id).exec();
  res.json(deletedCourse);
});

// 更新课程
app.put('/course/:id', async (req, res) => {
  const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
  res.json(updatedCourse);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});