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

const baseURL= "https://pokeapi.co/api/v2/pokemon"

class Pokedex extends Component{
       

    render(){
            return(
    
        <div>
   
    {/* CardGroup used to display the information regarding every pokemon */}
    <CardGroup className="card-margins">
     <Card >
    <CardImg 
      alt="Card image cap"
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
      top
      className="image-margins"
      width="25%"
      height="50%"
    />
    <CardBody>
      <CardTitle tag="h5">
        Bulbasaur
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
  </Card>
<Card>
    <CardImg
      alt="Card image cap"
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
      top
      width="100%"
      className="image-margins"
    />
    <CardBody>
      <CardTitle tag="h5">
        Pokemon
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        Level
      </CardSubtitle>
      <CardText>
        This is an overview of the Pokemon
      </CardText>
      <Button>
        Favorite
      </Button>
    </CardBody>
  </Card>
  <Card>
    <CardImg
      alt="Card image cap"
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
      top
      width="100%"
      className="image-margins"
    />
    <CardBody>
      <CardTitle tag="h5">
        Pokemon
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        Level
      </CardSubtitle>
      <CardText>
        This is an overview of the Pokemon
      </CardText>
      <Button>
        Favorite
      </Button>
    </CardBody>
  </Card>
                    </CardGroup>

</div>
                )

        }



}

export default Pokedex; 