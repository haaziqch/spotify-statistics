import React from 'react'
import { Search } from 'react-spotify-api'
import { Link } from 'react-router-dom' 
import Card from './Card.js'

function SongSearch() {
    const [searchQuery, setSearchQuery] = React.useState('')
    let searchItem = ''
    return (
        <React.Fragment>
            <label className='flex-center' htmlFor="songsearch">Search</label><br/>
            <div className='flex-center'>
                <input id='songsearch'type='text' onChange={(e) => searchItem=e.target.value}/>
                <button type='submit' onClick={() => setSearchQuery(searchItem)}>Submit</button>
            </div>
            <Search query={searchQuery} track>
                {({ data })=>
                    data ? (
                        <div>
                            <h2 className='flex-center'>Tracks</h2>
                            <ul className='grid space-around'>
                            {data.tracks.items.map(track => (
                                <li className='primaryList' key = {track.id}>
                                    <Card header={track.name} image={track.album.images[1].url}>
                                    <Link
                                        className='link flex-center' 
                                        to={{
                                            pathname:'/statistics',
                                            search:`?songID=${track.id}`
                                        }}>
                                        {track.name}
                                        </Link>
                                    <h2>Preview</h2> 
                                    <audio className="audio-element" controls="controls" src={track.preview_url} type="audio/mpeg">
                                    </audio>
                                    <ul className='card-list'>
                                    {track.artists.map(artist => (
                                        <li className='secondaryList flex-center' key = {artist.id}>{artist.name}</li>
                                    ))}
                                    </ul>
                                    </Card>
                                </li>
                            ))}
                            </ul>
                        </div>
                    ) : null
                }
            </Search>
        </React.Fragment>
    )
}
export default SongSearch;
