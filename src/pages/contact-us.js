import React, { Component } from 'react'
import { graphql, navigate } from 'gatsby'
import styled from 'styled-components'
import { Layout, Section, Banner, Input } from '../components'

const TextAreaContainer = styled.div`
  position: relative;

  label {
    align-items: center;
    display: flex;
    font-size: 1.6rem;
    font-weight: bold;
    padding-left: 2rem;
    pointer-events: none;
    position: absolute;
    top: 1rem;
    transition-duration: 300ms;
    transition-property: color, font-size, font-weight, transform;
    transition-timing-function: ease;
  }
`

const Textarea = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 1.4rem;
  font-weight: bold;
  height: 10rem;
  padding: 4rem 2rem;
  width: 100%;
`

const Buttons = styled.span`
  display: flex;
  justify-content: center;

  button,
  input {
    background-color: #fff;
    border: 2px solid #ffaf00;
    color: #6e7383;
    cursor: pointer;
    display: inline-block;
    font-family: 'Raleway', sans-serif;
    font-size: 1.6rem;
    font-weight: 800;
    padding: 15px 20px;
    position: relative;
    text-decoration: none;
    transition: all 500ms cubic-bezier(0.165, 0.84, 0.44, 1);

    &:hover {
      background-color: rgba(255, 175, 0, 0.1);
      backdrop-filter: blur(3px);
    }
  }
`

class ContactForm extends Component {
  constructor(props) {
    super(props)
    this.ContactForm = React.createRef()
    this.state = {}
  }
  encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = this.ContactForm.current

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: this.encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(response => {
        console.log(`${JSON.stringify(response, null, 2)}`)
        navigate(form.getAttribute('action'))
      })
      .catch(error => {
        console.log(`error in submiting the form data:${error}`)
      })
  }
  render() {
    return (
      <form
        name='contact'
        method='post'
        action='/thanks/'
        data-netlify='true'
        data-netlify-honeypot='bot-field'
        onSubmit={this.handleSubmit}
        ref={this.ContactForm}
      >
        <input type='hidden' name='form-name' value='contact' />
        <p hidden>
          <label>
            Don’t fill this out: <input name='bot-field' onChange={this.handleChange} />
          </label>
        </p>
        <Input
          labelText='Your name'
          type='text'
          name='name'
          id='name'
          onChange={this.handleChange}
        />

        <Input
          labelText='Your email'
          type='email'
          name='email'
          id='email'
          onChange={this.handleChange}
        />
        <TextAreaContainer>
          <label htmlFor='message'>Message:</label>
          <Textarea name='message' onChange={this.handleChange} />
        </TextAreaContainer>
        <p>
          <Buttons>
            <button type='submit'>Submit</button>
            <input type='reset' value='Reset' />
          </Buttons>
        </p>
      </form>
    )
  }
}

export default ({ data }) => (
  <Layout>
    <Banner fluid={data.contactUs.bannerImage.fluid} title={data.contactUs.pageTitle} />

    <Section overlaps isPadded>
      <ContactForm />
    </Section>
  </Layout>
)

export const contactUsQuery = graphql`
  query contactUsQuery {
    contactUs: contentfulPage(pageSlug: { regex: "/contact-us/" }) {
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
