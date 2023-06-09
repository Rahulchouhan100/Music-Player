import React, { useEffect, useState } from "react";
import pauseIcon from "../../assest/pause-button.png";
import nextBtnIcon from "../../assest/next-button.png";
import prevBtnIcon from "../../assest/previous.png";
import dotIcon from "../../assest/equalizer.png";
import volumeIcon from "../../assest/volume-up.png";
import playCircle from "../../assest/play-circle.png";
import { useEffect } from "react";
import hamburger from "../../assest/menu.png";
import closeIcon from "../../assest/close.png";

const SongDetails = ({
  selectedSong,
  audioRef,
  currentTime,
  handleSliderChange,
  handleTimeUpdate,
  handlePrevSong,
  handleNextSong,
  handlePlay,
  isPlaying,
  setShowContainer,
}) => {
  const [toggle, setToggle] = useState(false);

  const handlerShow = () => {
    setShowContainer((prev) => !prev);
    setToggle(!toggle);
  };
  return (
    <div className="last-container">
      {selectedSong && (
        <div>
          <div className="single-song-container">
            <div className="single-song-header">
              <h3 className="title">{selectedSong?.title}</h3>
              {toggle ? (
                <button
                  className="menu-btn"
                  onClick={handlerShow}
                  style={{
                    padding: ".8rem",
                    backgroundColor: "white",
                    border: "none",
                  }}
                >
                  <img src={closeIcon} alt="" style={{ width: "12px" }} />
                </button>
              ) : (
                <button
                  className="menu-btn"
                  onClick={handlerShow}
                  style={{
                    padding: "0 .8rem",
                    fontSize: "2rem",
                    backgroundColor: "white",
                    border: "none",
                  }}
                >
                  <img src={hamburger} alt="" style={{ width: "12px" }} />
                </button>
              )}
            </div>

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
                  src={playCircle}
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
  );
};

export default SongDetails;
