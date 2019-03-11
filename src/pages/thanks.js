import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Section, Banner } from '../components'

export default ({ data, transition }) => (
  <Layout>
    <Banner fluid={data.thanks.bannerImage.fluid} title={data.thanks.pageTitle} />

    <Section
      isPadded
      dangerouslySetInnerHTML={{ __html: data.thanks.content.childContentfulRichText.html }}
    />
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
      content {
        childContentfulRichText {
          html
        }
      }
    }
  }
`
