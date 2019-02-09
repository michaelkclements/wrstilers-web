import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled, { keyframes } from 'styled-components'

const NavEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  z-index: 2;
`

const Navigation = styled.ul`
  align-items: center;
  background-color: ${props => (props.isOpen ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0)')};
  backdrop-filter: ${props => (props.isOpen ? 'blur(3px)' : 'blur(0)')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  max-width: 1160px;
  list-style: none;
  padding: 0 20px;
  position: absolute;
  transition: all 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
  width: 100%;

  li {
    margin: ${props => (props.isOpen ? '0' : 0)};

    &:nth-child(3) {
      order: 1;
    }

    &:nth-child(1) {
      order: 2;
    }

    &:nth-child(2) {
      order: 3;
    }

    &:nth-child(4) {
      order: 4;
    }

    &:nth-child(5) {
      order: 5;
    }

    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(4),
    &:nth-child(5) {
      opacity: ${props => (props.isOpen ? 1 : 0)};
    }
  }

  @media (min-width: 769px) {
    background-color: transparent;
    flex-direction: row;

    li {
      animation: 500ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s 1 both ${NavEnter};

      &:nth-child(3) {
        animation-delay: 500ms;
        order: 3;
      }

      &:nth-child(2),
      &:nth-child(4) {
        animation-delay: 600ms;
      }

      &:nth-child(1),
      &:nth-child(5) {
        animation-delay: 700ms;
      }
    }
  }
`

const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  font-size: 17px;
  letter-spacing: 2px;
  padding: 40px 0;
  text-decoration: none;
  text-transform: uppercase;
`

const Hamburger = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 30px;
  position: absolute;
  top: 55px;
  right: 30px;
  width: 30px;

  &::before,
  &::after {
    background-color: #fff;
    content: '';
    height: 3px;
    transform-origin: center center;
    transition: all 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
    width: 100%;
  }

  &::before {
    transform: ${props =>
      props.isOpen ? 'rotate(45deg) translate(5px, 6px)' : 'rotate(0deg) translateY(0)'};
  }

  &::after {
    transform: ${props =>
      props.isOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'rotate(0deg) translateY(0)'};
  }
`

export default class Header extends Component {
  constructor(props) {
    super(props)
    this._toggleMenu = this._toggleMenu.bind(this)
    this.state = {
      isMobile: false,
      isOpen: false,
    }
  }

  componentDidMount() {
    window.innerWidth < 769
      ? this.setState(prevState => ({ isMobile: true }))
      : this.setState(prevState => ({ isMobile: false }))
  }

  render() {
    const { data } = this.props

    return (
      <Container>
        <Navigation isOpen={this.state.isOpen && this.state.isMobile}>
          {data.map((item, i) => {
            const { pageTitle, pageSlug } = item.node

            const slug = pageSlug.charAt(0) === '/' ? pageSlug : `/${pageSlug}`

            if (i < 2) {
              return (
                <li key={i}>
                  <NavLink to={slug}>{pageTitle}</NavLink>
                </li>
              )
            } else if (i === 2) {
              return (
                <li key={i}>
                  <NavLink to={slug}>
                    <svg
                      width='100'
                      height='70'
                      viewBox='0 0 100 70'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g fill='#FFF' fillRule='nonzero'>
                        <path d='M6.93594712,0.00369979804 L6.93594712,34.2175285 C6.93594712,34.2175285 6.93594712,40.3309108 15.5140187,40.3309108 C24.0920903,40.3309108 24.1513563,34.2138287 24.1513563,34.2138287 L24.1513563,0 L30.2356971,0 L30.2356971,34.2138287 C30.2356971,34.2138287 30.4162298,40.3309108 39.0654206,40.3309108 C47.7146114,40.3309108 47.4766355,34.2175285 47.4766355,34.2175285 L47.534078,0 L89.3705589,0 C89.3705589,0 100,0.407198078 100,8.06618215 L100,17.0702925 C100,21.0407223 98.4016042,26.3534234 93.198997,26.4715749 C93.198997,26.3534234 99.3043082,27.343487 99.3043082,34.026243 C99.3043082,40.7089991 99.2523364,47.8124144 99.2523364,47.8124144 L93.7807158,47.834336 L93.7807158,35.0474409 C93.7807158,35.0474409 93.4470025,29.0757729 87.8504673,29.0757729 C82.2539321,29.0757729 54.2311375,29.1078393 54.2311375,29.1078393 C54.2311375,29.1078393 54.2056075,27.1411766 54.2056075,35.0474409 C54.2056075,42.9537052 46.1794897,48 40.182357,48 L32.7276043,48 L20.3510372,48 L14.7654434,48 C6.62842018,48 6.52286488e-14,41.7712824 1.93638313e-14,34.5596645 C-2.64208095e-14,27.3480467 2.33520633e-14,0.00369979804 2.33520633e-14,0.00369979804 L6.93594712,0.00369979804 Z M55.300661,5.32838658 L55.2850101,22.7619546 L90.0533394,22.7619546 C94.826378,22.7619546 95.2240711,17.3822762 95.2240711,17.3822762 L95.2240711,10.2156786 C95.2240711,6.641486 90.4098867,5.32838658 90.4098867,5.32838658 L55.300661,5.32838658 Z' />
                        <polygon points='11.4615385 55.5168539 11.4615385 69 7.35164835 69 7.35164835 55.5168539 1 55.5168539 1 53 18 53 18 55.5168539' />
                        <rect x='20' y='53' width='5' height='16' />
                        <polygon points='32.2857143 66.3033708 43 66.3033708 43 69 32.2857143 69 28 69 28 53 32.2857143 53' />
                        <polygon points='48.2592593 66.4831461 48.2592593 61.988764 58.2592593 61.988764 58.2592593 59.8314607 48.2592593 59.8314607 48.2592593 55.3370787 58.8148148 55.3370787 58.8148148 53 44 53 44 69 59 69 59 66.4831461' />
                        <path d='M73.625,53 C79.4375,53 80,54.5112174 80,58.3914782 C80,62.2717391 76.0625,62.345229 76.25,62.345229 C79.4581463,62.345229 79.8125,64.1423884 79.8125039,64.5018203 C79.8125077,64.8612521 79.8125039,69 79.8125039,69 L75.6875,69 L75.6875,65.9395478 C75.6875,65.0409681 74.9375,63.6032406 73.625,63.6032406 L66.3125,63.6032406 L66.3125,68.9947188 L62,68.9947188 L62,53 L73.625,53 Z M73.625,55.5160232 L66.3125,55.5160232 L66.3125,61.0872174 L73.625,61.0872174 C73.6251016,61.0872134 75.875,60.999933 75.875,58.0320464 C75.875,55.0640927 73.625,55.5160232 73.625,55.5160232 Z' />
                        <path d='M82.8600805,67.9450549 C84.37457,69.8131868 87.403549,70 91.0004617,70 C94.5973743,70 97.0584198,69.6263736 97.6263533,69.2527473 C98.1942869,68.8791209 99.5194652,68.8791209 99.8980876,66.6373626 C100.27671,64.3956044 99.5194652,61.7802198 98.9515317,61.2197802 C98.3835981,60.6593407 94.0294407,59.9120879 90.9104804,59.9120879 C87.7915201,59.9120879 87.2142379,59.5384615 86.8356155,58.978022 C86.4569931,58.4175824 86.0783707,56.1758242 87.403549,55.8021978 C88.7287274,55.4285714 92.32564,55.4285714 93.8401295,55.6153846 C95.3546191,55.8021978 95.3546191,58.043956 95.3546191,58.043956 L99.5194652,58.043956 C99.5194652,58.043956 99.7087764,55.8021978 98.3835981,54.3076923 C97.4370422,53.3736264 94.7866855,53 91.1897729,53 C87.5928602,53 85.8890595,53 84.37457,53.7472527 C82.8600805,54.4945055 82.4814581,56.1758242 82.4814581,58.4175824 C82.4814581,60.6593407 83.428014,61.5934066 84.7531924,61.967033 C86.0783707,62.3406593 92.5149512,62.9010989 94.0294407,62.9010989 C95.5439302,62.9010989 95.9225526,63.8351648 95.9225526,64.7692308 C95.9225526,65.7032967 95.3546191,67.3846154 93.8401295,67.3846154 L88.5394162,67.3846154 C85.6997483,67.3846154 86.2676819,64.5824176 86.2676819,64.5824176 L82.2921469,64.5824176 C82.2921469,64.5824176 81.3455909,66.0769231 82.8600805,67.9450549 Z' />
                      </g>
                    </svg>
                  </NavLink>
                </li>
              )
            } else if (i > 2 && i < 5) {
              return (
                <li key={i}>
                  <NavLink to={slug}>{pageTitle}</NavLink>
                </li>
              )
            }
          })}
        </Navigation>
        {this.state.isMobile ? (
          <Hamburger isOpen={this.state.isOpen} onClick={this._toggleMenu} />
        ) : null}
      </Container>
    )
  }

  _toggleMenu() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
  }
}
