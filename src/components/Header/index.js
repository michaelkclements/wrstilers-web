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
  z-index: 99;
`

const Navigation = styled.ul`
  align-items: center;
  background-color: ${props => (props.isOpen ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0)')};
  backdrop-filter: ${props => (props.isOpen ? 'blur(3px)' : 'blur(0)')};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: ${props => (props.isOpen ? '100vh' : '70vh')};
  height: ${props => (props.isOpen ? '-webkit-fill-available' : '70vh')};
  margin: 0;
  max-width: 1160px;
  list-style: none;
  padding: 0 20px 50px;
  position: ${props => (props.isOpen ? 'fixed' : 'absolute')};
  transition: background-color 300ms cubic-bezier(0.165, 0.84, 0.44, 1),
    backdrop-filter 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
  width: 100%;

  li {
    pointer-events: ${props => (props.isOpen ? 'all' : 'none')};
    transition: all 300ms cubic-bezier(0.165, 0.84, 0.44, 1);

    /* Logo */
    &:nth-child(3) {
      order: 1;
      pointer-events: all;
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
    height: auto;

    li {
      animation: 500ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s 1 both ${NavEnter};
      pointer-events: all;

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
  padding: 0;
  text-decoration: none;
  text-transform: uppercase;

  svg {
    fill: #fff;
  }

  @media (min-width: 769px) {
    padding: 40px 0;
  }
`

const Hamburger = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 30px;
  mix-blend-mode: plus-lighter;
  position: fixed;
  top: 55px;
  right: 30px;
  width: 30px;

  &::before,
  &::after {
    background-color: #bbb;
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
            const { pageTitle, pageSlug, pageOrder } = item.node

            if (pageOrder === null) {
              return false
            }

            const slug = pageSlug.charAt(0) === '/' ? pageSlug : `/${pageSlug}`

            return (
              <React.Fragment key={i}>
                {i === 2 ? (
                  <li>
                    <NavLink to={slug}>
                      <svg
                        width='140'
                        height='77'
                        viewBox='0 0 140 77'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M129.554857,9.92272818 C129.700883,10.6842327 130.098786,12.7424574 132.819978,12.7424574 C134.933885,12.7424574 135.771413,11.6511735 135.771413,10.7050853 C135.771413,9.47015045 134.724503,9.20215647 131.961589,8.54337011 C130.475828,8.17265797 127.168212,7.37022066 127.168212,4.11799398 C127.168212,2.51234704 128.235982,0.00154463401 132.631457,0.00154463401 C135.562031,0.00154463401 138.240728,1.13376128 138.366667,4.46785356 L135.331788,4.59142427 C135.20585,3.82991976 134.975607,2.45056169 132.589735,2.45056169 C131.689625,2.45056169 130.057064,2.71855567 130.057064,3.91178536 C130.057064,4.85864594 130.998896,5.27029087 133.406402,5.82635908 C135.687969,6.36157472 138.78543,7.08214644 138.78543,10.7043129 C138.78543,12.4953159 137.634216,13.9974724 136.336976,14.5736209 C134.997241,15.1914744 133.490618,15.2324072 132.799117,15.2324072 C131.187417,15.2324072 127.210706,15.0887563 126.624283,10.1891775 L129.554857,9.92272818 Z' />
                        <path d='M132.69404,20.5830191 C137.592494,20.5830191 139.957506,23.9178837 139.957506,28.2196891 C139.957506,32.0689168 137.989625,35.8154263 132.736534,35.8154263 C127.105629,35.8154263 125.452208,31.6781244 125.452208,28.2814744 C125.452208,23.5672518 128.047461,20.5830191 132.69404,20.5830191 Z M129.323841,31.4101304 C129.826049,32.2743531 130.893819,33.2629188 132.714901,33.2629188 C134.30574,33.2629188 136.838411,32.4187763 136.838411,28.1579037 C136.838411,26.4904714 136.398786,23.1355266 132.714901,23.1355266 C129.282119,23.1355266 128.57053,26.0378937 128.57053,28.1988365 C128.57053,29.8662688 128.968433,30.8131294 129.323841,31.4101304 Z' />
                        <polygon points='126.770309 41.4108626 129.700883 41.4108626 135.791501 51.2494082 135.833996 51.2494082 135.833996 41.4108626 138.638631 41.4108626 138.638631 56.1482146 135.603753 56.1482146 129.617439 46.5359579 129.575717 46.5359579 129.575717 56.1482146 126.771082 56.1482146 126.771082 41.4108626' />
                        <path d='M129.554857,71.6663791 C129.700883,72.4278837 130.098786,74.4861083 132.819978,74.4861083 C134.933885,74.4861083 135.771413,73.3948245 135.771413,72.4479639 C135.771413,71.2130291 134.724503,70.9450351 131.961589,70.2862487 C130.475828,69.9155366 127.168212,69.1130993 127.168212,65.8608726 C127.168212,64.2552257 128.235982,61.7444233 132.631457,61.7444233 C135.562031,61.7444233 138.240728,62.8766399 138.366667,66.2107322 L135.331788,66.3343029 C135.20585,65.5727984 134.975607,64.1934403 132.589735,64.1934403 C131.689625,64.1934403 130.057064,64.4614343 130.057064,65.654664 C130.057064,66.6015246 130.998896,67.0131695 133.406402,67.5692377 C135.687969,68.1044534 138.78543,68.8250251 138.78543,72.4479639 C138.78543,74.2389669 137.634216,75.7411234 136.336976,76.3172718 C134.997241,76.9351254 133.490618,76.9760582 132.799117,76.9760582 C131.187417,76.9760582 127.210706,76.8324072 126.624283,71.9328285 L129.554857,71.6663791 Z' />
                        <polygon points='8.30960265 73.5268907 8.30960265 58.8188867 0.0610375276 58.8188867 0.0610375276 56.9745938 18.6210817 56.9745938 18.6210817 58.8188867 10.3717439 58.8188867 10.3717439 73.5268907' />
                        <polygon points='21.2796909 73.5268907 21.2796909 56.9745938 23.3418322 56.9745938 23.3418322 73.5268907' />
                        <polygon points='27.5812362 56.9745938 29.6433775 56.9745938 29.6433775 71.7057673 42.5895143 71.7057673 42.5895143 73.5268907 27.5812362 73.5268907' />
                        <polygon points='45.1793598 56.9745938 61.5860927 56.9745938 61.5860927 58.8188867 47.1959161 58.8188867 47.1959161 64.0104012 60.9903974 64.0104012 60.9903974 65.8546941 47.1959161 65.8546941 47.1959161 71.6833701 61.5860927 71.6833701 61.5860927 73.527663 45.1793598 73.527663' />
                        <path d='M64.634106,73.5268907 L64.634106,56.9745938 L76.5263797,56.9745938 C81.2239514,56.9745938 83.0798013,57.5437914 83.0798013,60.9134102 L83.0798013,62.8944032 C83.0798013,64.852999 82.438521,65.717994 80.1469095,66.1960582 C81.9571744,66.4007222 82.8966887,67.4935507 82.8966887,69.4289769 L82.8966887,73.527663 L80.8345475,73.527663 L80.8345475,69.8390772 C80.8345475,67.24332 79.6663355,67.038656 76.8014349,67.038656 L66.6962472,67.038656 L66.6962472,73.527663 L64.634106,73.527663 L64.634106,73.5268907 Z M66.6962472,58.77332 L66.6962472,65.1256269 L77.1908389,65.1256269 C80.1469095,65.1256269 80.9033113,64.601996 80.9033113,62.3476028 L80.9033113,61.5505717 C80.9033113,59.2969509 80.1469095,58.7725476 77.1908389,58.7725476 L66.6962472,58.7725476 L66.6962472,58.77332 Z' />
                        <path d='M88.3970199,68.1314845 C88.3738411,68.5639819 88.3506623,68.8829488 88.3506623,69.1107823 C88.3506623,71.3644032 89.794702,71.8880341 93.2313466,71.8880341 L97.5850993,71.8880341 C101.640618,71.8880341 103.0383,71.4555366 103.0383,68.6775125 C103.0383,66.3327583 101.984437,65.9458275 99.3721854,65.9458275 L92.3374172,65.9458275 C88.0060706,65.9458275 86.3109272,64.8074323 86.3109272,61.3922467 C86.3109272,57.703661 88.4418322,56.7707021 93.483223,56.7707021 L97.2644592,56.7707021 C100.334879,56.7707021 102.351435,56.8394383 103.542826,57.8179639 C104.344812,58.5006921 104.665453,59.5711234 104.665453,61.0964493 C104.665453,61.2555466 104.665453,61.4146439 104.665453,61.5745135 L102.672075,61.5745135 C102.672075,61.4833801 102.672075,61.4146439 102.672075,61.3242828 C102.672075,58.9331896 101.641391,58.5462588 98.5477925,58.5462588 L92.8651214,58.5462588 C89.5884106,58.5462588 88.4657837,59.0698897 88.4657837,61.3011133 C88.4657837,63.737001 89.794702,64.1015346 93.002649,64.1015346 L98.9835541,64.1015346 C101.068874,64.1015346 102.558499,64.192668 103.520419,64.7618656 C104.780574,65.51333 105.101214,66.7428586 105.101214,68.7918154 C105.101214,72.5939318 103.245364,73.732327 98.2271523,73.732327 L92.56766,73.732327 C88.2139073,73.732327 86.3572848,72.5707623 86.3572848,69.3834102 C86.3572848,69.0188766 86.3804636,68.6095486 86.4036424,68.1314845 L88.3970199,68.1314845 L88.3970199,68.1314845 Z' />
                        <path d='M104.519426,20.222347 L104.519426,14.3998495 C104.519426,4.49565697 99.0963576,2.82281846 85.3714128,2.82281846 L56.648234,2.82281846 L50.6225166,2.82281846 L50.4216336,2.82281846 L50.4216336,32.669007 C50.4216336,33.1617452 50.4216336,38.4312638 50.4216336,38.8707121 C50.4216336,42.1422467 46.1281457,44.7943831 40.8317881,44.7943831 C35.5354305,44.7943831 31.2419426,42.1422467 31.2419426,38.8707121 L31.2419426,2.82281846 L31.24117,2.82281846 L25.0153422,2.82281846 L25.0145695,2.82281846 L25.0145695,38.8714845 C25.0145695,42.1430191 20.8848786,44.7951555 15.7909492,44.7951555 C10.6970199,44.7951555 6.56732892,42.1430191 6.56732892,38.8714845 C6.56732892,38.4320361 6.56732892,33.1617452 6.56732892,32.6697793 L6.56732892,2.82281846 L0.340728477,2.82281846 L0.340728477,34.3426179 C0.340728477,41.2355466 1.47880795,45.7860381 4.89381898,48.6636911 C8.44172185,51.6749549 13.5974614,52.0765597 21.0958057,52.0765597 L35.95883,52.0765597 C43.5916115,52.0765597 48.7465784,51.6749549 52.1615894,48.6636911 C55.3301325,45.8926179 56.6080574,41.2957874 56.6443709,34.3055466 L56.6474614,34.2985958 L56.6474614,34.0082046 L56.6474614,32.4017854 L86.1733996,32.4017854 C94.5424945,32.4017854 97.9567329,33.0041926 97.9567329,40.6331394 L97.9567329,51.4741525 L103.98245,51.4741525 L103.98245,39.428325 C103.98245,33.7402106 101.237307,30.5281444 95.9479029,29.9257372 C102.645033,28.5201204 104.519426,25.9768806 104.519426,20.222347 Z M98.1591611,18.6159278 C98.1591611,25.2408626 95.9494481,26.7800903 87.3130243,26.7800903 L56.648234,26.7800903 L56.648234,8.10932798 L87.3122517,8.10932798 C95.9486755,8.10932798 98.1583885,9.64855567 98.1583885,16.2734905 L98.1583885,18.6159278 L98.1591611,18.6159278 Z' />
                        <path d='M119.462031,38.1030291 L119.462031,36.3027583 L116.796468,36.314343 L116.796468,38.0744534 L114.021192,38.0744534 C113.306512,38.0744534 112.663687,36.7924072 112.663687,35.9590772 C112.663687,35.2539519 112.965011,33.8050853 114.803863,33.8050853 C115.282892,33.8050853 115.889404,33.8321163 116.467329,34.1935607 L116.467329,32.4311334 C115.914128,32.2828485 115.278256,32.2079338 114.559713,32.2079338 C113.218433,32.2079338 112.149117,32.5554764 111.350221,33.251334 C110.552097,33.9471916 110.152649,34.7851555 110.152649,35.765998 C110.152649,37.2388064 110.640177,38.0528285 111.615232,38.9510331 C110.97936,39.5349047 110.651766,39.7750953 110.303311,40.2577934 C109.945585,40.7528485 109.716887,41.4471615 109.716887,42.1909027 C109.716887,43.6397693 110.340397,44.7604012 111.127704,45.5520261 C111.915784,46.343651 113.03223,46.5066098 114.477042,46.5066098 C115.89404,46.5066098 119.462804,46.5066098 119.462804,46.5066098 C119.462804,45.6392979 119.462804,40.0284152 119.462804,40.0284152 L121.581347,40.0284152 L121.581347,38.1030291 L119.462031,38.1030291 L119.462031,38.1030291 Z M115.122958,44.7302808 C113.329691,44.7302808 112.433444,43.8320762 112.433444,42.0364393 C112.433444,41.2648947 112.712362,40.7366299 113.270971,40.0338215 L116.825055,40.0338215 L116.825055,43.3138516 C116.825055,43.7108225 116.836645,43.9270712 116.836645,44.2854263 C116.836645,44.5109428 115.922627,44.7302808 115.122958,44.7302808 Z' />
                      </svg>
                    </NavLink>
                  </li>
                ) : (
                  <li key={i}>
                    <NavLink to={slug}>{pageTitle}</NavLink>
                  </li>
                )}
              </React.Fragment>
            )
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
