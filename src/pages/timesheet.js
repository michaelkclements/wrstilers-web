import React, { Component } from 'react'
import { graphql, navigate } from 'gatsby'
import styled from 'styled-components'
import { Layout, Section, Banner, Input } from '../components'

const FlexContainer = styled.div`
  display: flex;

  > * {
    margin-right: 5px;
  }
  > *::last-child {
    margin-right: 0;
  }
`

const Buttons = styled.span`
  display: flex;
  justify-content: center;

  button,
  input {
    -webkit-appearance: none;
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

class TimesheetForm extends Component {
  constructor(props) {
    super(props)
    this.TimesheetForm = React.createRef()
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
    const form = this.TimesheetForm.current

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
        name='timesheet'
        method='post'
        action='/thanks/'
        data-netlify='true'
        data-netlify-honeypot='bot-field'
        onSubmit={this.handleSubmit}
        ref={this.TimesheetForm}
      >
        <input type='hidden' name='form-name' value='timesheet' />
        <p hidden>
          <label>
            Don’t fill this out: <input name='bot-field' onChange={this.handleChange} />
          </label>
        </p>
        <Input
          alwaysFocus
          labelText='Your name'
          type='text'
          name='name'
          id='name'
          onChange={this.handleChange}
        />
        <Input
          alwaysFocus
          labelText='Week commencing'
          type='date'
          name='week'
          id='week'
          onChange={this.handleChange}
        />
        <Input
          alwaysFocus
          labelText='Job Reference'
          type='text'
          name='ref'
          id='ref'
          onChange={this.handleChange}
        />
        <>
          <h4>Monday</h4>
          <FlexContainer>
            <Input
              alwaysFocus
              labelText='Monday normal hours'
              type='number'
              name='mondaynormalhours'
              id='mondaynormalhours'
              onChange={this.handleChange}
            />
            <Input
              alwaysFocus
              labelText='Monday extra hours'
              type='number'
              name='mondayextrahours'
              id='mondayextrahours'
              onChange={this.handleChange}
            />
          </FlexContainer>
        </>
        <>
          <h4>Tuesday</h4>
          <FlexContainer>
            <Input
              alwaysFocus
              labelText='Tuesday normal hours'
              type='number'
              name='tuesdaynormalhours'
              id='tuesdaynormalhours'
              onChange={this.handleChange}
            />
            <Input
              alwaysFocus
              labelText='Tuesday extra hours'
              type='number'
              name='tuesdayextrahours'
              id='tuesdayextrahours'
              onChange={this.handleChange}
            />
          </FlexContainer>
        </>
        <>
          <h4>Wednesday</h4>
          <FlexContainer>
            <Input
              alwaysFocus
              labelText='Wednesday normal hours'
              type='number'
              name='wednesdaynormalhours'
              id='wednesdaynormalhours'
              onChange={this.handleChange}
            />
            <Input
              alwaysFocus
              labelText='Wednesday extra hours'
              type='number'
              name='wednesdayextrahours'
              id='wednesdayextrahours'
              onChange={this.handleChange}
            />
          </FlexContainer>
        </>
        <>
          <h4>Thursday</h4>
          <FlexContainer>
            <Input
              alwaysFocus
              labelText='Thursday normal hours'
              type='number'
              name='thursdaynormalhours'
              id='thursdaynormalhours'
              onChange={this.handleChange}
            />
            <Input
              alwaysFocus
              labelText='Thursday extra hours'
              type='number'
              name='thursdayextrahours'
              id='thursdayextrahours'
              onChange={this.handleChange}
            />
          </FlexContainer>
        </>
        <>
          <h4>Friday</h4>
          <FlexContainer>
            <Input
              alwaysFocus
              labelText='Friday normal hours'
              type='number'
              name='fridaynormalhours'
              id='fridaynormalhours'
              onChange={this.handleChange}
            />
            <Input
              alwaysFocus
              labelText='Friday extra hours'
              type='number'
              name='fridayextrahours'
              id='fridayextrahours'
              onChange={this.handleChange}
            />
          </FlexContainer>
        </>
        <>
          <h4>Saturday</h4>
          <FlexContainer>
            <Input
              alwaysFocus
              labelText='Saturday normal hours'
              type='number'
              name='saturdaynormalhours'
              id='saturdaynormalhours'
              onChange={this.handleChange}
            />
            <Input
              alwaysFocus
              labelText='Saturday extra hours'
              type='number'
              name='saturdayextrahours'
              id='saturdayextrahours'
              onChange={this.handleChange}
            />
          </FlexContainer>
        </>
        <>
          <h4>Sunday</h4>
          <FlexContainer>
            <Input
              alwaysFocus
              labelText='Sunday normal hours'
              type='number'
              name='sundaynormalhours'
              id='sundaynormalhours'
              onChange={this.handleChange}
            />
            <Input
              alwaysFocus
              labelText='Sunday extra hours'
              type='number'
              name='sundayextrahours'
              id='sundayextrahours'
              onChange={this.handleChange}
            />
          </FlexContainer>
        </>
        <Input
          alwaysFocus
          labelText='Other'
          type='text'
          name='other'
          id='other'
          onChange={this.handleChange}
        />

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
    <Banner fluid={data.timesheet.bannerImage.fluid} title={data.timesheet.pageTitle} />

    <Section overlaps isPadded>
      <TimesheetForm />
    </Section>
  </Layout>
)

export const timesheetQuery = graphql`
  query timesheetQuery {
    timesheet: contentfulPage(pageSlug: { regex: "/timesheet/" }) {
      pageTitle
      bannerImage {
        fluid(maxWidth: 1920, quality: 90) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`
