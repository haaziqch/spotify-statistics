import React from 'react'
import { Search } from 'react-spotify-api'
import { Link } from 'react-router-dom' 
import Card from './Card.js'

function SongSearch() {
    const [searchQuery, setSearchQuery] = React.useState('')
    const [searchItem, setSearchItem]= React.useState('')

    const handleSubmit = (evt) => {
        evt.preventDefault()
        setSearchQuery(searchItem)
    }

    return (
        <React.Fragment>
            <h2><label className='flex-center' htmlFor="songsearch">Search</label></h2><br/>
            <div className='flex-center'>
                <form onSubmit={handleSubmit}>
                    <input id='songsearch'type='text' value={searchItem} onChange={e => setSearchItem(e.target.value)}/>
                    <button type='submit' onClick={() => setSearchQuery(searchItem)}>Submit</button>
                </form>
            </div>
            <Search query={searchQuery} track>
                {({ data })=>
                    data ? (
                        <div>
                            <h2 className='flex-center'>Tracks</h2>
                            <ul className='grid space-around'>
                            {data.tracks.items.map(track => (
                                <li className='primaryList' key = {track.id}>
                                    <Link
                                        className='link flex-center' 
                                        to={{
                                            pathname:'/statistics',
                                            search:`?songID=${track.id}`
                                        }}>
                                        
                                    <Card header={track.name} image={track.album.images[1].url}>
                                        {track.name}
                                    <h2>Preview</h2> 
                                    <audio className="audio-element" controls="controls" src={track.preview_url} type="audio/mpeg">
                                    </audio>
                                    <ul className='card-list'>
                                    {track.artists.map(artist => (
                                        <li className='secondaryList flex-center' key = {artist.id}>{artist.name}</li>
                                    ))}
                                    </ul>
                                    </Card>
                                    </Link>
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
