const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const blogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    parent_id: String,
    slug: { type: String, slug: "title", unique: true },
    createdBy: {
      account_id: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedBy: {
      account_id: String,
      deletedAt: Date,
    },
    updatedBy: [
      {
        account_id: String,
        updatedAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema, "blogs");

module.exports = Blog;
