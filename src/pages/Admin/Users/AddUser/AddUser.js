import React, { useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { GROUPID } from '../../../../util/settings/config';
import * as Yup from 'yup';
import { layDanhSachLoaiNguoiDungAction, themNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungAction';
import { history } from '../../../../util/history';

export default function AddUser() {
	const dispatch = useDispatch();
	const { danhSachLoaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
	console.log(danhSachLoaiNguoiDung);

	const formik = useFormik({
		initialValues: {
			taiKhoan: '',
			matKhau: '',
			hoTen: '',
			email: '',
			soDT: '',
			maLoaiNguoiDung: 'KhachHang',
			maNhom: GROUPID,
		},

		validationSchema: Yup.object({
			taiKhoan: Yup.string().required('Vui lòng nhập tài khoản hợp lệ!'),
			matKhau: Yup.string().required('Vui lòng nhập mật khẩu hợp lệ!'),
			hoTen: Yup.string().required('Vui lòng nhập họ tên hợp lệ!'),
			email: Yup.string().required('Vui lòng nhập email hợp lệ!').email('Vui lòng nhập email hợp lệ!'),
			soDT: Yup.number().typeError('Vui lòng nhập số điện thoại hợp lệ!').required('Vui lòng nhập số điện thoại hợp lệ!'),
			maNhom: Yup.string().required('Vui lòng nhập mã nhóm hợp lệ!'),
		}),

		onSubmit: values => {
			console.log(values);

			dispatch(themNguoiDungAction(values));
		},
	});

	useEffect(() => {
		dispatch(layDanhSachLoaiNguoiDungAction());
	}, []);

	const handleChangeLoaiNguoiDung = (value, options) => {
		formik.setFieldValue('maLoaiNguoiDung', options.value);
	};

	const convertSelectLoaiNguoiDung = () => {
		return danhSachLoaiNguoiDung.map(loai => {
			return { label: loai.tenLoai, value: loai.maLoaiNguoiDung };
		});
	};

	return (
		<Form onSubmitCapture={formik.handleSubmit} labelCol={{ span: 10 }} layout='horizontal' style={{ maxWidth: 800 }}>
			<h1 className='text-xl font-medium mb-8'>Thêm người dùng</h1>
			<div className='grid grid-cols-2 gap-5'>
				<div className='col-span-1'>
					<Form.Item label='Tài khoản'>
						<Input name='taiKhoan' onChange={formik.handleChange} onBlur={formik.handleBlur} />
						{formik.touched.taiKhoan && formik.errors.taiKhoan ? <div className='text-sm text-amber-600'>{formik.errors.taiKhoan}</div> : null}
					</Form.Item>
					<Form.Item label='Mật khẩu'>
						<Input name='matKhau' onChange={formik.handleChange} onBlur={formik.handleBlur} />
						{formik.touched.matKhau && formik.errors.matKhau ? <div className='text-sm text-amber-600'>{formik.errors.matKhau}</div> : null}
					</Form.Item>
					<Form.Item label='Họ tên'>
						<Input name='hoTen' onChange={formik.handleChange} onBlur={formik.handleBlur} />
						{formik.touched.hoTen && formik.errors.hoTen ? <div className='text-sm text-amber-600'>{formik.errors.hoTen}</div> : null}
					</Form.Item>
					<Form.Item label='Email'>
						<Input name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} />
						{formik.touched.email && formik.errors.email ? <div className='text-sm text-amber-600'>{formik.errors.email}</div> : null}
					</Form.Item>
				</div>
				<div className='col-span-1'>
					<Form.Item label='Số điện thoại'>
						<Input name='soDT' onChange={formik.handleChange} onBlur={formik.handleBlur} />
						{formik.touched.soDT && formik.errors.soDT ? <div className='text-sm text-amber-600'>{formik.errors.soDT}</div> : null}
					</Form.Item>
					<Form.Item label='Loại người dùng'>
						<Select options={convertSelectLoaiNguoiDung()} onChange={handleChangeLoaiNguoiDung} value={formik.values.maLoaiNguoiDung} />
					</Form.Item>
					<Form.Item label='Mã nhóm'>
						<Input name='maNhom' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.maNhom} />
						{formik.touched.maNhom && formik.errors.maNhom ? <div className='text-sm text-amber-600'>{formik.errors.maNhom}</div> : null}
					</Form.Item>
					<Form.Item label='Tác vụ'>
						<button className='min-w-[132px] px-2 py-1 bg-indigo-500 border-[1px] border-indigo-500 text-white rounded hover:bg-indigo-400 hover:border-indigo-400 font-medium' type='submit'>
							Thêm người dùng
						</button>
					</Form.Item>
				</div>
			</div>
			<button
				type='button'
				className='mt-5 min-w-[132px] px-2 py-1 border-[1px] border-gray-400 rounded hover:text-indigo-500 hover:border-indigo-500'
				onClick={() => {
					history.goBack();
				}}>
				Trở lại
			</button>
		</Form>
	);
}
