import "./main.css";
import Sidebar from "../sidebar/Sidebar";
import { useEffect, useRef, useState } from "react";
import searchIcon from "../../assest/magnifying-glass.png";

const Main = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSong, setSelectedSong] = useState(null); // hold the details of the selected song
  // const audioRef = useRef(null);

  const apiEndpoint = "https://api.ss.dev/resource/api";
  const query = `query GetPlaylists($playlistId: Int!, $search: String!) {
    getSongs(playlistId: $playlistId, search: $search) {
      _id
      artist
      duration
      photo
      title
      url
    }
  }`;

  const getData = (playlistId) => {
    fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: { playlistId, search: "" },
      }),
    })
      .then((res) => res.json())
      .then((data) => setData(data?.data?.getSongs))
      .catch(console.error);
  };

  useEffect(() => {
    getData(1);
  }, [searchQuery]);

  //  function to select a song
  const handleSongClick = (songs) => {
    setSelectedSong(songs);
  };

  //  function to select a song end

  // search functinality --------
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  let filteredData = data.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // if (filteredData.length === 0) {
  //   filteredData = [{ _id: "nodata" }];
  //   // return <h1>NO data found </h1>;
  // }

  // search functionality end
  return (
    <div className="main-container">
      <Sidebar />
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
                  <div>
                    <h3>{songs?.title}</h3>
                    <p>{songs?.artist}</p>
                  </div>
                </section>
                <section>{songs?.duration / 60}</section>
              </div>
            );
          })}
        </div>
      </div>
      <div className="last-container">
        {selectedSong && (
          <div>
            <div className="single-song-container">
              <h3 className="title">{selectedSong?.title}</h3>
              <p className="artist">{selectedSong?.artist}</p>
              <div className="single-song-image">
                <img
                  src={selectedSong?.photo}
                  alt="song-photo"
                  className="song-photo"
                />
              </div>

              {/* {console.log("song" + selectedSong.url)} */}
            </div>
            <div className="music-control-container">
              <h1>heosssssssssssssssssssssssssssss</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
