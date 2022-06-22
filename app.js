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
function createProduct(name, filePath){
    // Name of the product
    // File path of image
    // Times the image has been shown
    this.timesShown = 0;
    this.timesClicked = 0;
    this.name = name;
    this.filePath = filePath;
    allProducts.push(this);
}

// Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.
function generateUnique(){
    //gives me a whole number
    let randomPic = Math.floor(Math.random() * productNames.length);
    return randomPic;
}

//get elements from html
const imageContainer = document.getElementById('image-container');
const resultsContainer = document.getElementById('results');
let img_one = document.querySelector('#image-container img:first-child');
let img_two = document.querySelector('#image-container img:nth-child(2)');
let resultsButton = document.getElementById('results-button');

//instance variables --> Objects

//we gotta instantiate our objects
let bag = new createProduct('bag', './assets/bag.jpg');
// //this would be how to get it out of the array, utilitzing bracket notation and concatenation
// let bag0 = new createProduct(productNames[0], './assets' + productNames[0] + '.jpg');
let banana = new createProduct('banana', './assets/banana.jpg');
//create function that adds src and alt attributes to image
function constructImages(){


    //add src attribute to the images
    img_one.setAttribute('src', bag.filePath);
    img_one.setAttribute('alt', bag.name);
    img_two.setAttribute('src', banana.filePath);
    img_two.setAttribute('alt', banana.name);

    img_one.addEventListener('click', function(){
        trackClicks(bag);
    });
    img_two.addEventListener('click', function(){
        trackClicks(banana);
    });
}

//add event listeners 
resultsButton.addEventListener('click', showResults);

//make function to display random images
function displayRandomImage(){
    //this function needs to call the randomizer algorithm
}


//make a function to keep track of the times a certain object was clicked 
//this needs to apply to every object
//25 total clicks, not 25 clicks on each pic
function trackClicks(product){
    //need to pass an object to this function
    //if the object is clicked --->
    if(product.timesClicked < 25){
    //THEN increase the value of timesClicked by one per click
    product.timesClicked++;
    totalClicks ++
    console.log(product.timesClicked);
    }else{
        alert('too many clicks!');
    }
}

//use a loop to check all the product names in the array so i don't have to keep writing this stuff out
function trackTimesShown(product){
    //we need to pass an object to this function
    //check if the image is here
    //IF the image is shown on the document -->
    //THEN increase the value of timeShown by one
    if(product.name === img_one.alt){
        console.log(product.name + ' is on the page');
        product.timesShown++;
        totalClicks++
        console.log(product.timesShown);
    }
    else if(product.name === img_two.alt){
        console.log(product.name + ' is on the page');
        product.timesShown++;
        console.log(product.timesShown); 
    }
    else{
        console.log('there is no image here');
    }
    //ALT attribute lets the page know there's an image there if the path is broken
}



//make a function that displays the results on the results div
//should be displayed in ul
function displayResults(productsArray){
//grab results div

    for(let i=0; i < productsArray.length; i++){
        let product = productsArray[i];
        // console.log(product);
        let resultMessage = 
    `This product was clicked ${product.timesClicked} times.
This product was shown ${product.timesShown} times.
This product is called ${product.name}.
You can find this product at : ${product.filePath}`;
        let resultsP = document.createElement('p');
        resultsContainer.append(resultsP);
        resultsP.textContent = resultMessage;
    }
}

function showResults(){
    if(totalClicks === maxClicks){
        displayResults(allProducts);
    }
}

constructImages();
// trackTimesShown(bag);
// // trackTimesShown(banana);
// displayResults(allProducts);