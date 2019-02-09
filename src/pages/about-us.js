import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Section, Banner } from '../components'

export default ({ data, transition }) => (
  <Layout>
    <Banner fluid={data.aboutUs.bannerImage.fluid} title={data.aboutUs.pageTitle} />
    <Section
      style={{
        backgroundColor: '#fff',
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 15px',
        margin: '-50px',
        padding: '50px',
      }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: data.aboutUs.mainContent.childMarkdownRemark.html }}
      />
    </Section>
  </Layout>
)

export const aboutUsQuery = graphql`
  query aboutUsQuery {
    aboutUs: contentfulPage(pageSlug: { regex: "/about-us/" }) {
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
