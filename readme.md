Hi Will, 

This was the simplest way to implement a plain text editor. 

Aside from making the plaintext files editable, I also:

1. sorted files by last edit date
2. added a pig latin text translator (try the button above)
3. added a dictionary lookup feature (double click or highlight a word to try, single click to hide)

My solution could be improved in a number of ways if I had more time:

1. Modify the existing file instead of creating a new one every time
2. Save on a specific time interval (say every 10 seconds) and give the user a button to save manually to avoid saving after every change
3. Better CSS organization and management

An alternative solution would have been to avoid text area completely and build my own text editor interface from scratch. It would have taken longer, but it would have also given us more control around the rendering of the text (the textArea value attr does not accept html). Since the challenge was about rendering "plain text," I decided to focus on building functionality around plain text instead of converting the doc to rich text or displaying text in funky ways, though that would have been fun too.

There are a few libraries like Draft.js that can make that approach really straightforward.

I felt that these ideas demonstrated some interesting ways to expand on viewing and editing plaintext docs in Rethink. This is especially true if you consider the possibility of using a real language translator (like french or mandarin) instead of pig latin and pulling in interesting data from all kinds of other data, like a  Wikipedia entries.

Thanks, let me know what you think!
Aaron
