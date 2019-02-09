import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Section, Banner } from '../components'

export default ({ data, transition }) => (
  <Layout>
    <Banner fluid={data.thanks.bannerImage.fluid} title={data.thanks.pageTitle} />

    <Section
      style={{
        backgroundColor: '#fff',
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 15px',
        margin: '-50px',
        padding: '50px',
      }}
    >
      THANKS
    </Section>
  </Layout>
)

export const thanksQuery = graphql`
  query thanksQuery {
    thanks: contentfulPage(pageSlug: { regex: "/thanks/" }) {
      pageTitle
      bannerImage {
        fluid(maxWidth: 1920, quality: 90) {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      mainContent {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
