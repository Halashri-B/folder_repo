import React, { useState } from "react";
import FolderTree from "./FolderTree";

const initialData = {
  Documents: ["Document1.jpg", "Document2.jpg", "Document3.jpg"],
  Desktop: ["Screenshot1.jpg", "videopal.mp4"],
  Downloads: {
    Drivers: ["Printerdriver.dmg", "cameradriver.dmg"],
    chromedriver: "chromedriver.dmg",
  },
  Applications: [
    "Webstorm.dmg",
    "Pycharm.dmg",
    "FileZila.dmg",
    "Mattermost.dmg",
  ],
};

function App() {
  const [data, setData] = useState(initialData);

  return (
    <div style={{ padding: "20px" }}>
      <h1>React Folder Structure</h1>
      <FolderTree data={data} setData={setData} />
    </div>
  );
}

export default App;
