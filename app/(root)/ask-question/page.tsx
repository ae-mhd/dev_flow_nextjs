import Question from "@/components/forms/Question";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="h1-bold text-dark100_light900">Ask a question</div>
      <div className="mt-9">
        <Question />
      </div>
    </div>
  );
};

export default Page;
