import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { Layout, Section, Banner } from '../components'

const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  width: 100%;
`

const Image = styled(Img)`
  border-radius: 3px;
  box-shadow: 0 4px 6px rgba(33, 57, 91, 0.15);
  margin: 10px;
  width: calc(50% - 20px);
`

export default ({ data, transition }) => (
  <Layout>
    <Banner fluid={data.gallery.bannerImage.fluid} title={data.gallery.pageTitle} />
    <Section overlaps style={{ maxWidth: `1000px` }}>
      <Images>
        {data.gallery.imageTiles.map((image, i) => (
          <Image fluid={image.fluid} />
        ))}
      </Images>
    </Section>
  </Layout>
)

export const galleryQuery = graphql`
  query galleryQuery {
    gallery: contentfulPage(pageSlug: { regex: "/gallery/" }) {
      pageTitle
      bannerImage {
        fluid(maxWidth: 1920, quality: 90) {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      imageTiles {
        fluid(maxWidth: 320, maxHeight: 320, quality: 90) {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
    }
  }
`
