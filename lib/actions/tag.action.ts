// import Tag from "@/database/tag.model";
import Tag, { ITag } from "@/database/tag.model";
import { connectionToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";
import User from "@/database/user.model";
// import User from "@/database/user.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectionToDatabase();

    // const { page=1,pagesize=20,filter,searchQuery } = params;
    const tegs = [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2" },
      { _id: "3", name: "tag3" },
    ];
    const { userId } = params;
    // const user = await User.findById(userId);
    if (!userId) throw new Error("User not found");
    return tegs;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectionToDatabase();

    // const { page=1,pagesize=20,filter,searchQuery } = params;

    const tags = await Tag.find({});
    if (!tags) throw new Error("There is no tags");
    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectionToDatabase();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const questions = tag.questions;

    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
