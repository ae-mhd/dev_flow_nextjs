import { models, Document, Schema, model } from "mongoose";
import { IUser } from "./user.model";
import { IQuestion } from "./question.model";

export interface IAnswer extends Document {
  content: string;
  author: IUser["_id"];
  question: IQuestion["_id"];
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  createdAt: Date;
}
const AnswerSchema = new Schema<IAnswer>({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const Answer = models.Answer || model("Answer", AnswerSchema);
export default Answer;
