import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVeModels';
import { Avatar, Tabs } from 'antd';
import screenImg from '../../assets/screen.png';
import { chonGheAction, chuyenTabAction, datVeAction, layDanhSachPhongVeAction } from '../../redux/actions/QuanLyDatVeAction';
import './Checkout.css';
import { CloseOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment/moment';
import 'moment/locale/vi';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { history } from '../../util/history';
import { TOKEN, USER_LOGIN } from '../../util/settings/config';

moment.locale('vi');

function Checkout(props) {
	const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
	const { ChiTietPhongVe, danhSachGheDangDat } = useSelector(state => state.QuanLyDatVeReducer);
	const { thongTinPhim, danhSachGhe } = ChiTietPhongVe;
	const dispatch = useDispatch();

	const { id } = props.match.params;

	useEffect(() => {
		dispatch(layDanhSachPhongVeAction(id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const tinhTien = () => {
		return danhSachGheDangDat.reduce((tongTien, ghe) => (tongTien += ghe.giaVe), 0).toLocaleString();
	};

	const renderSeats = () => {
		return danhSachGhe.map((ghe, i) => {
			const classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
			const classGheDaDat = ghe.daDat ? 'gheDaDat' : '';

			const index = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.maGhe === ghe.maGhe);
			const classGheDangDat = index !== -1 ? 'gheDangDat' : '';

			let classGheDaDuocDat = '';
			if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
				classGheDaDuocDat = 'gheDaDuocDat';
			}

			return (
				<div key={i} className='inline-block w-[calc(100%/16)] aspect-square p-1'>
					<button
						onClick={() => {
							dispatch(chonGheAction(ghe));
						}}
						disabled={ghe.daDat}
						className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat}`}>
						{ghe.daDat ? classGheDaDuocDat ? <UserOutlined className='align-middle' /> : <CloseOutlined className='align-middle' /> : ghe.stt}
					</button>
				</div>
			);
		});
	};

	return (
		<div className='mt-[-15px]'>
			<div className='flex'>
				<section className='flex-[75%] h-[88vh] overflow-auto scrollbar'>
					<main className='px-[10%] relative'>
						<div className='min-w-[600px] mt-5'>
							<img className='w-full' src={screenImg} alt='screen' />
							<div className='px-[5%]'>{renderSeats()}</div>
						</div>
						<div className='pt-4 px-[5%]'>
							<div className='hint flex justify-evenly'>
								<div className='w-[var(--hint-width)] text-center'>
									<div className='w-[var(--btn-width)] h-[var(--btn-width)] p-1 mx-auto'>
										<button className='ghe'></button>
									</div>
									<p className='font-medium'>Ghế thường</p>
								</div>
								<div className='w-[var(--hint-width)] text-center'>
									<div className='w-[var(--btn-width)] h-[var(--btn-width)] p-1 mx-auto'>
										<button className='ghe gheVip'></button>
									</div>
									<p className='font-medium'>Ghế vip</p>
								</div>
								<div className='w-[var(--hint-width)] text-center'>
									<div className='w-[var(--btn-width)] h-[var(--btn-width)] p-1 mx-auto'>
										<button className='ghe gheDaDat'></button>
									</div>
									<p className='font-medium'>Ghế đã đặt</p>
								</div>
								<div className='w-[var(--hint-width)] text-center'>
									<div className='w-[var(--btn-width)] h-[var(--btn-width)] p-1 mx-auto'>
										<button className='ghe gheDangDat'></button>
									</div>
									<p className='font-medium'>Ghế đang chọn</p>
								</div>
								<div className='w-[var(--hint-width)] text-center'>
									<div className='w-[var(--btn-width)] h-[var(--btn-width)] p-1 mx-auto'>
										<button className='ghe gheDaDuocDat'>
											<UserOutlined className='align-middle' />
										</button>
									</div>
									<p className='font-medium'>Ghế bạn đã đặt</p>
								</div>
							</div>
						</div>
					</main>
				</section>

				<section className='flex-[25%]'>
					<aside className='w-full h-[80vh] flex px-[8%] overflow-auto relative shadow-2xl flex-col justify-start select-none scrollbar'>
						<div className='py-3 border-b-[1px] border-dashed'>
							<p className='text-green-600 text-[41px] text-center font-medium leading-[60px]'>{tinhTien()} đ</p>
						</div>
						<div className='py-3 border-b-[1px] border-dashed'>
							<p className='font-medium capitalize'>{thongTinPhim.tenPhim}</p>
							<p>{thongTinPhim.tenCumRap}</p>
							<p className='first-letter:uppercase'>
								{thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} - {thongTinPhim.tenRap}
							</p>
						</div>
						<div className='py-3 border-b-[1px] border-dashed flex justify-between gap-[2%] text-lg relative'>
							<div className='text-red-500'>
								Ghế
								<span className='text-green-600'>
									{_.sortBy(danhSachGheDangDat, o => Number(o.stt)).map((ghe, i) => {
										return ` ${ghe.stt},`;
									})}
								</span>
							</div>

							<p className='flex-[0_0_95px] text-green-600 font-medium text-right'>{tinhTien()} đ</p>
						</div>
						<div className='py-3 border-b-[1px] border-dashed relative'>
							<label className='text-gray-400 text-sm absolute top-[9%] left-0 block'>Email</label>
							<p className='pt-3 mt-[5px]'>{userLogin.email}</p>
						</div>
						<div className='py-3 border-b-[1px] border-dashed relative'>
							<label className='text-gray-400 text-sm absolute top-[9%] left-0 block'>Phone</label>
							<p className='pt-3 mt-[5px]'>{userLogin.soDT}</p>
						</div>
						<div className='absolute bottom-0 left-0 w-full'>
							<button
								onClick={() => {
									let thongTinDatVe = new ThongTinDatVe();
									thongTinDatVe.maLichChieu = id;
									thongTinDatVe.danhSachVe = danhSachGheDangDat;
									dispatch(datVeAction(thongTinDatVe));
								}}
								className='fixed bottom-0 w-1/4 h-[60px] bg-green-600 text-white text-2xl cursor-pointer hover:bg-green-400'>
								Đặt Vé
							</button>
						</div>
					</aside>
				</section>
			</div>
		</div>
	);
}

function KetQuaDatVe(props) {
	const dispatch = useDispatch();
	const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

	useEffect(() => {
		dispatch(layThongTinNguoiDungAction());
	}, []);

	const renderTicketItem = () => {
		return thongTinNguoiDung.thongTinDatVe.map((ve, i) => {
			const ghe = _.first(ve.danhSachGhe);

			return (
				<div key={i} className='p-2 lg:w-1/3 md:w-1/2 w-full'>
					<div className='h-full flex items-start border-gray-200 border p-4 rounded-lg'>
						<img className='w-16 h-16 bg-gray-100 object-cover object-center rounded flex-shrink-0 mr-4' src={ve.hinhAnh} alt='hinhPhim' />
						<div className='flex-grow'>
							<h2 className='text-purple-600 text-base font-medium'>{ve.tenPhim}</h2>
							<p className='text-gray-500'>Ngày chiếu: {moment(new Date(ve.ngayDat)).format('DD/MM/YYYY')}</p>
							<p className='text-gray-500'>Giờ chiếu: {moment(new Date(ve.ngayDat)).format('hh:mm')}</p>
							<p className='text-gray-500'>Địa điểm: {ghe.tenHeThongRap}</p>
							<p className='text-gray-500'>
								Rạp: {ghe.tenRap} - Ghế:{' '}
								{_.sortBy(ve.danhSachGhe, o => Number(o.tenGhe)).map((ghe, i) => {
									return (
										<span key={i} className='text-green-600'>
											[&nbsp;{ghe.tenGhe}&nbsp;]{' '}
										</span>
									);
								})}
							</p>
						</div>
					</div>
				</div>
			);
		});
	};

	return (
		<div className='mt-[-15px]'>
			<section className='text-gray-600 body-font h-[89vh] overflow-auto scrollbar'>
				<div className='container px-5 py-12 mx-auto'>
					<div className='flex flex-col text-center w-full mb-20'>
						<h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-600'>Lịch sử đặt vé khách hàng</h1>
						<p className='lg:w-2/3 mx-auto leading-relaxed text-base'>Hãy xem thông tin địa điểm và thời gian đặt vé để xem phim vui vẻ bạn nhé! ^^</p>
					</div>
					<div className='flex flex-wrap -m-2'>{renderTicketItem()}</div>
				</div>
			</section>
		</div>
	);
}

export default function DatVe(props) {
	const dispatch = useDispatch();
	const { tabActive } = useSelector(state => state.QuanLyDatVeReducer);
	const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

	useEffect(() => {
		dispatch(chuyenTabAction('1'));
	}, []);

	const operations = (
		<>
			{!_.isEmpty(userLogin) ? (
				<div className='flex'>
					<button
						className='flex flex-col items-center p-2 mr-5'
						onClick={() => {
							history.push('/profile');
						}}>
						<Avatar size='large' className='capitalize bg-green-100 text-green-600 font-semibold'>
							{userLogin.taiKhoan.substr(0, 1)}
						</Avatar>
						<span className='text-green-600 font-medium'>Hello! {userLogin.taiKhoan}</span>
					</button>{' '}
					<button
						className='text-red-500 font-medium bg-red-100 px-4'
						onClick={() => {
							localStorage.removeItem(USER_LOGIN);
							localStorage.removeItem(TOKEN);
							window.location.reload();
						}}>
						Đăng xuất
					</button>
				</div>
			) : null}
		</>
	);

	const items = [
		{
			key: '1',
			label: <span className='font-medium'>01 CHỌN GHẾ & THANH TOÁN</span>,
			children: (
				<div className='h-[88vh]'>
					<Checkout {...props} />
				</div>
			),
		},
		{
			key: '2',
			label: <span className='font-medium'>02 KẾT QUẢ ĐẶT VÉ</span>,
			children: (
				<div className='h-[88vh]'>
					<KetQuaDatVe {...props} />
				</div>
			),
		},
		{
			key: '3',
			label: <span className='font-medium'>TRANG CHỦ</span>,
		},
	];

	return (
		<div className='ml-5 overflow-hidden'>
			<Tabs
				tabBarExtraContent={operations}
				activeKey={tabActive}
				items={items}
				onChange={key => {
					if (key === '3') {
						history.push('/home');
					}
					dispatch(chuyenTabAction(`${key}`));
				}}
			/>
		</div>
	);
}
