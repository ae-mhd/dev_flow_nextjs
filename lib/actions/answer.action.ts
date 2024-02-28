"use server";
import Answer from "@/database/answer.model";
import { connectionToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import console from "console";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectionToDatabase();

    const { content, author, question, path } = params;

    // Create the Answer
    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });
    // Add the Answer to the question's answers array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });
    revalidatePath(path);
    // return { newAnswer };
  } catch (error) {
    console.log(error);
  }
}
export const getAnswers = async (params: GetAnswersParams) => {
  const { questionId } = params;
  try {
    connectionToDatabase();
    const answer = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return { answer };
  } catch (error) {
    console.log(error);
  }
};
export async function answerUpvote(params: AnswerVoteParams) {
  const { answerId, hasdownVoted, hasupVoted, path, userId } = params;
  try {
    connectionToDatabase();
    let updateQuery = {};
    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }
    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found!");
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
export async function answerDownvote(params: AnswerVoteParams) {
  const { answerId, hasdownVoted, hasupVoted, path, userId } = params;

  try {
    connectionToDatabase();
    let updateQuery = {};
    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });
    if (!answer) {
      throw new Error("Answer not found!");
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
