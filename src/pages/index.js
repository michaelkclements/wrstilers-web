import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { Layout, Section, Banner } from '../components'

const Tiles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: relative;
  width: 100%;

  @media (min-width: 737px) {
    display: flex;
  }
`

const Content = styled.div`
  text-align: center;
`

const Image = styled(Img)`
  border-radius: 3px;
  box-shadow: 0 4px 6px rgba(33, 57, 91, 0.15);
  flex: 1;
  margin: 5px;

  @media (min-width: 769px) {
    margin: 0 20px;
  }

  @media (min-width: 1025px) {
    height: 360px;
    flex: none;
    width: 360px;
  }
`

export default ({ data, transition }) => (
  <Layout>
    <Banner
      buttonHref='tel:01912375763'
      buttonPrefix='Call us'
      buttonTitle='0191 237 5763'
      fluid={data.home.bannerImage.fluid}
    />

    <Section style={{ marginTop: '-50px', transition: 'none', zIndex: 1 }}>
      <Tiles>
        {data.home.imageTiles.map((image, i) => (
          <React.Fragment key={i}>
            {i < 3 ? <Image key={i} fluid={image.fluid} /> : null}
          </React.Fragment>
        ))}
      </Tiles>
    </Section>

    <Section isPadded>
      <Content
        dangerouslySetInnerHTML={{
          __html: data.home.content.childContentfulRichText.html,
        }}
      />
    </Section>

    <Section style={{ marginBottom: '-50px', transition: 'none', zIndex: 1 }}>
      <Tiles>
        {data.home.imageTiles.map((image, i) => (
          <React.Fragment key={i}>
            {i > 2 && i < 6 ? <Image fluid={image.fluid} /> : null}
          </React.Fragment>
        ))}
      </Tiles>
    </Section>
  </Layout>
)

export const homeQuery = graphql`
  query homeQuery {
    home: contentfulPage(pageTitle: { eq: "Homepage" }) {
      pageTitle
      bannerImage {
        fluid(maxWidth: 2560, quality: 90) {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      content {
        childContentfulRichText {
          html
        }
      }
      imageTiles {
        fluid(maxWidth: 360, maxHeight: 360, quality: 90) {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
    }
  }
`
