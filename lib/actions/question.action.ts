"use server";

import { connectionToDatabase } from "../mongoose";

export async function createQuestion() {
  try {
    connectionToDatabase();
    console.log("Question Created");
  } catch (error) {
    console.error("Create Question on DB error", error);
  }
}
