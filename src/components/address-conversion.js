/*
  Component for looking up the balance of a BCH address.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

// let _this

class AddressConversion extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      balance: '',
      textInput: '',
      wallet: props.wallet,

      // Address conversion
      displayAddrs: false,
      bchAddr: '',
      xecAddr: '',
      slpAddr: '',
      legacyAddr: '',
      message: ''
    }

    // Bind 'this' to event handlers
    this.handleConvertAddress = this.handleConvertAddress.bind(this)

    // _this = this
  }

  render () {
    return (

      <>
        <Container>
          <Row>
            <Col className='text-break' style={{ textAlign: 'center' }}>
              <Form>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Enter a Bitcoin Cash (BCH) or eCash (XEC) address and it will be converted to several different formats.</Form.Label>
                  <Form.Control type='text' placeholder='bitcoincash:qqlrzp23w08434twmvr4fxw672whkjy0py26r63g3d' onChange={e => this.setState({ textInput: e.target.value })} />
                </Form.Group>

                <Button variant='primary' onClick={this.handleConvertAddress}>
                  Convert Address
                </Button>
              </Form>
            </Col>
          </Row>
          <br />

          <Row>
            <Col xs={1} lg={2} />
            <Col xs={10} lg={8}>
              <p>{this.state.message}</p>
              {
                this.state.displayAddrs
                  ? (
                    <>
                      <h2>Addresses</h2>
                      <ul>
                        <li><b>Bitcoin Cash:</b> {this.state.bchAddr}</li>
                        <li><b>Simple Ledger:</b> {this.state.slpAddr}</li>
                        <li><b>eCash:</b> {this.state.xecAddr}</li>
                        <li><b>Legacy:</b> {this.state.legacyAddr}</li>
                      </ul>
                    </>
                    )
                  : null
              }

            </Col>
            <Col xs={1} lg={2} />
          </Row>
        </Container>
      </>
    )
  }

  async handleConvertAddress (event) {
    try {
      const textInput = this.state.textInput

      const bchjs = this.state.wallet.bchjs

      await this.setState({ displayAddrs: false, message: '' })

      if (textInput.includes('bitcoincash')) {
        const bchAddr = textInput
        const slpAddr = bchjs.SLP.Address.toSLPAddress(textInput)
        const xecAddr = bchjs.Address.toEcashAddress(textInput)
        const legacyAddr = bchjs.Address.toLegacyAddress(textInput)

        this.setState({ displayAddrs: true, bchAddr, slpAddr, xecAddr, legacyAddr })

        return
      }

      if (textInput.includes('simpleledger')) {
        const bchAddr = bchjs.SLP.Address.toCashAddress(textInput)
        const slpAddr = textInput
        const xecAddr = bchjs.Address.toEcashAddress(bchAddr)
        const legacyAddr = bchjs.Address.toLegacyAddress(bchAddr)

        this.setState({ displayAddrs: true, bchAddr, slpAddr, xecAddr, legacyAddr })

        return
      }

      if (textInput.includes('ecash')) {
        const bchAddr = bchjs.Address.ecashtoCashAddress(textInput)
        const slpAddr = bchjs.SLP.Address.toSLPAddress(bchAddr)
        const xecAddr = textInput
        const legacyAddr = bchjs.Address.toLegacyAddress(bchAddr)

        this.setState({ displayAddrs: true, bchAddr, slpAddr, xecAddr, legacyAddr })

        return
      }

      if (textInput.includes('etoken')) {
        const bchAddr = bchjs.Address.ecashtoCashAddress(textInput)
        const slpAddr = bchjs.SLP.Address.toSLPAddress(bchAddr)
        const xecAddr = bchjs.Address.toEcashAddress(bchAddr)
        const legacyAddr = bchjs.Address.toLegacyAddress(bchAddr)

        this.setState({ displayAddrs: true, bchAddr, slpAddr, xecAddr, legacyAddr })

        return
      }

      if (textInput[0] === '1') {
        const bchAddr = bchjs.Address.toCashAddress(textInput)
        const slpAddr = bchjs.SLP.Address.toSLPAddress(bchAddr)
        const xecAddr = bchjs.Address.toEcashAddress(bchAddr)
        const legacyAddr = bchjs.Address.toLegacyAddress(bchAddr)

        this.setState({ displayAddrs: true, bchAddr, slpAddr, xecAddr, legacyAddr })

        return
      }

      this.setState({ message: 'Error: Could not parse input address.' })
    } catch (err) {
      console.log('Error: ', err)
      this.setState({
        message: `Error: ${err.message}`
      })
    }
  }
}

export default AddressConversion
