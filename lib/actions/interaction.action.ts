"use server";

import Question from "@/database/question.model";
import { connectionToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";
import { revalidatePath } from "next/cache";
import console from "console";

export async function viewQuestion(params: ViewQuestionParams) {
  const { questionId, userId, path } = params;

  try {
    await connectionToDatabase();

    // Update view count for the question
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) {
        revalidatePath(path);
        revalidatePath("/");

        return console.log("User has already viewed.");
      }

      // Create interaction
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
    revalidatePath(path);
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
