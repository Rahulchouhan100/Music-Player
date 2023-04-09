import searchIcon from "../../assest/magnifying-glass.png";
import Shimmer from "../shimmer/Shimmer";

const ForYou = ({
  searchQuery,
  handleSearch,
  filteredData,
  handleSongClick,
  data,
}) => {
  return data.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="middle-container">
      <h2>For You</h2>
      <div className="search-container">
        <input
          type="search"
          placeholder="Search Song , Artist"
          value={searchQuery}
          onChange={handleSearch}
        />
        <img src={searchIcon} alt="searchIcon" className="search-icon" />
      </div>
      <div className="list-container">
        {filteredData.map((songs, ind) => {
          return (
            <div
              className="single-data-container"
              key={songs._id}
              onClick={() => handleSongClick(songs)}
            >
              <section className="song-details">
                <img src={songs?.photo} alt="photo" />
                <div className="title-artist">
                  <h3>{songs?.title}</h3>
                  <p>{songs?.artist}</p>
                </div>
              </section>
              <section style={{ color: "white" }}>
                {Math.floor(songs?.duration / 60) +
                  ":" +
                  Math.floor(songs?.duration % 60)}
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForYou;
