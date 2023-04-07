import "./Shimmer.css";

const Shimmer = () => {
  return (
    <>
      <div className="search-shimmer"></div>
      <div className="shimmer-container">
        {Array(15)
          .fill("")
          .map((e, index) => (
            <div className="shimmer" key={index}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Shimmer;
