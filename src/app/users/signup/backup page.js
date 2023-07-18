"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
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
		e.preventDefault(); // at the beginning of a submit function

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
		<>
			<Layout>
				<div className="column">
					<div className='signupForm'>
						<form onSubmit={handleSubmit}>
							<h1>Sign Up</h1>
							<p className="text-muted">Create an account below to get started</p>
							<div className="input-group mb-3">
								<span className="input-group-addon"><i className="fa fa-whatsapp"></i></span>
								<input type="text" className="form-control" placeholder="Full Name" value={fullName} onChange={handleFullName} required />
							</div>
							<div className="input-group mb-3">
								<span className="input-group-addon"><i className="fa fa-whatsapp"></i></span>
								<input type="text" className="form-control" placeholder="Username" value={username} onChange={handleUsername} required />
							</div>
							<div className="input-group mb-3">
								<span className="input-group-addon"><i className="fa fa-mail-forward" aria-hidden="true"></i></span>
								<input type="email" className="form-control" placeholder="Email" value={email} onChange={handleEmail} required />
							</div>
							<div className="input-group mb-3">
								<span className="input-group-addon"><i className="fa fa-lock"></i></span>
								<input type="password" className="form-control" placeholder="Password" value={password} onChange={handlePassword} required />
							</div>
							<div className="input-group mb-3">
								<span className="input-group-addon"><i className="fa fa-address-book"></i></span>
								<input type="date" className="form-control" placeholder="Birthdate" value={birthdate} onChange={handleBirthdate} />
							</div>
							<div className="input-group mb-3">
								<span className="input-group-addon"><i className="fa fa-address-book"></i></span>
								<input type="text" className="form-control" placeholder="Location" value={location} onChange={handleLocation} />
							</div>
							<div className="row">
								<div className="col-6">
									<button type="submit" className="btn btn-primary px-4">Sign Up</button>
								</div>
								<div className="col-6 text-right">
									<button type="button" className="btn btn-link px-0">Forgot password?</button>
								</div>
							</div>
						</form>
						<hr />
						<div>
							<h2>Already have an account? Click the link below to login.</h2>
							<p>Sign In to your account</p>
							<a href="/users/login" type="button" className="btn btn-primary active mt-3">Login</a>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Signup;