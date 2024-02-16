// import Tag from "@/database/tag.model";
import { connectionToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";
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
