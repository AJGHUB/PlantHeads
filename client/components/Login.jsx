import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/login'


class Login extends React.Component{

    state = {
        username: '',
        password: ''
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()

        this.props.dispatch(loginUser(this.state))

        this.setState({
            username: '',
            password: ''
        })  
    }

    render(){
        return(
            <div className='login-style'>
            <form id='loginForm' onSubmit = {this.handleSubmit}>
                <label>
                    <h2>Login</h2>
                    <input type="text" name="username" placeholder='Username' onChange={this.handleChange}/>
                    <input type="password" name="password" placeholder='Password' onChange={this.handleChange}/>
                </label>
                <input className='greenHover' type="submit" value='Log in'/>
            </form>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
    auth: state.auth
    }
}

export default connect(mapStateToProps)(Login)