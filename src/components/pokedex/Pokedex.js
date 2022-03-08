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
  for(let i = count; i<1200; i++){

  }

}

class Pokedex extends Component{
       
  constructor(props) {
    super(props);

    this.state = {
        stats: 0,
        imageURL: '', 
        type:''

    }

    this.state = {
      count: 0,
      pokemon: []
    }

    console.log('***constuctor');
  }

  componentDidMount() {
    console.log('***componentDidMount');

// get request for pokemon stats, experience, and type
    axios.get(`${baseURL}${8}`)
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
          pokemon: data.results
        });

        console.log('***data', data);
      })
      .catch(error => {
        console.log('***', error);
      })
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
        >
          Favorite
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