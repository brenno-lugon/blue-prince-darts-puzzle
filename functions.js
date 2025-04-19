const pontos = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17,
    3, 19, 7, 16, 8, 11, 14, 9, 12, 5];

const grupoSetores = document.getElementById('setores');
const grupoNumeros = document.getElementById('numeros');
const btnCalcular = document.getElementById('btn-calcular');
const btnLimpar = document.getElementById('btn-limpar');
const resultadoDiv = document.getElementById('resultado');

const RAIO_BULL = 8;
const RAIO_OUTER_BULL = 25;
const SQUARE_SIZE = 30;
const RAIO_TRIPLO_INTERNO = 99;
const RAIO_TRIPLO_EXTERNO = 107;
const RAIO_DUPLO_INTERNO = 162;
const RAIO_DUPLO_EXTERNO = 170;

const cicloCores = ['#5BA8B2', '#EAD788', '#E77AB4', '#6542D0'];

for (let i = 0; i < 20; i++) {
    const baseAngulo = -90 - 18;
    const angInicio = (baseAngulo + i * 18) * Math.PI / 180;
    const angFim = (baseAngulo + (i + 1) * 18) * Math.PI / 180;

    const cor1 = i % 2 === 0 ? "#292b2e" : "#d6e1e4"; // simples
    const cor2 = i % 2 === 0 ? "#818684" : "#393e3d"; // triplo/duplo

    criaSetor(0, RAIO_TRIPLO_INTERNO, angInicio, angFim, cor1, pontos[i], 1); // setor 1
    criaSetor(RAIO_TRIPLO_INTERNO, RAIO_TRIPLO_EXTERNO, angInicio, angFim, cor2, pontos[i], 2); // setor 2
    criaSetor(RAIO_TRIPLO_EXTERNO, RAIO_DUPLO_INTERNO, angInicio, angFim, cor1, pontos[i], 3); // setor 3
    criaSetor(RAIO_DUPLO_INTERNO, RAIO_DUPLO_EXTERNO, angInicio, angFim, cor2, pontos[i], 4); // setor 4
}

// bull externo
const bull = document.createElementNS("http://www.w3.org/2000/svg", "circle");
bull.setAttribute("cx", 250);
bull.setAttribute("cy", 250);
bull.setAttribute("r", RAIO_OUTER_BULL);
bull.setAttribute("fill", "#292b2e");
bull.setAttribute("id", "bull"); // Dê um ID exclusivo
bull.setAttribute("data-click", "0");
bull.setAttribute("stroke", "black");
bull.setAttribute("stroke-width", "1");
bull.setAttribute("data-original", "#bbb");
bull.setAttribute("class", "setor");

// bull interno
const innerBull = document.createElementNS("http://www.w3.org/2000/svg", "circle");
innerBull.setAttribute("cx", 250);
innerBull.setAttribute("cy", 250);
innerBull.setAttribute("r", RAIO_BULL);
innerBull.setAttribute("fill", "#666");

innerBull.setAttribute("id", "innerBull"); // Dê um ID exclusivo
innerBull.setAttribute("data-click", "0");
innerBull.setAttribute("data-original", "#bbb");

grupoSetores.appendChild(bull);
grupoSetores.appendChild(innerBull);

const bullSquare = document.createElementNS("http://www.w3.org/2000/svg", "rect");
bullSquare.setAttribute("x", 250 - SQUARE_SIZE / 2); // centraliza em relação ao centro (250)
bullSquare.setAttribute("y", 250 - SQUARE_SIZE / 2);
bullSquare.setAttribute("width", SQUARE_SIZE);
bullSquare.setAttribute("height", SQUARE_SIZE);
bullSquare.setAttribute("fill", "none");
bullSquare.setAttribute("stroke", "black");
bullSquare.setAttribute("stroke-width", "2");
bullSquare.setAttribute("transform", `rotate(-9 250 250)`);
bullSquare.setAttribute("opacity", "0");
bullSquare.setAttribute("pointer-events", "none");
bullSquare.setAttribute("class", "square");

