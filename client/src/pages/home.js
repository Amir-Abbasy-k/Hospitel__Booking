import React,{useState} from 'react';
import './styles.css'
import { BrowserRouter as Router, withRouter, Route, Link, Switch } from "react-router-dom";




class Home extends React.Component {
    constructor () {
        super();
        this.state = {
          name: '',
          age: '',
          place: '',
          phone: '',
          tockenNum: [],
          

        };
        
      }

      componentDidMount=()=>{
        this.getStatus()
       
      }

    getStatus = ()=>{
    fetch('http://localhost:4000/getStatus')
    .then(response => response.json())
    .then(response => this.setState({tockenNum: response.data[0].tocken}))
    .catch(err => console.error(err))
    }


      handleChange = (evt, field)=> {
        this.setState({ [field]: evt.target.value });
      }

      submit = ()=>{
        const {name, age, place, phone, tockenNum} = this.state;
        let tocken =  tockenNum - 1;
        fetch(`http://localhost:4000/book?name=${name}&age=${age}&place=${place}&phone=${phone}&tocken=${tocken}`) 
        .then(response => response.json())
        .then(response =>  console.log(response.messages))//this.setState({msg: response.data})) 
        .catch(err => console.error(err))
        this.props.history.push(`/viewTocken/${tocken}`)
       
      }



    
      render () {
        return (
            <div>
      <form>
    
        <label>Name</label><br />
        <input type="text" name="name" onChange={(event)=>this.handleChange(event, "name")} /><br />
    
        <label>Age</label><br />
        <input type="number" name="age" onChange={(event)=>this.handleChange(event, "age")} /><br />

        <label>Place</label><br />
        <input type="text" name="place" onChange={(event)=>this.handleChange(event, "place")} /><br />

        <label>Phone number</label><br />
        <input type="text" name="phone" onChange={(event)=>this.handleChange(event, "phone")} /><br />

        <br />
        <button onClick={this.submit}>submit</button> <br />
    
      </form>
    
   
<p>Available Tocken  : {this.state.tockenNum - 1}</p>
<Link to='/pationsList'> Pations List</Link>


    </div>


  );
}
}



export default Home;
