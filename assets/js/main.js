const miModulo = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          letras = ['A', 'J', 'Q', 'K'];

    let ptosJugadores = [];

    //referencias HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const ptosSmall = document.querySelectorAll('small'),
        divCartasJugadores = document.querySelectorAll('.divCartas');
        


    //func de inicializacion
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        ptosJugadores = [];

        for (let i = 0; i < numJugadores; i++){
            ptosJugadores.push(0);
        }
       
        ptosSmall.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    
    //creandoMAZO
    const crearDeck = ()=> {

        deck = [];
        for(let i = 2; i <=10; i++){
            for( let tipo of tipos){
                deck.push(i + tipo)
            }
        }
        
        for(let tipo of tipos){
            for( let letra of letras){
                deck.push(letra + tipo)
            }
        }  
        return _.shuffle(deck);   
    }

    inicializarJuego();

    const pedirCarta = () =>{
        if( deck.length === 0){
            throw 'No hay cartas en el mazo... ';
        } 
        return deck.pop();
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ? 
            (valor === 'A') ? 11 : 10
            : valor * 1;  
    };

    const acumularPtos = (carta, turno) =>{
        ptosJugadores[turno] += valorCarta(carta);
        ptosSmall[turno].innerText = ptosJugadores[turno];
        return ptosJugadores[turno];

    }

    const crearCarta = (carta, turno)=> {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );
        
    }


    const determinarGanador = () => {
        const [ptosMin, ptosComputadora] = ptosJugadores;

        setTimeout(() =>{
            if (ptosComputadora === ptosMin) {
                alert('Nadie Gana');        
            }else if (ptosMin > 21 ){
                alert('Perdiste! Computadora Gana')
            } else if (ptosComputadora > 21){
                alert('21 BlackJack! GANASTE!')
            } else{
                alert('Computadora GANA!')
            }
        }, 100 );
    }

    // turno computadora
    const turnoComputadora = (ptosMin)=> {

        let ptosComputadora = 0;
        do {
            const carta = pedirCarta();
            ptosComputadora = acumularPtos(carta, ptosJugadores.length -1 );
            crearCarta(carta, ptosJugadores.length -1 );

        } while ((ptosComputadora < ptosMin) && (ptosMin <= 21));

        determinarGanador();

    }


    // turno jugador
    btnPedir.addEventListener('click', () =>{

        const carta = pedirCarta();
        const ptosJugador = acumularPtos(carta, 0);

        crearCarta(carta, 0 );
        
        if(ptosJugador > 21){
            console.warn('PERDISTE ! ');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(ptosJugador);

        }else if (ptosJugador === 21){
            console.warn('21, Blackjack!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(ptosJugador);
        }

    });


    btnDetener.addEventListener('click', ()=>{
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(ptosJugadores[0]);
    });

    /* MI CODIGO */

    // btnNuevo.addEventListener('click', () =>{
    //     location.reload()
    // }); 


    /* codigo del curso */
 
    return{
        nuevoJuego: inicializarJuego,
    };

})();




