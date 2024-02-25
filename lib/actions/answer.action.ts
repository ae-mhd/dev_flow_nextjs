"use server";
import Answer from "@/database/answer.model";
import { connectionToDatabase } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

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
