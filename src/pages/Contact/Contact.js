import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { PlayCircleOutlined } from '@ant-design/icons';

function SampleNextArrow(props) {
	const { onClick } = props;
	return (
		<button type='button' onClick={onClick} className='flex before:content-none absolute z-[1] top-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-white shadow-md hover:text-red-500 -right-6'>
			<RightOutlined className='m-auto' />
		</button>
	);
}

function SamplePrevArrow(props) {
	const { onClick } = props;
	return (
		<button type='button' onClick={onClick} className='flex before:content-none absolute z-[1] top-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-white shadow-md hover:text-red-500 -left-6'>
			<LeftOutlined className='m-auto' />
		</button>
	);
}

export default function Contact() {
	const settings = {
		infinite: true,
		centerPadding: '0',
		slidesToShow: 4,
		slidesToScroll: 4,
		speed: 500,
		rows: 2,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					rows: 2,
					infinite: true,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					rows: 1,
				},
			},
		],
	};

	const [arrFilmMDB, setArrFilmMDB] = useState([]);
	const [currrentIndex, setCurrrentIndex] = useState(3);

	useEffect(() => {
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

		getListFilmMovieDB();
	}, []);

	const renderFilm = () => {
		return arrFilmMDB.map((film, i) => {
			return (
				<div key={i} className='p-1'>
					<div className='relative w-full h-full overflow-hidden group'>
						<div className='relative pt-[150%] bg-center bg-cover bg-no-repeat rounded-lg overflow-hidden' style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w780/${film.poster_path}')` }}>
							<div className='absolute z-[1] left-1/2 translate-x-[-50%] top-[55px] lg:top-[100px] xl:top-[55px] opacity-0 duration-500 group-hover:opacity-100'>
								<PlayCircleOutlined className='text-white text-7xl leading-[0] hidden md:inline-block' />
							</div>
							<div className='absolute w-full h-full top-full p-5 bg-[linear-gradient(to_top,_rgba(0,0,0,1)_0%,_transparent)] duration-500 flex group-hover:top-0'>
								<div className='mt-auto'>
									<h1 className='text-gray-100 text-lg leading-5 mb-2'>{film.title}</h1>
									<p className='text-gray-300 text-xs mb-4 line-clamp-3 lg:line-clamp-5'>{film.overview}</p>
									<button className='text-white bg-red-500 text-lg px-4 py-2 rounded hover:bg-red-600 uppercase'>ĐẶT VÉ</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		});
	};

	const prevSlide = () => {
		const isFirstSlide = currrentIndex === 0;
		const newIndex = isFirstSlide ? arrFilmMDB.length - 1 : currrentIndex - 1;
		setCurrrentIndex(newIndex);
	};

	const nextSlide = () => {
		const isLastSlide = currrentIndex === arrFilmMDB.length - 1;
		const newIndex = isLastSlide ? 0 : currrentIndex + 1;
		setCurrrentIndex(newIndex);
	};

	return (
		<div className='bg-black'>
			<div
				className='bg-top bg-cover bg-no-repeat relative group'
				style={{
					backgroundImage: `url('https://image.tmdb.org/t/p/original/${arrFilmMDB[currrentIndex]?.backdrop_path}')`,
					backgroundColor: 'black',
				}}>
				<div className='h-[60vw] w-full'></div>
				<div className='absolute w-full h-[25vh] bottom-[0] bg-[linear-gradient(to_top,_black_0%,_transparent)]'></div>
				<div className='absolute w-full h-[15vh] bottom-[0] bg-[linear-gradient(to_top,_black_0%,_transparent)]'></div>
				<div className='hidden absolute p-3 bg-black/50 top-1/3 translate-x-0 left-5 text-white group-hover:flex items-center justify-center' onClick={prevSlide}>
					<LeftOutlined className='text-[2.5rem]' />
				</div>
				<div className='hidden absolute p-3 bg-black/50 top-1/3 translate-x-0 right-5 text-white group-hover:flex items-center justify-center' onClick={nextSlide}>
					<RightOutlined className='text-[2.5rem]' />
				</div>
			</div>

			<div className='w-[80vw] max-w-[940px] mx-auto pb-24'>
				<Slider {...settings}>{renderFilm()}</Slider>
			</div>
		</div>
	);
}
