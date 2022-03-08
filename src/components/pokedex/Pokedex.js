import React, {Component} from "react";
import { CardGroup, 
Card, 
CardImg, 
CardSubtitle,
CardText, 
CardBody, 
CardTitle, 
Button,
CardColumns} from "reactstrap";
import './pokedex.css'

const axios = require('axios')

const baseURL= "https://pokeapi.co/api/v2/pokemon"

class Pokedex extends Component{
       
  constructor(props) {
    super(props)
    
    this.state ={

      
    }

    this.state = {
      count: 0,
      pokemon: []
    }

    console.log('***constuctor');
  }

  componentDidMount() {
    console.log('***componentDidMount');

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
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${1}.png`}
        top
        className="image-margins"
        width="25%"
        height="50%"
      />
      <CardBody>
        <CardTitle tag="h5">
          { pokemon.name }
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          Level
        </CardSubtitle>
        <CardText>
         this is a description of the pokemon
        </CardText>
        <Button>
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