import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  align-items: center;
  background-color: ${props => (props.backgroundColor ? props.backgroundColor : 'transparent')};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: ${props => (props.overlaps ? '-10rem' : 0)};
  max-width: 760px;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  padding: ${props => (props.isPadded ? '100px 50px' : 0)};
  position: relative;
  text-align: center;
  transform: translateY(${props => (props.isVisible ? '0px' : '50px')});
  transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
  width: 100%;
  z-index: 1;

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
    const {
      backgroundColor,
      children,
      className,
      dangerouslySetInnerHTML,
      isPadded,
      overlaps,
      style,
    } = this.props

    const sectionProps = {
      backgroundColor,
      className,
      dangerouslySetInnerHTML,
      isPadded,
      overlaps,
      style,
    }

    return (
      <Container {...sectionProps} ref={this.section} isVisible={this.state.isVisible}>
        {children}
      </Container>
    )
  }

  _onScroll() {
    const centerHeight = window.innerHeight / 1.5
    const sectionTop = this.section.current.getBoundingClientRect().top

    if (sectionTop <= centerHeight) {
      this.setState(prevState => ({ isVisible: true }))
    }
  }
}
