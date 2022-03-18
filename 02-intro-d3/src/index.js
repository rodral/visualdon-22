import * as d3 from 'd3';
import { svg } from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!

const WIDTH = 800
const HEIGHT = 400

// Manipuler les DOM

const div = d3.select(".mon-svg")
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
        .attr("cx", 250);
})



// Rectangles

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
    .attr('height', (d) => d);