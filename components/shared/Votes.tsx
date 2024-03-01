"use client";
import { answerDownvote, answerUpvote } from "@/lib/actions/answer.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import {
  questionDownvote,
  questionUpvote,
  toggleSaveQuestion,
} from "@/lib/actions/question.action";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  type: "Question" | "Answer";
  itemId: string;
  userId: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}
const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasupVoted,
  downvotes,
  hasdownVoted,
  hasSaved,
}: Props) => {
  const router = useRouter();

  const path = usePathname();
  // useEffect(() => {
  //   viewQuestion({
  //     questionId: JSON.parse(itemId),
  //     userId: userId ? JSON.parse(userId) : undefined,
  //   });

  // }, [itemId, userId, path, router]);
  const handleVote = async (action: string) => {
    if (!userId) return;

    if (type === "Question") {
      if (action === "upvote") {
        await questionUpvote({
          hasupVoted,
          hasdownVoted,
          userId: JSON.parse(userId),
          questionId: JSON.parse(itemId),
          path,
        });
      } else if (action === "downvote") {
        await questionDownvote({
          hasupVoted,
          hasdownVoted,
          userId: JSON.parse(userId),
          questionId: JSON.parse(itemId),
          path,
        });
      }
    }
    if (type === "Answer") {
      if (action === "upvote") {
        await answerUpvote({
          hasupVoted,
          hasdownVoted,
          userId: JSON.parse(userId),
          answerId: JSON.parse(itemId),
          path,
        });
      } else if (action === "downvote") {
        await answerDownvote({
          hasupVoted,
          hasdownVoted,
          userId: JSON.parse(userId),
          answerId: JSON.parse(itemId),
          path,
        });
      }
    }
  };

  const handleSave = async () => {
    await toggleSaveQuestion({
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      path,
    });
  };

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasupVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(upvotes)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <Image
            src={
              hasdownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>

      {type === "Question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          width={18}
          height={18}
          alt="star"
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
