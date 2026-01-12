    const calendarioDiv = document.querySelector('.calendario');
    const corpoTabela = document.querySelector('.corpoTabela');
    const mesDiv = document.querySelector('.mesdiv');

    const logoF1 = "src/images/logo-f1.svg";
    const logoImsa = "src/images/logo-imsa.svg";
    const logoWec = "src/images/logo-wec-white.png";

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

		// Função para formatar data e hora
		function diaHora(dataString, type) {
			const data = new Date(dataString);
			const dataCompleta = data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' });
			const dataCurta = data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit'});

			return type === 'full' ? dataCompleta : dataCurta;
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
          // console.log(corridas.evento);
					
					corridas.forEach(race => {
						console.log(diaHora(race.data));
					});

          mesDiv.innerHTML += `
          <div><h3>${mes} <span class="badge rounded-pill text-bg-info">${corridas.length}</span></h3></div>
          <div class="d-grid grid-display">
            ${corridas.map(corrida => `<div class="corrida-wrap ${corridaEncerrda(corrida.data)}" style="--bg-image: url('${(corrida.image) ? corrida.image : ''}');"><div class="cab d-flex justify-content-between align-items-start"><div class="corrida-info"><h4>${corrida.evento}</h4><p>${corrida.local} ${corrida.circuito}</p></div><img src="${logoCategoria(corrida.categoria)}" alt="" width="80"></div><a href="${corrida.link}" target="_blank"><div class="corrida-data d-flex justify-content-between align-items-end"><h1>${diaCorrida(corrida.data)} <br>${mesCorrida(corrida.data)} <br><span>${horaCorrida(corrida.data)}</span></h1><h1>→</h1></div></div></a>`).join('')}
          </div>
          `});

        // TABELA
        Object.entries(ano2026).forEach(([mes, corridasDoMes]) => {
        // console.log(mes, corridasDoMes);
        corridasDoMes.forEach(corrida => {
          corpoTabela.innerHTML += `
            <tr>
              <td class="td-logo"><img src="${logoCategoria(corrida.categoria)}" alt="" srcset="" width="60"></td>
              <td>${corrida.evento}</td>
              <td>${corrida.circuito}</td>
              <td>${diaHora(corrida.data, 'full')}</td>
              <td><a href="${corrida.link}" target="_blank"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></a></td>
            </tr>
            `;
          // console.log(`titulo: ${corrida.evento} | data: ${corrida.data} | link: ${corrida.link}`);
        })
        
      });

      })
      .catch(error => console.error('Erro ao carregar o calendário:', error));