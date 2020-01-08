/* 
Hi Will, 

This was the simplist way to implement a plain text editor 
with the structure of the project as is. My solution
could be improved in a number of ways if I had more time:

  1.) Modify the existing file instead of creating a new one every time
  2.) Save on a specific time interval (say every 10 seconds) and give the user a button to save manually
*/
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import css from "./style.css";


function PlaintextEditor({ file, write }) {
  console.log(file, write);
  const [fileText, setFileText] = useState("")
  useEffect(() => {
    // step 1: extract the text from the file
    async function getFileText(){
      var text = await file.text();
      setFileText(text); // step 2: make a copy of that value to state
    }
    getFileText();
  }, [file]);

  // called whenever the user edits the text
  function handleTextChanged(event){
    // step 3: update state when the user edits text
    setFileText(event.target.value);
    // step 4: create a new file with the updated text and lastModified date
    let tempFile = new File(
      [event.target.value],
      "/plain.txt",
      {
        type: "text/plain",
        lastModified: new Date(),
      }
    );
    // step 5: update the list of files
    write(tempFile);
  }
  return (
    <div className={css.editor}>
      <h3>{file.name}</h3>
      <textarea
        className={css.fileTextArea}
        value={fileText} 
        onChange={(e)=>handleTextChanged(e)}
        ></textarea>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
