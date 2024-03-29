import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
class ConatctItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
  delelte=()=>{
    const {item}=this.props
      axios.delete(`/delete-contact/${item._id}`)
      .then(()=>this.props.deleteReducer(item._id))
      .catch((err)=>alert(err))
  }
    
    render() { 
        const {item}=this.props
        console.log(this.props.contacts)
        return ( <div className='contact-item-container'>
                    <h2>Name : {item.name}</h2>
                    <h3>Phone : {item.phone}</h3>
                    <h3>Email : {item.email}</h3>
                    <Link to={`/editContact/${item._id}`}>
                    <button >Edit </button>
                    </Link>
                    <button onClick={this.delelte}>Delete </button>
        </div> );
    }
}

const mapDispatchToProps=(dispatch)=>
{
     return {
         deleteReducer:_id=>
         {
             dispatch({
                 type:'DELETE_CONTACT',
                 _id
             })

         }
     }
}

 
export default connect(null,mapDispatchToProps)(ConatctItem)