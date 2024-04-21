import './heading.scss'

class Heading{
    render(){
        const p = document.createElement('p');
        p.innerHTML='This is new Page';
        p.classList.add('new-page-class');
        const body = document.querySelector('body');
        body.appendChild(p);
    }
}

export default Heading;