"use server";

import User from "@/database/user.model";
import { connectionToDatabase } from "../mongoose";

export async function getUserById(params: any) {
  const { userId } = params;
  try {
    await connectionToDatabase();
    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
