import './hello-world-button.css'

class HelloWorldButton{
    helloWorldButtonClass='hello-world-button';
    render(){
        const button = document.createElement('button');
        button.innerHTML = 'Hello World';
        button.classList.add(this.helloWorldButtonClass);
        const body = document.querySelector('body');
        button.onclick= function(){
            const p = document.createElement('p');
            p.innerHTML = 'Hello World';
            p.classList.add('hello-world-text');
            body.appendChild(p);
        }
        body.appendChild(button);
    }
}

export default HelloWorldButton;