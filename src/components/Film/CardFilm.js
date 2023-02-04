import React from 'react';
import styleCard from './CardFilm.module.css';
import { PlayCircleOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
export default function CardFilm(props) {
	const { film } = props;

	return (
		<div className={styleCard.card}>
			<div className={styleCard.poster} style={{ backgroundImage: `url(${film.hinhAnh})` }}>
				<div className={`${styleCard['btn-play']}`}>
					<PlayCircleOutlined />
				</div>
				<div className={styleCard.details}>
					<div className='mt-auto'>
						<h1>{film.tenPhim}</h1>
						<p>{film.moTa}</p>
						<NavLink to={`detail/${film.maPhim}`}>
							<button>ĐẶT VÉ</button>
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
}
