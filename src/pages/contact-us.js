import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Section, Banner } from '../components'

export default ({ data, transition }) => (
  <Layout>
    <Banner fluid={data.contactUs.bannerImage.fluid} title={data.contactUs.pageTitle} />

    <Section isPadded>
      <form
        name='contact_wrstilers'
        method='post'
        action='/thanks'
        data-netlify='true'
        data-netlify-honeypot='bot-field'
      >
        <input type='hidden' name='bot-field' />
        <div className='field half first'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' id='name' />
        </div>
        <div className='field half'>
          <label htmlFor='email'>Email</label>
          <input type='text' name='email' id='email' />
        </div>
        <div className='field'>
          <label htmlFor='message'>Message</label>
          <textarea name='message' id='message' rows='6' />
        </div>
        <ul className='actions'>
          <li>
            <input type='submit' value='Send Message' className='special' />
          </li>
          <li>
            <input type='reset' value='Clear' />
          </li>
        </ul>
      </form>
    </Section>
  </Layout>
)

export const contactUsQuery = graphql`
  query contactUsQuery {
    contactUs: contentfulPage(pageSlug: { regex: "/contact-us/" }) {
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
