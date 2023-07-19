'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import Layout from '@/app/components/layout';

const Signup = () => {
	const background = {
	  backgroundColor : "#E3E0DE"
	}
  
	const buttonColor = {
	  backgroundColor:"#E8BA9E"
	}
	
	const fontStyle = {
	  fontWeight:"700",
	  color: 'whitesmoke' ,
	  textShadow: "0px 0px 5px #E8BA9E, 0px 0px 5px #E8BA9E"
	}

	const router = useRouter();

	const [redirect, setRedirect] = useState(false);

	const [fullName, setFullName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [birthdate, setBirthdate] = useState('');
	const [location, setLocation] = useState('');
	const [error, setError] = useState(false);

	const handleFullName = (e) => {
		setFullName(e.target.value);
	};

	const handleUsername = (e) => {
		setUsername(e.target.value);
	};

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleBirthdate = (e) => {
		setBirthdate(e.target.value);
	};

	const handleLocation = (e) => {
		setLocation(e.target.value);
	};

	const parseBirthdate = (birthdate) => {
		let date = new Date(birthdate);
		date.setDate(date.getDate() + 1);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let formattedDate = `${year}-${month}-${day}`;
		return formattedDate;
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		const newUser = {
			fullName,
			username,
			birthdate: parseBirthdate(birthdate),
			location,
			email,
			password
		};

		axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/signup`, newUser)
		.then(response => {
			setRedirect(true);
		})
		.catch(error => {
			if (error.response.data.message === 'Email already exists') {
				console.log('===> Error in Signup', error.response.data.message);
				setError(true);
			}
		});
	};

	if (redirect) { router.push('/users/login'); }
	
	if (error) {
		return (
			<>
				<Layout>
					<div>
						<div className="card text-white bg-primary py-5 d-md-down-none" style={{ width: "44%" }}>
							<div className="card-body text-center">
								<div>
									<p>Email already exists</p>
									<br />
									<h2>Login</h2>
									<p>Sign In to your account</p>
									<a href="/users/login" type="button" className="btn btn-primary active mt-3">Login</a>
									<span>  </span>
									<a href="/users/signup" type="button" className="btn btn-secondary active mt-3">Signup</a>
								</div>
							</div>
						</div>
					</div>
				</Layout>
			</>
		);
	}

	return (
		<Layout>
			<div className='column'></div>
			<div className='column is-three-fifths'>
     			<h1 className="title has-text-centered" style={fontStyle}>Create Account</h1>
     			<div className="container box p-6 shadow rounded content" style={background}>
					<form onSubmit={handleSubmit}>
						<div className="field">
							<label htmlFor="email">Email</label>
							<div className="control">
								<input className="input" name="email" value={email} onChange={handleEmail} type="email" placeholder="Email (required)" required />
							</div>
						</div>
						<div className="field">
							<label htmlFor="password">Password</label>
							<div className="control">
								<input className="input" name="password" value={password} onChange={handlePassword} type="password" placeholder="Password (required)" required />
							</div>
						</div>
						<div className="field">
							<label htmlFor="username">Username</label>
							<div className="control">
								<input className="input" name="username" value={username} onChange={handleUsername} type="text" placeholder="Username (required)" required />
							</div>
						</div>
						<div className="field">
							<label htmlFor="fullName">Full Name</label>
							<div className="control">
								<input className="input" name="fullName" value={fullName} onChange={handleFullName} type="text" placeholder="Full Name (required)" required />
							</div>
						</div>
						<div className="field">
							<label htmlFor="location">Location</label>
							<div className="control">
								<input className="input" name="location" value={location} onChange={handleLocation} type="text" placeholder="Location" />
							</div>
						</div>
						<div className="field">
							<label htmlFor="birthdate">Birthdate</label>
							<div className="col-sm-9 text-secondary">
								<input className="input" name="birthdate" value={birthdate} onChange={handleBirthdate} type="date" required />
							</div>
						</div>
						<div className="field">
							<div className="control">
								<button className="button is-success" type='submit' style={buttonColor}>Create Account</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div className='column'></div>
		</Layout >
	);
};

export default Signup;