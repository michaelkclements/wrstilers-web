import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Section, Banner } from '../components'

export default ({ data, transition }) => (
  <Layout>
    <Banner fluid={data.services.bannerImage.fluid} title={data.services.pageTitle} />

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
        dangerouslySetInnerHTML={{
          __html: data.services.content.childContentfulRichText.html,
        }}
      />
    </Section>
  </Layout>
)

export const servicesQuery = graphql`
  query servicesQuery {
    services: contentfulPage(pageSlug: { regex: "/our-services/" }) {
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
