'use client';
import React, { useState } from 'react';
import Section from '../section';

const initialData = {
	name: '',
	email: '',
	message: '',
};

const Connect = () => {
	const [formData, setFormData] = useState(initialData);
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState(null);

	const handleErrors = (key, data) => {
		// Implement your error handling logic here
		return true;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formErrors = Object.keys(formData).filter(
			(key) => !handleErrors(key, formData)
		);
		if (formErrors.length === 0) {
			setIsSubmitting(true);
			try {
				const response = await fetch('/api/contact', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				});

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const data = await response.json();
				console.log('Server response:', data);

				setSubmitMessage(
					'Thank you for your message. I will get back to you soon!'
				);
				setFormData(initialData);
			} catch (error) {
				console.error('Error sending message:', error);
				setSubmitMessage(
					'There was an error sending your message. Please try again later.'
				);
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	return (
		<Section>
			<div className='flex flex-col items-center justify-center 3xl:mb-0 mb-24'>
				<main className='flex justify-center items-center mb-8'>
					<h1 className='flex-1 text-center sm:text-9xl text-6xl font-bold text-white uppercase mb-4'>
						Connect
					</h1>
				</main>

				<form
					className='sm:p-0 p-4 w-full max-w-[1024px]'
					onSubmit={handleSubmit}>
					<div className='mb-8'>
						<label
							htmlFor='name'
							className='block text-[20px] tracking-[-0.04em] uppercase font-black font-inter text-white text-left'>
							Your Name
						</label>
						<input
							type='text'
							name='name'
							id='name'
							className='mt-1 block w-full px-3 py-2 bg-transparent border-4 opacity-50 border-white'
							value={formData.name}
							onChange={handleChange}
						/>
						{errors.name && (
							<div className='text-red-500 text-sm mt-1'>
								{errors.name}
							</div>
						)}
					</div>
					<div className='form-group'>
						<label
							htmlFor='email'
							className='block text-[20px] tracking-[-0.04em] uppercase font-black font-inter text-white text-left'>
							Your Email
						</label>
						<input
							type='email'
							name='email'
							id='email'
							className='mt-1 block w-full px-3 py-2 bg-transparent border-4 opacity-50 border-white'
							value={formData.email}
							onChange={handleChange}
						/>
						{errors.email && (
							<div className='text-red-500 text-sm mt-1'>
								{errors.email}
							</div>
						)}
					</div>
					<div className='my-8'>
						<label
							htmlFor='message'
							className='block text-[20px] tracking-[-0.04em] uppercase font-black font-inter text-white text-left'>
							What&apos;s up?
						</label>
						<textarea
							name='message'
							id='message'
							className='mt-1 block w-full px-3 py-2 bg-transparent border-4 opacity-50 border-white'
							value={formData.message}
							onChange={handleChange}
							rows={4}
						/>
						{errors.message && (
							<div className='text-red-500 text-sm mt-1'>
								{errors.message}
							</div>
						)}
					</div>
					<button
						type='submit'
						className='relative rounded bg-black flex items-center justify-center py-4 px-10 box-border text-center text-base text-white tracking-[-0.04em] uppercase font-black'
						disabled={isSubmitting}>
						{isSubmitting ? 'Sending...' : 'Send Message'}
					</button>
				</form>
			</div>
		</Section>
	);
};

export default Connect;
