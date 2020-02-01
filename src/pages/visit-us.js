import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Section, Banner } from '../components'

export default ({ data, transition }) => (
  <Layout>
    <Banner fluid={data.visitUs.bannerImage.fluid} title={data.visitUs.pageTitle} />

    <Section style={{ marginTop: '-50px', maxWidth: '100%', transition: 'none' }}>
      <iframe
        allow='fullscreen'
        frameBorder='0'
        height='600'
        style={{ border: 0 }}
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8352.744606516297!2d-1.480457378254881!3d55.08229030981735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc99401733713dd38!2sW+Rodgerson+%26+Sons!5e0!3m2!1sen!2suk!4v1524431695588'
        title='google'
        width='100%'
      />
    </Section>
    <Section
      overlaps
      isPadded
      dangerouslySetInnerHTML={{ __html: data.visitUs.content.childContentfulRichText.html }}
    />
  </Layout>
)

export const visitUsQuery = graphql`
  query visitUsQuery {
    visitUs: contentfulPage(pageSlug: { regex: "/visit-us/" }) {
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
