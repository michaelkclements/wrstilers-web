import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Section, Banner } from '../components'

export default ({ data, transition }) => (
  <Layout>
    <Banner fluid={data.aboutUs.bannerImage.fluid} title={data.aboutUs.pageTitle} />
    <Section
      overlaps
      isPadded
      dangerouslySetInnerHTML={{ __html: data.aboutUs.content.childContentfulRichText.html }}
    />
  </Layout>
)

export const aboutUsQuery = graphql`
  query aboutUsQuery {
    aboutUs: contentfulPage(pageSlug: { regex: "/about-us/" }) {
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
