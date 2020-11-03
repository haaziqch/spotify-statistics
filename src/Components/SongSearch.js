import React from 'react'
import { Search } from 'react-spotify-api'
import { Link } from 'react-router-dom' 
import Card from './Card.js'

function SongSearch() {
    const [searchQuery, setSearchQuery] = React.useState('')
    let searchItem = ''
    return (
        <React.Fragment>
            <div className="container">
                <label htmlFor="songsearch">Search</label><br/>
                <input id='songsearch'type='text' onChange={(e) => searchItem=e.target.value}/>
                <button type='submit' onClick={() => setSearchQuery(searchItem)}>Submit</button>
                <Search query={searchQuery} track>
                    {({ data })=>
                        data ? (
                            <ul>
                                <h2><li className='primaryList'>Tracks</li></h2>
                                <ul>
                                {data.tracks.items.map(track => (
                                    <li className='primaryList' key = {track.id}>
                                        <Card header={track.name} image={track.album.images[1].url}>
                                        <Link
                                            className='link' 
                                            to={{
                                                pathname:'/statistics',
                                                search:`?songID=${track.id}`
                                            }}>
                                            {track.name
                                        }</Link>
                                        <ul className='card-list'>
                                        {track.artists.map(artist => (
                                            <li className='secondaryList' key = {artist.id}>{artist.name}</li>
                                        ))}
                                        </ul>
                                        </Card>
                                    </li>
                                ))}
                                </ul>
                            </ul>
                        ) : null
                    }
                </Search>
            </div>
        </React.Fragment>
    )
}
export default SongSearch;
