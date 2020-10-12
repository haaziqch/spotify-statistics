import React from 'react'
import { Search } from 'react-spotify-api'
import { Link } from 'react-router-dom' 

function SongSearch() {
    const [searchQuery, setSearchQuery] = React.useState('')
    return (
        <React.Fragment>
            <div className="container">
                <label htmlFor="songsearch">Search</label>
                <input id='songsearch'type='text' onChange={(e) => setSearchQuery(e.target.value)}/>
                <Search query={searchQuery} track>
                    {({ data })=>
                        data ? (
                            <ul>
                                <h2><li className='primaryList'>Tracks</li></h2>
                                <ul>
                                {data.tracks.items.map(track => (
                                    <li className='primaryList' key = {track.id}>
                                        <Link 
                                            to={{
                                                pathname:'/statistics',
                                                search:`?songID=${track.id}`
                                            }}>
                                            {track.name
                                        }</Link>
                                        <ul>
                                        {track.artists.map(artist => (
                                            <li className='secondaryList' key = {artist.id}>{artist.name}</li>
                                        ))}
                                        </ul>
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
