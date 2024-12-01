const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');
const File = require('../models/File');
const jwt = require('jsonwebtoken');

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await User.deleteMany({});
  await File.deleteMany({});

  const user = new User({ username: 'testuser', email: 'test@example.com', password: 'password123' });
  await user.save();

  token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('File Controller', () => {
  it('should create a file successfully', async () => {
    const res = await request(app)
      .post('/api/files/create')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'test.txt', path: '/files', size: 1024, directory: null });
    expect(res.statusCode).toBe(201);
    expect(res.body.file).toBeDefined();
  });

  it('should retrieve a file successfully', async () => {
    const file = new File({ name: 'test.txt', path: '/files', size: 1024, user: mongoose.Types.ObjectId() });
    await file.save();
    const res = await request(app)
      .get(`/api/files/${file._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.file).toBeDefined();
  });

  it('should update a file successfully', async () => {
    const file = new File({ name: 'test.txt', path: '/files', size: 1024, user: mongoose.Types.ObjectId() });
    await file.save();
    const res = await request(app)
      .put(`/api/files/${file._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'updated.txt' });
    expect(res.statusCode).toBe(200);
    expect(res.body.file.name).toBe('updated.txt');
  });

  it('should delete a file successfully', async () => {
    const file = new File({ name: 'test.txt', path: '/files', size: 1024, user: mongoose.Types.ObjectId() });
    await file.save();
    const res = await request(app)
      .delete(`/api/files/${file._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('File deleted successfully');
  });
});
