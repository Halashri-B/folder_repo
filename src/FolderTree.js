import React from "react";
import FolderNode from "./FolderNode";

function FolderTree({ data, setData }) {
  return (
    <div>
      {Object.entries(data).map(([key, value]) => (
        <FolderNode
          key={key}
          name={key}
          children={value}
          path={[key]}
          setData={setData}
        />
      ))}
    </div>
  );
}

export default FolderTree;
