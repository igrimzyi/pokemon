
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
import NavbarReact from "../navbar/Navbar";

const axios = require('axios')

const baseURL= "https://pokeapi.co/api/v2/pokemon?offset=0&"

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
    
    return   <Card className='card-align'>  
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
                <CardText>
                      <span className="poke-type-styles">TYPE:</span>  {this.state.details.types[0].type.name}  
                </CardText>
                <Button
                color="success"
                block
                href={`pokedex/${this.state.details.id}`}
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
      poks: [],
      pokeCount: 27,
      isLoading:false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
 
    this.setState({pokeCount: this.state.pokeCount +=5,
      isLoading:true
    
    
    })
    if(this.state.pokeCount > 898){
      return 
    }else if(this.state.pokeCount  < 898) {

    this.setState({pokeCount: this.state.pokeCount +=5})


    axios.get(`${baseURL}limit=${this.state.pokeCount}`)
    .then(response => {
      this.setState({
        poks: response.data.results,
        isLoading:false
      })
      console.log(this.state.poks)
    })
    .catch(error => {
      console.log('***', error);
    })
  }
 
  }


    
 
  componentDidMount() {

    axios.get(`${baseURL}limit=${this.state.pokeCount}`)
      .then(response => {
        this.setState({
          poks: response.data.results
        })
        console.log(this.state.poks)
      })
      .catch(error => {
        console.log('***', error);
      })
      }

      
 
    render(){
     
      if (this.state.poks.length === 0) {
      return(
         
              <h1>Loading...</h1>
         
        )
      }

     
      return(
        <div className="container ">

<NavbarReact/>
          <div className="card-margins phone">
              {this.state.poks.map((pokemon, i) => {
                return <PokemonDetails key={i} pokemon={pokemon} />
              })}
          </div>{!this.state.isLoading &&
          <Button className="view-more-button" color="success"block onClick={this.handleClick}>View More</Button>
          }
          {this.state.isLoading &&
          <Card>
                
              <CardBody className="body-styles">
                <CardTitle tag="h5">
                  LOADING
                </CardTitle>
                <CardSubtitle
                  className="mb-2 text-muted"
                  tag="h6"
                >
                  
                 LOADING
                </CardSubtitle>
                <CardText>
                      <span className="poke-type-styles">TYPE:</span>  LOADING
                </CardText>
                <Button
                color="success"
                block
              
                >
                 LOADING
                </Button>
              </CardBody>
           </Card>
          }
        </div>
      )
    }
}

export default Pokedex; 