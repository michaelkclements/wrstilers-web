import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled, { createGlobalStyle } from 'styled-components'

import { Header, Button } from '../'

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
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 2rem;
  width: 100%;

  @media (min-width: 737px) {
    flex-direction: row;
  }
`

const SmallText = styled.span`
  color: #51545d;
  font-size: 12px;
  text-transform: uppercase;
`

const StyledButton = styled(props => <Button {...props} />)`
  margin-bottom: 3rem;
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
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: 'North East Ceramic Wall & Floor Tiling Specialists',
            },
            {
              name: 'keywords',
              content: 'tiling, tiles, tilers, northeast, north east, award, safemark, tta, fmb',
            },
            // { property: 'og:image', content: OgImage },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            {
              property: 'og:title',
              content: 'W Rodgerson & Sons - North East Ceramic Wall & Floor Tiling Specialists',
            },
            {
              property: 'og:description',
              content: 'North East Ceramic Wall & Floor Tiling Specialists',
            },
            { property: 'og:url', content: 'https://www.wrstilers.co.uk' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: 'https://www.wrstilers.co.uk' },
            { name: 'twitter:creator', content: '@wrstilers' },
          ]}
        >
          <html lang='en' />
        </Helmet>
        <GlobalStyle />
        <Header data={data.allContentfulPage.edges} />
        {children}
        <Footer>
          <Inner>
            <StyledButton
              color='#6E7383'
              href='tel:01912375763'
              prefix='Call us'
              title='0191 237 5763'
            />

            <Logos>
              {data.allContentfulAsset.edges.map((logo, i) => (
                <Img key={i} fixed={logo.node.fixed} />
              ))}
            </Logos>
            <SmallText>WRS Tilers © {date.getFullYear()} All Rights Reserved</SmallText>
          </Inner>
        </Footer>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
