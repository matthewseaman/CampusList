import React from 'react';
import StarRatings from 'react-star-ratings';
import {
    Button,
    Col,
    Collapse,
    Container,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    InputGroup,
    Label,
    Row
} from 'reactstrap';
import {Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Navbar from './NavigationBar';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

library.add( faPlusCircle);


class Services extends React.Component {

    style={
        image: {
            width: '247px',
            height: '147px',
            borderRadius: '30px',
            zIndex: -1,
            position: 'relative',
        }
        ,
        listing: {
            width: '250px',
            height: '150px',
            borderRadius: '30px',
            borderStyle: 'solid',
            borderWidth: '2px',
            position:'relative',
            margin:'30px'
        },
        listingTitle:{
            height:'40px',
            width:'247px',
            backgroundColor:'#245cb3',
            verticalAlign: 'baseline',
            zIndex:-1,
            position:'absolute',
            borderBottomLeftRadius:'30px',
            borderBottomRightRadius:'30px',
            bottom:0,
            left:0,
            textAlign:'center',
            borderTop:'solid'
        },
        listingText: {
            height:'120px',
            width:'247px',
            backgroundColor:'#ffffff',
            verticalAlign: 'baseline',
            zIndex:-1,
            position:'absolute',
            borderBottomLeftRadius:'30px',
            borderBottomRightRadius:'30px',
            bottom:0,
            left:0,
            textAlign:'center',
            borderTop:'solid',
        },

    };
    state={
        services:{},
        service_ids:[],
    };
    componentWillMount() {
	fetch('http://localhost:5000/api/listings')
	.then(response => response.json())
	.then(data => this.setListings( data ));
    }

    componentDidMount() {

    }

    setListings(data) {
	for(var i = 0; i < data.listings.length; i++) {
            this.state.service_ids.push(data.listings[i].id);
        }
	this.setState({services: data.listings});
    }

    listing(id){
        var listings={};
        var pic='';
        for(var i = 0; i < this.state.services.length; i++) {
            if (this.state.services[i].id===id){
                listings=this.state.services[i];
                pic=listings['picture'];
            }

        }
        return(
            <Link to={{ pathname: '/service', state:listings, parent: 'Services'}} style={{borderColor:'black !important'}}>
                <div className='listing'style={this.style.listing}  >
                    <img style={this.style.image} src={require("../styles/images/"+listings['picture'] )}/>
                    <div className='listingTitle' style={this.style.listingTitle}>
                        <p style={{fontFamily: "Lato", fontSize:"20px", color:'white'}}>{listings['title']}</p>
                    </div>
                    <div className='listingText' style={this.style.listingText}>
                        <div style={{display:'block', clear:'both'}}>
                            {listings['description']}
                        </div>
                            {parseFloat(listings['ratings'].length) > 0 ? (
                                <div style={{  position:'absolute', marginLeft:'auto', marginRight:'auto', bottom:5, left:22}}>
                                    <StarRatings starDimension="30px"
                                                 rating={parseFloat(listings['rating'])}
                                                 starRatedColor="#245CB3"
                                                 numberOfStars={5}
                                                 name='rating'
                                    />
                                </div>
                            ):(
                                <div style={{  position:'absolute', marginLeft:'auto', marginRight:'auto', bottom:5, left:'33.33%'}}>
                                    <label>No Ratings</label>
                                </div>)}
                    </div>
                </div>
            </Link>
        )
    }
    render() {
        return (
            <div>
                <Navbar/>


                <Container style={{marginTop:'2%'}}>
                    <div style={{textAlign:'center'}} >
                    <h2 style={{display:'inline-block'}}>My Listings</h2>

                <Button title="Add a service" href='/createlisting' color="success" style={{ borderRadius:100,width:'40px', height:'40px', padding:0, float:'right', display:'inline-block'}}>
                    <FontAwesomeIcon icon="plus-circle" style={{width:'35px', height:'37px'}}/></Button>{' '}
                    </div>
                    <div style={{display:'flex', flexWrap:'wrap', textAlign:'center'}}>
                        {this.state.service_ids.map((row,i) => (
                            <div style={{display:'flex', width:'33.33%', justifyContent:'center'}}>
                                {this.listing(row,i)}
                            </div>
                        ))}
                    </div>
                </Container>

            </div>
        )}

}

export default Services;
