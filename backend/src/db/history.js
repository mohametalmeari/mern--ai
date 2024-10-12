import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  type: { type: String, required: true, select: false },
  content: { type: Array, required: true, default: [] },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const History = mongoose.model("History", Schema);

export const createHistory = async (values) => {
  const history = new History(values);
  return history.save().then((doc) => doc.toObject());
};

export const getHistory = async (values) => {
  const history = History.findOne(values).select("-__v");
  return history.then((doc) => doc && doc.toObject());
};

export const addContent = async (id, content) => {
  const history = await History.findById(id);

  if (!history) throw new Error("History not found");

  history.content.push(content);
  return history.save().then((doc) => doc.toObject());
};
