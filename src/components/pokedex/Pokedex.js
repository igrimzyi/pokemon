import React, {Component} from "react";
import { CardGroup, 
Card, 
CardImg, 
CardSubtitle,
CardText} from "reactstrap";
import './pokedex.css'

class Pokedex extends Component{
    render(){
            return(
                    <CardGroup>
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
        Button
      </Button>
    </CardBody>
  </Card>
                    </CardGroup>
                )

        }


}

export default Pokedex; 