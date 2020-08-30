import React,{useState} from 'react';
import { BrowserRouter as Router, withRouter, Route, Link, Switch } from "react-router-dom";
import './styles.css';
import viewTocken from './viewTocken';

class Pationslist extends React.Component {
    constructor () {
        super();
        this.state = {
            lists: []
        }
    }
componentDidMount = _ =>{
    this.getList()
}



  getList = _ => {
    const {member} = this.state;
    fetch(`http://localhost:4000/getList`)
    .then(response => response.json())
    .then(response => this.setState({lists: response.data}))
    .catch(err => console.error(err))
  }


  checkOut= (pationtId) =>{
    fetch(`http://localhost:4000/checkOut?id=${pationtId}`);
    alert('Checkouted')
    this.getList()
  }

    render(){

    const {lists} = this.state;

        return(
        <div className='ptionslist'>
            <h1>PationLists</h1>
               
            {lists.map(list=>
                <div  className='card'><h2 style={{padding: '10px'}}>{list.tockenNum}</h2>
                    <p style={{marginLeft:'15px'}}> Name: {list.name} </p>
                    <p style={{marginLeft:'15px'}}> Place:  {list.place} </p>
                    <p style={{marginLeft:'15px'}}> Age:  {list.age} </p>
                    <Link to={'/viewTocken/'+list.tockenNum}>download</Link>
                    <button style={{ marginLeft: 'auto'}} onClick={ _ => this.checkOut(list.id)}> check out</button>

                   
                </div>)}
                
                <Link to='/'>Book now!</Link>
             
             
              
        </div>
        )};
}


export default Pationslist;
