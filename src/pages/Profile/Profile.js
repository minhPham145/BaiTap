import React, { useEffect } from 'react';
import { Input, Tabs } from 'antd';
import movieBg from '../../assets/movieBg.png';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatThongTinNguoiDungAction, layDanhSachLoaiNguoiDungAction, layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/vi';
import { useFormik } from 'formik';
import { Button, Form } from 'antd';
import * as Yup from 'yup';

moment.locale('vi');

export default function Profile(props) {
	const dispatch = useDispatch();
	const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

	useEffect(() => {
		dispatch(layThongTinNguoiDungAction());
	}, []);

	const items = [
		{
			key: '1',
			label: <span className='text-lg font-medium'>01 - THÔNG TIN CÁ NHÂN</span>,
			children: <ThongTinCaNhan {...props} />,
		},
		{
			key: '2',
			label: <span className=' text-lg font-medium'>02 - LỊCH SỬ ĐẶT VÉ</span>,
			children: <LichSuDatVe {...props} />,
		},
	];

	return (
		<div className='bg-white'>
			<div
				className='bg-center bg-contain relative group bg-fixed'
				style={{
					backgroundImage: `url(${movieBg})`,
				}}>
				<div className='absolute top-0 bottom-0 left-0 right-0 bg-white/20'></div>
				<div className='flex items-center justify-center'>
					<div className='w-4/5 bg-white/80 backdrop-blur-md rounded-lg px-12 pb-12 my-10'>
						<Tabs defaultActiveKey='1' items={items} />
					</div>
				</div>
			</div>
		</div>
	);
}

function ThongTinCaNhan(props) {
	const dispatch = useDispatch();
	const { thongTinNguoiDung, danhSachLoaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

	const loaiNguoiDung = _.find(danhSachLoaiNguoiDung, o => o.tenLoai === thongTinNguoiDung.loaiNguoiDung);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			taiKhoan: thongTinNguoiDung.taiKhoan,
			matKhau: thongTinNguoiDung.matKhau,
			email: thongTinNguoiDung.email,
			soDT: thongTinNguoiDung.soDT,
			maNhom: thongTinNguoiDung.maNhom,
			maLoaiNguoiDung: loaiNguoiDung?.maLoaiNguoiDung,
			hoTen: thongTinNguoiDung.hoTen,
		},

		validationSchema: Yup.object({
			taiKhoan: Yup.string().required('Vui lòng nhập tài khoản hợp lệ!'),
			matKhau: Yup.string().required('Vui lòng nhập mật khẩu hợp lệ!'),
			hoTen: Yup.string().required('Vui lòng nhập họ tên hợp lệ!'),
			email: Yup.string().required('Vui lòng nhập email hợp lệ!').email('Vui lòng nhập email hợp lệ!'),
			soDT: Yup.number().typeError('Vui lòng nhập số điện thoại hợp lệ!').required('Vui lòng nhập số điện thoại hợp lệ!'),
			maNhom: Yup.string().required('Vui lòng nhập mã nhóm hợp lệ!'),
		}),

		onSubmit: async values => {
			dispatch(capNhatThongTinNguoiDungAction(values));
		},
	});

	useEffect(() => {
		dispatch(layDanhSachLoaiNguoiDungAction());
		dispatch(layThongTinNguoiDungAction());
	}, []);

	return (
		<div className='lg:px-24'>
			<Form onSubmitCapture={formik.handleSubmit} name='basic' labelCol={{ span: 8 }} wrapperCol={{ span: 20 }} style={{ maxWidth: 800 }} initialValues={{ remember: true }}>
				<div className='md:grid grid-cols-2 mt-5'>
					<div className='col-span-1'>
						<Form.Item label='Mã nhóm'>
							<Input disabled value={formik.values.maNhom} />
							{formik.touched.maNhom && formik.errors.maNhom ? <div className='text-sm text-amber-600'>{formik.errors.maNhom}</div> : null}
						</Form.Item>

						<Form.Item label='Loại người dùng'>
							<Input disabled value={formik.values.maLoaiNguoiDung} />
						</Form.Item>
						<Form.Item label='Tài khoản'>
							<Input disabled value={formik.values.taiKhoan} />
						</Form.Item>
						<Form.Item label='Mật khẩu'>
							<Input.Password name='matKhau' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.matKhau} />
							{formik.touched.matKhau && formik.errors.matKhau ? <div className='text-sm text-amber-600'>{formik.errors.matKhau}</div> : null}
						</Form.Item>
					</div>
					<div className='col-span-1'>
						<Form.Item label='Email'>
							<Input name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
							{formik.touched.email && formik.errors.email ? <div className='text-sm text-amber-600'>{formik.errors.email}</div> : null}
						</Form.Item>
						<Form.Item label='Họ tên'>
							<Input name='hoTen' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.hoTen} />
							{formik.touched.hoTen && formik.errors.hoTen ? <div className='text-sm text-amber-600'>{formik.errors.hoTen}</div> : null}
						</Form.Item>
						<Form.Item label='Số điện thoại'>
							<Input name='soDT' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.soDT} />
							{formik.touched.soDT && formik.errors.soDT ? <div className='text-sm text-amber-600'>{formik.errors.soDT}</div> : null}
						</Form.Item>
						<Form.Item label='Tác vụ'>
							<Button htmlType='submit' type='primary'>
								Cập nhật
							</Button>
						</Form.Item>
					</div>
				</div>
			</Form>
		</div>
	);
}

function LichSuDatVe(props) {
	const dispatch = useDispatch();
	const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

	useEffect(() => {
		dispatch(layThongTinNguoiDungAction());
	}, []);

	const renderTicketItem = () => {
		return thongTinNguoiDung.thongTinDatVe.map((ve, i) => {
			const ghe = _.first(ve.danhSachGhe);

			return (
				<div key={i} className='p-2 lg:w-1/2  w-full'>
					<div className='h-full sm:flex items-start border-black/30 border p-4 rounded-lg'>
						<img className='w-[100px] h-[150px] bg-gray-100 object-cover object-center rounded flex-shrink-0 mr-4 mb-4 sm:mb-0' src={ve.hinhAnh} alt='hinhPhim' />
						<div className='flex-grow'>
							<h2 className='text-indigo-600 text-base font-medium'>{ve.tenPhim}</h2>
							<p className='text-gray-500'>Ngày đặt: {moment(new Date(ve.ngayDat)).format('DD/MM/YYYY')}</p>
							<p className='text-gray-500'>Giờ đặt: {moment(new Date(ve.ngayDat)).format('hh:mm A')}</p>
							<p className='text-gray-500'>Thời lượng: {ve.thoiLuongPhim} phút</p>
							<p className='text-gray-500'>Địa điểm: {ghe.tenHeThongRap}</p>
							<p className='text-gray-500'>
								Rạp: {ghe.tenRap} - Ghế:{' '}
								{_.sortBy(ve.danhSachGhe, o => Number(o.tenGhe)).map((ghe, i) => {
									return (
										<span key={i} className='text-amber-600'>
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
			<section className='text-gray-600 body-font'>
				<div className='container px-5 py-12 mx-auto'>
					<div className='flex flex-col text-center w-full mb-12'>
						<p className='lg:w-2/3 mx-auto leading-relaxed text-lg text-amber-600'>Hãy xem thông tin địa điểm và thời gian đặt vé để xem phim vui vẻ bạn nhé!</p>
						<p className='lg:w-2/3 mx-auto leading-relaxed text-lg text-amber-600'>^.^</p>
					</div>
					<div className='flex flex-wrap -m-2'>{renderTicketItem()}</div>
				</div>
			</section>
		</div>
	);
}
