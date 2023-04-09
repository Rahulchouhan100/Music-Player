import React, { useState, useEffect } from "react";
import "./sidebar.css";
import logo from "../../assest/logo.png";

const Sidebar = () => {
  const [data, setData] = useState(null);
  const apiEndpoint = "https://api.ss.dev/resource/api";
  const query = `query GetPlaylists {
    getPlaylists {
      id
      title
    }
  }`;

  const getData = () => {
    fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((data) => setData(data?.data?.getPlaylists))
      .catch(console.error);
  };

  useEffect(() => {
    getData();
  }, []);
  if (!data) return;
  return (
    <div className="sidebar">
      <div>
        <img src={logo} alt="spotify-logo" className="logo" />
        <ul>
          {data.map((datas) => {
            return (
              <li key={datas.id}>
                <p>{datas.title}</p>
              </li>
            );
          })}
        </ul>
        ;
      </div>
      <div>
        <img
          src="https://randomuser.me/api/portraits/men/40.jpg"
          alt="profile-photo"
          className="profile-photo"
        />
      </div>
    </div>
  );
};

export default Sidebar;
