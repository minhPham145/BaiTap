import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LayDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';
import MultipleRowSlick from '../../components/RSlick/MultipleRowSlick';
import HomeMenu from './HomeMenu/HomeMenu';
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapAction';
import HomeCarousel from '../../templates/HomeTemplates/Layout/HomeCarousel/HomeCarousel';

export default function Home() {
	const dispatch = useDispatch();
	const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
	const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);

	useEffect(() => {
		dispatch(LayDanhSachPhimAction());
		dispatch(layDanhSachHeThongRapAction());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<HomeCarousel />
			<div className='w-[80vw] max-w-[940px] mx-auto'>
				<MultipleRowSlick arrFilm={arrFilm} />
				<HomeMenu heThongRapChieu={heThongRapChieu} />
			</div>
		</>
	);
}
