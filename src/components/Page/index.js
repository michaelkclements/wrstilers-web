import React from 'react'
import styled from 'styled-components'
import { Layout } from '../'

const Container = styled.main`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
`

const Inner = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 760px;
  padding: 0;
  text-align: center;
  width: 100%;
`

export default ({ children, className }) => (
  <Layout>
    <Container>
      <Inner className={className}>{children}</Inner>
    </Container>
  </Layout>
)
