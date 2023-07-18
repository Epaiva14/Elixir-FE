"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import handleLogout from '@/app/utils/handleLogout';
import setAuthToken from '@/app/utils/setAuthToken';
import Layout from '@/app/components/layout';

export default function EditUser() {
	const router = useRouter();
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const [redirect, setRedirect] = useState(false);

	// TODO - Add state for email, number, streetAddress, city
	const [email, setEmail] = useState('');
	const [fullName, setFullName] = useState('');
	const [username, setUsername] = useState('');
	const [location, setLocation] = useState('');
	const [avatar, setAvatar] = useState('');
	const [birthdate, setBirthdate] = useState('');

	// console.log(localStorage);
	if (typeof window !== 'undefined') {

		const expirationTime = new Date(localStorage.getItem('expiration') * 1000);
		let currentTime = Date.now();
		console.log(expirationTime, localStorage);


		// make a condition that compares exp and current time
		if (currentTime >= expirationTime) {
			handleLogout();
			alert('Session has ended. Please login to continue.');
			router.push('/users/login');
		}
	}

	const handleEmail = (e) => {
		// fill in code
		setEmail(e.target.value);
	};

	const handleFullName = (e) => {
		// fill in code
		setFullName(e.target.value);
	};

	const handleUsername = (e) => {
		// fill in code
		setUsername(e.target.value);
	};

	const handleLocation = (e) => {
		// fill in code
		setLocation(e.target.value);
	};

	const handleAvatar = (e) => {
		// fill in code
		setAvatar(e.target.value);
	};

	const handleBirthdate = (e) => {
		// fill in code
		setBirthdate(e.target.value);
	};

	const handleSubmit = (e) => {
		// fill in code
		e.preventDefault();
		// if the email is different, update that in localStorage
		// use axios to put to the route
		// create an object that stores that updated changes
		const updateUserObject = {
			email,
			fullName,
			username,
			location,
			avatar,
			birthdate
		};
		axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${data._id}`, updateUserObject)
			.then(response => {
				// update email in localStorage
				localStorage.setItem('email', email);
				setRedirect(true);
			})
			.catch(error => {
				console.log(error);
				router.push('/users/profile');
			});

	};

	useEffect(() => {
		setAuthToken(localStorage.getItem('jwtToken'));
		if (localStorage.getItem('jwtToken')) {
			axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${localStorage.getItem('email')}`)
				.then((response) => {
					// data is an object
					let userData = jwtDecode(localStorage.getItem('jwtToken'));

					if (response.data.users[0].email === userData.email) {
						setData(response.data.users[0]);
						setEmail(response.data.users[0].email);
						setFullName(response.data.users[0].fullName);
						setUsername(response.data.users[0].username);
						setLocation(response.data.users[0].location);
						setAvatar(response.data.users[0].avatar);
						setBirthdate(response.data.users[0].birthdate);
						setLoading(false);
					}
				})
				.catch((error) => {
					console.log(error);
					router.push('/users/login');
				});
		} else {
			router.push('/users/login');
		}
	}, [router]);

	if (isLoading) return <p>Loading...</p>;
	if (!data) return <p>No data shown...</p>;
	if (redirect) { router.push('/users/profile'); }


	return (

		<Layout>
			<form onSubmit={handleSubmit}>
				<div className='column'>
					<div className='profileSection'>
						{/* change avatar */}
						<img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
						<div className="row mb-3">
							<div className="col-sm-3">
								<h6 className="mb-0">Change Avatar:</h6>
							</div>
							<div className="col-sm-9 text-secondary">
								<input type="text" className="form-control" value={avatar} onChange={handleAvatar} />
							</div>
						</div>

						<h2 className='username'>{data.username}</h2>
						<button className="btn btn-primary">Follow</button>
						<button className="btn btn-outline-primary">Message</button>
						<br />
						<br />
						<a className="btn btn-info editButton" target="__blank" href="/users/profile">Cancel</a>
						<a className="breadcrumb-item logoutButton" onClick={handleLogout}><a href="/users/login">Logout</a></a>
					</div>
				</div>
				{/* change username */}
				<div className='column'>
					<div className="profileInfo">
						<h6 className="mb-0"><strong>Full Name: </strong>{data.fullName} </h6>
						<div className="row mb-3">
							<div className="col-sm-3">
								<h6 className="mb-0">Change Username: </h6>
							</div>
							<div className="col-sm-9 text-secondary">
								<input type="text" className="form-control" value={username} onChange={handleUsername} />
							</div>
						</div>

						{/* change birthdate */}
						<p className="text-secondary mb-1"><strong>Birthday:</strong> {data.birthdate}</p>
						<div className="row mb-3">
							<div className="col-sm-3">
								<h6 className="mb-0">Change Birthdate: </h6>
							</div>
							<div className="col-sm-9 text-secondary">
								<input type="datetime-local" className="form-control" value={birthdate} onChange={handleBirthdate} />
							</div>
						</div>

						{/* change email */}
						<p className="text-muted font-size-sm"><strong>Email: </strong>{data.email}</p>
						<div className="row mb-3">
							<div className="col-sm-3">
								<h6 className="mb-0">Change Email: </h6>
							</div>
							<div className="col-sm-9 text-secondary">
								<input type="text" className="form-control" value={email} onChange={handleEmail} required />
							</div>
						</div>

						{/* change location */}
						<p className="text-muted font-size-sm"><strong>Residence: </strong>{data.location}</p>
						<div className="row mb-3">
							<div className="col-sm-3">
								<h6 className="mb-0">Change Location: </h6>
							</div>
							<div className="col-sm-9 text-secondary">
								<input type="text" className="form-control" value={location} onChange={handleLocation} />
							</div>
						</div>
						<button className="btn btn-primary px-4" type='Submit'>Save Changes</button>
					</div>
				</div>
				{/* TODO - Update value for all user values */}
			</form>

		</Layout >
	);
}
