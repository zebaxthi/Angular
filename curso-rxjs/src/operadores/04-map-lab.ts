import { fromEvent } from "rxjs";
import { map, tap } from "rxjs/operators";



const texto = document.createElement('div');
texto.innerHTML = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet velit sit amet facilisis volutpat. Vivamus pharetra nibh sit amet ante mollis, ac aliquam tellus mattis. Fusce at ex non mauris vestibulum euismod non ultrices lorem. Morbi turpis urna, faucibus a nisl non, consectetur bibendum lectus. Sed in metus sit amet nunc tincidunt auctor eget ut mi. In mollis, nisl et viverra laoreet, arcu elit posuere elit, vitae volutpat ante augue et dui. Fusce nisl lacus, dignissim id molestie laoreet, tristique eu orci.
<br/><br/>
Quisque ac aliquam ipsum. Nulla in metus fermentum augue ultricies molestie. In eu erat dolor. Praesent maximus laoreet vehicula. Nunc ac aliquam quam. Suspendisse id iaculis erat. Proin a molestie nibh. Fusce ipsum nibh, commodo quis metus id, varius mattis enim.
<br/><br/>
Nam dictum, lacus a cursus maximus, odio mauris imperdiet dolor, vel pharetra lectus risus vel justo. Phasellus in pulvinar lacus. Duis dictum volutpat bibendum. Nunc in iaculis ligula. Duis elementum orci ac velit tincidunt, vel lobortis purus sodales. Suspendisse finibus tempus faucibus. Suspendisse vitae urna eget dolor vulputate eleifend. Phasellus rhoncus enim sed nibh egestas, at ultrices dolor pulvinar. Duis blandit nunc nisi, quis fringilla felis pellentesque vitae. Donec tempus molestie diam sed finibus. Donec iaculis consequat imperdiet.
<br/><br/>
Suspendisse eget eros gravida nulla convallis aliquam et vulputate justo. In scelerisque a elit quis bibendum. Donec imperdiet eleifend risus, vitae tempus ligula ultricies eget. Maecenas iaculis massa eu erat porttitor commodo. Mauris tincidunt sapien commodo enim suscipit posuere. Duis orci ex, mollis at magna nec, tempus sollicitudin nibh. Aenean sed lacinia libero, ut accumsan justo. Nullam porttitor, tortor et malesuada posuere, risus sem fermentum magna, in euismod nisi sapien vitae mi. Morbi a augue massa. Nulla scelerisque tempor neque vel ullamcorper.
<br/><br/>
Vestibulum at bibendum lectus, id ullamcorper tellus. Aenean imperdiet vitae urna in commodo. Sed at nisl ac ante gravida vulputate id ac nulla. Praesent porttitor est vel sagittis volutpat. Fusce augue velit, pellentesque quis dui sit amet, rhoncus pretium turpis. In ut placerat nulla, a viverra massa. Vestibulum tellus justo, porta sed sem ac, rutrum cursus metus. Suspendisse metus leo, laoreet in sapien ac, facilisis faucibus ligula. Cras ex massa, hendrerit nec tortor at, semper mollis nisl. Phasellus dignissim a risus non dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue quis ex sagittis gravida. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce congue nulla nibh, sit amet scelerisque nulla volutpat vitae.
`;

const body = document.querySelector('body');
body.append( texto );

const progressBar = document.createElement('div');
progressBar.setAttribute('class', 'progress-bar');
body.append(progressBar);

//funcion que haga el calculo 

const calcularPorcentajeScroll = ( event ) => {

    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = event.target.documentElement;

    return (scrollTop / (scrollHeight - clientHeight)) * 100

}

//Streams

const scroll$ = fromEvent(document, 'scroll');
//scroll$.subscribe(console.log);

const progress$ = scroll$.pipe(
    //map( event => calcularPorcentajeScroll(event) )
    map( calcularPorcentajeScroll ),
    tap( console.log )
);

progress$.subscribe( porcentaje => {

    progressBar.style.width = `${ porcentaje}%`;

});