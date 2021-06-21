typescript 

type User = {
	name: string;
	adress: {
		city: string;
		uf: string;
	}
}
function showWelcomeMessage(user){
	console.log(user);
	return `Welcome ${user.name} (${user.adress.})`;
}