import { Rate, Tabs } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinLichChieuPhimAction } from '../../redux/actions/QuanLyRapAction';
import './progress-circle.css';
import moment from 'moment/moment';
import 'moment/locale/vi';
import { history } from '../../util/history';
import _ from 'lodash';
moment.locale('vi');

export default function Detail(props) {
	const { filmDetail } = useSelector(state => state.QuanLyPhimReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		const { id } = props.match.params;
		dispatch(layThongTinLichChieuPhimAction(id));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderCumRap = htr => {
		return htr.cumRapChieu.map((cumRap, i) => {
			return (
				<div key={i} className='py-4 border-b-[1px]'>
					<div className='mt-4 flex items-center pb-4'>
						<img className='w-[50px] h-[50px] mr-2' src={cumRap.hinhAnh} alt={cumRap.logo} />
						<div className='text-left min-w-0'>
							<p className='whitespace-normal text-base font-medium'>{cumRap.tenCumRap}</p>
							<div className='text-gray-500 text-base truncate'>{cumRap.diaChi}</div>
						</div>
					</div>
					{cumRap.lichChieuPhim.map((lichChieu, i) => {
						return (
							<button
								key={i}
								onClick={() => {
									history.push(`/checkout/${lichChieu.maLichChieu}`);
								}}
								className='bg-[rgba(246,246,246,.5)] rounded-md border-[1px] border-[#e4e4e4] text-[#108f3e] text-sm font-medium p-[5px] uppercase hover:text-red-500 mr-2'>
								{moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
							</button>
						);
					})}
				</div>
			);
		});
	};

	const renderHeThongRap = () => {
		return filmDetail.heThongRapChieu.map((htr, i) => {
			return {
				label: (
					<div className='mt-4 flex items-center w-[200px]'>
						<img className='mr-[10px] rounded-full w-[50px]' src={htr.logo} alt={htr.logo} />
						<p className='text-sm font-medium'>{htr.tenHeThongRap}</p>
					</div>
				),

				key: i,
				children: <div className='h-[600px] overflow-y-auto scrollbar space-y-3'>{renderCumRap(htr)}</div>,
			};
		});
	};

	const items = [
		{
			key: '1',
			label: <span className='text-lg font-medium uppercase'>Lịch chiếu</span>,
			children: <Tabs tabPosition='left' items={renderHeThongRap()} />,
		},
		{
			key: '2',
			label: <span className='text-lg font-medium uppercase'>Thông tin</span>,
			children: (
				<div className='p-6'>
					<div className='grid grid-cols-2 text-[15px]'>
						<div className='col-span-1 px-4'>
							<div className='flex mb-2'>
								<p className='w-[30%] font-medium'>Ngày khởi chiếu</p>
								<p className='w-[70%] pl-[10px]'>{moment(filmDetail.ngayKhoiChieu).format('YYYY.MM.DD')}</p>
							</div>
							<div className='flex mb-2'>
								<p className='w-[30%] font-medium'>Tên phim</p>
								<p className='w-[70%] pl-[10px]'>{filmDetail.tenPhim}</p>
							</div>
							<div className='flex mb-2'>
								<p className='w-[30%] font-medium'>Mã nhóm</p>
								<p className='w-[70%] pl-[10px]'>{filmDetail.maNhom}</p>
							</div>
							<div className='flex mb-2'>
								<p className='w-[30%] font-medium'>Mã phim</p>
								<p className='w-[70%] pl-[10px]'>{filmDetail.maPhim}</p>
							</div>
							<div className='flex mb-2'>
								<p className='w-[30%] font-medium'>Bí danh</p>
								<p className='w-[70%] pl-[10px]'>{_.replace(filmDetail.biDanh, /-/g, ' ')}</p>
							</div>
						</div>
						<div className='col-span-1 px-4'>
							<div className='flex mb-2'>
								<p className='w-[30%] font-medium'>Nội dung</p>
							</div>
							<div className='flex mb-2'>
								<p>{filmDetail.moTa}</p>
							</div>
						</div>
					</div>
				</div>
			),
		},
		{
			key: '3',
			label: <span className='text-lg font-medium uppercase'>Đánh giá</span>,
			children: `Content of Tab Pane 3`,
		},
	];

	return (
		<>
			<div>
				<div className='w-full h-[40vw] relative'>
					<div className='absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 m-10'></div>
					<div className='absolute top-0 bottom-0 left-0 right-0 blur-[15px] bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(${filmDetail.hinhAnh})` }}></div>

					<div className='flex items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full max-w-[870px] h-[320px]'>
						<div className='w-1/4 h-full bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(${filmDetail.hinhAnh})` }}></div>
						<div className='w-[55%] px-4'>
							<p className='text-gray-100 text-lg'>{moment(filmDetail.ngayKhoiChieu).format('YYYY.MM.DD')}</p>
							<p className='text-gray-100 text-2xl font-medium'>{filmDetail.tenPhim}</p>
							<p className='text-gray-100 text-xl'>{moment(filmDetail.ngayKhoiChieu).format('hh:mm A')}</p>
							<p className='text-gray-100 text-sm mb-4'>{filmDetail.moTa}</p>
							<button className='text-white bg-red-500 text-lg px-4 py-2 rounded hover:bg-red-600'>Mua vé</button>
						</div>
						<div className='flex flex-col items-center'>
							<div className={`c100 p${filmDetail.danhGia * 10}`}>
								<span>{filmDetail.danhGia * 10}%</span>
								<div className='slice'>
									<div className='bar' />
									<div className='fill' />
								</div>
							</div>
							<p className='text-white'>Đánh giá</p>
							<div className='w-fit'>
								<Rate allowHalf value={filmDetail.danhGia / 2} />
							</div>
						</div>
					</div>
				</div>

				<div className='w-[80vw] max-w-[940px] mx-auto py-24'>
					<Tabs defaultActiveKey='1' centered items={items} className='border-[1px]' />
				</div>
			</div>
		</>
	);
}
