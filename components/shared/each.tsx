import { Children, Fragment, type Key, memo, type ReactNode } from "react";

type EachProps<T> = {
  render: (item: T, index: number) => ReactNode;
  of: T[];
  getKey: (item: T, index: number) => Key;
};

const Each = <T,>({ render, of, getKey }: EachProps<T>) => {
  if (!Array.isArray(of)) {
    console.error("The `of` prop must be an array.");
    return null;
  }

  return (
    <>
      {Children.toArray(
        of.map((item, index) => (
          <Fragment key={getKey(item, index)}>{render(item, index)}</Fragment>
        )),
      )}
    </>
  );
};

export default memo(Each) as typeof Each;
