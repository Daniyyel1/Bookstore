
import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    reviewer:{type:String},
    comment:{type: String},
    rating:{type:Number},
    cratedAt:{type:Date, default:Date.now}
})

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genres: { type: String },
  price: { type: Number },
  pages: {type: Number},
  bio:{type: String},
  reviews: { type: [ReviewSchema], default: [] },
  description:{type: String},
  publishedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Book || mongoose.model("Book", BookSchema);