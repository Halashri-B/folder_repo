import React, { useState } from "react";
import { FaFolder, FaFile, FaFolderOpen } from "react-icons/fa";

function FolderNode({ name, children = {}, path, setData }) {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = typeof children === "object" && !Array.isArray(children);

  const toggleOpen = () => setIsOpen(!isOpen);

  // Handle adding a new file/folder
  const handleAdd = () => {
    const newName = prompt("Enter the name of the new file/folder:");
    if (!newName) return; // If no name is provided, do nothing.

    setData((prevData) => {
      const updatedData = { ...prevData };
      let current = updatedData;

      // Navigate to the correct folder using the path
      path.forEach((key) => {
        current = current[key];
      });

      // Add the new file or folder with the name provided by the user
      if (typeof children === "object") {
        if (!current[newName]) {
          current[newName] = {}; // Create a new folder
        } else {
          alert("A file/folder with this name already exists!");
        }
      } else {
        if (!current[newName]) {
          current.push(newName); // Add as a file name in an array
        } else {
          alert("A file/folder with this name already exists!");
        }
      }

      return updatedData;
    });
  };

  // Handle deleting a file/folder
  const handleDelete = () => {
    setData((prevData) => {
      const updatedData = { ...prevData };
      let current = updatedData;

      // Navigate to the parent folder using the path, slicing off the last part for deletion
      path.slice(0, -1).forEach((key) => {
        current = current[key];
      });

      const lastKey = path[path.length - 1];

      // If it's an array (files), remove the item from the array
      if (Array.isArray(current)) {
        const index = current.indexOf(name);
        if (index > -1) {
          current.splice(index, 1);
        }
      } else {
        // If it's an object (folder), delete the item
        delete current[lastKey];
      }

      return updatedData;
    });
  };

  // Handle renaming a file/folder
  const handleRename = () => {
    const newName = prompt("Enter the new name:", name);
    if (!newName) return; // If no new name is entered, do nothing.

    setData((prevData) => {
      const updatedData = { ...prevData };
      let current = updatedData;

      // Navigate to the correct folder using the path
      path.slice(0, -1).forEach((key) => {
        current = current[key];
      });

      const lastKey = path[path.length - 1];

      // Check if the new name already exists in the folder
      if (typeof children === "object") {
        if (current[newName]) {
          alert("A file/folder with this name already exists!");
          return;
        }
      }

      // Rename the file or folder
      if (Array.isArray(current)) {
        const index = current.indexOf(name);
        if (index > -1) {
          current[index] = newName; // Rename in array
        }
      } else {
        // Rename the key in the object
        current[newName] = current[lastKey];
        delete current[lastKey]; // Remove the old name
      }

      return updatedData;
    });
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <div>
        {isFolder ? (
          <span onClick={toggleOpen} style={{ cursor: "pointer" }}>
            {isOpen ? <FaFolderOpen /> : <FaFolder />} {name}
          </span>
        ) : (
          <span>
            <FaFile /> {name}
          </span>
        )}
        <button onClick={handleAdd} style={{ marginLeft: "10px" }}>
          Add
        </button>
        <button onClick={handleRename} style={{ marginLeft: "5px" }}>
          Rename
        </button>
        <button onClick={handleDelete} style={{ marginLeft: "5px" }}>
          Delete
        </button>
      </div>
      {isOpen &&
        isFolder &&
        Object.entries(children).map(([childName, childValue]) => (
          <FolderNode
            key={childName}
            name={childName}
            children={childValue}
            path={[...path, childName]} // pass the full path here
            setData={setData}
          />
        ))}
    </div>
  );
}

export default FolderNode;
