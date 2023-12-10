import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";

const topQuestion = [
  {
    _id: "1",
    title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  },
  {
    _id: "2",
    title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  },
  {
    _id: "3",
    title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  },
  {
    _id: "4",
    title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  },
  {
    _id: "5",
    title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  },
];
const popularTags = [
  {
    _id: 1,
    name: "Javascript",
    totalQuestions: 5,
  },
  {
    _id: 2,
    name: "Next",
    totalQuestions: 21,
  },
  {
    _id: 3,
    name: "Node",
    totalQuestions: 7,
  },
  {
    _id: 4,
    name: "React",
    totalQuestions: 22,
  },
  {
    _id: 5,
    name: "Vue",
    totalQuestions: 15,
  },
];
const RightSidebar = () => {
  return (
    <section className="background-light900_dark200 light-border sticky right-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden ">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-8">
          {topQuestion.map((question) => (
            <Link
              href={`/question/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">popular text</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
