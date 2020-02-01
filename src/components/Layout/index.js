import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled, { createGlobalStyle } from 'styled-components'

import { Header, Button } from '../'
import SocialIcons from './SocialIcons'

// Global styles
const GlobalStyle = createGlobalStyle`
  html {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  body {
    color: #6e7383;
    font-family: georgia, serif;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  h1 {
    font-family: Raleway, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
      Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 2.25rem;
    font-weight: 700;
    margin-top: 0;
    text-transform: uppercase;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6rem;
  }
`

const Container = styled.div`
  overflow: hidden;
`

const Footer = styled.div`
  background-color: #efefef;
  display: flex;
  justify-content: center;
`

const Inner = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 760px;
  padding: 150px 0 100px;
  width: 100%;
`

const Logos = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  margin-bottom: 2rem;
  width: 100%;

  svg {
    height: 48px;
    width: 48px;
  }

  @media (min-width: 737px) {
    flex-direction: row;
  }
`

const SmallText = styled.span`
  color: #51545d;
  font-size: 12px;
  text-transform: uppercase;
`

const StyledButton = styled.button`
  background-color: transparent;
  border: 2px solid #ffaf00;
  font-family: 'Raleway', sans-serif;
  font-size: 1.6rem;
  font-weight: 800;
  margin: 30px;
  min-width: 220px;
  padding: 15px 20px;
  position: relative;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  justify-content: space-evenly;

  svg {
    width: 48px;
    height: 48px;
  }

  &::before {
    background-color: #efefef;
    color: #6e7383;
    content: 'Follow us';
    font-family: georgia, serif;
    font-size: 0.9rem;
    font-weight: normal;
    left: 0;
    padding: 5px 15px;
    position: absolute;
    text-align: center;
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, 50%);
  }
`

const date = new Date()

const Layout = ({ children, fluid }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        allContentfulPage(sort: { fields: [pageOrder] }) {
          edges {
            node {
              pageTitle
              pageSlug
              pageOrder
            }
          }
        }

        allContentfulAsset(filter: { title: { regex: "/Footer/" } }, sort: { fields: [title] }) {
          edges {
            node {
              fixed(width: 160, height: 80) {
                ...GatsbyContentfulFixed_withWebp
              }
            }
          }
        }
        ogImage: imageSharp(original: { src: { regex: "/og/" } }) {
          original {
            src
          }
        }
      }
    `}
    render={data => (
      <Container>
        <Helmet>
          <title>{data.site.siteMetadata.title}</title>
          <meta name='description' content='North East Ceramic Wall & Floor Tiling Specialists' />
          <meta
            name='keywords'
            content='wrstilers, tiling, tiles, tilers, northeast, north east, award, safemark, tta, fmb'
          />
          <meta property='og:image' content={`${__dirname}/${data.ogImage.original.src}`} />
          <meta property='og:title' content='W Rodgerson & Sons' />
          <meta
            property='og:description'
            content='North East Ceramic Wall & Floor Tiling Specialists'
          />
          <meta property='og:url' content='https://www.wrstilers.co.uk' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:creator' content='@wrstilers' />
          <meta name='twitter:image' content={`${__dirname}/${data.ogImage.original.src}`} />
          <html lang='en' />
        </Helmet>
        <GlobalStyle />
        <Header data={data.allContentfulPage.edges} />
        {children}
        <Footer>
          <Inner>
            <Button color='#6E7383' href='tel:01912375763' prefix='Call us' title='0191 237 5763' />

            <StyledButton color='#6E7383' prefix='Follow us'>
              <SocialIcons />
            </StyledButton>

            <Logos>
              {data.allContentfulAsset.edges.map((logo, i) => (
                <Img key={i} fixed={logo.node.fixed} />
              ))}
            </Logos>
            <SmallText>WRS Tilers © {date.getFullYear()} All Rights Reserved</SmallText>
          </Inner>
        </Footer>
      </Container>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
