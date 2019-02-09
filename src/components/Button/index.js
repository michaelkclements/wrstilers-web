import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const BtnHref = styled.a`
  border: 2px solid #ffaf00;
  color: ${props => (props.color ? props.color : '#fff')};
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
`

const BtnLink = styled(Link)`
  border: 2px solid #ffaf00;
  color: ${props => (props.color ? props.color : '#fff')};
  font-family: 'Raleway', sans-serif;
  font-size: 1.6rem;
  font-weight: 800;
  padding: 15px 20px;
  position: relative;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    background-color: rgba(255, 175, 0, 0.1);
    backdrop-filter: blur(3px);
  }
`

const Prefix = styled.span`
  top: -10px;
  font-family: georgia, serif;
  font-size: 0.9rem;
  font-weight: normal;
  left: 0;
  position: absolute;
  text-align: center;
  width: 100%;

  &::before,
  &::after {
    background-color: #ffaf00;
    content: '';
    height: 2px;
    top: 10px;
    position: absolute;
    width: 35%;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`

export default ({ children, className, color, href, prefix, title, to }) =>
  href ? (
    <BtnHref
      color={color}
      className={className}
      href={href}
      style={{ borderTopWidth: prefix ? 0 : '2px' }}
    >
      <Prefix>{prefix}</Prefix>
      {title}
    </BtnHref>
  ) : (
    <BtnLink
      color={color}
      className={className}
      style={{ borderTopWidth: prefix ? 0 : '2px' }}
      to={to}
    >
      <Prefix>{prefix}</Prefix>
      {title}
    </BtnLink>
  )
