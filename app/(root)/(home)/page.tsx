import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
export default function Home() {
  const questions = [
    // {
    //   _id: 1,
    //   title: "This is Dommy data",
    //   tags: [
    //     {
    //       _id: 1,
    //       name: "python",
    //     },
    //     {
    //       _id: 2,
    //       name: "javascript",
    //     },
    //   ],
    //   auther: "John Doe",
    //   upvotes: 10,
    //   views: 2,
    //   createdAt: "2023-12-10",
    // },
    // {
    //   _id: 2,
    //   title: "This is Dommy data for test",
    //   tags: [
    //     {
    //       _id: 1,
    //       name: "python",
    //     },
    //     {
    //       _id: 2,
    //       name: "javascript",
    //     },
    //   ],
    //   auther: "John Doe",
    //   upvotes: 10,
    //   views: 2,
    //   createdAt: "2023-12-10",
    // },
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
          questions.map((question) => question.auther)
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
