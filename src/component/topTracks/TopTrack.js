import React, { useState, useEffect } from "react";
import SearchIcon from "../../assest/magnifying-glass.png";
import "./toptrack.css";

import "./toptrack.css";
const TopTrack = ({
  handleSongClick,
  handleSearch,
  searchQuery,
  showContainer,
}) => {
  const [data, setData] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
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
    getData(2);
  }, []);

  let filteredData = data.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div
        className={`middle-container container-scroll ${
          showContainer && "show"
        }`}
      >
        <h2>Top Tracks</h2>
        <div className="search-container">
          <input
            type="search"
            placeholder="Search Song , Artist"
            value={searchQuery}
            onChange={handleSearch}
          />
          <img
            src={SearchIcon}
            alt="searchIcon"
            className="search-icon search-icon2"
          />
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
    </div>
  );
};

export default TopTrack;