const bullDiamond = document.createElementNS("http://www.w3.org/2000/svg", "rect");
bullDiamond.setAttribute("x", 250 - SQUARE_SIZE / 2); // centraliza em relação ao centro (250)
bullDiamond.setAttribute("y", 250 - SQUARE_SIZE / 2);
bullDiamond.setAttribute("width", SQUARE_SIZE);
bullDiamond.setAttribute("height", SQUARE_SIZE);
bullDiamond.setAttribute("fill", "none");
bullDiamond.setAttribute("stroke", "black");
bullDiamond.setAttribute("stroke-width", "2");
bullDiamond.setAttribute("transform", `rotate(-56 250 250)`);
bullDiamond.setAttribute("opacity", "0");
bullDiamond.setAttribute("pointer-events", "none");
bullDiamond.setAttribute("class", "diamond");

const bullWave1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
bullWave1.setAttribute("fill", "none");
bullWave1.setAttribute("stroke", "black");
bullWave1.setAttribute("stroke-width", "2");
bullWave1.setAttribute("opacity", "0");
bullWave1.setAttribute("transform", `rotate(-9 250 250)`);
bullWave1.setAttribute("pointer-events", "none");

const startX = 231;
const startY = 234;
const width = 37;
const height = 10;
const spacing = 33;

// começa em (235,250), termina em (265,250), curvando pra cima e pra baixo
const d1 = `
  M ${startX} ${startY}
  C ${startX + width * 0.25} ${startY + height},
    ${startX + width * 0.75} ${startY - height},
    ${startX + width} ${startY}
  M ${startX + 2} ${startY + spacing}
  C ${startX + width * 0.25} ${startY + spacing + height},
    ${startX + width * 0.75} ${startY + spacing - height},
    ${startX + width} ${startY + spacing}	
`;
bullWave1.setAttribute("d", d1);

const bullWave2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
bullWave2.setAttribute("fill", "none");
bullWave2.setAttribute("stroke", "black");
bullWave2.setAttribute("stroke-width", "2");
bullWave2.setAttribute("opacity", "0");
bullWave2.setAttribute("transform", `rotate(-9 250 250)`);
bullWave2.setAttribute("pointer-events", "none");

const startX2 = 228;
const startY2 = 234;
const width2 = 44;
const spacing2 = 5;

// começa em (235,250), termina em (265,250), curvando pra cima e pra baixo
const d2 = `
  M ${startX} ${startY}
  C ${startX + width * 0.25} ${startY + height},
    ${startX + width * 0.75} ${startY - height},
    ${startX + width} ${startY}
  M ${startX2} ${startY2 + spacing2}
  C ${startX2 + width2 * 0.25} ${startY2 + spacing2 + height},
    ${startX2 + width2 * 0.75} ${startY2 + spacing2 - height},
    ${startX2 + width2} ${startY2 + spacing2}
	
	
  M ${startX + 2} ${startY + spacing}
  C ${startX + width * 0.25} ${startY + spacing + height},
    ${startX + width * 0.75} ${startY + spacing - height},
    ${startX + width} ${startY + spacing}	
  M ${startX2 + 1} ${startY2 + spacing - spacing2}
  C ${startX2 + width2 * 0.25} ${startY2 + spacing - spacing2 + height},
    ${startX2 + width2 * 0.75} ${startY2 + spacing - spacing2 - height},
    ${startX2 + width2} ${startY2 + spacing - spacing2}		
`;
bullWave2.setAttribute("d", d2);

const bullWave3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
bullWave3.setAttribute("fill", "none");
bullWave3.setAttribute("stroke", "black");
bullWave3.setAttribute("stroke-width", "2");
bullWave3.setAttribute("opacity", "0");
bullWave3.setAttribute("transform", `rotate(-9 250 250)`);
bullWave3.setAttribute("pointer-events", "none");

const startX3 = 226;
const startY3 = 234;
const width3 = 48;
const spacing3 = 10;

