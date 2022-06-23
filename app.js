'use strict';
//an algorithm is a step by step list of instructions to be executed 

//this array is gonna hold all our product objects
let allProducts = [];
//they can't click more than 25 times
let maxClicks = 25;
let totalClicks = 0;
//this array is gonna hold all our product names
let productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

// Create a constructor function that creates an object associated with each product, and has the following properties:
function Product(name, filePath){
    // Name of the product
    // File path of image
    // Times the image has been shown
    this.timesShown = 0;
    this.timesClicked = 0;
    this.name = name;
    this.filePath = filePath;
    allProducts.push(this);
}

//can i instantiate with a for loop?
function createNewProduct(){
    //for the length of the productNames array, loop through every value in it
    for(let i=0; i<productNames.length; i++){
        //if the array item we're on is sweep, cause its the only png image
        if(productNames[i] === 'sweep'){
            //make sure i make the image a png
            new Product(`${productNames[i]}`, `./assets/${productNames[i]}.png`);
        }else{
            //every other image, add the name and concatenate it with file path info
            new Product(`${productNames[i]}`, `./assets/${productNames[i]}.jpg`); 
        }
    }
}
createNewProduct();

//get elements from html
const imageContainer = document.getElementById('image-container');
const resultsContainer = document.getElementById('results');
let resultsButton = document.getElementById('results-button');

// Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.
function generateUnique(){
    //gives me a whole number
        //randomPic variable, array[randomNumberGenerated], like productNames[2]
        let randomPicA = allProducts[getRandomNumber()];
        let randomPicB = allProducts[getRandomNumber()];
        let randomPicC = allProducts[getRandomNumber()];
        //so we print 3 different objects
        // console.log(randomPic);
        return {randomPicA, randomPicB, randomPicC};      
}
let threeValues = generateUnique();

//gonna pass in randomPicture as parameter, which'll be the randomly generated object from the generateUnique function

//create these images in the global scope so i can change stuff about it
function constructImages2(a, b, c){
    //create new img tag for each pic i wanna display
    let imgOne = document.createElement('img');
    //once new img is created, set src and alt attribute to it
    imgOne.setAttribute('src', a.filePath);
    imgOne.setAttribute('alt', a.name);
    //add img to div
    imageContainer.append(imgOne);

    //repeat for b and c
    let imgTwo = document.createElement('img');
    imgTwo.setAttribute('src', b.filePath);
    imgTwo.setAttribute('alt', b.name);
    imageContainer.append(imgTwo);

    let imgThree = document.createElement('img');
    imgThree.setAttribute('src', c.filePath);
    imgThree.setAttribute('alt', c.name);
    imageContainer.append(imgThree);

    imgOne.addEventListener('click', function(){
        trackClicks(a);
        trackTimesShown(a);
    });
    imgTwo.addEventListener('click', function(){
        trackClicks(b);
        trackTimesShown(b);
    });
    imgThree.addEventListener('click', function(){
        trackClicks(c);
        trackTimesShown(c);
    });

    // if imgOne.alt === productNames
    for(let i=0; i<productNames.length; i++){
        if(imgOne.alt === productNames[i]){
            a.timesShown++;
        }
        if(imgTwo.alt === productNames[i]){
            b.timesShown++;
        }
        if(imgThree.alt === productNames[i]){
            c.timesShown++;
        }
    }
    //use a loop to check all the product names in the array so i don't have to keep writing this stuff out
    function trackTimesShown(product){
        //we need to pass an object to this function
        //check if the image is here
        //IF the image is shown on the document -->
        //THEN increase the value of timeShown by one
        if(product.name === imgOne.alt){
            // console.log(product.name + ' is on the page');
            product.timesShown++;
        }else if(product.name === imgTwo.alt){
            // console.log(product.name + ' is on the page');
            product.timesShown++;
        }else if(product.name === imgThree.alt){
            // console.log(product.name + ' is on the page');
            product.timesShown++;
        }
        // else{
        //     console.log('there is no image here');
        // }
        //ALT attribute lets the page know there's an image there if the path is broken
    }
}

function tooManyClicks(){
    totalClicks++;
    console.log(totalClicks);
    if(totalClicks === maxClicks){
        alert('too many clicks!');
    }
}

function getRandomNumber(){
    return Math.floor(Math.random() * productNames.length);
}

//add event listeners 
resultsButton.addEventListener('click', showResults);
imageContainer.addEventListener('click', tooManyClicks);

// //make function to display random images
// function displayRandomImage(){
//     //this function needs to call the randomizer algorithm
//     //when an image is clicked, the randomizer needs to be called to generate 3 different pictures
// }

//make a function to keep track of the times a certain object was clicked 
//this needs to apply to every object
//25 total clicks, not 25 clicks on each pic
function trackClicks(product){
    //need to pass an object to this function
    //if the object is clicked --->
    if(totalClicks < maxClicks){
    //THEN increase the value of timesClicked by one per click
    product.timesClicked++;
    }
}

//make a function that displays the results on the results div
//should be displayed in ul
function displayResults(productsArray){
//grab results div
    //for the length of the productsArray
    for(let i=0; i <productsArray.length; i++){
        //assign a variable to represent every individual item in the array
        let product = productsArray[i];
        //the results I want to put on the screen
        let resultMessage = `This product was clicked ${product.timesClicked} times. This product was shown ${product.timesShown} times.This product is called ${product.name}. You can find this product at : ${product.filePath}`;
        //create p element to print the results in on the page
        let resultsP = document.createElement('p');
        //add p element to results container div on html file
        resultsContainer.append(resultsP);
        //print the message inside the p every time there's a new item in that array
        resultsP.textContent = resultMessage;
    }
}

function showResults(){
    if(totalClicks === maxClicks){
        displayResults(allProducts);
    }
}

constructImages2(threeValues.randomPicA, threeValues.randomPicB, threeValues.randomPicC);
//   //start rendering that data into a chart
//   //pull in my canvas element from html
//   const canvas = document.getElementById('myCanvas');

//   //next we need to create a chart
//   const ctx = canvas.getContext('2d'); //getting object to draw 2d
//   canvas = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: allProducts, //this is how we're labelling our data, pass allProducts array to our label data
//         datasets: [{
//             label: 'Number of clicks', //labels (cardNames) have to be the same length as the data(allClicks)
//             data: allProducts.timesClicked,
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// })