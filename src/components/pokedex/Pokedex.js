

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

class PokemonDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      details: {}
    }
  }

  componentDidMount() {
    axios.get(this.props.pokemon.url)
      .then((response) => {
        this.setState({ 
          loading: false,
          details: response.data
        })
      })
  }


  render () {
    if (this.state.loading) {
      return <p>Loading...</p>
    }

    return <Card className='card-align'>  
    <CardImg 
      alt="Card image cap"
      src={this.state.details.sprites.front_default}
      top
      className="image-margins"
      width="25%"
      height="50%"
    />
    <CardBody className="body-styles">
      <CardTitle tag="h5">
        { this.state.details.name }
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        
        {/* {this.state.stats} */}
      </CardSubtitle>
      <CardText >
      type: {this.state.details.types[0].type.name}  
      </CardText>
      <Button
      color="success"
      block
      href="/"
      >
        View This Pokemon
      </Button>
    </CardBody>
  </Card>;
  }
}


class Pokedex extends Component{
       
  constructor(props) {
    super(props);
    
    this.state = {
      poks: []
    }
  }

  componentDidMount() {
    axios.get(baseURL)
      .then(response => {
        this.setState({
          poks: response.data.results
        })
      })
      .catch(error => {
        console.log('***', error);
      })
  }

    render(){

      if (this.state.poks.length === 0) {
        return <h1>Loading...</h1>
      }
     
      return(
        <div className="container ">
          <div className="card-margins phone">
              {this.state.poks.map((pokemon, i) => {
                return <PokemonDetails key={i} pokemon={pokemon} />
              })}
          </div>
        </div>
      )
    }
}

export default Pokedex; 