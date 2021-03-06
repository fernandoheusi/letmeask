import { FormEvent, useState } from 'react';
import {useHistory} from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import illustration from '../assets/images/illustration.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { database } from '../services/firebase';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';

export function Home(){
	const history = useHistory();
	const { user,signInWithGoogle }= useAuth();
	const [roomCode,setRoomCode] = useState('')

	async function handleCreatRoom(){
		if(!user){
			await signInWithGoogle();
		}
		history.push('/rooms/new');
	}

	async function handleJoinRoom(event: FormEvent){
		event.preventDefault();

		if (roomCode.trim() === ''){
			return;
		}

		const roomRef = await database.ref(`rooms/${roomCode}`).get(); //o .get() retorna todos os dados da sala

		if (!roomRef.exists()){
			alert('Room does not exists');
			return;
		}

		if (roomRef.val().endedAt) {
			alert('Room already closed :(')
			return;
		}

		history.push(`/rooms/${roomCode}`);
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
					<button onClick={handleCreatRoom} className="creat-room">
						<img src={googleIconImg} alt="Logo do Google" />
						Crie a sua sala com o Google
					</button>
					<div className="separator">ou entre em uma sala</div>
					<form onSubmit={handleJoinRoom}>
						<input 
							type="text" 
							placeholder="Digite o codigo da sala"
							onChange={event=> setRoomCode(event.target.value)}
							value={roomCode}
						/>
						<Button type="submit">
							Entrar na sala
						</Button>
					</form>
				</div>
			</main>
		</div>
	)
}