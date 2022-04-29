import React, {Component} from 'react';
import { Navigate } from 'react-router-dom';
import {
    CardGroup,
    Card, 
    CardImg, 
    CardSubtitle,
    CardText, 
    CardBody, 
    CardTitle, 
    Button } from 'reactstrap';
const axios = require('axios');






class PokemonDetails extends Component {
    constructor(props) {
   
    super(props);

    this.state = {
      loading: true,
      details: {}
    }
  }

  componentDidMount() {
      
    axios.get(this.props.pokemon)
      .then((response) => {
          console.log(this.props.pokemon)
       
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
    
    return   <Card className='liked-card-align liked-div'>  
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
                type: {this.state.details.types[0].type.name}  
                </CardText>
              </CardBody>
            </Card>;
  }
}




export default class LikedPokemon extends Component{
    constructor(props){
        super(props);
    
        this.state = {
            name:'',
            likes:[],
            errResponse:null,
            likedPokemon:null

        }
    }
   
    componentDidMount(){
        const config= {
            headers:{
                Authorization: "Bearer " + localStorage.getItem('userToken')
            }
        }

        axios.get('http://localhost:4000/api/likes', config)
            .then((res)=>{
                this.setState({
                    likes: res.data.likes
                })
                console.log(res.data.likes)
            })
            .catch((err)=>{
                localStorage.removeItem('userToken')
                this.setState({
                    errResponse:err.response.status
                })
            })
        }


    render(){

        if(this.state.errResponse === 401 || this.state.errResponse === 403 || !localStorage.userToken){
            return(
                <Navigate to='/login' replace={true}/>
            )
        } else if(this.state.likes.length === 0){
            return(
                <div className='container null-likes'>
                        <h4>
                            oops you have not liked any pokemon yet!
                        </h4>
                    <h4>
                    Click this button to catch your favorite pokemon!
                    </h4>
                    <Button color='success' outline block href="/pokedex">
                        View Pokemon
                    </Button>


                </div>
            )
        }else
        
        return(
        <div className='container alignment'>
          
                {this.state.likes.map((pokemon, i) =>{
                    return <PokemonDetails key={i} pokemon={pokemon}></PokemonDetails>  
                })}
            

        </div>
        )
    }
    }

