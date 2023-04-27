# stamesha-bello-project3
Fake Twitter... or is it?

Write-up
    - What were some challenges you faced while making this app?
        - I thought that, with the "Create Entry" button in the Navbar, simply linking to
          an existing CreateStatusUpdate component (on the home or user page) would make for
          the best user experience. However, I found that more difficult than expected.
          I found that my implementation of using the navigator (produced by useNavigate)
          would only scroll and focus on the text box -- at most -- twice. If on a different
          page, it would navigate to the appropriate page and focus on the text area.
          From there, if selected again, it would do the same once more but no more after
          that. I tried updating a global variable in the Navbar, which was being "watched"
          in the ModifyStatusUpdate component (via useEffect()), but that wasn't working
          either, for some reason! I eventually found out that that there's a separate package
          for links with hashes, "react-router-hash-link", which performs all of this
          activity automatically, so I switched to using that.

    - Given more time, what additional features, functional or design changes would you make?
        - I would sdd a splash page and more animations
        - Add the ability to follow people
        - I would add the functionality to retrieve StatusUpdates based on specific
          users, so that you would only see posts from who you follow.
        - I would store and retrieve StatusUpdates with userId -- rather than username --
          so that even if someone's username changes, their status updates will still
          be available and attributed to them

    - What assumptions did you make while working on this assignment?
        - That usernames would not contain characters that could create problems for the url

    - How long did this assignment take to complete?
        - I should've timed myself, but I did not. It's honestly hard to say; I wanted
          to work on this much longer than I did, but I don't even know how much time
          I did manage to devote to this. Maybe 50-60 hours..?
    - Bonus Points Attempted
        - **Submit Early (3 pts)** NOT SURE
            - 
        - Password Encryption (2 pts)
            - The password is encrypted enroute to the database and is decrypted
              after being retrieved, in user.js.
        - **Image Status Updates** NOT YET
            - 
        - Search for Users (5 pts)
            - The Navbar retains a searchbar, with which users can be searched,
              based on username. This will produce a list of UserLinks, which will
              link to the UserPage of the selected user.


### Resources
- How to use .env file
    - https://blog.logrocket.com/customizing-node-js-env-files/
- Creating a package.json file
    - https://docs.npmjs.com/creating-a-package-json-file
- Mongoose validators
    - Built-in validators - https://mongoosejs.com/docs/validation.html#built-in-validators
    - Running validator(s) on update - https://stackoverflow.com/questions/15627967/why-mongoose-doesnt-validate-on-update
- Nested routes
    - https://reactrouter.com/en/main/start/tutorial#nested-routes
- Accessing query parameters
    - https://www.codingdeft.com/posts/react-get-query-and-url-parameters/
- Creating a drop-down menu
    - https://www.freecodecamp.org/news/html-drop-down-menu-how-to-add-a-drop-down-list-with-the-select-element/
- Using enums
    - https://www.sohamkamani.com/javascript/enums/
- Fixing repetitive timestamps
    - https://stackoverflow.com/questions/30112654/mongodb-timestamp-is-very-inaccurate-mongoose
- Getting anchor element id
    - https://stackoverflow.com/questions/65404167/how-to-retrieve-the-parameter-after-a-hash-with-react-router-and-useparams-h
- react-router-hash-link
    - Using HashLink to recreate anchor functionality - https://stackoverflow.com/questions/48223566/using-anchor-tags-in-react-router-4
    - HashLink auto-focuses on focusable elements - https://www.npmjs.com/package/react-router-hash-link
- File uploads
    - Uploading files from users - https://www.filestack.com/fileschool/react/react-file-upload/
    - Storing files on server side - https://www.filestack.com/fileschool/?post_type=post&p=10578
    - Handling ENOENT with fs.createWriteStream - https://gist.github.com/casamia918/031199ff5e015c56f87088765b047526
- Dynamically import images in React
    - https://stackoverflow.com/questions/54033765/how-to-give-image-src-dynamically-in-react-js
- Remove all styling from links
    - https://stackoverflow.com/questions/8919682/remove-all-styling-formatting-from-hyperlinks