// começa em (235,250), termina em (265,250), curvando pra cima e pra baixo
const d3 = `
  M ${startX} ${startY}
  C ${startX + width * 0.25} ${startY + height},
    ${startX + width * 0.75} ${startY - height},
    ${startX + width} ${startY}
  M ${startX2} ${startY2 + spacing2}
  C ${startX2 + width2 * 0.25} ${startY2 + spacing2 + height},
    ${startX2 + width2 * 0.75} ${startY2 + spacing2 - height},
    ${startX2 + width2} ${startY2 + spacing2}
  M ${startX3} ${startY3 + spacing3}
  C ${startX3 + width3 * 0.25} ${startY3 + spacing3 + height},
    ${startX3 + width3 * 0.75} ${startY3 + spacing3 - height},
    ${startX3 + width3} ${startY3 + spacing3}	
	
  M ${startX + 2} ${startY + spacing}
  C ${startX + width * 0.25} ${startY + spacing + height},
    ${startX + width * 0.75} ${startY + spacing - height},
    ${startX + width} ${startY + spacing}	
  M ${startX2 + 1} ${startY2 + spacing - spacing2}
  C ${startX2 + width2 * 0.25} ${startY2 + spacing - spacing2 + height},
    ${startX2 + width2 * 0.75} ${startY2 + spacing - spacing2 - height},
    ${startX2 + width2} ${startY2 + spacing - spacing2}
  M ${startX3 + 1} ${startY3 + spacing - spacing3}	
  C ${startX3 + width3 * 0.25} ${startY3 + spacing - spacing3 + height},
    ${startX3 + width3 * 0.75} ${startY3 + spacing - spacing3 - height},
    ${startX3 + width3} ${startY3 + spacing - spacing3}	
`;
bullWave3.setAttribute("d", d3);

grupoSetores.appendChild(bullSquare);
grupoSetores.appendChild(bullDiamond);
grupoSetores.appendChild(bullWave1);
grupoSetores.appendChild(bullWave2);
grupoSetores.appendChild(bullWave3);

let formaIndex = 0; // 0 = nada, 1 = quadrado, 2 = diamante, 3 = triângulo

// Clique no bull central
innerBull.addEventListener('click', (event) => {
    const pt = innerBull.ownerSVGElement.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;

    const svgPonto = pt.matrixTransform(innerBull.ownerSVGElement.getScreenCTM().inverse());
    const dx = svgPonto.x - 250;
    const dy = svgPonto.y - 250;
    const distancia = Math.sqrt(dx * dx + dy * dy);

    if (distancia <= RAIO_BULL) {
        formaIndex = (formaIndex + 1) % 6;

        // Zera tudo primeiro
        bullSquare.setAttribute("opacity", "0");
        bullDiamond.setAttribute("opacity", "0");
        bullWave1.setAttribute("opacity", "0");
        bullWave2.setAttribute("opacity", "0");
        bullWave3.setAttribute("opacity", "0");

        if (formaIndex === 1) {
            bullSquare.setAttribute("opacity", "1");
        } else if (formaIndex === 2) {
            bullDiamond.setAttribute("opacity", "1");
        } else if (formaIndex === 3) {
            bullWave1.setAttribute("opacity", "1");
        } else if (formaIndex === 4) {
            bullWave2.setAttribute("opacity", "1");
        } else if (formaIndex === 5) {
            bullWave3.setAttribute("opacity", "1");
        }
    } else {
        processaCliqueSetor(innerBull);
    }
});

// lógica de clique
document.querySelectorAll('.setor').forEach(setor => {
    setor.setAttribute('data-click', '0');
    setor.setAttribute('data-original', setor.getAttribute('fill'));

    setor.addEventListener('click', () => {
        processaCliqueSetor(setor);
    });
});

// números
for (let i = 0; i < 20; i++) {
    const ang = ((i * 18 - 90)) * Math.PI / 180;
    const raioTexto = 185;
    const x = 250 + raioTexto * Math.cos(ang);
    const y = 250 + raioTexto * Math.sin(ang) + 8;

    const texto = document.createElementNS("http://www.w3.org/2000/svg", "text");
    texto.setAttribute("x", x);
    texto.setAttribute("y", y);
    texto.setAttribute("text-anchor", "middle");
    texto.setAttribute("pointer-events", "none");
    texto.textContent = pontos[i];
    grupoNumeros.appendChild(texto);
}

