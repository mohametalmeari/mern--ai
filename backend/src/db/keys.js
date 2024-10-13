import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  identifier: { type: String, required: true, select: false },
  keys: { type: Array, required: true, default: [] },
});

const Key = mongoose.model("Key", Schema);

export const getKey = async ({ identifier, samples }) => {
  const obj = await Key.findOne({ identifier });

  const { keys } = obj;

  obj.markModified("keys");

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key.count > 0 && key.count >= samples) {
      key.count -= samples;

      await obj.save();
      return key.key;
    }
  }

  keys.forEach((k) => (k.count = 30));
  await obj.save();

  return getKey({ identifier, samples });
};
