/* 
Hi Will, 

This was the simplist way to implement a plain text editor. 
My solution could be improved in a number of ways if I had
more time:

  1.) Modify the existing file instead of creating a new one every time
  2.) Save on a specific time interval (say every 10 seconds) and give the user a button to save manually to avoid saving after every change


An alternative solution would have been to avoid text area
completely and build my own text editor interface from scratch.
It would have taken longer, but it would have also given us
more control around the rendering of the text (the textArea 
value attr does not accept html). Since the challenge was about 
rendering "plain text," I decided to focus on building functionality
around plain text instead of converting the doc to rich text or
displaying text in funky ways, though that would probably be fun too.

There are a few libraries like Draft.js that can make that approach
really straightforward.

Aside from making the plaintext files editable, I also:

  1.) sorted files by thir last edit date
  2.) added a pig latin text translator
  3.) added a dictionary lookup feature

I felt that these ideas demonstrated some interesting ways to expand
on viewing and editing plaintext docs in rethink. This is especially
true if you consider the possibility of using a real language 
translator (like french or mandarin) instead of pig latin and
pulling in interesting data from all kinds of other data, like a 
Wikipedia entries.
*/

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
var piglatin = require('piglatin');
import ReactTooltip from 'react-tooltip'
// var unirest = require('unirest');

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
  // useEffect(()=>{
  //   setDefinition(definition);
  // },[definition])
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
            // ReactTooltip.show(fooRef)
            //return await response.json(); // parses JSON response into native JavaScript objects
            
            // unirest.get("https://wordsapiv1.p.mashape.com/words/soliloquy")
            //   .header("X-Mashape-Key", "<required>")
            //   .header("Accept", "application/json")
            //   .end(function (result) {
            //     console.log(result.status, result.headers, result.body);
            //   });
            //window.getSelection().focusNode.setAttribute('data-tip', "Hello this is a datatip");
            // if(wordData.success==false || typeof wordData.results[0] != "undefined"){
            //   setDefinition("error: "+wordData.message)
            // }
            // else{
            //   setDefinition(selectedWord+" : "+wordData.results[0].definition)
            // }
            if(typeof wordData.results != "undefined"){
              setDefinition(selectedWord+" : "+wordData.results[0].definition)
            }
            else{
              setDefinition("error: "+wordData.message)
            }
            // console.log(window.getSelection())
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
