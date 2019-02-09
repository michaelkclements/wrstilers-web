import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Section, Banner } from '../components'

export default ({ data, transition }) => (
  <Layout>
    <Banner fluid={data.contactUs.bannerImage.fluid} title={data.contactUs.pageTitle} />

    <Section
      style={{
        backgroundColor: '#fff',
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 15px',
        margin: '-50px',
        padding: '50px',
      }}
    >
      <form name='contact' method='POST' data-netlify='true' data-netlify-honeypot='bot-field'>
        <p>
          <label>
            Your Name: <input type='text' name='name' />
          </label>
        </p>
        <p>
          <label>
            Your Email: <input type='email' name='email' />
          </label>
        </p>
        <p>
          <label>
            Your Role:{' '}
            <select name='role[]' multiple>
              <option value='leader'>Leader</option>
              <option value='follower'>Follower</option>
            </select>
          </label>
        </p>
        <p>
          <label>
            Message: <textarea name='message' />
          </label>
        </p>
        <p>
          <button type='submit'>Send</button>
        </p>
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
      mainContent {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