function processaCliqueSetor(setor) {
    let clickCount = parseInt(setor.getAttribute('data-click')) || 0;
    let clickCountBull = parseInt(setor.getAttribute('data-click')) || 0;
    clickCount = (clickCount + 1) % 9;
    clickCountBull = (clickCountBull + 1) % 5;

    const setorNumero = parseInt(setor.getAttribute('data-setor'));
    const valorSetor = parseInt(setor.getAttribute('data-valor'));

    if (isNaN(setorNumero)) {
        setor.setAttribute('data-click', clickCountBull);
    } else {
        setor.setAttribute('data-click', clickCount);
    }

    const existsOneThird = document.querySelector(
`.onethird[data-valor-original="${valorSetor}"][data-setor="${setorNumero}"]`);
    if (existsOneThird)
        existsOneThird.remove();

    if (isNaN(setorNumero)) {
        if (clickCountBull >= 1 && clickCountBull <= 4) {
            setor.setAttribute('fill', cicloCores[clickCountBull - 1]);
        } else if (clickCountBull === 0) {
            setor.setAttribute('fill', setor.getAttribute('data-original'));
        }
        resultadoDiv.textContent = "";
        return;
    }

    // Clique 1 a 4 → cores diretas no setor
    if (clickCount >= 1 && clickCount <= 4) {
        setor.setAttribute('fill', cicloCores[clickCount - 1]);
    }

    // Clique 5 a 8 → cor original no setor + oneThird com cor correspondente
    else if (clickCount >= 5 && clickCount <= 8) {
        setor.setAttribute('fill', setor.getAttribute('data-original'));		
		insereSetorUmTerco(clickCount, valorSetor, setorNumero);        
    } else if (clickCount === 0) {
        setor.setAttribute('fill', setor.getAttribute('data-original'));
    }

    resultadoDiv.textContent = "";
}

function insereSetorUmTerco(clickCount, valorSetor, setorNumero){	
	const cor = cicloCores[clickCount - 5];
	const valor = pontos.indexOf(valorSetor);
	const baseAngulo = -90 - 18;
	const angInicio = (baseAngulo + valor * 18) * Math.PI / 180;
	const angFim = (baseAngulo + (valor + 1) * 18) * Math.PI / 180;
	
	let oneThird;
	switch (setorNumero) {
	case 1:
		oneThird = criaSetorUmTerco(RAIO_OUTER_BULL, RAIO_TRIPLO_INTERNO, angInicio, angFim, cor, valorSetor, 1);
		break;
	case 2:
		oneThird = criaSetorUmTerco(RAIO_TRIPLO_INTERNO, RAIO_TRIPLO_EXTERNO, angInicio, angFim, cor, valorSetor, 2);
		break;
	case 3:
		oneThird = criaSetorUmTerco(RAIO_TRIPLO_EXTERNO, RAIO_DUPLO_INTERNO, angInicio, angFim, cor, valorSetor, 3);
		break;
	case 4:
		oneThird = criaSetorUmTerco(RAIO_DUPLO_INTERNO, RAIO_DUPLO_EXTERNO, angInicio, angFim, cor, valorSetor, 4);
		break;
	}

	grupoSetores.appendChild(oneThird);	
}

function clearPuzzle() {
    document.querySelectorAll('.setor').forEach(setor => {
        const original = setor.getAttribute('data-original');
        if (original) {
            setor.setAttribute('fill', original);
        }
        setor.setAttribute('data-click', '0');
    });

    // Zera tudo primeiro
    bullSquare.setAttribute("opacity", "0");
    bullDiamond.setAttribute("opacity", "0");
    bullWave1.setAttribute("opacity", "0");
    bullWave2.setAttribute("opacity", "0");
    bullWave3.setAttribute("opacity", "0");

    // Remover todos os oneThird
    document.querySelectorAll('.onethird').forEach(circle => circle.remove());
    const modalBodyContent = document.getElementById('detailedSolutionModalBody');
    modalBodyContent.innerHTML = '';
    resultadoDiv.textContent = '';
}

