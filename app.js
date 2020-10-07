const Joi = require('joi');
const express = require('express');
const console = require('console');
const app = express();

//middleware
app.use(express.json());


//listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${port}...`));

//seed data
const businesses = [
    {id: 1, name: 'Curl Box', website:'curbox.com', founder:'Myleik Teele', description:'monthly subscription box of curly hair products', founded: 2011},

    {id: 1, name: 'Cushnie', website:'cushnie.com', founder:'Carly Cushnie, Michelle Ochs', description:' women’s ready-to-wear and accessories', founded: 2008},

    {id: 1, name: 'FUBU', website:'fubu.com', founder:'Daymond John', description:' hip hop apparel ', founded: 1992},

    {id: 1, name: 'Kahmune', website:'kahmune.com', founder:'Jamila Acheampong', description:' shoes sold in 10 inclusive shades of nude', founded: 2016},

    {id: 1, name: 'Mateo New York', website:'mateonewyork.com', founder:'Matthew Harris', description:' fine jewelry with diamonds and gemstones ', founded: 2009},

    {id: 1, name: 'Partake Foods', website:'partakefoods.com', founder:'Denise Woodard', description:'gluten-free, vegan and allergy-friendly cookies', founded: 2016},

    {id: 1, name: 'Forty Acres Fresh Market', website:'fortyacresfreshmarket.com ', founder:'Liz Abunaw', description:' grocery that operates pop-ups with fresh food in underserved neighborhoods', founded: 2018},

    {id: 1, name: 'For Keeps Books', website:'forkeepsbooks.com', founder:'Rosa Duffy', description:'bookstore that carries classic and rare Black literature', founded: 2018},

    {id: 1, name: 'Shine', website:' join.shinetext.com', founder:'Marah Lidey, Naomi Hirabayashi', description:'self-care app for people with anxiety and depression', founded: 2011},

    {id: 1, name: 'Salamander Hotels & Resorts', website:'salamanderresort.com', founder:' Sheila Johnson', description:'collection of luxury properties', founded: 2005},

];


//Index route
app.get('/', (req,res) => {
    res.send('Hello World');
});


//endpoint to get all of the businesses
app.get('/api/businesses', (req,res) => {
    res.send(businesses);
})

//CREATE
app.post('/api/businesses', (req,red) => {
    const {error} = validateBusiness(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);
        
    const business = {
        id: businesses.length + 1,
        name: req.body.name,
        website: req.body.website,
        founder: req.body.founder,
        description: req.body.description
    };
    businesses.push(business);
    res.send(business); //return business to client
});

//endpoint to get a single business
app.get('/api/businesses/:id', (req,res) => {
    const business = businesses.find(c => c.id == parseInt(req.params.id));
    if (!business) return res.status(404).send('The business with the given id was not found') //404 if business doesn't exist
    res.send(business);
});

//update
app.put('/api/businesses/:id', (req, res) => {
    //404 if business doesn't exist. look up the business, if it doesn't exist, return 404
    const business = businesses.find(c => c.id == parseInt(req.params.id));
    if (!business) return res.status(404).send('The business with the given id was not found') 
    //validate the business, if invalid, return 400 bad request error
    const {error} = validateBusiness(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);
    //update business, return updated business to client
    business.name = req.body.name;
    res.send(business);
});


//DELETE

app.delete('/api/businesses/:id', (req, res) => {
    //look up business, return 404 if it doesn't exist
    const business = businesses.find(c => c.id == parseInt(req.params.id));
    if (!business) return res.status(404).send('The business with the given id was not found') 
    //delete
    const index = businesses.indexOf(business);
    businesses.splice(index,1);

    res.send(business);
});

