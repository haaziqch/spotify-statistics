import React, { useEffect, useState } from 'react'
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import { SpotifyApiContext } from "react-spotify-api";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Cookies from 'js-cookie'
import './App.css';
import 'react-spotify-auth/dist/index.css'
import Loading from './Components/Loading'

const SongSearch = React.lazy(() => import('./Components/SongSearch'))
const Statistics = React.lazy(() => import('./Components/Statistics'))

const App = () => {
  
  const [spotifyAuthToken, setSpotifyAuthToken] = useState();
  
  useEffect(() => {
    setSpotifyAuthToken(Cookies.get('spotifyAuthToken'));
  }, [Cookies.get('spotifyAuthToken')])

  return (
      <Router>
      <div className="app">
        <h1>Spotify Statistics</h1>
        {/* If there is a cookie named 'spotifyAuthToken' */}
        {Cookies.get('spotifyAuthToken') ?
          (
            // Display the app
            
            <SpotifyApiContext.Provider value={spotifyAuthToken}>
              <React.Suspense fallback={<Loading/>}>
                <Switch>
                  <Route exact path='/' component={SongSearch}/>
                  <Route path='/statistics' component={Statistics}/>
                  <Route render={() => <h1>404 Page not found</h1>} />
                </Switch>
              </React.Suspense>
            </SpotifyApiContext.Provider>
          ) : (
            // Display the login page
            <SpotifyAuth
              redirectUri='https://hazspotifystats.netlify.app/'
              clientID='980f2e2029ce43edbcd5de59f9cb452d'
              scopes={[Scopes.userTopRead]}
            />
          )
        }
      </div>
      </Router>
  )
}
export default App