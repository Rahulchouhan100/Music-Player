import "./Shimmer.css";

const Shimmer = () => {
  return (
    <>
      <div className="shimmer-container">
        {Array(8)
          .fill("")
          .map((e, index) => (
            <div className="list-shimmer">
              <div className="first-container"></div>
              <div className="second-container"></div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Shimmer;

{
  Array(8)
    .fill("")
    .map((e, index) => (
      <div className="shimmer" key={index}>
        <div></div>
        {/* <div></div> */}
      </div>
    ));
}
