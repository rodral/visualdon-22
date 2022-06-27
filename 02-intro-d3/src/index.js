import * as d3 from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!

d3.select("body").append("div").attr("class", "monSVG");

const WIDTH = 600
const HEIGHT = 400

//Create svg
const monSVG = d3.select(".monSVG")
    .append("svg")
    .attr("width", WIDTH)
    .attr("height", HEIGHT)

//Create groups
const group1 = monSVG.append('g')
const group2 = monSVG.append('g')
const group3 = monSVG.append('g')

//First circle
group1
    .append("circle")
    .attr("cx", "50")
    .attr("cy", "50")
    .attr("r", "40")
    .attr('id', 'firstCircle')

group1
    .append("text")
    .text("1")
    .attr("x", "40")
    .attr("y", "120")

//Second circle
group2
    .append("circle")
    .attr("cx", "150")
    .attr("cy", "150")
    .attr("r", "40")
    .attr('id', 'secondCircle')

group2
    .append("text")
    .text("2")
    .attr("x", "150")
    .attr("y", "210")

//Third circle
group3
    .append("circle")
    .attr("cx", "250")
    .attr("cy", "250")
    .attr("r", "40")
    .attr('id', 'thirdCircle')

group3
    .append("text")
    .text("3")
    .attr("x", "250")
    .attr("y", "310")
    .attr("color", "red")



//Change the color of the second circle
const circle2 = d3.select("#secondCircle").style("fill", "red");
circle2.attr("cx", "200");
circle2.attr("cy", "200");

//Move all circles on click circle3
const circle3 = d3.select("#thirdCircle");
circle3.on("click", function () {
    group1.attr("transform", "translate(100,100)");
    group2.attr("transform", "translate(100,100)");
    group3.attr("transform", "translate(100,100)");
});



//Barchart
const data = [20, 5, 25, 8, 15];

const container = d3.select("body").append("div").attr("id", "barChart");
const barchart = container.append('svg')
    .attr("width", WIDTH)
    .attr("height", HEIGHT)

const MARGIN = 5
const BAR_WIDTH = WIDTH / data.length

const heightScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, HEIGHT])

// Color scale
const fillScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range(['white', 'seagreen'])

barchart.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * BAR_WIDTH) // horizontal position of the bar
    .attr("y", (d, i) => HEIGHT - heightScale(d)) // vertical position of the bar
    .attr("width", BAR_WIDTH - MARGIN) // width of the bar
    .attr("height", heightScale) // height of the bar
    .attr("fill", fillScale) // color of the bar

svg.selectAll("text") //doesn't show the text
    .data(data)
    .enter()
    .append("text")
    .attr("x", (d, i) => i * BAR_WIDTH + BAR_WIDTH / 2)
    .attr("y", (d, i) => HEIGHT - heightScale(d))
    .attr("text-anchor", "middle")
    .text(d => data)

/*

  const WIDTH = width
  const HEIGHT = width / 3
  const container = DOM.svg(WIDTH, HEIGHT)
  
  const DATA = [4, 60, 2, 8, 1]
  
  const MARGIN = 5 // espace entre les bâtons
  const BAR_WIDTH = WIDTH / DATA.length // largeur des bâtons
  
  const svg = d3.select(container)

*/


/* const div = d3.select(".mon-svg")
    .append("svg")
    .attr("class", "svgCircle") // ajouter attribut avec valeur de class = ""
    .attr("width", WIDTH)       // children[0]
    .attr("height", HEIGHT)
    .append("circle")
    .attr("cx", "50")
    .attr("cy", "50")
    .attr("r", "40px")
    .attr("id", "circle1")

d3.select(".svgCircle")
    .append("circle")
    .attr("cx", "150")
    .attr("cy", "150")
    .attr("r", "40px")
    .attr('fill', 'dodgerblue')
    .attr("id", "circle2")

d3.select(".svgCircle")
    .append("circle")
    .attr("cx", "250")
    .attr("cy", "250")
    .attr("r", "40px")
    .attr("id", "circle3")

// Attributs (move circles)

d3.select("#circle1")
    .attr("cx", 100);

d3.select("#circle2")
    .attr("cx", 200);

// Append

d3.select("svg") // text
    .append("text")
    .attr("x", "50")
    .attr("y", "105")
    .text("Première texte de Alan");

d3.select("svg") // text
    .append("text")
    .attr("x", "150")
    .attr("y", "205")
    .text("Deuxième texte");

d3.select("svg") // text
    .append("text")
    .attr("x", "250")
    .attr("y", "305")
    .text("Troisième texte (click circle)");

// Événements

svg.select("#circle3").on("click", function () {
    svg.selectAll("circle")
        .attr("cx", 300);
}) */



/* // Rectangles

// Data:
let data = [20, 5, 25, 8, 15];

// Creation du SVG 
let svgRect = d3.select("#bar-chart")
    .append("svg")

let bars = svgRect.append('g')
    .attr('class', 'bars');

// Utilisation de la methode data() et création de barres
bars.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * 23) // i * 23 distance entre les barres
    .attr('y', (d) => 100 - d) // -d pour alignement en bas
    .attr('width', 20)
    .attr('height', (d) => d); */