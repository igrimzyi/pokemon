import axios from 'axios';
import React, {Component, useState} from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import { 
    Card, 
    CardImg,
    CardText, 
    CardBody, 
    CardTitle, 
    Button,
    Progress,
    } from "reactstrap";
    import './pokemon.css'
    import Heart from "react-animated-heart";
  



    export default function PokemonInformation() {

        let {pokeId} = useParams();
        let baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
        //functional components require you to use the useState hook in order to set state unlike class components where they
        //use this.state or this.setState method
        const [pokeData, setPokeData] = useState();
        
        const [urlParam, setUrlParam] = useState(parseInt(pokeId))

        const [isClick, setClick] = useState(false);
       
        function IterateButtons(){
            let urlParams = useParams();
            if (urlParams.pokeId === '1'){
                return <></>
            }else{
                return(
                    <>
                    <Button disabled={urlParam===1} href={`/pokedex/${urlParam-1}`}  className='arrow left'></Button>
                    <a href={`/pokedex/${urlParam-1}`} className='a-tag-styles'>Prev Pokemon</a>
                    </>
    
                )
            }
        }

        function DecrementButtons(){
            let urlParams = useParams();
            if(urlParams.pokeId === '898'){
                return <></>
            }else{
                return(
                    <>
                        <Button href={`/pokedex/${urlParam+1}`} className='arrow right'  > </Button>
                        <a href={`/pokedex/${urlParam+1}`} className='a-tag-styles'>Next Pokemon</a>
                    </>

                )
            }



        }       

        //get the pokemon information and render that specific pokemon on to the page!
       if(!pokeData){
   
        axios.get(`${baseUrl}${pokeId}`)
            .then((res)=>{
                let data = res.data;
            //   setting state within a funcitonal component using my second param   
                    setPokeData(data)   
                    
               
            })
            .catch((err) =>{
                console.log(err)

            })
        }
        console.log(pokeData)
    

            //handeling onClick events 

                function LikeButton() {
                    function handleCLick(){
                    //setting isClick to false as of right
                    setClick(!isClick) 
                    const config = {
                        headers:{
                            Authorization: "Bearer " + localStorage.getItem('userToken')
                        }
                    }
                    //seeing if the state is liked or not liked and from there I could determine whether if I need to delete or post to my DB
                    if(isClick=== false){
                    //posting to my DB and sending the specific pokemon url to it
                    axios.post("http://localhost:4000/api/likes" , {pokemon:`${pokeData.species.url}`},  config)
                    .then(res=>{
                        console.log(res)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                    }
                    if(isClick === true){
                    //deleting my pokemon like from the database and resetting the state to unliked 
                    axios.delete("http://localhost:4000/api/likes" , {config ,pokemon:`${pokeData.species.url}`})
                    .then(res=>{
                        console.log(res)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                    }
                    }

                    
                    return (
                        
                    <div className="App">
                        <Heart isClick={isClick} onClick={handleCLick} />
                    </div>
                    );
                }
        
            //returning an empty card during the loading phase of the react state
            if(!pokeData){
                return(
        <div className='title'>
        <Card>
            <CardBody>
               <CardText tag='h2'>
                   Loading...
               </CardText>
               
            </CardBody>
            </Card>
           
        </div>
            )
            }

        //only returning the pokemon name as of right now 
        return(
<div className='div-styles title title-iphone iphone-xr disable-select'>
        
              
            <div className='arrow-alignment'>
                <IterateButtons />
             </div>
    <div >
           
        <Card className='card-alignment'>
            <LikeButton />
            <CardBody className='card-body-width'>
                
                <CardImg 
                src={pokeData.sprites.front_default}
                top
                className="image-margins"
                width="30%"
                height="80%"
                />  
                <CardTitle tag='h5' className=''>
                    {pokeData.name}
                </CardTitle>
                <CardText>
                    {pokeData.types[0].type.name} 
                </CardText>
                <CardText tag='h5'>
                    Base Experience:
                </CardText>

                {/* setting the stats of the pokemon */}
                <div className="text-center">
                    {pokeData.stats[0].base_stat} of 255
                </div>
                 <Progress
                max="255"
                value={pokeData.stats[0].base_stat}
                color='danger'
                >
                health
                </Progress>
                <div className="text-center">
                    {pokeData.stats[2].base_stat} of 255
                </div>
                <Progress
                max="255"
                value={pokeData.stats[2].base_stat}
                color='success'
                >
                Attack
                </Progress>
                <div className="text-center">
                    {pokeData.stats[1].base_stat} of 255
                </div>
                <Progress
                max="255"
                value={pokeData.stats[1].base_stat}
                color='primary'
                >
                Defense
                </Progress>
            </CardBody>
        </Card>
    </div>
           <div className='arrow-alignment'>
                <DecrementButtons/>
           </div>

       
</div>
            
       
        )

    }