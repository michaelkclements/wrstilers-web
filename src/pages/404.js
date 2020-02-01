import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Section, Banner } from '../components'

export default ({ data, location }) => (
  <Layout location={location.origin}>
    <Banner
      buttonHref='tel:01912375763'
      buttonPrefix='Call us'
      buttonTitle='0191 237 5763'
      fluid={data.fourOhFour.bannerImage.fluid}
    />

    <Section isPadded>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Section>
  </Layout>
)

export const fourOhFour = graphql`
  query fourOhFourQuery {
    fourOhFour: contentfulPage(pageTitle: { regex: "/Homepage/" }) {
      bannerImage {
        fluid(maxWidth: 2560, quality: 90) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`
