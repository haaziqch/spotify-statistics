import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTrack, TrackFeatures } from 'react-spotify-api'
import Cookies from 'js-cookie'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Card from './Card.js'
import FeatureCard from './FeatureCard.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngry, faClock, faDrum, faFire, faGuitar, faHourglassHalf, faKey, faMicrophone, faMusic, faRecordVinyl, faShoePrints, faSmile, faWifi } from '@fortawesome/free-solid-svg-icons' 


function Statistics(props) {
    
    let location = useLocation()
    const search = location.search
    const params = new URLSearchParams(search)
    const id = params.get("songID")
    const [songID] = React.useState(id)
    const { data } = useTrack(songID)

    const [status, setStatus] = React.useState('idle')
    const [ songFeatures, setSongFeatures ] = React.useState([])
    
    useEffect(() => {
        
        const fetchSongFeatures = async () => {
            setStatus('fetching')
            const response = await fetch(
                `https://api.spotify.com/v1/audio-features/${songID}`, {
                    method: 'GET',
                    headers: {"Authorization": "Bearer " + Cookies.get('spotifyAuthToken')}
                }
                
            )
            const results = await response.json()
            setSongFeatures(results)
            setStatus('fetched') 
        }
        fetchSongFeatures()
    
    }, []);
    

    return (
        <React.Fragment>
            <Link
                className='link flex-center' 
                to='/'>
                Return to search
            </Link>
            <br/>
                    {data &&
                        <div className = 'grid space-around container-sm'>
                        <Card 
                            header={data.name}
                            subheader={data.album.name}
                            image={data.album.images[1].url}
                        >
                        <h2>Preview</h2>  
                        <audio className="audio-element" controls="controls" src={data.preview_url} type="audio/mpeg"/>
                        
                        
                        <h2>Artist(s):</h2>{data.artists.map(artist => (
                            <li key = {artist.id}>{artist.name}</li>
                        ))}
                        
                        <h2>Belongs to:</h2> {data.album.album_type}
                        
                        <h2>Release Date (yyyy-mm-dd):</h2>{data.album.release_date}

                        <h2>Duration:</h2>{Math.floor((data.duration_ms/1000)/60)}m:{Math.floor((data.duration_ms/1000)%60)}s
                        <h2>Duration (Milliseconds):</h2> {data.duration_ms} ms
                        
                        <h2>Explicit:{data.explicit==false ? '❌' : '✔️'}</h2>
                        
                        <h2>Popularity:</h2>
                        <ProgressBar now={data.popularity} label={`${data.popularity}`}/>


                        </Card>

                        <FeatureCard 
                            header={'Track Features'}
                            subheader={`For ${data.name}`}
                        >
                        <h2><FontAwesomeIcon icon={faShoePrints}/> Danceability: {songFeatures.danceability}</h2>
                        <h2><FontAwesomeIcon icon={faFire}/> Energy: {songFeatures.energy}</h2> 
                        <h2><FontAwesomeIcon icon={faKey}/> Key: {songFeatures.key}</h2> 
                        <h2><FontAwesomeIcon icon={faWifi}/> Loudness: {songFeatures.loudness}</h2> 
                        <h2><FontAwesomeIcon icon={faMusic}/> Mode: {songFeatures.mode}</h2> 
                        <h2><FontAwesomeIcon icon={faMicrophone}/> Speechiness: {songFeatures.speechiness}</h2> 
                        <h2><FontAwesomeIcon icon={faGuitar}/> Acousticness: {songFeatures.acousticness}</h2> 
                        <h2><FontAwesomeIcon icon={faDrum}/> Instrumentalness: {songFeatures.instrumentalness}</h2> 
                        <h2><FontAwesomeIcon icon={faRecordVinyl}/> Liveness: {songFeatures.liveness}</h2> 
                        <h2>{songFeatures.valence>0.5 ? <FontAwesomeIcon icon={faSmile}/> : <FontAwesomeIcon icon={faAngry}/>} Valence: {songFeatures.valence}</h2> 
                        <h2><FontAwesomeIcon icon={faClock}/> Tempo: {songFeatures.tempo}</h2>
                        <h2><FontAwesomeIcon icon={faHourglassHalf}/> Time Signature: {songFeatures.time_signature}</h2>

                        <Link
                            className='link' 
                            to='/explanation'>
                            Statistic Explanation
                        </Link>
                        </FeatureCard>

                        </div> 
                    }

        </React.Fragment>
    )
}
export default Statistics