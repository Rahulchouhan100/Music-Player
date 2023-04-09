import logo from "../../assest/logo.png";
import "./sidebar.css";

const Sidebar = ({
  setShowForYou,
  setShowTopTracks,
  setShowFavorites,
  setShowRecentlyPlayed,
}) => {
  const handleForYouClick = () => {
    setShowForYou(true);
    setShowTopTracks(false);
    setShowFavorites(false);
    setShowRecentlyPlayed(false);
  };

  const handleTopTracksClick = () => {
    setShowForYou(false);
    setShowTopTracks(true);
    setShowFavorites(false);
    setShowRecentlyPlayed(false);
  };

  const handleFavoritesClick = () => {
    setShowForYou(false);
    setShowTopTracks(false);
    setShowFavorites(true);
    setShowRecentlyPlayed(false);
  };

  const handleRecentlyPlayedClick = () => {
    setShowForYou(false);
    setShowTopTracks(false);
    setShowFavorites(false);
    setShowRecentlyPlayed(true);
  };

  return (
    <div className="sidebar">
      <div>
        <img src={logo} alt="" className="logo" />
        <ul>
          <li onClick={handleForYouClick}>For You</li>
          <li onClick={handleTopTracksClick}>Top Tracks</li>
          <li onClick={handleFavoritesClick}>Favorites</li>
          <li onClick={handleRecentlyPlayedClick}>Recently Played</li>
        </ul>
      </div>
      <div>
        <img
          src="https://randomuser.me/api/portraits/men/36.jpg"
          alt=""
          className="profile-photo"
        />
      </div>
    </div>
  );
};

export default Sidebar;
