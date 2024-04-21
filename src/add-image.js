import imge from './imge.jpg';
import alt from './alt.txt';
import './image-layout.scss'
function addImage(){
    const img = document.createElement('img');
    img.alt=alt;
    img.classList.add('image-layout');
    img.src=imge;
    const body = document.querySelector('body');
    body.appendChild(img);
}
export default addImage;