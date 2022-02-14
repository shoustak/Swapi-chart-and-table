import { useState } from "react";

const Bar = ({numberOfPlantes, height }) => {
  const [hover, setHover] = useState(false);

  const styles = {
    bar: {
      backgroundColor: "#35a79c ",
      height: `${height}`,
      width: `${800 / (numberOfPlantes + 10)}px`,
      border: "1px solid #333"
    },
    hover: {
      backgroundColor: "#009688"
    }
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...styles.bar,
        ...(hover ? styles.hover : null)
      }}
    ></div>
  );
};

export default Bar;