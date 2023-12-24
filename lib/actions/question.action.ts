"use server";

import Question from "@/database/question.model";
import { connectionToDatabase } from "../mongoose";
import TagModel from "@/database/tag.model";

export async function createQuestion(props: any) {
  try {
    connectionToDatabase();
    const { title, content, tags, auther, path } = props;
    const question = await Question.create({
      title,
      content,
      auther,
    });
    console.log("auther", auther);
    const tagDocuments = [];
    for (const tag of tags) {
      const existingTag = await TagModel.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        {
          $setOnInser: { name: tag },
          $push: { questions: question._id },
        },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });
  } catch (error) {
    console.error("Create Question on DB error", error);
  }
}
