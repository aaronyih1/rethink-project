export function listFiles() {
  const noteForWill = new File(
    [`

Hi Will, 

This was the simplest way to implement a plain text editor. 

Aside from making the plaintext files editable, I also:

1.) sorted files by last edit date
2.) added a pig latin text translator (try the button above)
3.) added a dictionary lookup feature (double click or highlight a word to try, single click to hide)

My solution could be improved in a number of ways if I had more time:

1.) Modify the existing file instead of creating a new one every time
2.) Save on a specific time interval (say every 10 seconds) and give the user a button to save manually to avoid saving after every change
3.) Better CSS organization and management

An alternative solution would have been to avoid text area completely and build my own text editor interface from scratch. It would have taken longer, but it would have also given us more control around the rendering of the text (the textArea value attr does not accept html). Since the challenge was about rendering "plain text," I decided to focus on building functionality around plain text instead of converting the doc to rich text or displaying text in funky ways, though that would have been fun too.

There are a few libraries like Draft.js that can make that approach really straightforward.

I felt that these ideas demonstrated some interesting ways to expand on viewing and editing plaintext docs in Rethink. This is especially true if you consider the possibility of using a real language translator (like french or mandarin) instead of pig latin and pulling in interesting data from all kinds of other data, like a  Wikipedia entries.

Thanks, let me know what you think!
Aaron
    `], "/SUBMISSION_NOTES.txt",
    {
      type: "text/plain",
      lastModified: new Date("2020-01-08T09:31:00")
    }
  )
  const guide = new File(
    [
      `The primary objective is to extend this application to support plaintext editing. Instead of this default preview, text files will open in an elegant editor built by you. The editor will support writing changes to the file.

All code and assets for this app live under https://github.com/rethinksoftware/plaintext-editing-challenge.

The editor skeleton is already passed a File object and a write() function. You'll need to configure write() yourself, but it should update the files list in state. Files do not need to persist between reloads (but it would be neat if they did). Look for REGISTERED_EDITORS in index.js to register editors for different media types.

This is designed for creative freedom. Everybody loves to edit plaintext, but feel free to take initiative on secondary objectives of your choosing.

Once complete, I'd love to see how you think about editing plaintext. Email me a repo link at will@rethink.software.

Thanks for trying my challenge!

- Will
`
    ],
    "/README.txt",
    {
      type: "text/plain",
      lastModified: new Date("2020-01-05T16:39:00")
    }
  );

  const plain = new File(
    ["Just some text looking for an editor"],
    "/plain.txt",
    {
      type: "text/plain",
      lastModified: new Date("1995-12-17T03:24:00"),
      version:1
    }
  );

  const water = new File(
    [
      "Increasing water scarcity is an extremely dangerous symptom of a warming planet. The World Health Organization estimates that half of the global population will live in water-stressed areas by 2025. In 2008, the CEO of DOW Chemical said, “Water is the oil of the 21st century.” There have been 9 major conflicts over oil since 1932. While many still take it for granted today, I suspect water will be a significant source of armed conflict in coming decades."
    ],
    "/water.txt",
    {
      type: "text/plain",
      lastModified: new Date("1998-12-17T04:24:00")
    }
  );

  // Here is a markdown file
  const fancy = new File(
    [
      `# Some Markdown

The *quick* brown fox, jumped **over** the lazy [dog](https://en.wikipedia.org/wiki/Dog).`
    ],
    "/fancy.md",
    {
      type: "text/markdown",
      lastModified: new Date("2018-09-14T09:32:17")
    }
  );

  const javascript = new File(
    [
      `import { useState, useRef, useEffect } from 'react';

// From: https://blog.castiel.me/posts/2019-02-19-react-hooks-get-current-state-back-to-the-future/

export default initialValue => {
  const [state, setState] = useState(initialValue);
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);
  return [state, stateRef, setState];
};`
    ],
    "/use-ref-state.js",
    {
      type: "text/javascript",
      lastModified: new Date("2019-04-01T12:15:01")
    }
  );

  const json = new File(
    [
      `{
    "name" : "Admin",
    "email" : "admin@neptune.com",
    "rights" : [ "admin", "editor", "contributor" ]
}`
    ],
    "/document.json",
    {
      type: "application/json",
      lastModified: new Date("2011-07-29T16:01:35")
    }
  );

  return [noteForWill, guide, plain, water, fancy, javascript, json];
}
