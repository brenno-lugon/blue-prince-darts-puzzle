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

    const cor1 = i % 2 === 0 ? "#333" : "#ccc"; // simples
    const cor2 = i % 2 === 0 ? "#666" : "#aaa"; // triplo/duplo

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
bull.setAttribute("fill", "#bbb");
bull.setAttribute("id", "bull"); // Dê um ID exclusivo
bull.setAttribute("data-click", "0");
bull.setAttribute("data-original", "#bbb");
bull.setAttribute("class", "setor");

// bull interno
const innerBull = document.createElementNS("http://www.w3.org/2000/svg", "circle");
innerBull.setAttribute("cx", 250);
innerBull.setAttribute("cy", 250);
innerBull.setAttribute("r", RAIO_BULL);
innerBull.setAttribute("fill", "#666");
innerBull.setAttribute("id", "bull"); // Dê um ID exclusivo
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

function processaCliqueSetor(setor) {
    let clickCount = parseInt(setor.getAttribute('data-click'));
    clickCount = (clickCount + 1) % 5;
    setor.setAttribute('data-click', clickCount);

    if (clickCount === 0) {
        setor.setAttribute('fill', setor.getAttribute('data-original'));
    } else {
        setor.setAttribute('fill', cicloCores[clickCount - 1]);
    }

    resultadoDiv.textContent = ""; // limpa resultado após clique
}

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

// Botão de limpar
btnLimpar.addEventListener('click', () => {
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

    resultadoDiv.textContent = '';
});

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
            etapas[setorNumero].push(` -> ${resultado} (round to the nearest 1)`);
            resultado = arredondarParaUnidadeMaisProxima(resultado);
        } else if (bullWave2 && bullWave2.getAttribute('opacity') === '1') {
            etapas[setorNumero].push(` -> ${resultado} (round to the nearest 10)`);
            resultado = arredondarParaDezenaMaisProxima(resultado);
        } else if (bullWave3 && bullWave3.getAttribute('opacity') === '1') {
            etapas[setorNumero].push(` -> ${resultado} (round to the nearest 100)`);
            resultado = arredondarParaCentenaMaisProxima(resultado);
        }
        etapas[setorNumero].push(` = ${resultado}`);
    }
    return resultado;
}

function writeDetailModal(setorNumero, etapas, modalBodyContent, lastNonEmptySetor) {

    const sectorLabels = ['1st', '2nd', '3rd', '4th'];

    sectorLabels.forEach((label, index) => {
        const sectorIndex = index + 1;
        if (etapas[sectorIndex]) {
            modalBodyContent.innerHTML += `<strong>${label} sector:</strong> `;

            if (sectorIndex !== 1) {
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

function calcularSetorPorNumero(setorNumero) {
    let soma = 0;
    let subtracao = 0;
    let multiplicacao = 1;
    let divisao = 1;
    let resultado = 0;
    let etapas = [];
    etapas[setorNumero] = [];

    const setores = Array.from(document.querySelectorAll(`.setor[data-setor="${setorNumero}"]`));
    let corDoSetor = null;

    setores.forEach(setor => {
        const cor = setor.getAttribute('fill');
        const valor = parseFloat(setor.getAttribute('data-valor'));
        if (isNaN(valor))
            return;

        switch (cor) {
        case '#5BA8B2': // Azul (soma)
            soma += valor;
            etapas[setorNumero].push(` + ${valor}`);
            corDoSetor = cor;
            break;
        case '#EAD788': // Amarelo (subtração)
            subtracao += valor;
            etapas[setorNumero].push(` - ${valor}`);
            corDoSetor = cor;
            break;
        case '#E77AB4': // Rosa (multiplicação)
            multiplicacao *= valor;
            etapas[setorNumero].push(` x ${valor}`);
            corDoSetor = cor;
            break;
        case '#6542D0': // Roxo (divisão)
            divisao *= valor;
            etapas[setorNumero].push(` ÷ ${valor}`);
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

btnCalcular.addEventListener('click', () => {
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

    let lastNonEmptySetor = -1;

    for (let i = setores.length - 1; i >= 0; i--) {
        if (setores[i].cor != null) {
            lastNonEmptySetor = i + 1;
            break;
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
            etapas[setorNumero].push(` = ${final}`);
            break;
        case '#EAD788': // Amarelo
            final -= resultado;
            etapas[setorNumero].push(` = ${final}`);
            break;
        case '#E77AB4': // Rosa
            final *= resultado;
            etapas[setorNumero].push(` = ${final}`);
            break;
        case '#6542D0': // Roxo
            final /= resultado;
            etapas[setorNumero].push(` = ${final}`);
            break;
        }

        final = aplicaBull(final, cor, setorNumero, etapas);
        writeDetailModal(setorNumero, etapas, modalBodyContent, lastNonEmptySetor);

        //console.log(`Cálculo do Setor ${setorNumero}:`);
        //etapas[setorNumero].forEach(etapa => {
        //	console.log(etapa);
        //});
    });

    document.getElementById('resultado').innerHTML = `Result: ${final}`;
});

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
    path.setAttribute("data-setor", setorNumero);
    path.setAttribute("data-valor", valor);
    grupoSetores.appendChild(path);
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
