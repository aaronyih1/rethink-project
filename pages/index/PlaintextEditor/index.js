import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
var piglatin = require('piglatin');
import ReactTooltip from 'react-tooltip'

import css from "./style.css";


function PlaintextEditor({ file, write }) {
  console.log(file, write);
  const [fileText, setFileText] = useState("")
  const [previousFileText, setPreviousFileText] = useState("")
  const [pigLatin, setPigLatin] = useState(false);
  const [definition,setDefinition] = useState("");
  const fooRef = useRef(null)
  useEffect(() => {
    console.log(piglatin("this is a test"));
    // step 1: extract the text from the file
    async function getFileText(){
      var text = await file.text();
      setPreviousFileText(text);
      setFileText(text); // step 2: make a copy of that value to state
    }
    getFileText();
  }, [file]);

  // called whenever the user edits the text
  function handleTextChanged(event){
    let inputValue = event.target.value;

    // step 3: update state when the user edits text
    console.log("pig latin ", pigLatin)
    console.log(typeof inputValue)
    setFileText(pigLatin?piglatin(inputValue):inputValue);
    // step 4: create a new file with the updated text and lastModified date
    let tempFile = new File(
      [fileText],
      file.name,
      {
        type: "text/plain",
        lastModified: new Date(),
      }
    );
    // step 5: update the list of files
    write(tempFile);
  }
  return (
    <div 
      className={css.editor} 
      data-tip={definition}
      >
      <div className={css.fileInfoHeader}>
        <h3>{file.name.substring(1)}</h3>
        <div className="rightSideButtons">
          <button
            className={css.filterButton}
            onClick={(e)=>{
              e.preventDefault();
              console.log(pigLatin);
              if(!pigLatin){
                setFileText(piglatin(fileText));
              }
              else{
                setFileText(previousFileText);
              }
              setPigLatin(!pigLatin);
            }}
          >pig latin</button>
        </div>
      </div>
      <ReactTooltip 
        effect="float"
        getContent={(dataTip) => {return(definition)}}
      />
      
      <textarea
        className={css.fileTextArea}
        value={fileText} 
        onChange={(e)=>handleTextChanged(e)}
        onClick={()=>
          setDefinition("")
        }
        onSelect={async()=>{
          let selectedWord = window.getSelection().toString();
          if(selectedWord.length>0){
            const response = await fetch("https://wordsapiv1.p.mashape.com/words/"+selectedWord, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                "X-Mashape-Key": "ed3a6aa7bbmshed2ee3cfc0c6759p1e0325jsnc69ca29f4ac8",
                "Accept": "application/json"
              }
            });
            let wordData = await response.json();
            console.log(wordData)
            if(typeof wordData.results != "undefined"){
              setDefinition(selectedWord+" : "+wordData.results[0].definition)
            }
            else{
              setDefinition("error: "+wordData.message)
            }
          }
        }}
        ></textarea>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
