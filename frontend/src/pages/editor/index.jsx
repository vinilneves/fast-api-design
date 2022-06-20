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
  align-items: center;
  gap: 1px;
  background: grey;
`

const Column = styled.div`
  flex-grow: 1;
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
            <Row>
                <Column>
                    <ReactAce
                        width='100%'
                        value={editorContent}
                        onChange={onEditorContentChange}
                        mode='yaml'
                        theme='one_dark'

                    />
                </Column>
                <Column>
                    <ReactAce
                        width='100%'
                        value={JSON.stringify(requests, null, 4)}
                        mode='json'
                        theme='github'
                        readOnly={true}
                    />
                </Column>
                <Column>
                    <ReactAce
                        width='100%'
                        value={JSON.stringify(requests, null, 4)}
                        mode='json'
                        theme='github'
                        readOnly={true}
                    />
                </Column>
            </Row>
        </>
    )
}

export default Editor