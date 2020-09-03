import React from 'react'
import { Link } from 'react-router-dom'
import { useTrack, TrackAnalysis } from 'react-spotify-api'
import Loading from './Loading'


function Statistics(props) {
    const [songID, setSongID] = React.useState(new URLSearchParams(props.location.search).get("songID"))
    const { data, loading, error } = useTrack(songID)

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
                <h1>Duration (in milliseconds):</h1>{data.duration_ms}
                <h1>Popularity:</h1>{data.popularity}
                </div>
            }

        </React.Fragment>
    )
}
export default Statistics