function arredondarParaUnidadeMaisProxima(valor) {
    const arredondado = Math.round(valor);
    return Math.min(arredondado, 9);
}

function arredondarParaDezenaMaisProxima(valor) {
    const arredondado = Math.round(valor / 10) * 10;
    return Math.min(arredondado, 99);
}

function arredondarParaCentenaMaisProxima(valor) {
    const arredondado = Math.round(valor / 100) * 100;
    return Math.min(arredondado, 999);
}

function aplicaBull(resultado, corDoSetor, setorNumero, etapas) {
    const bull = document.getElementById('bull');
    const corDoBull = bull.getAttribute('fill');

    if (corDoBull === corDoSetor) {
        if (bullSquare && bullSquare.getAttribute('opacity') === '1') {
            etapas[setorNumero].push(` -> ${resultado}²`);
            resultado = resultado ** 2;
        } else if (bullDiamond && bullDiamond.getAttribute('opacity') === '1') {
            const invertido = parseFloat(resultado.toString().split('').reverse().join(''));
            etapas[setorNumero].push(` -> ${resultado} (reversed)`);
            resultado = invertido;
        } else if (bullWave1 && bullWave1.getAttribute('opacity') === '1') {
            etapas[setorNumero].push(` -> ${formataValorDecimal(resultado)} (round to the nearest 1)`);
            resultado = arredondarParaUnidadeMaisProxima(resultado);
        } else if (bullWave2 && bullWave2.getAttribute('opacity') === '1') {
            etapas[setorNumero].push(` -> ${formataValorDecimal(resultado)} (round to the nearest 10)`);
            resultado = arredondarParaDezenaMaisProxima(resultado);
        } else if (bullWave3 && bullWave3.getAttribute('opacity') === '1') {
            etapas[setorNumero].push(` -> ${formataValorDecimal(resultado)} (round to the nearest 100)`);
            resultado = arredondarParaCentenaMaisProxima(resultado);
        }
        etapas[setorNumero].push(` = ${resultado}`);
    }
    return resultado;
}

function writeDetailModal(setorNumero, etapas, modalBodyContent, lastNonEmptySetor, sectorsQtd) {

    const sectorLabels = ['1st', '2nd', '3rd', '4th'];

    sectorLabels.forEach((label, index) => {
        const sectorIndex = index + 1;
        if (etapas[sectorIndex]) {
            modalBodyContent.innerHTML += `<strong>${label} sector:</strong> `;

            if (sectorIndex !== 1 && sectorsQtd > 1) {
                modalBodyContent.innerHTML += `${lastValue}`;
            }

            etapas[sectorIndex].forEach((etapa, i) => {
                if (i === 0 && sectorIndex === 1) {
                    modalBodyContent.innerHTML += `${etapa.substring(3)}`; // corta os 3 primeiros caracteres
                } else {
                    modalBodyContent.innerHTML += `${etapa}`;
                }
            });

            modalBodyContent.innerHTML += `<br>`;

            // Atualiza o lastValue com o último item da etapa atual (o resultado)
            lastValue = (etapas[sectorIndex][etapas[sectorIndex].length - 1]).substring(3);
        }
    });

    if (setorNumero === lastNonEmptySetor) {
        modalBodyContent.innerHTML += `<br><div class="h3"><span class="badge badge-primary">Result: ${lastValue}</span></div>`;
    }
}

function formataValorDecimal(valor) {
    return Number.isInteger(valor) ? valor : parseFloat(valor.toFixed(3));
}

