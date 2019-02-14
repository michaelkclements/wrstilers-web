import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  align-items: center;
  background-color: ${props => (props.backgroundColor ? props.backgroundColor : 'transparent')};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 760px;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  padding: ${props => (props.isPadded ? '100px 0' : 0)};
  position: relative;
  transform: translateY(${props => (props.isVisible ? '0px' : '50px')});
  transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
  width: 100%;

  .gatsby-image-outer-wrapper {
    opacity: ${props => (props.isVisible ? 1 : 0)};
    transform: translateY(${props => (props.isVisible ? '0px' : '50px')});
    transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);

    &:nth-child(1) {
      transition-delay: 300ms;
    }

    &:nth-child(2) {
      transition-delay: 400ms;
    }

    &:nth-child(3) {
      transition-delay: 500ms;
    }
  }

  p:last-child {
    margin-bottom: 0;
  }
`

export default class Section extends Component {
  constructor(props) {
    super(props)
    this._onScroll = this._onScroll.bind(this)
    this.section = React.createRef()
    this.state = {
      isVisible: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this._onScroll)
    this._onScroll()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScroll)
  }

  render() {
    const { backgroundColor, children, className, isPadded, style } = this.props

    return (
      <Container
        backgroundColor={backgroundColor}
        className={className}
        ref={this.section}
        isPadded={isPadded}
        isVisible={this.state.isVisible}
        style={style}
      >
        {children}
      </Container>
    )
  }

  _onScroll() {
    const centerHeight = window.innerHeight / 1.1
    const sectionTop = this.section.current.getBoundingClientRect().top

    if (sectionTop <= centerHeight) {
      this.setState(prevState => ({ isVisible: true }))
    }
  }
}
