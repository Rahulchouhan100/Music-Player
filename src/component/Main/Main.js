import "./main.css";
import Sidebar from "../sidebar/Sidebar";
import { useEffect, useRef, useState } from "react";
import ForYou from "../forYou/ForYou";
import SongDetails from "../songDetails/SongDetails";

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
  // useEffect(() => {
  //   if (selectedSong) {
  //     const body = document.body;
  //     const gradient = `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${selectedSong.photo})`;
  //     body.style.background = gradient;
  //   }
  // }, [selectedSong]);

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

  if (filteredData.length === 0) {
    filteredData = [{ _id: "nodata" }];
    // return <h1>NO data found </h1>;
  }

  // search functionality end

  // handle play and pause start

  const handlePlay = () => {
    if (isPlaying) {
      audioRef?.current?.pause();
    } else {
      audioRef?.current?.play();
    }
    setIsPlaying(!isPlaying);
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

  const handleNextSong = () => {
    const currentIndex = data.findIndex(
      (song) => song._id === selectedSong._id
    );
    const nextIndex = (currentIndex + 1) % data.length;
    setSelectedSong(data[nextIndex]);
  };

  // If no song is selected, select the first song in the data array
  useEffect(() => {
    if (!selectedSong && data?.length > 0) {
      setSelectedSong(data[0]);
    }
  }, [data, selectedSong]);

  return (
    <div className="main-container">
      <Sidebar />
      <ForYou
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        filteredData={filteredData}
        handleSongClick={handleSongClick}
        data={data}
      />
      <SongDetails
        selectedSong={selectedSong}
        audioRef={audioRef}
        currentTime={currentTime}
        handleSliderChange={handleSliderChange}
        handleTimeUpdate={handleTimeUpdate}
        handlePrevSong={handlePrevSong}
        handleNextSong={handleNextSong}
        handlePlay={handlePlay}
        isPlaying={isPlaying}
        handleSongClick={handleSongClick}
        data={data}
      />
    </div>
  );
};

export default Main;
