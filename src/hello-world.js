import HelloWorldButton from './components/hello-world-button/hello-world-button.js';
import addImage from './add-image';
import _ from 'lodash';


const helloWorldButton = new HelloWorldButton();



helloWorldButton.render();
addImage();

// JavaScript Code (main.js)
function add(x) {
    return x + 10;
}
function subtract(x) {
    return x - 5;
}

 
console.log(_.upperFirst('Hello world using lodash'));

// Using pipeline operator
 
// First 10 is passed as argument to subtract
// function then returned value is passed to
// add function then value we get is passed to
// subtract and then the value we get is again
// passed to add function
let val2 = 10 |> subtract |> add |> subtract |> add;
console.log(val2);