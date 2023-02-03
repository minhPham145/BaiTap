import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import styleSlick from '../../components/RSlick/MultipleRowSlick.module.css';
import { PlayCircleOutlined } from '@ant-design/icons';

function SampleNextArrow(props) {
	const { onClick } = props;
	return (
		<button type='button' onClick={onClick} className={`${styleSlick['btnNext']}`}>
			<RightOutlined className='m-auto' />
		</button>
	);
}

function SamplePrevArrow(props) {
	const { onClick } = props;
	return (
		<button type='button' onClick={onClick} className={`${styleSlick['btnPrev']}`}>
			<LeftOutlined className='m-auto' />
		</button>
	);
}

export default function Contact() {
	const [arrFilmMDB, setArrFilmMDB] = useState([]);

	const getListFilmMovieDB = async () => {
		const arrPage = [1, 2, 3, 4, 5];
		const apiKey = '53d0e6fb19fb18a908d1069e8f71cbce';
		const urlPath = 'https://api.themoviedb.org/3/movie/popular';

		try {
			const getListMovie = () => {
				return arrPage.map(page => {
					return axios({
						url: `${urlPath}?api_key=${apiKey}&language=vi-VN&page=${page}`,
					});
				});
			};

			const result = await Promise.all(getListMovie());
			const arrResutl = result.map(request => {
				return request.data.results;
			});
			setArrFilmMDB(arrResutl.flat(1));
			console.log(result);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getListFilmMovieDB();
	}, []);

	const renderFilm = () => {
		return arrFilmMDB.map((film, i) => {
			return (
				<div key={i} className='p-1'>
					<div className='relative w-full h-full overflow-hidden group'>
						<div className='relative pt-[150%] bg-center bg-cover bg-no-repeat rounded-lg overflow-hidden' style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w780/${film.poster_path}')` }}>
							<div className='absolute z-[1] left-1/2 translate-x-[-50%] top-[55px] opacity-0 duration-500'>
								<PlayCircleOutlined className='text-white text-7xl leading-[0]' />
							</div>
							<div className='absolute w-full h-full top-full p-5 bg-[linear-gradient(to_top,_rgba(0,0,0,1)_0%,_transparent)] duration-500 flex group-hover:top-0'>
								<div className='mt-auto'>
									<h1 className='text-gray-100 text-lg mb-2'>{film.title}</h1>
									<p className='text-gray-300 text-xs mb-4 line-clamp-5'>{film.overview}</p>
									<button className='text-white bg-red-500 text-lg px-4 py-2 rounded hover:bg-red-600 uppercase'>ĐẶT VÉ</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		});
	};

	const settings = {
		infinite: true,
		centerPadding: '0',
		slidesToShow: 4,
		slidesToScroll: 4,
		speed: 500,
		rows: 2,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};

	return (
		<div className='bg-[#040407]'>
			<div
				className='bg-top bg-cover bg-no-repeat relative'
				style={{
					backgroundImage: `url('https://image.tmdb.org/t/p/original/${arrFilmMDB[9]?.backdrop_path}')`,
					backgroundColor: '#040407',
				}}>
				<div className='h-[62vw] w-full'></div>
				<div className='absolute w-full h-[5vh] bottom-[0] bg-[linear-gradient(to_top,_#040407_0%,_transparent)] '></div>
				<div className='absolute w-full h-[25vh] bottom-[-100px] bg-[#040407] blur-[19px]'></div>

			</div>

			<div className='w-[80vw] max-w-[940px] mx-auto pb-24'>
				<Slider {...settings}>{renderFilm()}</Slider>
			</div>
		</div>
	);
}
