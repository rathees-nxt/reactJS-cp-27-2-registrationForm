// Write your JS code here
import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    showFirstNameErr: false,
    showLastNameErr: false,
    isFormSubmitted: false,
  }

  onBlurFirstName = () => {
    const isValidName = this.checkFirstName()
    this.setState({showFirstNameErr: !isValidName})
  }

  onBlurLastName = () => {
    const isValidName = this.checkLastName()
    this.setState({showLastNameErr: !isValidName})
  }

  checkFirstName = () => {
    const {firstName} = this.state
    return firstName !== ''
  }

  checkLastName = () => {
    const {lastName} = this.state
    return lastName !== ''
  }

  onChangeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const isCheckFirstName = this.checkFirstName()
    const isCheckLastName = this.checkLastName()
    if (isCheckFirstName && isCheckLastName) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showFirstNameErr: !isCheckFirstName,
        showLastNameErr: !isCheckLastName,
        isFormSubmitted: false,
      })
    }
  }

  onClickSubmitAnotherResponse = () => {
    this.setState(prevState => ({
      firstName: '',
      lastName: '',
      isFormSubmitted: !prevState.isFormSubmitted,
    }))
  }

  renderRegisterPage = () => {
    const {firstName, lastName, showFirstNameErr, showLastNameErr} = this.state
    const className = showFirstNameErr ? 'name-input error-msg' : 'name-input'
    const classNames = showLastNameErr ? 'name-input error-msg' : 'name-input'

    return (
      <form className="form-container" onSubmit={this.submitForm}>
        <div className="input-container">
          <label className="input-label" htmlFor="firstName">
            FIRST NAME
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            placeholder="First name"
            className={className}
            onChange={this.onChangeFirstName}
            onBlur={this.onBlurFirstName}
          />
        </div>
        {showFirstNameErr && <p className="error">Required</p>}
        <div className="input-container">
          <label className="input-label" htmlFor="lastName">
            LAST NAME
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            placeholder="Last name"
            className={classNames}
            onChange={this.onChangeLastName}
            onBlur={this.onBlurLastName}
          />
        </div>
        {showLastNameErr && <p className="error">Required</p>}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    )
  }

  renderSuccessPage = () => (
    <>
      <img
        className="succ-img"
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
      />
      <p>Submitted Successfully</p>
      <button
        onClick={this.onClickSubmitAnotherResponse}
        type="button"
        className="submit-btn"
      >
        Submit Another Response
      </button>
    </>
  )

  render() {
    const {isFormSubmitted} = this.state

    return (
      <div className="registration-form-container">
        <h1 className="form-title">Registration</h1>
        <div className="registration-form">
          {isFormSubmitted
            ? this.renderSuccessPage()
            : this.renderRegisterPage()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
