import { Tabs } from 'antd';
import moment from 'moment/moment';
import 'moment/locale/vi';
import React from 'react';
import { history } from '../../../util/history';
import poster from '../../../assets/poster.jpg';
moment.locale('vi');

export default function HomeMenu(props) {
	const { heThongRapChieu } = props;

	const renderFilm = cumRap => {
		return cumRap.danhSachPhim.map((film, i) => {
			return (
				<div className='mt-4 pt-2 pb-4 border-b-[1px]' key={i}>
					<div className='flex items-center'>
						<img
							className='w-[50px] h-[50px]'
							src={film.hinhAnh}
							alt={film.hinhAnh}
							onError={e => {
								e.currentTarget.onerror = null;
								e.currentTarget.src = poster;
							}}
						/>
						<div className='pl-4'>
							<h3 className='text-lg font-medium'>{film.tenPhim}</h3>
						</div>
					</div>
					<div className='pt-2 '>
						{film.lstLichChieuTheoPhim.slice(0, 12).map((lichChieu, i) => {
							return (
								<div className='pb-2' key={i}>
									<p className='text-lg capitalize'>{moment(lichChieu.ngayChieuGioChieu).format('dddd, MMMM, yyyy')}</p>

									<button
										onClick={() => {
											history.push('/');
										}}
										className='bg-[rgba(246,246,246,.5)] rounded-md border-[1px] border-[#e4e4e4] text-[#108f3e] text-sm font-medium p-[5px] uppercase hover:text-red-500'>
										{moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
									</button>
								</div>
							);
						})}
					</div>
				</div>
			);
		});
	};

	const renderCumRap = heThongRap => {
		return heThongRap.lstCumRap.slice(0, 5).map((cumRap, i) => {
			const id = String(i + 1);
			return {
				label: (
					<div className='mt-4 flex items-center w-[250px]'>
						<img className='w-[50px] h-[50px] mr-2' src={cumRap.hinhAnh} alt={cumRap.logo} />
						<div className='text-left min-w-0'>
							<p className='whitespace-normal text-sm'>{cumRap.tenCumRap}</p>
							<div className='text-gray-500 text-xs truncate'>{cumRap.diaChi}</div>
						</div>
					</div>
				),
				key: id,
				children: <div className='h-[600px] overflow-y-auto scrollbar space-y-3'>{renderFilm(cumRap)}</div>,
			};
		});
	};

	const renderHeThongRap = () => {
		return heThongRapChieu.map((heThongRap, i) => {
			return {
				label: <img className='mt-4 rounded-full w-[50px]' src={heThongRap.logo} alt={heThongRap.logo} />,
				key: i,
				children: <Tabs tabPosition='left' items={renderCumRap(heThongRap)} />,
			};
		});
	};

	return <Tabs tabPosition='left' items={renderHeThongRap()} className='border-[1px] mb-12' />;
}
