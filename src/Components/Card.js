import React from 'react'
import PropTypes from 'prop-types'

export default function Card ({ header, subheader, image, name, children}) {
	return (
			<div className={`card bg-dark`}>
				<h4 className='header-lg center-text'>
					{header}
				</h4>
				<img
					className='albumImage'
					src={image}
					alt={`Album art for ${name}`}
				/>
				{subheader && (
					<h4 className='center-text'>
						{subheader}
					</h4>
				)}
				{children}
				</div>
	)
}

Card.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  image: PropTypes.string.isRequired,
} 