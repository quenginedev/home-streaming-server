# Local Streaming Server
Serve movies and series on your local network. Just copy and paste your movies or series in their respective folders and start streaming! 

---

# Setup

### Prerequisites
1. [Node JS](https://nodejs.org/en/)
2. [OMDB API KEY](https://www.omdbapi.com/apikey.aspx)
3. Movies Folder
4. Series Folder

### Movies folder structure
Rename all movies to their original names
eg ```Somthing random _ Watch Sonic the Hedgehog 2 (2022) Online Free on ___.mp4``` should be renamed ```Sonic the Hedgehog 2.mp4```. Hint, Just google the name of the movie and past the name from result.

### Series folder structure
1.  Each series should be a folder with the original name like the example stated in movies
2.  In each series folder must be folders of the the seasons. eg ```Season 1```
3.  In each season folder must contain only episodes of the season. Every episode can be named whatever you want but to be a bit structured rename each episode with the episode number in front of the file name 
   Eg. ```Pilot.mp4``` should  ```1 Pilot.mp4```

---

### Server
1. Navigate into the ```./server```
2. Create a ```.env``` file

        SERVER_PORT={SERVER PORT}
        OMDB_API_KEY={OMDB API KEY}
        MEDIA_PATH_MOVIE={MOVIES PATH}
        MEDIA_PATH_SERIES={SERIES PATH}
  
  Replace the following variables
  {SERVER PORT} = the port you want the server to run on. Eg ```5000```.
  {OMDB API KEY} = API key you got from OMDB
  {MOVIES PATH} and {SERIES PATH} = the directories or folders your movies or series are stored in. Eg 


  **Windows**
  ```MEDIA_PATH_MOVIE=C:\\Users\\{USER ACCOUNT}\\Videos\\Moives```
  ```MEDIA_PATH_SERIES=C:\\Users\\{USER ACCOUNT}\\Videos\\Series```

  **Mac/Linux**
  Not tested yet.


3. In a terminal run,
   1.  Navigate into the server folder of the project
   2.  Run the command ```npm install``` to install dependencies
   3.  Run the command ```npm run start``` to start the server
   
    You should see something like in your terminal.

        Server started

        network:   192.168.100.3:5000
        local:     localhost:5000

Note: keep not of the internal port in your terminal


### App
This will be hosted soon. Keep calm and relax 😎

If you can't wait for the hosted version, Do this instead
1. Open a terminal
2. Navigate to the `app` folder in the project
3. Run the command `npm install`
4. Run the command `npm run dev`
    You should see the app running. copy the network address into any browser on your network and it should work. 