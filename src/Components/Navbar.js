import React from 'react'
import { NavLink } from 'react-router-dom'


const activeStyle = {
	color: 'rgb(187, 46, 31)'
}

export default function Nav () {
	return (
            <nav className=' row space-between'>
                <ul className='row nav'>
                    <li>
                        <NavLink
                            to='/'
                            exact
                            activeStyle={activeStyle} 
                            className='nav-link'>
                                Search
                        </NavLink> 
                    </li>
                    <li>
                        <NavLink
                            to='/explanation'
                            activeStyle={activeStyle} 
                            className='nav-link'>
                            Statistic Explanation
                        </NavLink> 
                    </li>
                </ul>
            </nav>
	)
}