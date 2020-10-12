import React from 'react'
import { Link } from 'react-router-dom'
import { useTrack } from 'react-spotify-api'

function Statistics(props) {
    const [songID, setSongID] = React.useState(null)
    setSongID(new URLSearchParams(props.location.search).get("songID"))
    const { data } = useTrack(songID)

    return (
        <React.Fragment>
            <Link 
                to='/'>
                Return to search
            </Link>
            <br/>
            {data &&
                <div>
                <h1>Song Name:</h1>{data.name}
                <h1>Artist(s):</h1>{data.artists.map(artist => (
                                            <li key = {artist.id}>{artist.name}</li>
                                        ))}
                <h1>Duration:</h1>{Math.floor((data.duration_ms/1000)/60)}m:{Math.floor((data.duration_ms/1000)%60)}s
                <h1>Duration (Milliseconds):</h1> {data.duration_ms}
                <h1>Popularity:</h1>{data.popularity}
                <h1></h1>
                </div>
            }

        </React.Fragment>
    )
}
export default Statistics