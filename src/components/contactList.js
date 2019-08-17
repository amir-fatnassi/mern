import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import ConatctItem from './contactItem'

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount=()=>{
        axios.get('/get-contact')
        .then((res)=>this.props.refreshReducer(res.data))
    }
    render() { 
        console.log(this.props.contacts)
        const {contacts}=this.props
        return ( <div className='contact-list-container'>
        <h2>Contact List</h2>
        <div className='contact-list-container1'>
        {
            contacts.map((el,index)=><ConatctItem item={el} key={index}/>)
        }
                  
                  
        </div>
        <Link to='/'>
        <button>Home</button>
        </Link>
        </div> );
    }
}

const mapStateToProps=(state)=>
{  return {
    contacts:state.contactReducer
}
}
const mapDispatchToProps=(dispatch)=>
{
     return {
         refreshReducer:update=>
         {
             dispatch({
                 type:'REFRESH',
                 update
             })

         }
     }
}
 
 
export default connect(mapStateToProps,mapDispatchToProps)(ContactList);