function calcularSetorPorNumero(setorNumero) {
    let soma = 0;
    let subtracao = 0;
    let multiplicacao = 1;
    let divisao = 1;
    let resultado = 0;
    let etapas = [];
    etapas[setorNumero] = [];

    const setores = Array.from(document.querySelectorAll(`.setor[data-setor="${setorNumero}"], .onethird[data-setor="${setorNumero}"]`));
    let corDoSetor = null;

    setores.forEach(setor => {
        const cor = setor.getAttribute('fill');
        const valor = parseFloat(setor.getAttribute('data-valor'));
        if (isNaN(valor))
            return;

        switch (cor) {
        case '#5BA8B2': // Azul (soma)
            soma += valor;
            etapas[setorNumero].push(` + ${formataValorDecimal(valor)}`);
            corDoSetor = cor;
            break;
        case '#EAD788': // Amarelo (subtração)
            subtracao += valor;
            etapas[setorNumero].push(` - ${formataValorDecimal(valor)}`);
            corDoSetor = cor;
            break;
        case '#E77AB4': // Rosa (multiplicação)
            multiplicacao *= valor;
            etapas[setorNumero].push(` x ${formataValorDecimal(valor)}`);
            corDoSetor = cor;
            break;
        case '#6542D0': // Roxo (divisão)
            divisao *= valor;
            etapas[setorNumero].push(` ÷ ${formataValorDecimal(valor)}`);
            corDoSetor = cor;
            break;
        }
    });

    switch (corDoSetor) {
    case '#5BA8B2': // Azul (soma)
        resultado = soma;
        break;
    case '#EAD788': // Amarelo (subtração)
        resultado = subtracao;
        break;
    case '#E77AB4': // Rosa (multiplicação)
        resultado = multiplicacao;
        break;
    case '#6542D0': // Roxo (divisão)
        resultado = divisao;
        break;
    }

    return {
        resultado,
        cor: corDoSetor,
        setorNumero,
        etapas
    };
}

function solvePuzzle() {
    const setores = [
        calcularSetorPorNumero(1),
        calcularSetorPorNumero(2),
        calcularSetorPorNumero(3),
        calcularSetorPorNumero(4)
    ];

    // Inicializa com valor neutro
    let final = 0;
    let multiplicador = 1;
    let divisor = 1;
    let lastSector = false;

    const modalBodyContent = document.getElementById('detailedSolutionModalBody');
    modalBodyContent.innerHTML = '';

    let lastNonEmptySetor = 0;
    let totalSetoresNaoVazios = 0;

    for (let i = setores.length - 1; i >= 0; i--) {
        if (setores[i].cor != null) {
            if (lastNonEmptySetor === 0) {
                lastNonEmptySetor = i + 1; // salva o último (maior índice + 1)
            }
            totalSetoresNaoVazios++;
        }
    }

    setores.forEach(({
            resultado,
            cor,
            setorNumero,
            etapas
        }) => {
        if (!resultado || !cor)
            return;

        switch (cor) {
        case '#5BA8B2': // Azul
            final += resultado;
            etapas[setorNumero].push(` = ${formataValorDecimal(final)}`);
            break;
        case '#EAD788': // Amarelo
            final -= resultado;
            etapas[setorNumero].push(` = ${formataValorDecimal(final)}`);
            break;
        case '#E77AB4': // Rosa
            final *= resultado;
            etapas[setorNumero].push(` = ${formataValorDecimal(final)}`);
            break;
        case '#6542D0': // Roxo
            final /= resultado;
            etapas[setorNumero].push(` = ${formataValorDecimal(final)}`);
            break;
        }

        final = aplicaBull(final, cor, setorNumero, etapas);
        writeDetailModal(setorNumero, etapas, modalBodyContent, lastNonEmptySetor, totalSetoresNaoVazios);
    });

    document.getElementById('resultado').innerHTML = `Result: ${final}`;
}

