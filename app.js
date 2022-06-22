'use strict';
//an algorithm is a step by step list of instructions to be executed 

//this array is gonna hold all our product objects
let allProducts = [];
//they can't click more than 25 times
let maxClicks = 25;
let totalClicks = 0;
//this array is gonna hold all our product names
let productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'petSweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'waterCan', 'wineGlass'];

//i feel like i'm gonna have to figure out how to make generateUnique not as convoluted as it is...


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

//get elements from html
const imageContainer = document.getElementById('image-container');
const resultsContainer = document.getElementById('results');
let resultsButton = document.getElementById('results-button');

//can i instantiate with a for loop?
for(let i=0; i<productNames.length; i++){
    
}



//we gotta instantiate our objects
let bag = new Product('bag', './assets/bag.jpg');
// //this would be how to get it out of the array, utilitzing bracket notation and concatenation
// let bag0 = new Product(productNames[0], './assets' + productNames[0] + '.jpg');
let banana = new Product('banana', './assets/banana.jpg');
let bathroom = new Product('bathroom', './assets/bathroom.jpg');
let boots = new Product('boots', './assets/boots.jpg');
let breakfast = new Product('breakfast', './assets/breakfast.jpg');
let bubblegum = new Product('bubblegum', './assets/bubblegum.jpg');
let chair = new Product('chair', './assets/chair.jpg');
let cthulhu = new Product('cthulhu', './assets/cthulhu.jpg');
let dogDuck = new Product('dog-duck', './assets/dog-duck.jpg');
let dragon = new Product('dragon', './assets/dragon.jpg');
let pen = new Product('pen', './assets/pen.jpg');
let petSweep = new Product('pet-sweep', './assets/pet-sweep.jpg');
let scissors = new Product('scissors', './assets/scissors.jpg');
let shark = new Product('shark', './assets/shark.jpg');
let sweep = new Product('sweep', './assets/sweep.png');
let tauntaun = new Product('tauntaun', './assets/tauntaun.jpg');
let unicorn = new Product('unicorn', './assets/unicorn.jpg');
let waterCan = new Product('water-can', './assets/water-can.jpg');
let wineGlass = new Product('wine-glass', './assets/wine-glass.jpg');

// Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.
function generateUnique(){
    //gives me a whole number
    // for(let i=0; i<3; i++){
        //randomPic variable, array[randomNumberGenerated], like productNames[2]
        let randomPicA = allProducts[Math.floor(Math.random() * productNames.length)];
        let randomPicB = allProducts[Math.floor(Math.random() * productNames.length)];
        let randomPicC = allProducts[Math.floor(Math.random() * productNames.length)];
        //so we print 3 different objects
        // console.log(randomPic);
        return {randomPicA, randomPicB, randomPicC};
    // }
}
let threeValues = generateUnique();

//gonna pass in randomPicture as parameter, which'll be the randomly generated object from the generateUnique function
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
        trackClicks(imgOne);
    });
    imgTwo.addEventListener('click', function(){
        trackClicks(imgTwo);
    });
    imgThree.addEventListener('click', function(){
        trackClicks(imgThree);
    });
}

//add event listeners 
resultsButton.addEventListener('click', showResults);

//make function to display random images
function displayRandomImage(){
    //this function needs to call the randomizer algorithm
    //when an image is clicked, the randomizer needs to be called to generate 3 different pictures

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
    if(product.name === imgOne.alt){
        console.log(product.name + ' is on the page');
        product.timesShown++;
        totalClicks++
        console.log(product.timesShown);
    }
    else if(product.name === imgTwo.alt){
        console.log(product.name + ' is on the page');
        product.timesShown++;
        console.log(product.timesShown); 
    }
    else if(product.name === imgThree.alt){
        console.log(product.name + 'is on the page');
        product.timesShown++;
        console.log(product.timesShown);
    }else{
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

constructImages2(threeValues.randomPicA, threeValues.randomPicB, threeValues.randomPicC);
// constructImages();
// trackTimesShown(bag);
// // trackTimesShown(banana);
// displayResults(allProducts);