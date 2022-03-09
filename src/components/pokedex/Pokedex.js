import React, {Component} from "react";
import { CardGroup, 
Card, 
CardImg, 
CardSubtitle,
CardText, 
CardBody, 
CardTitle, 
Button} from "reactstrap";
import './pokedex.css'

const axios = require('axios')

const baseURL= "https://pokeapi.co/api/v2/pokemon/"

const eachPokemon = (baseURL) => {

let pokeInfo =[{
    id:0, 
    imageURL: '', 
    type:'',
    pokemon: ''
}]

  for(let i = count; i<1200; i++){
    axios.get   
  }

}

class Pokedex extends Component{
       
  constructor(props) {
    super(props);

    this.state = {
        stats: [],
        imageURL: [], 
        type:[]

    }

    this.state = {
      count: 20,
      pokemon: [],
      pokeURL: []
    }

    console.log('***constuctor');
  }

  componentDidMount() {
    console.log('***componentDidMount');

// get request for pokemon stats, experience, and type
    

    axios.get(`${baseURL}${1}`)
      .then(response => {
        const data = response.data

        this.setState({
            imageURL: data.sprites.front_default ,
            stats: data.base_experience, 
            type: data.types[0].type.name

        })
        console.log(data)
      })
      .catch(error => {
        console.log('***', error )

      })
// get request for pokemon name and count


    axios.get(baseURL)
      .then(response => {
        const data = response.data;

        this.setState({
          count: data.count,
          pokemon: data.results,
          pokeURL: data.results.url
        });

        console.log('***data', data);
      })
      .catch(error => {
        console.log('***', error);
      })
      //Get Request for every single pokemon and their information
      console.log(this.state.count)
      for(let i = 1; i<this.state.count; i++){
        axios.get(`${baseURL}${i}`)
          .then(response =>{
            const data = response.data; 

            this.setState({
              count: data.count,
             
            })



          })
      }

  }



  


    render(){
      console.log('***render');

            return(
    
        <div className="container ">
         

   
    {/* CardGroup used to display the information regarding every pokemon */}
    {/* <CardColumns className="card-margins"> */}
    <div className="card-margins">
    { this.state.pokemon.map((pokemon, i) => {
      return <Card key={i} className='card-align'>
      <CardImg 
        alt="Card image cap"
        src={this.state.imageURL}
        top
        className="image-margins"
        width="25%"
        height="50%"
      />
      <CardBody className="body-styles">
        <CardTitle tag="h5">
          { pokemon.name }
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          {this.state.stats}
        </CardSubtitle>
        <CardText >
        type: {this.state.type}  
        </CardText>
        <Button
        color='danger'
        outline
        // className="button-margins"
        >
          Favorite
        </Button>
        <Button
        color="success"
        className="button-margins"
        >
          View This Pokemon
        </Button>
      </CardBody>
    </Card>;
    })}
                    
                  
    </div>
</div>
                )

        }



}

export default Pokedex; 