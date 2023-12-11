import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
export default function Home() {
  const questions = [
    {
      _id: "1",
      title: "What is the best way to learn React?",
      tags: [
        {
          _id: "1",
          name: "React",
        },
        {
          _id: "2",
          name: "Web Development",
        },
      ],
      auther: {
        _id: "1",
        name: "John Doe",
        picture: "https://picsum.photos/300/300",
      },
      upvotes: 10,
      views: 20,
      answers: [],
      createdAt: new Date('"05/02/2023"'),
    },
    {
      _id: "2",
      title: "How to use React hooks?",
      tags: [
        {
          _id: "1",
          name: "React",
        },
        {
          _id: "3",
          name: "Hooks",
        },
      ],
      auther: {
        _id: "2",
        name: "Jane Doe",
        picture: "https://picsum.photos/300/300",
      },
      upvotes: 5,
      views: 1500000,
      answers: [],
      createdAt: new Date("12/01/2023"),
    },
    {
      _id: "3",
      title: "What is the difference between React and Angular?",
      tags: [
        {
          _id: "1",
          name: "React",
        },
        {
          _id: "4",
          name: "Angular",
        },
      ],
      auther: {
        _id: "3",
        name: "Bob Smith",
        picture: "https://picsum.photos/300/300",
      },
      upvotes: 70000,
      views: 250,
      answers: [],
      createdAt: new Date("12/10/2023"),
    },
    {
      _id: "4",
      title: "How to use React with TypeScript?",
      tags: [
        {
          _id: "1",
          name: "React",
        },
        {
          _id: "5",
          name: "TypeScript",
        },
      ],
      auther: {
        _id: "4",
        name: "Alice Smith",
        picture: "https://picsum.photos/300/300",
      },
      upvotes: 3000,
      views: 1000,
      answers: [],
      createdAt: new Date("12/01/2023"),
    },
    {
      _id: "5",
      title: "What is the difference between React and Vue?",
      tags: [
        {
          _id: "1",
          name: "React",
        },
        {
          _id: "6",
          name: "Vue",
        },
      ],
      auther: {
        _id: "5",
        name: "Eve Smith",
        picture: "https://picsum.photos/300/300",
      },
      upvotes: 2,
      views: 53704300,
      answers: [],
      createdAt: new Date(),
    },
  ];

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900"> All Question</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for question"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => {
            return (
              <QuestionCard
                key={question._id}
                _id={question._id}
                title={question.title}
                tags={question.tags}
                auther={question.auther}
                upvotes={question.upvotes}
                views={question.views}
                answers={question.answers}
                createdAt={question.createdAt}
              />
            );
          })
        ) : (
          <NoResult
            title="There is no question to show"
            description="Be the first to break the silence! ask a question and Kickstart the
              discussion. our query could be the next big thing. others learn from.
              get involved!"
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </div>
    </>
  );
}
