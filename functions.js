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

// Triângulo SVG (ponta pra cima)
const bullTriangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
bullTriangle.setAttribute("points", `
  ${250},${250 - 12}
  ${250 - 12},${250 + 12}
  ${250 + 12},${250 + 12}
`);
bullTriangle.setAttribute("fill", "none");
bullTriangle.setAttribute("stroke", "black");
bullTriangle.setAttribute("stroke-width", "2");
bullTriangle.setAttribute("opacity", "0");
bullTriangle.setAttribute("transform", `rotate(-9 250 250)`);
bullTriangle.setAttribute("pointer-events", "none");

grupoSetores.appendChild(bullSquare);
grupoSetores.appendChild(bullDiamond);
grupoSetores.appendChild(bullTriangle);

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
        formaIndex = (formaIndex + 1) % 4;

        // Zera tudo primeiro
        bullSquare.setAttribute("opacity", "0");
        bullDiamond.setAttribute("opacity", "0");
        bullTriangle.setAttribute("opacity", "0");

        if (formaIndex === 1) {
            bullSquare.setAttribute("opacity", "1");
        } else if (formaIndex === 2) {
            bullDiamond.setAttribute("opacity", "1");
        } else if (formaIndex === 3) {
            bullTriangle.setAttribute("opacity", "1");
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
    // Zera bull
    bullSquare.setAttribute("opacity", "0");
    bullDiamond.setAttribute("opacity", "0");
    bullTriangle.setAttribute("opacity", "0");

    resultadoDiv.textContent = '';
});

function aplicaBull(resultado, corDoSetor) {
    const bull = document.getElementById('bull');
    const corDoBull = bull.getAttribute('fill');

    if (corDoBull === corDoSetor) {
        if (bullSquare && bullSquare.getAttribute('opacity') === '1') {
            resultado = resultado ** 2;
        } else if (bullDiamond && bullDiamond.getAttribute('opacity') === '1') {
            const invertido = parseFloat(resultado.toString().split('').reverse().join(''));
            resultado = invertido;
        }
    }
    return resultado;
}

function calcularSetorPorNumero(setorNumero) {
    let soma = 0;
    let subtracao = 0;
    let multiplicacao = 1;
    let divisao = 1;
    let resultado = 0;
    let numerosAzuis = [];
    let numerosAmarelos = [];
    let numerosRosas = [];
    let numerosRoxos = [];

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
            numerosAzuis.push(valor);
            corDoSetor = cor;
            break;
        case '#EAD788': // Amarelo (subtração)
            subtracao += valor;
            numerosAmarelos.push(valor);
            corDoSetor = cor;
            break;
        case '#E77AB4': // Rosa (multiplicação)
            multiplicacao *= valor;
            numerosRosas.push(valor);
            corDoSetor = cor;
            break;
        case '#6542D0': // Roxo (divisão)
            divisao *= valor;
            numerosRoxos.push(valor);
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

    // Exibição por setor
    // const divResultado = document.getElementById('resultado' + setorNumero);
    // divResultado.innerHTML = `Setor ${setorNumero}: ${resultado}`;

    return {
        resultado,
        cor: corDoSetor
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

    setores.forEach(({
            resultado,
            cor
        }) => {
        if (!resultado || !cor)
            return;

        switch (cor) {
        case '#5BA8B2': // Azul
            final += resultado;
            break;
        case '#EAD788': // Amarelo
            final -= resultado;
            break;
        case '#E77AB4': // Rosa
            final *= resultado;
            break;
        case '#6542D0': // Roxo
            final /= resultado;
            break;
        }

        final = aplicaBull(final, cor);

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
