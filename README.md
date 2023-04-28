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
        - Password Encryption (2 pts)
            - The password is encrypted enroute to the database and is decrypted
              after being retrieved, in user.js.
        - Image Status Updates
            - Images are saved within the /public directory on the server running the
              backend and are then served, according to the imageUrl saved with
              relevant StatusUpdates.
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
- Grouping children of parent element in CSS selector
    - https://stackoverflow.com/a/67833613
- Using htmlFor for <label>s
    - https://www.codeproject.com/Tips/1248317/Creating-Labels-for-Input-Elements-in-React
- How to clear timeouts
    - https://dev.to/dillionmegida/how-to-cancel-a-settimeout-in-javascript-l2p#:~:text=Cancelling%20a%20setTimeout&text=Here's%20how...&text=With%20this%20id%20and%20the,you%20can%20cancel%20a%20setTimeout%20.&text=If%20the%20setTimeout%20declaration%20has,will%20not%20be%20executed%20anymore.
- HTML line break with '\n'
    - https://stackoverflow.com/questions/39325414/line-break-in-html-with-n
- HTML non-breaking space (&nbsp;)
    - https://www.w3schools.com/html/html_entities.asp
- Offsetting HashLink scroll functionality
    - HashLink documentation with link to offset example - https://www.npmjs.com/package/react-router-hash-link
    - Code example - https://github.com/rafgraph/react-router-hash-link/issues/25#issuecomment-536688104
- CSS background
    - Gradient documentation - https://developer.mozilla.org/en-US/docs/Web/CSS/gradient
    - How to use gradients - https://www.thisdot.co/blog/understanding-css-gradients
    - General background information - https://developer.mozilla.org/en-US/docs/Web/CSS/background
- Dark website theme inspiration
    - https://www.google.com/search?rlz=1C1VDKB_enUS933US933&sxsrf=APwXEdfD6ov3QgBkKQ7qtUt9w0Th_lQSBw:1682567496754&q=dark+website+theme&tbm=isch&sa=X&ved=2ahUKEwjymdGvlMn-AhUcPUQIHT-uDrMQ0pQJegQICxAB&biw=1536&bih=746&dpr=1.25#imgrc=ToOrhhOnEfbmVM
- React-icons
    - https://react-icons.github.io/react-icons/
- Date formatting
    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options
- <textarea> resize option
    - https://stackoverflow.com/questions/25567707/textarea-disable-resize-on-x-or-y
- How to style an input field with type "file"
    - https://stackoverflow.com/questions/572768/styling-an-input-type-file-button
- Flexbox align-items values
    - https://css-tricks.com/almanac/properties/a/align-items/
