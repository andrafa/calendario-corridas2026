const mesDiv = document.querySelector('.mesdiv');

const logoF1 = "src/images/logo-f1--branco.svg";
const logoImsa = "src/images/logo-imsa.svg";
const logoWec = "src/images/logo-wec-white.png";

function corCategoria(categoria) {
	if (categoria === 'F1') {
		return 'var(--cor-f1)';
	} else if (categoria === 'IMSA') {
		return 'var(--cor-imsa)';
	} else if (categoria === 'WEC') {
		return 'var(--cor-wec)';
	} else {
		return '#272727';
	}
}

// Função para retornar o logo da categoria
function logoCategoria(categoria) {
	if (categoria === 'F1') {
		return logoF1;
	} else if (categoria === 'IMSA') {
		return logoImsa;
	} else if (categoria === 'WEC') {
		return logoWec;
	} else {
		return '';
	}
}

// Função para verificar se a corrida está encerrada
function corridaEncerrda(dataCorrida) {
	const agora = new Date().getTime();
	const dataCorridaTime = new Date(dataCorrida).getTime();
	const encerrada = (agora > dataCorridaTime) ? 'encerrada' : '';
	
	return encerrada;
}

// Funções para extrair dia, mês e hora
const diaCorrida = (dataString) => {
	const data = new Date(dataString);
	return data.toLocaleDateString('pt-BR', { day: '2-digit' });
}
const mesCorrida = (dataString) => {
	const data = new Date(dataString);
	return data.toLocaleDateString('pt-BR', { month: 'short' });
}
const horaCorrida = (dataString) => {
	const data = new Date(dataString);
	return (data.getHours() === 0) ? '<span title="To Be Confirmed">TBC</span>' : data.toLocaleTimeString('pt-BR', { hour: '2-digit' })+'h';
}

fetch('api/motorsport_26.json')
	.then(response => response.json())
	.then(corridas => {
		const ano2026 = corridas.ano2026[0];

		// CALENDÁRIO
		Object.entries(ano2026).forEach(([mes, corridas]) => {

			mesDiv.innerHTML += `
			<div><h3 class="titulo-mes">${mes} <span class="badge rounded-pill text-bg-info" style="">${corridas.length}</span></h3></div>
			<div class="d-grid grid-display">
				${corridas.map(corrida => `<div class="corrida-wrap ${corridaEncerrda(corrida.data)}" style="--cor-categoria: ${corCategoria(corrida.categoria)};"><div class="cab"><img class="mb-4" src="${logoCategoria(corrida.categoria)}" alt="" width="80"><div class="corrida-info"><a href="${corrida.link}" target="_blank"><h2>${corrida.evento}</h2></a><p>${corrida.local} ${corrida.circuito}</p></div></div><a href="${corrida.link}" target="_blank"><div class="corrida-data d-flex justify-content-between align-items-end"><h1>${diaCorrida(corrida.data)} <br>${mesCorrida(corrida.data)} <br><span>${horaCorrida(corrida.data)}</span></h1><h1>→</h1></div></div></a>`).join('')}
			</div>
			`});

	})
	.catch(error => console.error('Erro ao carregar o calendário:', error));