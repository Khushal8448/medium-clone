import React from "react";

const Quote = () => {
  return (
    <div className="flex items-center justify-center justify-self-stretch bg-slate-200 max-lg:hidden">
      <div className="flex flex-col items-center justify-center px-28">
        <p className="text-2xl font-bold tracking-wide">
          "The customer service i received was exceptional. The support team
          went above and beyoud to address my concerns."
        </p>
        <p className="mt-4 self-start text-xl font-semibold">Jules Winnfield</p>
        <p className="self-start font-semibold text-slate-600">
          CEO, Acme Inc.
        </p>
      </div>
    </div>
  );
};

export default Quote;
