import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-bottom: 2rem;
  min-height: 80px;
  position: relative;

  input,
  select {
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 1.8rem;
    font-weight: bold;
    height: $input-height;
    padding: 3.5rem 2rem 2rem;
    width: 100%;

    &.peeky {
      padding-right: 4em;
    }

    &:disabled {
      color: $grey;
    }
  }

  label {
    align-items: center;
    display: flex;
    font-size: 1.6rem;
    font-weight: bold;
    padding-left: 2rem;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition-duration: 300ms;
    transition-property: color, font-size, font-weight, transform;
    transition-timing-function: ease;
    width: 100%;

    &.focused {
      font-size: 1.2rem;
      font-weight: normal;
      transform: translateY(calc(-50% - 1.5rem));
    }
  }

  .peeky-password {
    height: 3.2rem;
    line-height: normal;
    opacity: 1;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    transition: right 300ms ease;
    z-index: 1;

    svg {
      margin: auto;
    }

    &:focus {
      outline: auto 5px -webkit-focus-ring-color;
    }

    .close {
      display: block;
    }
  }

  .validation-icon {
    align-items: center;
    display: flex;
    height: 3.2rem;
    justify-content: center;
    opacity: 0;
    position: absolute;
    right: 2rem;
    top: 2.5rem;
    transition: opacity 300ms ease;
    width: 3.2rem;

    svg {
      fill: #fff;
      left: 50%;
      position: absolute;
      top: calc(50% + 0.1rem);
      transform: translate(-50%, -50%) scale(0);
      transform-origin: center;
      transition: transform 300ms ease;
      width: 50%;
      z-index: 1;
    }
  }
`

export default class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focused: false,
      invalid: false,
      initialType: '',
      type: 'text',
      value: '',
      showPassword: false,
    }
  }

  componentDidMount() {
    if (this.props.value) {
      this.setState({ value: this.props.value })
    }

    if (this.props.type) {
      this.setState({ initialType: this.props.type, type: this.props.type })
    }
  }

  render() {
    const {
      className,
      disabled,
      id,
      labelText,
      name,
      max,
      maxLength,
      min,
      pattern,
      placeholder,
      required,
      step,
      title,
      validationText,
      width,
    } = this.props

    const inputAttr = {
      className,
      disabled,
      id,
      max,
      maxLength,
      min,
      name,
      pattern,
      placeholder,
      required,
      step,
      title,
      width,
    }

    return (
      <Container className={`input ${this.state.invalid ? 'invalid' : ''}`}>
        <input
          aria-label={placeholder}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onFocus={this.onFocus}
          type={this.state.type}
          value={this.state.value}
          {...inputAttr}
        />
        {labelText ? (
          <label className={this.state.focused || placeholder ? 'focused' : ''} htmlFor={name}>
            <span>{labelText}</span>
          </label>
        ) : null}

        {this.state.initialType === 'password' ? (
          <button className='peeky-password' onClick={this.togglePeakyPassword}>
            {this.state.showPassword ? (
              <svg focusable='false' className='open' viewBox='0 0 17.2 10.3'>
                <use xlinkHref='#icon-eye-open-icon' />
              </svg>
            ) : (
              <svg focusable='false' className='close' viewBox='0 -5 32 25'>
                <use xlinkHref='#icon-eye-closed-icon' />
              </svg>
            )}
          </button>
        ) : null}
        {validationText ? (
          <div
            className='validation'
            style={{
              opacity: this.state.invalid ? 1 : 0,
              transform: this.state.invalid
                ? 'scale(1) translateX(-50%)'
                : 'scale(0.9) translateX(-50%)',
            }}
          >
            <p>{validationText}</p>
          </div>
        ) : null}
      </Container>
    )
  }

  onFocus = () => {
    this.setState({ focused: true })
  }

  onBlur = () => {
    if (this.state.value.length === 0) {
      this.setState({ focused: false })
    } else {
      this.setState({ focused: true })
    }
  }

  onChange = e => {
    this.setState({ value: e.target.value })
    this.props.onChange(e)
    this.checkPattern(this.props.pattern, e.target.value)
  }

  checkPattern = (pattern, value) => {
    const regPattern = new RegExp(pattern)

    if (regPattern.test(value)) {
      this.setState({ invalid: false })
    } else {
      this.setState({ invalid: true })
    }
  }

  togglePeakyPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
      type: `${this.state.type === 'password' ? 'text' : 'password'}`,
    })
  }
}
