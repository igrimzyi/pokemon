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
   

    <CardGroup className="card-margins">
     <Card>
    <CardImg
      alt="Card image cap"
      src="https://picsum.photos/318/180"
      top
      width="100%"
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