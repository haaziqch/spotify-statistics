import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTrack } from 'react-spotify-api'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Card from './Card.js'

function Statistics() {
    
    let location = useLocation()
    const search = location.search
    const params = new URLSearchParams(search)
    const id = params.get("songID")
    const [songID] = React.useState(id)
    const { data } = useTrack(songID)
    const [isShown, setIsShown] = React.useState(false)

    return (
        <React.Fragment>
            <Link
                className='link' 
                to='/'>
                Return to search
            </Link>
            <br/>
            {data &&
                <div>
                <Card 
                    header={data.name}
                    subheader={data.album.name}
                    image={data.album.images[1].url}
                >
                <h1>Artist(s):</h1>{data.artists.map(artist => (
                    <li key = {artist.id}>{artist.name}</li>
                ))}
                <h1>Type:</h1> {data.album.album_type}

                <h1>Duration:</h1>{Math.floor((data.duration_ms/1000)/60)}m:{Math.floor((data.duration_ms/1000)%60)}s
                <h1>Duration (Milliseconds):</h1> {data.duration_ms}
                <u style={{fontSize:'20px'}} onMouseEnter={()=> setIsShown(true)} onMouseLeave={()=> setIsShown(false)}><h1>Popularity:</h1></u>{data.popularity}
                 <ProgressBar variant="success" now={40} />
                {isShown && 
                    <div style={{color:'yellow'}}>
                        Popularity is ranked on a scale from 0-100. The closer the number is to 100, the more popular the song is
                    </div>
                }
                </Card>
                </div>
            }

        </React.Fragment>
    )
}
export default Statistics