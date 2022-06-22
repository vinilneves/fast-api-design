import {useEffect, useState} from 'react';
import ReactAce from 'react-ace'
import styled from "styled-components";
import * as YAML from 'yaml';

import "ace-builds/webpack-resolver";
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-one_dark';

import RequestsService from '../../services/requests'

const requestService = new RequestsService()

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1px;
  background: grey;
  width: ${props => props.width || 'inherit' };
  margin: 0 auto;
`

const Column = styled.div`
  flex-grow: ${props => props.flexGrow || 1 };
`

const Message = styled.div`
  line-height: 2em;
  vertical-align: middle;
  margin-bottom: 0px;
`

const SuccessMessage = styled(Message)`
  background: green;
  color: white;
`

const ErrorMessage = styled(Message)`
  background: red;
  color: white;
`

const Editor = (props) => {
    const [requests, setRequests] = useState({})
    const [editorContent, setEditorContent] = useState('')
    const [YAMLIsValid, setYAMLIsValid] = useState(true)

    useEffect(() => {
        const fetchRequests = async () => {
            const requests = await requestService.list()

            setRequests({ requests })
            setEditorContent(YAML.stringify({ requests }))
        }

        fetchRequests()
    }, [])

    const onEditorContentChange = (value) => {
        setEditorContent(value)

        try {
            let parsedYAML = YAML.parse(value)
            setYAMLIsValid(true)
            setRequests(parsedYAML)
        } catch (e) {
            setYAMLIsValid(false)
        }
    }

    return (
        <>
            { YAMLIsValid ?
                <SuccessMessage>YAML Válido.</SuccessMessage> :
                <ErrorMessage>YAML Inválido.</ErrorMessage>
            }
            <Row width='90%'>
                <Column>
                    <div style={{ fontWeight: 'bold', background: '#282c34', color: 'white', fontSize: '1.5em' }}>
                        Definições
                    </div>
                    <ReactAce
                      width='100%'
                      height='100%'
                      value={editorContent}
                      onChange={onEditorContentChange}
                      mode='yaml'
                      theme='one_dark'
                    />
                </Column>
                <Column>
                    <div style={{ fontWeight: 'bold', background: 'white', color: '#282c34', fontSize: '1.5em' }}>
                        Requests
                    </div>
                    { requests?.requests && requests.requests.map(request => (
                        <Row style={{ borderBottom: '1px solid gray' }}>
                            <Column>
                                <div style={{ textAlign: 'left', background: 'white', padding: '2em' }}>
                                    <h1>{ request.method }</h1>
                                    <h2>{ request.path }</h2>
                                    { request?.samples && request.samples.map(sample => (
                                      <>
                                          <h3>{ sample.name }</h3>
                                          <h4>{ sample.description }</h4>
                                          <h3>{ JSON.stringify(sample.headers) }</h3>
                                          <h3>Headers</h3>
                                          { sample.headers && Object.keys(sample.headers).map(header => (
                                            <p><pre>{ sample.headers[header] }</pre></p>
                                          )) }
                                          <h3>Params</h3>
                                          { sample.params && (
                                            <p><pre>{ JSON.stringify(sample.params, null, 2) }</pre></p>
                                          ) }
                                          <h3>Response</h3>
                                          { sample.response && (
                                            <p><pre>{ JSON.stringify(sample.response, null, 2) }</pre></p>
                                          ) }
                                      </>
                                    )) }
                                </div>
                            </Column>
                        </Row>
                    )) }
                </Column>
            </Row>
        </>
    )
}

export default Editor