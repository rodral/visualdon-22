import * as d3 from 'd3';

const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const userUrl = 'https://jsonplaceholder.typicode.com/users';

/* NOT COMPLETE */

Promise.all([
  d3.json(postsUrl),
  d3.json(userUrl)
])
  .then(([posts, users]) => {
    // 1. Nouvel objet
    let result1 = users.map(usr => {
      let posts_filtered = posts.filter(post => post.userId === usr.id);
      let new_object = {
        "nom_utilisateur": usr.name,
        "ville": usr.address.city,
        "titres_posts": posts_filtered.map(post => post.title),
      }
      return new_object;
    });

    // 2. Nombre de posts par user
    let result2 = users.map(usr => {
      let posts_filtered = posts.filter(post => post.userId === usr.id);
      let new_object = {
        "userId": usr.id,
        "userName": usr.name,
        "nPosts": posts_filtered.length
      }
      return new_object;
    })

    const container = d3.select('body')
      .append('div')

    container.selectAll('p')
      .data(result2)
      .enter()
      .append('p')
      .text(d => "User ID " + d.userId + ": " + d.nPosts)

    // 3. User avec les text le plus long
    let body_length = users.map(usr => {
      let posts_filtered = posts.filter(post => post.userId === usr.id);
      let new_object = {
        "userId": usr.id,
        "body_length": d3.max(posts_filtered.map(post => post.body.length))
      }
      return new_object;
    })

    let result3 = body_length.filter(d => d.body_length === d3.max(body_length.map(d2 => d2.body_length)))

    console.log("Result 3 " + result3);

    const container2 = d3.select('body')
      .append('div')

    container.selectAll('p')
      .data(result3)
      .enter()
      .append('p')
      .text(d => "User " + d.userId + ": " + d.nPosts)

    // Barchart
    const margin = { top: 20, right: 20, bottom: 20, left: 20 },
      width = 0.6 * window.innerWidth - margin.left - margin.right,
      height = 0.7 * window.innerHeight - margin.top - margin.bottom;

    const figure = d3.select("#vizArea")
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const x = d3.scaleBand().domain(result2.map(d => d.userName)).range([0, width]).paddingInner(0.05)
    const y = d3.scaleLinear().domain([0, d3.max(result2.map(d => d.nPosts))]).range([height, 0])

    figure.selectAll('rect')
      .data(result2)
      .enter()
      .append('rect')
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.nPosts))
      .attr('x', d => x(d.userName))
      .attr('y', d => y(d.nPosts))
      .attr('fill', 'DarkSlateGray')

    figure.selectAll('text')
      .data(result2)
      .enter()
      .append('text')
      .text(d => d.nPosts)
      .attr('x', d => x(d.userName) + x.bandwidth() / 2)
      .attr('y', height - margin.bottom)
      .attr('text-anchor', 'middle')
      .attr('fill', 'yellow') 
  });