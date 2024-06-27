import { humanize } from "@/lib/utils/textConverter";
import React from "react";

const PageHeader = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <section className="mt-16">
      <div className="container text-center">
        <h1>{humanize(title)}</h1>
        {children}
      </div>
    </section>
  );
};

export default PageHeader;
