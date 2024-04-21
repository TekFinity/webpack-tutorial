import HelloWorldButton from './components/hello-world-button/hello-world-button.js';
import addImage from './add-image';

const helloWorldButton = new HelloWorldButton();


helloWorldButton.render();
helloWorldButton.render();
addImage();

// JavaScript Code (main.js)
function add(x) {
    return x + 10;
}
function subtract(x) {
    return x - 5;
}

 
// Using pipeline operator
 
// First 10 is passed as argument to subtract
// function then returned value is passed to
// add function then value we get is passed to
// subtract and then the value we get is again
// passed to add function
let val2 = 10 |> subtract |> add |> subtract |> add;
console.log(val2);