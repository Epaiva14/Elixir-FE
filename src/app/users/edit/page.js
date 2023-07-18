"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import handleLogout from '@/app/utils/handleLogout';
import setAuthToken from '@/app/utils/setAuthToken';
import Layout from '@/app/components/layout';

export default function EditUser() {  
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
		// console.log(expirationTime, localStorage);

		// make a condition that compares exp and current time
		if (currentTime >= expirationTime) {
			handleLogout();
			// alert('Session has ended. Please login to continue.');
			router.push('/users/login');
		}
	}

	// const handleEmail = (e) => {
	// 	setEmail(e.target.value);
	// };

	const handleFullName = (e) => {
		setFullName(e.target.value);
	};

	const handleUsername = (e) => {
		setUsername(e.target.value);
	};

	const handleLocation = (e) => {
		setLocation(e.target.value);
	};

	const handleAvatar = (e) => {
		setAvatar(e.target.value);
	};

	const handleBirthdate = (e) => {
		setBirthdate(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const updateUserObject = {
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
			<div className='column'></div>
			<div className='column is-three-fifths'>
     			<h1 className="title has-text-centered" style={fontStyle}>Edit Profile</h1>
     			<div className="container box p-6 shadow rounded content" style={background}>
					<form onSubmit={handleSubmit}>
						<div className="field">
							<label htmlFor="email">Email</label>
							<div className="control">
								<input className="input" name="email" value={email} type="email" placeholder="Email (required)" disabled />
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
							<label htmlFor="avatar">Avatar</label>
							<div className="control">
								<input className="input" name="avatar" value={avatar} onChange={handleAvatar} type="url" placeholder="Avatar URL" />
							</div>
						</div>
						<div className="field">
							<label htmlFor="birthdate">Birthdate</label>
							<div className="col-sm-9 text-secondary">
								<input className="input" name="birthdate" value={birthdate} onChange={handleBirthdate} type="date" />
							</div>
						</div>
						<div className="field is-grouped">
							<div className="control">
								<button className="button is-success" type='submit' style={buttonColor}>Save Changes</button>
							</div>
							<div className="control">
								<button className="button is-success" type='cancel'  style={buttonColor} onClick={() => {setRedirect(true)}}>Cancel</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div className='column'></div>
		</Layout >
	);
}
