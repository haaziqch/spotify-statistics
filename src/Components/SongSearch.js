import React from 'react'
import { Search } from 'react-spotify-api'
import { Link } from 'react-router-dom' 

function SongSearch() {
    const [searchQuery, setSearchQuery] = React.useState('')
    return (
        <React.Fragment>
                <label htmlFor="songsearch">Search</label>
                <input id='songsearch'type='text' onChange={(e) => setSearchQuery(e.target.value)}/>
                <Search query={searchQuery} track>
                    {({ data })=>
                        data ? (
                            <ul>
                                <li>Tracks</li>
                                <ul>
                                {data.tracks.items.map(track => (
                                    <li key = {track.id}>
                                        <Link 
                                            to={{
                                                pathname:'/statistics',
                                                search:`?songID=${track.id}`
                                            }}>
                                            {track.name
                                        }</Link>
                                        <ul>
                                        {track.artists.map(artist => (
                                            <li key = {artist.id}>{artist.name}</li>
                                        ))}
                                        </ul>
                                    </li>
                                ))}
                                </ul>
                            </ul>
                        ) : null
                    }
                </Search>

        </React.Fragment>
    )
}
export default SongSearch;
