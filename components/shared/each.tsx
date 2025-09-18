import { Children, Fragment, ReactNode, memo } from "react";

type EachProps<T> = {
  render: (item: T, index: number) => ReactNode;
  of: T[];
};

const Each = <T,>({ render, of }: EachProps<T>) => {
  if (!Array.isArray(of)) {
    console.error("The `of` prop must be an array.");
    return null;
  }

  return (
    <>
      {Children.toArray(
        of.map((item, index) => (
          <Fragment key={index}>{render(item, index)}</Fragment>
        ))
      )}
    </>
  );
};

export default memo(Each) as typeof Each;
