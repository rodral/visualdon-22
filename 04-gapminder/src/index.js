import * as d3 from 'd3'

// Pour importer les données

import income from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv'
import life from '../data/life_expectancy_years.csv'
import population from '../data/population_total.csv'

//import map from "../data/worldmap.json";

// 1 - GRAPHIQUE STATIQUE
 // Voir le contenu des tableaux csv
 console.log(income); // Tableau de 195 lignes, de 1800 à 2050 pour chaque pays
 console.log(life); // Tableau de 195 lignes, de 1800 à 2100 pour chaque pays
 console.log(population); // Tableau de 195 lignes, de 1800 à 2100 pour chaque pays 

// console.log(income[0]["2021"]);
// console.log(life[0]["2021"]);
// console.log(population[0]["2021"]);

// Marges du graphique
const margin = {top : 10, right: 40, bottom: 30, left: 40},
		   width = 1000 - margin.left - margin.right,
		   height = 1000 - margin.top - margin.bottom;

// Création d'un élément svg graphique avec ses marges dans le div #staticGraph
const svg = d3
    .select('#staticGraph')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Création d'un nouveau tableau pour regrouper les informations désirées des 3 tableaux csv ()
let datas = [];

income.map(e => {
    datas.push({
        pays: e.country,
        income: e["2021"],
        esperance_vie: d3
            .filter(life, (ev) => ev.country == e.country)
            .map((d) => d["2021"])[0],
        population: d3
            .filter(population, (p) => p.country == e.country)
            .map((d) => d["2021"])[0]
    });
});

// 2 axes ajoutés
const x = d3
    .scaleLinear()
    .domain([0, 100000])
    .range([0, width]);

svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

const y = d3
    .scaleLinear()
    .domain([40, 100])
    .range([height, 0])

svg.append('g')
    .call(d3.axisLeft(y));

// Ajout d'une grandeur aux ronds
const z = d3
    .scaleLinear()
    .domain([200000, 1310000000])
    .range([1, 40]);

// Ajout des points
svg
    .append("g")
    .selectAll("dot")
    .data(datas)
    .join("circle")
    .attr("cx", (d) => x(cleanData(d.income)))
    .attr("cy", (d) => y(cleanData(d.esperance_vie)))
    .attr("r", (d) => z(cleanData(d.population) * 5))
    .style("fill", "purple")
    .style("opacity", "0.7")
    .attr("stroke", "black");

// Nettoyer les donnés pour obtenir des chiffres (1000, 1000000, 1000000000) au lieu des charactères (K, M, B)
function cleanData(data) {

  if (isNaN(data)) {

    if (data.includes("k")) { // Passer de k à 1000
      const n = data.split("k")[0];
      return Number.parseFloat(n) * 1000;
    } 
    else if (data.includes("M")) { // Passer de M à 1000000
      const n = data.split("M")[0];
      return Number.parseFloat(n) * 1000000;
    }
    //   else if (data.includes("B")) { // Passer de B à 1000000000000
    //   const n = data.split("B")[0];
    //   return Number.parseFloat(n) * 1000000000;
    // }

  }

  return data;

}

// // Alternative à la fonction ci-dessus
// const popTransformed = population.map(d => {

//     // Trouver le format SI (M, B, k)
//     let SI = typeof d["2021"] === 'string' || d["2021"] instanceof String ? d["2021"].slice(-1) : d["2021"];

//     // Extraire la partie numérique
//     let number = typeof d["2021"] === 'string' || d["2021"] instanceof String ? parseFloat(d["2021"].slice(0,-1)) : d["2021"];
    
//     // Selon la valeur SI, multiplier par la puissance
//     switch (SI) {
//         case 'M': {
//             return { "country": d.country, "pop": Math.pow(10, 6) * number};
//             break;
//         }
//         case 'B': {
//             return { "country": d.country, "pop": Math.pow(10, 9) * number};
//             break;
//         }
//         case 'k': {
//             return { "country": d.country, "pop": Math.pow(10, 3) * number};
//             break;
//         }
//         default: {
//             return { "country": d.country, "pop": number};
//             break;
//         }
//     }
// })

// ********************************************************************************

/* // 2 - CARTOGRAPHIE
let w = screen.availWidth;
let h = screen.availHeight - 50;

var svg2 = d3
    .select('#cartography')
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Création de la projection de la carte
var projection = d3
    .geoMercator()
    .center([0, 20])
    .scale([w / (2 * Math.PI)])
    .translate([w / 2, h / 2]);

var path = d3
    .geoPath()
    .projection(projection);

// Donne la couleur d'un pays en fonction de son nombre d'habitants
var colorScale = d3
    .scaleLinear() // Créer une échelle linéaire de couleur entre deux valeurs qui sont dans le tableau range
    .domain([50, 100])
    .range(["#e4d7f3", "#4a168b"]);
    // .scaleThreshold()
    // .domain([50, 100])
    // .range(d3.schemeBlues[7]);

// Dessine la carte à partir du fichier json
svg2
    .append("g")
    .selectAll("path")
    .data(map.features)
    .enter()
    .append("path")
    .attr("d", path) // Dessine chaque pays
    .attr("fill", function(d) {
        const data = monEsperanceDeVie(d["properties"]["name"]); // Couleurs des pays selon l'espérance de vie
        if (data) {
            return colorScale(data);
        }
        return "red";
    })
    // Marchent pas
    .style("stroke", "transparent")
    .attr("class", function(d) { 
        return "Country" 
    } )
    .style("opacity", .8)
    .on("mouseover", mouseOver)
    .on("mouseleave", mouseLeave);

// Cherche les données de l'espérance de vie
function monEsperanceDeVie(country) {
    // console.log(country);

    try { 
        // Si le pays est dans le tableau, on va chercher la valeur de l'espérance de vie
        // Si le nom du pays dans le csv est identique au nom du pays dans le json, on va chercher la valeur de l'espérance de vie
        const c = life.find((myLifeCountry) => myLifeCountry.country === country);
        return c["2021"];
    } 
    catch (e) { 
        // Si le nom du pays dans le csv n'est pas identique au nom du pays dans le json, on retourne le pays en null
        // console.log("pays", country);
        return null;
    }

}

// Parcours de la souris (marche pas)
let mouseOver = function(d) {

    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .5)
    d3.select(this)
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "black")

}

let mouseLeave = function(d) {

    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .8)
    d3.select(this)
      .transition()
      .duration(200)
      .style("stroke", "transparent")

} */

