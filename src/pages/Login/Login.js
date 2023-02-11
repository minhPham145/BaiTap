import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';
import * as Yup from 'yup';

export default function Login() {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			taiKhoan: '',
			matKhau: '',
		},

		validationSchema: Yup.object({
			taiKhoan: Yup.string().required('vui lòng nhập tài khoản!'),
			matKhau: Yup.string().required('vui lòng nhập mật khẩu!'),
		}),

		onSubmit: values => {
			dispatch(dangNhapAction(values));
		},
	});

	return (
		<div className='w-full text-white'>
			<div className='py-12 flex justify-center lg:justify-start lg:px-12'>
				<div className='cursor-pointer flex items-center'>
					<div>
						<svg className='w-10 ' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' x='0px' y='0px' viewBox='0 0 225 225' style={{ enableBackground: 'new 0 0 225 225' }} xmlSpace='preserve'>
							<style type='text/css' dangerouslySetInnerHTML={{ __html: '\n\t\t\t\t\t.st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n\t\t\t\t' }} />
							<g transform='matrix( 1, 0, 0, 1, 0,0) '>
								<g>
									<path id='Layer0_0_1_STROKES' className='st0' d='M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8' />
								</g>
							</g>
						</svg>
					</div>
					<div className='text-2xl tracking-wide ml-2 font-semibold'>MOVIE</div>
				</div>
			</div>
			<div className='pb-12 px-12 md:px-24 lg:px-12 xl:px-24 xl:max-w-2xl'>
				<h2 className='text-center text-4xl font-display font-semibold lg:text-left lg:text-4xl lg:text-bold'>ĐĂNG NHẬP</h2>
				<div className='mt-12'>
					<form onSubmit={formik.handleSubmit}>
						<div>
							<div className='text-sm font-bold tracking-wide'>Tài khoản</div>
							<input name='taiKhoan' value={formik.values.taiKhoan} onChange={formik.handleChange} onBlur={formik.handleBlur} className='w-full text-md p-2 bg-[#333] border-b-[2px] border-transparent focus:outline-none focus:border-indigo-600 rounded' type='text' placeholder='Nhập vào tài khoản...' />
							{formik.touched.taiKhoan && formik.errors.taiKhoan ? <div className='text-sm text-amber-600'>{formik.errors.taiKhoan}</div> : null}
						</div>
						<div className='mt-5'>
							<div className='text-sm font-bold  tracking-wide'>Mật khẩu</div>
							<input name='matKhau' value={formik.values.matKhau} onChange={formik.handleChange} onBlur={formik.handleBlur} className='w-full text-md p-2 bg-[#333] border-b-[2px] border-transparent focus:outline-none focus:border-indigo-600 rounded' type='password' placeholder='Nhập vào mật khẩu...' />
							{formik.touched.matKhau && formik.errors.matKhau ? <div className='text-sm text-amber-600'>{formik.errors.matKhau}</div> : null}
						</div>
						<div className='mt-10'>
							<button className='bg-indigo-500 text-gray-100 p-4 w-full rounded tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg' type='submit'>
								Đăng nhập
							</button>
						</div>
					</form>
					<div className='mt-5 text-sm font-display font-semibold text-center'>
						Chưa có tài khoản?{' '}
						<NavLink to='/signup' className='cursor-pointer text-indigo-500 hover:text-indigo-800'>
							Đăng ký
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
}
