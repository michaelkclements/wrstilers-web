import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Section, Banner } from '../components'

export default ({ data, location }) => (
  <Layout location={location.origin}>
    <Banner fluid={data.services.bannerImage.fluid} title={data.services.pageTitle} />

    <Section
      overlaps
      isPadded
      dangerouslySetInnerHTML={{
        __html: data.services.content.childContentfulRichText.html,
      }}
    />
  </Layout>
)

export const servicesQuery = graphql`
  query servicesQuery {
    services: contentfulPage(pageSlug: { regex: "/our-services/" }) {
      pageTitle
      bannerImage {
        fluid(maxWidth: 1920, quality: 90) {
          ...GatsbyContentfulFluid
        }
      }
      content {
        childContentfulRichText {
          html
        }
      }
    }
  }
`
