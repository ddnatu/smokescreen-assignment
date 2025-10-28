To Run this project - 

npm start on both the root directory and the UI directory
Node version to be used - 22

the "ui" folder contains
Libraries Used: 
express for running server
Tanstack table 
react-datepicker (set default time and dates)
Redux toolkit for state management - 
For Table i am using redux toolkit to manage the state
For Time Series graph i am directly calling from the component (since this was a straight forward implementation i wasn't using redux toolkit earlier but added it later for table component)
Not used any router and both the components are in a single page.
Column filtering happening on the backend in server.js (node)
Typescript - basic knowledge but implemented wherever possible in a limited fashion.
Tailwind for basic styling - this is totally new for me.
Also node.js implementation i have tried for the first time as an end to end product.

Known shortcomings: 
Sorting is straightforward from the client-side, but i wanted to implement from the server side and ran short of time.
Unit Tests- I have written extensive Unit Test cases for my project but unfortunately was short of time to include UTs
Project structure I could not segregate and modularize properly also couldn't optimize much using memo and callback hooks due to minimal . 

This is solely done by myself in 2 days of intermittent work and relying purely on google and docs (some implementations are , I wish i could have finished sooner and better but coulnd't due to some personal emergencies.
Please provide the feedback on the comments or email
Thank you.
