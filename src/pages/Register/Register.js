import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID } from '../../util/settings/config';

export default function Register() {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			taiKhoan: '',
			matKhau: '',
			nhapLaiMatKhau: '',
			hoTen: '',
			email: '',
			soDt: '',
			maNhom: GROUPID,
		},

		validationSchema: Yup.object({
			taiKhoan: Yup.string().required('Vui lòng nhập tài khoản hợp lệ!'),
			matKhau: Yup.string().required('Vui lòng nhập mật khẩu hợp lệ!'),
			nhapLaiMatKhau: Yup.string()
				.required('Vui lòng nhập mật khẩu hợp lệ!')
				.oneOf([Yup.ref('matKhau'), null], 'Mật khẩu không chính xác!'),
			hoTen: Yup.string().required('Vui lòng nhập họ tên hợp lệ!'),
			email: Yup.string().required('Vui lòng nhập email hợp lệ!').email('Vui lòng nhập email hợp lệ!'),
			soDt: Yup.number().typeError('Vui lòng nhập số điện thoại hợp lệ!').required('Vui lòng nhập số điện thoại hợp lệ!'),
		}),

		onSubmit: values => {
			console.log(values);
			dispatch(dangKyAction(values));
		},
	});

	return (
		<div className='w-full text-white'>
			<div className='px-12 py-12 md:px-12 lg:px-12 xl:px-12 xl:max-w-2xl'>
				<h2 className='text-center text-4xl font-display font-semibold lg:text-left lg:text-4xl lg:text-bold'>ĐĂNG KÝ</h2>
				<div className='mt-5'>
					<form onSubmit={formik.handleSubmit}>
						<div>
							<div className='text-sm font-bold tracking-wide'>Tài khoản</div>
							<input name='taiKhoan' value={formik.values.taiKhoan} onChange={formik.handleChange} onBlur={formik.handleBlur} className='w-full text-sm p-2 bg-[#333] border-b-[2px] border-transparent focus:outline-none focus:border-indigo-600 rounded' type='text' placeholder='Nhập vào tài khoản...' />
							{formik.touched.taiKhoan && formik.errors.taiKhoan ? <div className='text-sm text-amber-600'>{formik.errors.taiKhoan}</div> : null}
						</div>
						<div className='mt-4'>
							<div className='text-sm font-bold  tracking-wide'>Mật khẩu</div>
							<input name='matKhau' value={formik.values.matKhau} onChange={formik.handleChange} onBlur={formik.handleBlur} className='w-full text-sm p-2 bg-[#333] border-b-[2px] border-transparent focus:outline-none focus:border-indigo-600 rounded' type='password' placeholder='Nhập vào mật khẩu...' />
							{formik.touched.matKhau && formik.errors.matKhau ? <div className='text-sm text-amber-600'>{formik.errors.matKhau}</div> : null}
						</div>
						<div className='mt-4'>
							<div className='text-sm font-bold  tracking-wide'>Nhập lại mật khẩu</div>
							<input name='nhapLaiMatKhau' value={formik.values.nhapLaiMatKhau} onChange={formik.handleChange} onBlur={formik.handleBlur} className='w-full text-sm p-2 bg-[#333] border-b-[2px] border-transparent focus:outline-none focus:border-indigo-600 rounded' type='password' placeholder='Nhập vào mật khẩu...' />
							{formik.touched.nhapLaiMatKhau && formik.errors.nhapLaiMatKhau ? <div className='text-sm text-amber-600'>{formik.errors.nhapLaiMatKhau}</div> : null}
						</div>
						<div className='mt-4'>
							<div className='text-sm font-bold  tracking-wide'>Họ tên</div>
							<input name='hoTen' value={formik.values.hoTen} onChange={formik.handleChange} onBlur={formik.handleBlur} className='w-full text-sm p-2 bg-[#333] border-b-[2px] border-transparent focus:outline-none focus:border-indigo-600 rounded' placeholder='Nhập vào mật khẩu...' />
							{formik.touched.hoTen && formik.errors.hoTen ? <div className='text-sm text-amber-600'>{formik.errors.hoTen}</div> : null}
						</div>
						<div className='mt-4'>
							<div className='text-sm font-bold  tracking-wide'>Email</div>
							<input name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className='w-full text-sm p-2 bg-[#333] border-b-[2px] border-transparent focus:outline-none focus:border-indigo-600 rounded' placeholder='Nhập vào mật khẩu...' />
							{formik.touched.email && formik.errors.email ? <div className='text-sm text-amber-600'>{formik.errors.email}</div> : null}
						</div>
						<div className='mt-4'>
							<div className='text-sm font-bold  tracking-wide'>Số điện thoại</div>
							<input name='soDt' value={formik.values.soDt} onChange={formik.handleChange} onBlur={formik.handleBlur} className='w-full text-sm p-2 bg-[#333] border-b-[2px] border-transparent focus:outline-none focus:border-indigo-600 rounded' placeholder='Nhập vào mật khẩu...' />
							{formik.touched.soDt && formik.errors.soDt ? <div className='text-sm text-amber-600'>{formik.errors.soDt}</div> : null}
						</div>
						<div className='mt-5'>
							<button className='bg-indigo-500 text-gray-100 p-4 w-full rounded tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg' type='submit'>
								Đăng ký
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
