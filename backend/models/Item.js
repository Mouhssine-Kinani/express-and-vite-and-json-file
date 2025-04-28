import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Méthode statique pour obtenir le prochain ID
ItemSchema.statics.getNextId = async function () {
  const maxItem = await this.findOne().sort("-id");
  return maxItem ? maxItem.id + 1 : 1;
};

const Item = mongoose.model("Item", ItemSchema);

export default Item;
