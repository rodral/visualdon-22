import * as d3 from 'd3';

d3.select("body").append("div").attr("class", "monSVG");

const WIDTH = 500
const HEIGHT = 500

// Création SVG
const monSVG= d3.select(".monSVG")
    .append("svg")
    .attr("width", WIDTH)
    .attr("height", HEIGHT)

// Définition des groupes
const groupe1 = monSVG.append('g')
const groupe2 = monSVG.append('g')
const groupe3 = monSVG.append('g')

// Premier cercle
groupe1
    .append("circle")
    .attr("cx", "50")
    .attr("cy", "50")
    .attr("r", "40")
    .attr('id', 'firstCircle')

groupe1
    .append("text")
    .text("1")
    .attr("x", "40")
    .attr("y", "120")

groupe1
    .append("text")
    .text("1")
    .attr("x", "40")
    .attr("y", "120")

// Deuxième cercle
groupe2
    .append("circle")
    .attr("cx", "150")
    .attr("cy", "150")
    .attr("r", "40")
    .attr('id', 'secondCircle')

groupe2
    .append("text")
    .text("2")
    .attr("x", "150")
    .attr("y", "210")

// Troisième cercle
groupe3
    .append("circle")
    .attr("cx", "250")
    .attr("cy", "250")
    .attr("r", "40")
    .attr('id', 'thirdCircle')

groupe3
    .append("text")
    .text("3")
    .attr("x", "250")
    .attr("y", "310")


// Changer la couleur du deuxième cercle
const circle2 = d3.select('#secondCircle').attr("fill", "#E92528");
circle2.attr("cx", "100")
circle2.attr("cx", "200")


// Déplacer les cercles on click
const circle1 = d3.select('#firstCircle');
const circle3 = d3.select('#thirdCircle');

circle3.on("click", () => {
    circle1.attr("cx", "450")
    circle2.attr("cx", "450")
    circle3.attr("cx", "450")
})

// Barchart
const data = [20, 5, 25, 8, 15];

const container = d3.select("body").append("div").attr("id", "barChart");
const barchart = container.append('svg')
    .attr("width", WIDTH)
    .attr("height", HEIGHT)


barchart.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr('x', (d, i) => (i * 30))
    .attr('y', d => 500 - d)
    .attr('width', 20)
    .attr('height', d => d)
    .attr('stroke', 'black')
    .attr('fill', 'black')
