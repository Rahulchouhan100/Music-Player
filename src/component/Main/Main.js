import "./main.css";
import Sidebar from "../sidebar/Sidebar";
import { useEffect, useState } from "react";

const Main = () => {
  const [data, setData] = useState({});
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
      .then((data) => setData(data))
      .catch(console.error);
  };

  useEffect(() => {
    getData(1);
  }, []);

  return (
    <div className="main-container">
      <Sidebar />
      <div className="middle-container"></div>
      <div className="last-container">bye</div>
    </div>
  );
};

export default Main;
