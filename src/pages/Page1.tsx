/** @format */

import { useState } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      page1
      <button
        className='btn'
        onClick={() => {
          setCount(count + 1);
          console.log("clicked");
        }}>
        btn
      </button>
      <span
        className='btn'
        onClick={() => {
          console.log("clicked");
        }}>
        span click
      </span>
      <p>{count}</p>
    </div>
  );
};