function criaSetor(r1, r2, ang1, ang2, cor, valor, setorNumero) {
    const x1 = 250 + r1 * Math.cos(ang1);
    const y1 = 250 + r1 * Math.sin(ang1);
    const x2 = 250 + r2 * Math.cos(ang1);
    const y2 = 250 + r2 * Math.sin(ang1);
    const x3 = 250 + r2 * Math.cos(ang2);
    const y3 = 250 + r2 * Math.sin(ang2);
    const x4 = 250 + r1 * Math.cos(ang2);
    const y4 = 250 + r1 * Math.sin(ang2);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const d = `
      M ${x1} ${y1}
      L ${x2} ${y2}
      A ${r2} ${r2} 0 0 1 ${x3} ${y3}
      L ${x4} ${y4}
      A ${r1} ${r1} 0 0 0 ${x1} ${y1}
      Z
    `;
    path.setAttribute("d", d.trim());
    path.setAttribute("fill", cor);
    path.setAttribute("class", "setor");
	path.setAttribute("stroke", "black");
    path.setAttribute("stroke-width", "1");
    path.setAttribute("data-setor", setorNumero);
    path.setAttribute("data-valor", valor);
    grupoSetores.appendChild(path);
}

function criaSetorUmTerco(r1, r2, ang1Original, ang2Original, cor, valor, setorNumero) {
    // Ângulo original do setor
    const angTotal = ang2Original - ang1Original;

    // Ângulo de 1/3 do setor
    const angUmTerco = angTotal / 3;

    // Novo ângulo inicial e final centralizado no setor original
    const ang1 = ang1Original + angUmTerco;
    const ang2 = ang2Original - angUmTerco;

    // Calcula os pontos da forma
    const x1 = 250 + r1 * Math.cos(ang1);
    const y1 = 250 + r1 * Math.sin(ang1);
    const x2 = 250 + r2 * Math.cos(ang1);
    const y2 = 250 + r2 * Math.sin(ang1);
    const x3 = 250 + r2 * Math.cos(ang2);
    const y3 = 250 + r2 * Math.sin(ang2);
    const x4 = 250 + r1 * Math.cos(ang2);
    const y4 = 250 + r1 * Math.sin(ang2);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const d = `
      M ${x1} ${y1}
      L ${x2} ${y2}
      A ${r2} ${r2} 0 0 1 ${x3} ${y3}
      L ${x4} ${y4}
      A ${r1} ${r1} 0 0 0 ${x1} ${y1}
      Z
    `;
    path.setAttribute("d", d.trim());
    path.setAttribute("fill", cor);
    path.setAttribute("pointer-events", "none");
    path.setAttribute("class", "onethird");
    path.setAttribute("data-setor", setorNumero);
    path.setAttribute("data-valor-original", valor);
    path.setAttribute("data-valor", valor / 3);
    return path;
}

function howToUseModal() {
    const myModalEl = document.getElementById('howtouseModal');
    const modal = new bootstrap.Modal(myModalEl);
    modal.show();
}

function detailedSolutionModal() {
    const myModalEl = document.getElementById('detailedSolutionModal');
    const modal = new bootstrap.Modal(myModalEl);
    modal.show();
}

function selecionaSetor(valor, setor){
	return grupoSetores.querySelectorAll(`.setor[data-valor="${valor}"][data-setor="${setor}"]`);
}

function selecionaSetorUmTerco(valor, setor, qtd){	
	return insereSetorUmTerco(qtd, valor, setor);
}

function example4() {
	cliqueSetor(selecionaSetor(3,1),1);
	cliqueSetor(selecionaSetorUmTerco(3,3),2);
	cliqueSetor(selecionaSetor(6,3),3);
	cliqueSetor(selecionaSetorUmTerco(6,3),3);
	cliqueBull(3);
	cliqueInnerBull("diamond");
}

function cliqueSetor(setores, qtd){
	setores.forEach(setor => {
        for (let i = 0; i < qtd; i++) {
            setor.dispatchEvent(new Event('click'));
        }
    });
}

function cliqueBull(qtd){
	const bull = document.getElementById('bull');
	bull.dispatchEvent(new Event('click'));
	for (let i = 1; i < qtd; i++) {
		bull.dispatchEvent(new Event('click'));
	}
}

