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
        const [pokeData, setPokeData] = useState('');
        const [pokeExperience, setPokeExperience] = useState('');
        const [pokeType, setPokeType] = useState('');
        const [pokeHealth, setPokeHealth] = useState('');
        const [pokeAttack, setPokeAttack] = useState('');
        const [pokeDefense, setPokeDefense] = useState('');
        const [pokeName, setPokeName] = useState('')
        const [pokeAbility, setPokeAbility] = useState('');
        const [urlParam, setUrlParam] = useState(parseInt(pokeId))

        function LikeButton() {
            
            const [isClick, setClick] = useState(false);
            const config = {
                headers:{
                    Authorization: "Bearer " + localStorage.getItem('userToken')
                }
            }
            let body = ''
            axios.post("http://localhost:4000/api/likes" ,{hello:"sup"}, config)
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
            
            return (
                
              <div className="App">
                <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
              </div>
            );
          }
       
    
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
        axios.get(`${baseUrl}${pokeId}`)
            .then((res)=>{
                let data = res.data;
            //   setting state within a funcitonal component using my second param 
                let imgURL = data.sprites.front_default;        
                setPokeName(data.name)
                setPokeData(imgURL);
                setPokeExperience(data.base_experience)
                setPokeType(data.types[0].type.name);
                setPokeHealth(data.stats[0].base_stat);
                setPokeAttack(data.stats[1].base_stat);
                setPokeDefense(data.stats[2].base_stat);
                setPokeAbility(data.abilities[0].ability.name)
               
               
            })
            .catch((err) =>{
                console.log( + err)
                setErrorRender(err);
            })
            //handeling onClick events 
        
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
               {/* <div className='arrow-alignment'>
              
                <IterateButtons/>
               </div> */}
              
            <div className='arrow-alignment'>
                <IterateButtons />
             </div>
    <div >
            {/* <div className='arrow-alignment'>
              
              <IterateButtons/>
             </div> */}
        <Card className='card-alignment'>
            <LikeButton />
            <CardBody className='card-body-width'>
                
                <CardImg 
                src={pokeData}
                top
                className="image-margins"
                width="30%"
                height="80%"
                />  
                <CardTitle tag='h5' className=''>
                    {pokeName}
                </CardTitle>
                <CardText>
                    {pokeType} 
                </CardText>
                <CardText tag='h5'>
                    Base Experience:
                </CardText>

                {/* setting the stats of the pokemon */}
                <div className="text-center">
                    {pokeHealth} of 255
                </div>
                 <Progress
                max="255"
                value={pokeHealth}
                color='danger'
                >
                health
                </Progress>
                <div className="text-center">
                    {pokeAttack} of 255
                </div>
                <Progress
                max="255"
                value={pokeAttack}
                color='success'
                >
                Attack
                </Progress>
                <div className="text-center">
                    {pokeDefense} of 255
                </div>
                <Progress
                max="255"
                value={pokeDefense}
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