// ********************************************************************************

/* // 3 - ANIMATION
// Marges du graphique
const margin3 = { top: 10, right: 20, bottom: 30, left: 50 },
        width3 = screen.availWidth - 100 - margin3.left - margin3.right,
        height3 = screen.availHeight - 300 - margin3.top - margin3.bottom;

// Création d'un élément svg graphique avec ses marges dans le div #staticGraph
const svg3 = d3
    .select('#animation')
    .append('svg')
    .attr('width', width3 + margin3.left + margin3.right)
    .attr('height', height3 + margin3.top + margin3.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin3.left + ',' + margin3.top + ')');

// Création d'un nouveau tableau pour regrouper les informations désirées des 3 tableaux csv ()
let datas3 = [];
for (let index = 0; index < population.length; index++) {

    const name = population[index]["country"];

    const p = income.find((itmInner) => itmInner.country === name);
    const l = life.find((itmInner) => itmInner.country === name);

    if (p && l) {
        datas3.push({
            name: population[index]["country"],
            population: population[index],
            pib: p,
            esperance_vie: l
        });
    }

}

let minPib = 10000000;
for (const country of datas3) {
    for (const [key, v] of Object.entries(country.pib)) {
        let value = cleanData(v);
        if (minPib > value) minPib = value;
    }
}
    
let maxPib = 0;
for (const country of datas3) {
    for (const [key, v] of Object.entries(country.pib)) {
        let value = cleanData(v);
        if (maxPib < value) maxPib = value;
    }
}

let maxLife = 0;
for (const country of datas3) {
    for (const [key, v] of Object.entries(country.esperance_vie)) {
        let value = cleanData(v);
        if (maxLife < value) maxLife = value;
    }
}

let minPop = 1000000000000000;
for (const country of datas3) {
    for (const [key, v] of Object.entries(country.population)) {
        let value = cleanData(v);
        if (minPop > value) minPop = value;
    }
}

let maxPop = 0;
for (const country of datas3) {
    for (const [key, v] of Object.entries(country.population)) {
        let value = cleanData(v);
        if (maxPop < value) maxPop = value;
    }
}

// 2 axes ajoutés
const x3 = d3
    .scaleLog()
    .domain([minPib, 128000])
    .range([0, width3]);

svg3.append('g')
    .attr("transform", "translate(0," + height3 + ")")
    .call(d3.axisBottom(x3));

const y3 = d3
    .scaleLinear()
    .domain([0, maxLife])
    .range([height3, 0])

svg.append('g')
    .call(d3.axisLeft(y3));

// Ajout d'une grandeur aux ronds
const z3 = d3
    .scaleLinear()
    .domain([minPop, maxPop])
    .range([1, 40]);

// Ajout des points
function displayDot(year) {

    removeAllDot(); // Suppression des points précédents

    svg3
        .append("g")
        .attr("id", "groupDot")
        .selectAll("dot")
        .data(datas3)
        .join(
            enter => enter.append("circle")
            .attr("id", function(d) {
                return d.name
            })

            .attr("cx", function(d) {
                return x3(cleanData(d.pib[year]));
            })
            .attr("cy", function(d) {
                return y3(d.esperance_vie[year]);
            })
            .attr("r", function(d) {
                return z3(cleanData(d.population[year]));
            })
            .style("fill", "purple")
            .style("opacity", "0.7")
            .attr("stroke", "black"),

            update => update
            .attr("cx", function(d) {
                return x(cleanData(d.pib[year]));
            })
            .attr("cy", function(d) {
                return y(d.life[year]);
            })
            .attr("r", function(d) {
                return z(cleanData(d.population[year]));
            })
        )
        .transition(d3.transition()
            .duration(500)
            .ease(d3.easeLinear)
        )

}

// Intervalle de 1800 à 2050, lancé automatiquement
let interval;
function runInterval() {

    interval = setInterval(() => {

        year++;
        displayDot(year);
        document.getElementById("yearRange").value = year;
        document.querySelector("label").innerText = year;

    }, 500);

}

// Bouton play/pause
let running = true;
d3.select("#play").on("click", function() {
    if (running) {

        clearTimeout(interval);
        document.getElementById("play").innerText = "Play";
        running = false;

    } else {

        runInterval();
        document.getElementById("play").innerText = "Pause";
        running = true;

    }
});

// Affichage des années à côté du bouton play/pause
let year = 1800;

document.getElementById("yearRange").min = year;
document.getElementById("yearRange").max = 2050;

document.getElementById("yearRange").addEventListener("change", function(event) {

    clearTimeout(interval)
    displayDot(this.value);
    document.querySelector("label").innerText = this.value;
    year = this.value;
    running = false;

});

// Lancement d'intervalle automatique
runInterval();

// Suppression des points à chaque changement d'année
function removeAllDot() {
    svg3.select("#groupDot").remove();
} */