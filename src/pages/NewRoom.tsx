import {FormEvent, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import illustration from '../assets/images/illustration.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';
import { database } from '../services/firebase';

export function NewRoom(){
	const {user}= useAuth();
	const history = useHistory();
	const [newRoom,setNewRoom] = useState('');

	async function handleCreatRoom(event: FormEvent){
		event.preventDefault();

		if (newRoom.trim() === ''){
			return;
		}

		const roomRef = database.ref('rooms');

		const firebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: user?.id,
		});

		history.push(`/rooms/${firebaseRoom.key}`)
	}

	return (
		<div id="page-auth">
			<aside>
				<img src={illustration} alt="Ilustração simbolizando perguntas e respostas" />
				<strong>Crie salas de Q&amp;A ao-vivo</strong>
				<p>Tire as dúvidas da sua audiência em tempo-real</p>
			</aside>
			<main>
				{/*<h1>{value}</h1>*/}
				<div className="main-content">
					<img src={logoImg} alt="letmeask"/>
					<h2>Criar uma nova sala</h2>
					<form onSubmit={handleCreatRoom}>
						<input 
							type="text" 
							placeholder="Nome da Sala"
							onChange={event=> setNewRoom(event.target.value)}
							value={newRoom}
						/>
						<Button type="submit">
								Criar Sala
						</Button>
					</form>
					<p>Quer entrar em uma sala existente?<Link to="/">clique aqui</Link></p>
				</div>
			</main>
		</div>
	)
}