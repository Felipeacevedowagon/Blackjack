
(() => {
  'use strict'

  // this function creat a new deck
  let deck = [];
  const tipos = ['C','D','H','S'],
        especiales = ['A','J','Q','K'];

  let puntosJugador = 0,
      puntosComputadora = 0;
  // Referencias del HTML
  const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

  const divCartasJugador = document.querySelector('#jugador-cartas'),
        divCartasComputadora = document.querySelector('#computadora-cartas'),
        puntosHtml = document.querySelectorAll('small');

  const createDeck = () => {
    deck =[];
    for( let i = 2; i <= 10; i++ ){
      for(let tipo of tipos ){
        deck.push(i + tipo);
      }
    }
  // El método push() añade uno o más elementos al final de un array y devuelve la nueva longitud del array.
    for (let tipo of tipos ){
      for (let esp of especiales) {
        deck.push( esp + tipo);
      }
    }
    // console.log(deck);
    deck = _.shuffle(deck);
    return deck;
  }

  createDeck();

  // esta funcion me permite tomar 1 carta
  const pedirCarta = () => {

    if ( deck.length === 0 ) {
      throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    // console.log(carta); carta debe de ser de la baraja

    return carta
  }

  // pedirCarta();
  const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor ) ) ?
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;

    // let puntos = 0
    // if (isNaN( valor ) ) {

    //   puntos = ( valor === 'A ') ? 11 : 10;

    // } else {
    //   puntos = valor * 1;
    // }

    // console.log(puntos);
  }

    // turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {

      do {
      const carta = pedirCarta ();
      puntosComputadora = puntosComputadora + valorCarta(carta);
      puntosHtml[1].innerText = puntosComputadora;

      // <img class="carta" src="assets/cartas/10D.png" alt="">

      const imgCarta = document.createElement('img');
      imgCarta.src = `assets/cartas/${ carta }.png`;
      imgCarta.classList.add('carta');
      divCartasComputadora.append( imgCarta );

        if ( puntosMinimos > 21 ){
          break;
        }

      } while (( puntosComputadora < puntosMinimos ) && (puntosMinimos <= 21));

      setTimeout(() => {

        if ( puntosComputadora === puntosMinimos) {
          alert( 'Nadie gana :(');
        } else if (puntosMinimos > 21 ) {
          alert( 'Computer Win' )
        } else if( puntosComputadora > 21 ){
          alert('Jugador Gana');
        } else {
          alert('Computadora Gana');
        }
      }, 10 );
    }
  // Eventos
  btnPedir.addEventListener('click',() => {

    const carta = pedirCarta ();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHtml[0].innerText = puntosJugador;

    // <img class="carta" src="assets/cartas/10D.png" alt="">

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if (puntosJugador > 21) {
      console.warn('Lo siento mucho, perdiste');
      btnPedir.disabled = true
      btnDetener.disabled = true;
      turnoComputadora( puntosJugador );

    } else if (puntosJugador === 21) {
      console.warn('21, genial!');
      btnPedir.disabled = true;
      btnDetener.disabled = true;

      turnoComputadora( puntosJugador );

    }

  });


  btnDetener.addEventListener( 'click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora( puntosJugador);

  });

  btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = createDeck();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHtml[0].innerText = 0;
    puntosHtml[1].innerText = 0;

    divCartasComputadora.innerText = '';
    divCartasJugador.innerText = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
  });


})();
