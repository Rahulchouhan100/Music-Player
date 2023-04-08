import "./main.css";
import Sidebar from "../sidebar/Sidebar";
import { useEffect, useRef, useState } from "react";
import searchIcon from "../../assest/magnifying-glass.png";
import playIcon from "../../assest/play.png";
import pauseIcon from "../../assest/pause-button.png";
import nextBtnIcon from "../../assest/next-button.png";
import prevBtnIcon from "../../assest/previous.png";
import dotIcon from "../../assest/equalizer.png";
import volumeIcon from "../../assest/volume-up.png";
import Shimmer from "../shimmer/Shimmer";

const Main = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSong, setSelectedSong] = useState(null); // hold the details of the selected song
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); //slider/range
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

  // handle play and pause start

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };
  // handle play and pause end

  // input range/slider start
  const handleSliderChange = (event) => {
    audioRef.current.currentTime = event.target.value;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };
  // input range/slider end

  // handle prev and next song
  const handlePrevSong = () => {
    const currentIndex = data.findIndex(
      (song) => song._id === selectedSong._id
    );
    const prevIndex = (currentIndex - 1 + data.length) % data.length;
    setSelectedSong(data[prevIndex]);
  };

  // Handle next song click
  const handleNextSong = () => {
    const currentIndex = data.findIndex(
      (song) => song._id === selectedSong._id
    );
    const nextIndex = (currentIndex + 1) % data.length;
    setSelectedSong(data[nextIndex]);
  };

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
                <section>
                  {Math.floor(songs?.duration / 60) +
                    ":" +
                    Math.floor(songs?.duration % 60)}
                </section>
              </div>
            );
          })}
        </div>
        {/* <Shimmer /> */}
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
            </div>
            <input
              type="range"
              min="0"
              max={audioRef?.current?.duration}
              value={currentTime}
              onChange={handleSliderChange}
              className="slider"
            />
            <div className="music-control-container">
              <audio
                ref={audioRef}
                src={selectedSong?.url}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => {
                  const nextSongIndex =
                    data.findIndex((song) => song._id === selectedSong._id) + 1;
                  if (nextSongIndex >= data.length) {
                    setSelectedSong(null);
                  } else {
                    setSelectedSong(data[nextSongIndex]);
                    audioRef.current.play();
                  }
                }}
              />

              <div className="first-control">
                <img src={dotIcon} alt="icon" className="dot-icon" />
              </div>
              <div className="second-control">
                <img
                  src={prevBtnIcon}
                  alt="previous-icon"
                  className="prev-icon"
                  onClick={handlePrevSong}
                />
                {isPlaying ? (
                  <img
                    src={pauseIcon}
                    alt="pause-icon"
                    className="pause-icon"
                    onClick={handlePlay}
                  />
                ) : (
                  <img
                    src={playIcon}
                    alt="play-icon"
                    className="play-icon"
                    onClick={handlePlay}
                  />
                )}

                <img
                  src={nextBtnIcon}
                  alt="next-icon"
                  className="next-icon"
                  onClick={handleNextSong}
                />
              </div>
              <div className="third-control">
                <img src={volumeIcon} alt="" className="volume-icon" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
