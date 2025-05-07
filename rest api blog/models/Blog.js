import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], default: [] },
}, {
  timestamps: true
});

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;
