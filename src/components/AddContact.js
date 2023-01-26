import React from "react";

class AddContact extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name:"",
            email:"",  
            errorMessage: ''
        };
      }

    
    add = (e) => {
        e.preventDefault();
        this.setState({errorMessage: this.props.errorMessage});
        if(this.state.name === "" || this.state.email === ""){
            alert('All fields are mandatory!');
            return;
        }
        this.props.addContactHandler(this.state);
        this.setState({name:"", email:""});
       
    }
    render(){
        return(
            <div className="ui main">
                <h2>Add Contact</h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name" 
                        value ={this.state.name}
                        onChange={ (e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Email" 
                        value ={this.state.email}
                        onChange={ (e) => this.setState({ email: e.target.value })}
                        />
                        { this.state.errorMessage && 
                        <p className="ui error">{this.state.errorMessage}</p>
                        }
                    </div>
                    <button className="ui button blue">Add</button>
                </form>
                
            </div>
        );
    }

}

export default AddContact;