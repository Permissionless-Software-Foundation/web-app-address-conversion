/*
  A footer section for the SPA
*/

// Global npm libraries
// import React, { useEffect, useState } from 'react'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

// Local libraries
import config from '../../config'

function Footer (props) {
  return (
    <Container style={{ backgroundColor: '#ddd' }}>
      <Row style={{ padding: '25px' }}>
        <Col>
          <h6>Site Mirrors</h6>
        </Col>

        <Col>
          <h6>Source Code</h6>
          <ul>
            <li>
              <a href={config.ghRepo} target='_blank' rel='noreferrer'>GitHub</a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
