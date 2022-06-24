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

//instantiate with a for loop
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
//all of the created products are objects stored in the allProducts array, i can access their properties through allProducts
createNewProduct();

//get elements from html
const imageContainer = document.getElementById('image-container');

const resultsContainer = document.getElementById('results');
let resultsButton = document.getElementById('results-button');
//grab 3 images from html
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
//make array to put three img into
let imgArray=[imgOne, imgTwo, imgThree];

//make a function to keep track of the times a certain object was clicked 
//this needs to apply to every object
//25 total clicks, not 25 clicks on each pic
// function trackClicks(product){
//     //need to pass an object to this function
//     //if the object is clicked --->
//     if(totalClicks < maxClicks){
//     //THEN increase the value of timesClicked by one per click
//     product.timesClicked++;
//     }
// }
    // //add event listener to the image being passed in so when it's clicked, it runs trackClicks function
    // //pass in the selectedImage, which is the actual product object
    // image.addEventListener('click', function(){
    //     selectedImage.timesClicked++;
    //     console.log(selectedImage.timesClicked);
    // });

// Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.
function generateRandomImage(image){
    //create function that uses the math random method to pick random image from allProducts array, so allProducts[i]
    //creates random number that's also length of productNames array
    let randoMath = Math.floor(Math.random() * allProducts.length);
    let selectedImage = allProducts[randoMath];//will return an object
    //set alt/src/add timesShown by 1
    image.src = selectedImage.filePath;
    image.alt = selectedImage.name;
    selectedImage.timesShown++;
}
//lil loop to put a random image in all 3 img when the page loads
function displayImage(){
    for(let i=0; i<imgArray.length; i++){
        generateRandomImage(imgArray[i]);
    }
}

//function to track total clicks on the browser, stop when the user gets 25 clicks
function tooManyClicks(){
    //add point to totalClicks counter whenever the image is clicked
    totalClicks++;
    if(totalClicks === maxClicks){
        alert('too many clicks!');
    }
}
//if the user clicks 25 times, then we can access the results
function showResults(){
    if(totalClicks === maxClicks){
        displayResults(allProducts);
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
displayImage();
//add event listeners 
//event listener on image container, when any image is clicked, generates new pics for all items in imgArray
imageContainer.addEventListener('click', function(){
    for(let i=0; i<imgArray.length; i++){
        generateRandomImage(imgArray[i]);
    };
    tooManyClicks();
});
resultsButton.addEventListener('click', showResults);







































// //function so i can display chart with rest of results
// function displayChart(){
//     //adding my chart
//     const ctx = document.getElementById('chart').getContext('2d');
//     new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: allProducts.name,
//             datasets: [{
//                 label: 'Times Clicked',
//                 data: allProducts.timesClicked,
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     // 'rgba(54, 162, 235, 0.2)',
//                     // 'rgba(255, 206, 86, 0.2)',
//                     // 'rgba(75, 192, 192, 0.2)',
//                     // 'rgba(153, 102, 255, 0.2)',
//                     // 'rgba(255, 159, 64, 0.2)'
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     // 'rgba(54, 162, 235, 1)',
//                     // 'rgba(255, 206, 86, 1)',
//                     // 'rgba(75, 192, 192, 1)',
//                     // 'rgba(153, 102, 255, 1)',
//                     // 'rgba(255, 159, 64, 1)'
//                 ],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });
// }