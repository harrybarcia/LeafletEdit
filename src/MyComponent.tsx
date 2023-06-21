import React, { useState, useEffect, useCallback } from 'react';

const ExampleComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('useEffect triggered');
    // This effect will run on component mount and whenever the count value changes
  }, [count]); // Specify count as a dependency

  const handleClick = useCallback(() => {
    console.log('Button clicked');
    // This function will be memoized and reused, and it depends on the count value
    console.log('Count value:', count);
  }, [count]); // Specify count as a dependency for useCallback

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default ExampleComponent