function cliqueInnerBull(type){
	if (type === "square") {
		bullSquare.setAttribute("opacity", "1");
	} else if (type === "diamond") {
		bullDiamond.setAttribute("opacity", "1");
	} else if (type === "wave1") {
		bullWave1.setAttribute("opacity", "1");
	} else if (type === "wave2") {
		bullWave2.setAttribute("opacity", "1");
	} else if (type === "wave3") {
		bullWave3.setAttribute("opacity", "1");
	}
}


let exemploAtual = 1;

function randomExample() {
	clearPuzzle();

	const nomeDaFuncao = `example${exemploAtual}`;
	if (typeof window[nomeDaFuncao] === "function") {
		window[nomeDaFuncao]();
	} else {
		console.warn(`Função ${nomeDaFuncao} não existe.`);
	}

	exemploAtual++;
	if (exemploAtual > 10) exemploAtual = 1; // Volta para o 1 depois do 10
}

function example1() {
	clearPuzzle();
	cliqueSetor(selecionaSetor(20,1),1);
	cliqueSetor(selecionaSetor(10,1),1);
	cliqueSetor(selecionaSetor(2,2),3);
	cliqueSetor(selecionaSetor(3,3),3);
	cliqueSetor(selecionaSetor(10,4),4);
	cliqueSetor(selecionaSetor(15,4),4);
	cliqueBull(3);
	cliqueInnerBull("wave3");
}

function example2() {
	cliqueSetor(selecionaSetor(18,1),1);
	cliqueSetor(selecionaSetor(8,2),2);
	cliqueSetor(selecionaSetor(4,3),3);
	cliqueSetor(selecionaSetor(20,4),4);
}

function example3() {
	cliqueSetor(selecionaSetor(20,1),1);
	cliqueSetor(selecionaSetor(1,2),2);
	cliqueSetor(selecionaSetor(13,2),2);
	cliqueSetor(selecionaSetor(1,3),3);
	cliqueSetor(selecionaSetor(12,4),4);
	cliqueBull(3);
	cliqueInnerBull("square");
}

function example4() {	
	cliqueSetor(selecionaSetor(3,1),1);
	selecionaSetorUmTerco(3, 2, 6);
	cliqueSetor(selecionaSetor(6,3),3);
	selecionaSetorUmTerco(6, 4, 6);
	cliqueBull(3);
	cliqueInnerBull("diamond");
}

function example5() {
	cliqueSetor(selecionaSetor(13,1),1);
	cliqueSetor(selecionaSetor(1,2),1);
	cliqueSetor(selecionaSetor(20,3),2);
	cliqueBull(1);
	cliqueInnerBull("diamond");
}

function example6() {
	cliqueSetor(selecionaSetor(11,1),1);
	cliqueSetor(selecionaSetor(5,2),2);
	cliqueSetor(selecionaSetor(1,2),2);
	cliqueSetor(selecionaSetor(2,2),2);
	cliqueSetor(selecionaSetor(9,3),4);
	cliqueSetor(selecionaSetor(11,4),1);
	cliqueBull(2);
	cliqueInnerBull("square");
}

function example7() {
	selecionaSetorUmTerco(10, 1, 5);
	selecionaSetorUmTerco(6, 2, 5);
	selecionaSetorUmTerco(1, 2, 5);
	cliqueBull(1);
	cliqueInnerBull("wave1");
}

function example8() {
	selecionaSetorUmTerco(3, 1, 5);
	selecionaSetorUmTerco(3, 2, 5);
	selecionaSetorUmTerco(3, 3, 5);
	selecionaSetorUmTerco(15, 4, 6);
	cliqueBull(1);
	cliqueInnerBull("square");
}

function example9() {
	cliqueSetor(selecionaSetor(13,1),1);
	cliqueSetor(selecionaSetor(3,2),2);
	cliqueSetor(selecionaSetor(5,3),3);
	cliqueSetor(selecionaSetor(10,4),4);
}

function example10() {
	cliqueSetor(selecionaSetor(9,1),1);
	cliqueSetor(selecionaSetor(5,2),3);
	cliqueSetor(selecionaSetor(3,3),2);
	cliqueSetor(selecionaSetor(3,4),4);
	cliqueBull(3);
	cliqueInnerBull("diamond");
}
