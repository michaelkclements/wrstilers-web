import React from 'react'
import styled, { keyframes } from 'styled-components'
import Img from 'gatsby-image'
import { Button } from '../'

const SloganEnter = keyframes`
  from {
    opacity: 0;
    transform: translateZ(100px);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
`

const Container = styled.div`
  align-items: center;
  background-color: #51545d;
  height: 90vh;
  justify-content: center;
  overflow: hidden;
  position: relative;
  z-index: 1;

  @media (min-width: 1100px) {
    height: 70vh;
  }

  @media (min-width: 1450px) {
    height: 60vh;
  }
`

const Image = styled(Img)`
  height: 100%;
`

const Inner = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 50%;
  perspective: 1000px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-style: flat;
  width: 100%;
  z-index: 2;
`

const Slogan = styled.div`
  animation: 2s cubic-bezier(0.165, 0.84, 0.44, 1) 500ms 1 both ${SloganEnter};
  background-color: rgba(0, 0, 0, 0.1);
  border: 2px solid #fff;
  color: #fff;
  display: flex;
  flex-direction: column;
  font-family: 'Raleway', sans-serif;
  margin-bottom: 50px;
  padding: 20px 0;
  position: relative;
  text-align: center;
  width: 300px;

  @media (min-width: 737px) {
    width: 560px;
  }
`

const SloganTitle = styled.h1`
  font-size: 26px;
  line-height: 30px;
  margin: 0;
  text-transform: uppercase;

  @media (min-width: 737px) {
    font-size: 50px;
    line-height: 44px;
  }
`

const SloganSub = styled.h2`
  font-family: georgia, serif;
  font-size: 14px;
  font-style: italic;
  font-weight: 100;
  margin: 0;
  position: absolute;
  top: calc(100% - 10px);
  width: 100%;

  &::before,
  &::after {
    background-color: #fff;
    content: '';
    height: 2px;
    top: 50%;
    position: absolute;
    width: 7%;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }

  @media (min-width: 737px) {
    font-size: 20px;
    top: calc(100% - 13px);

    &::before,
    &::after {
      width: 15%;
    }
  }
`

const Text = styled.div`
  color: #fff;
  font-family: georgia, serif;

  p {
    font-size: 2rem;
  }
`

const StyledButton = styled.div`
  animation: 2s cubic-bezier(0.165, 0.84, 0.44, 1) 800ms 1 both ${SloganEnter};
`

export default ({
  buttonHref,
  buttonPrefix,
  buttonTitle,
  className,
  fixed,
  fluid,
  style,
  title,
  subtitle,
}) => (
  <Container className={className} style={style}>
    <Image fluid={fluid} fixed={fixed} />
    <Inner>
      {!title ? (
        <Slogan style={{ borderBottom: 0 }}>
          <SloganTitle>The North East tiling specialists</SloganTitle>
          <SloganSub>Award winning tilers ever since 1969</SloganSub>
        </Slogan>
      ) : (
        <>
          <Slogan>
            <SloganTitle>{title}</SloganTitle>
          </Slogan>
          <Text dangerouslySetInnerHTML={{ __html: subtitle }} />
        </>
      )}
      {buttonHref || buttonTitle ? (
        <StyledButton>
          <Button href={buttonHref} prefix={buttonPrefix} title={buttonTitle} />
        </StyledButton>
      ) : null}
    </Inner>
  </Container>
)
