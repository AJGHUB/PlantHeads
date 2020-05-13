import React from 'react'
import { createListing } from '../apis/listings'
import { getPlant } from '../apis/plants'
import { connect } from 'react-redux'

class CreateListing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //rendered from the LogIn session
      // username: this.props.username,
      // usersId: this.props.usersId,
      // email: this.props.email,
      //can be rendered if accessed through PlantView Component
      plantsId: this.props.match.params.plantsId,
      scientificName: this.props.scientificName,
      commonName: this.props.commonName
    }
  }

  handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      })
  }

  handlePhoto = e => {
    this.getBase64(e.target.files[0],
      (base64) => {
        this.setState({
          photoFile: base64
        })
    })
  }

  getBase64 = (file, callback) =>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      callback(reader.result)
    }
    reader.onerror = function (err) {
      console.log(err)
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    createListing({
      usersId: this.state.usersId,
      plantsId: this.state.plantsId,
      scientificName: this.state.scientificName,
      commonName: this.state.commonName,
      cost: this.state.cost,
      type: this.state.type,
      careTips: this.state.careTips,
      photoFile: this.state.photoFile
    })

      .then((newListing) => {
        //route the page to the ListingDetailsComponent(single listing view)
        alert("New Listing Added" + newListing)
      })

      .catch((err) => {
        alert("Cannot Add this listing " + err.message)
      })
  }

  componentDidMount () {
    if ( typeof this.state.plantsId !== 'undefined') {
      getPlant(this.state.plantsId)
      .then((plant) => {
        this.setState({
          scientificName: plant.scientific_name,
          commonName: plant.common_name,
        })
      })
    }
  }

  render() {
    return (
      <div className='createListing'>
        <form onSubmit={this.handleSubmit}>
          <div className='postListingHeader'>
            <h1> To Give A Plant To Another Loving Family</h1>
          </div>
          <div>
              <p className='postListInfo'>We invite our fellow #plantHeads sellers to list your plants with us. Rather than listing via commercially operated websites, sell your plants with PlantHeads and help grow our community</p>
              <br/>
              <p className='postListInfo'>MUST SHARE IT! MUST SELL IT.</p>
          </div>
          <br/>
          <div className='createListingContainer'>
            <p>Upload a Photo </p>
            <input type="file" name="photoFile" onChange={this.handlePhoto}/>
          </div>
          <br/>
          <div className='userInput'>
            <p>Price:</p>
            <input type="text" name="cost" onChange={this.handleChange}/>
            <p>Type of Plant:</p>
            <input type="text" name="type" onChange={this.handleChange}/>
            <p> Share Your Care Tips:</p>
            <input type="text" name="careTips" onChange={this.handleChange}/>
          </div>
          <br/>
          <div>
            <p className='pickupInfo'>Buyer Must Pickup</p>
            <br/>
            <p className ='usernameListing'>Sellers Details:</p>
           <br/>
            <p className='usernameListing'>Username: {this.props.username}</p>
            <p className='userEmailListing'>Email: {this.props.email}</p>
          </div>
          <br/>
          <div className='submitListing'>
            <input type="submit" value="Submit" /> 
          </div>      
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth.user
  }
}

export default connect(mapStateToProps) (CreateListing)