import React from 'react';
import HomeMenu from './HomeMenu/HomeMenu';
import ListFilm from './ListFilm/ListFilm';

export default function Home() {
	return (
		<div className='mx-auto px-10'>
			<ListFilm />
			<HomeMenu />
		</div>
	);
}
