import { useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import { Row, Form, Button } from 'react-bootstrap'

import axios from 'axios';

const Create = ({ account,web3 }) => {
    const navigate = useNavigate();
    const [symbol, setSymbol] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [contractAdd, setContractAdd] = useState()

    async function compilerHandler (){
        // console.log("Nft : ",nft);
        let res;
        try {
            await axios.post('http://localhost:8000/api/compiler', {
                "name": name,
                "symbol": symbol
            }).then(function (response) {
                // console.log("Response : ",response);
                res = response.data;
            })
            console.log("Res : ",res);
            return res
        } catch (err) {
            console.log({err});
        }
        return res;

    }

    function createAnother () {
        setContractAdd()
    }
    console.log("contractADD : ",contractAdd);
    async function createErc721() {
        setLoading(true)
        const res = await compilerHandler()

        let standardtokenContract = new web3.eth.Contract(res.abi);
        console.log("Response : ",res);
        const contractTx = await standardtokenContract.deploy({
            data: "0x"+res.bytecode,
        }).send({from:account});
        console.log("Contract Tx: ",contractTx);
        setContractAdd(contractTx?._address)
        setLoading(false)
    }
    if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h2>Loading...</h2>
        </main>
    )
    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
                    <div className="content mx-auto">
                    {contractAdd == undefined ?
                        <Row className="g-4">
                            <Form.Control 
                                onChange={(e) => setName(e.target.value)} 
                                size="lg" 
                                required as="textarea" 
                                placeholder="Name" 
                            />
                            <Form.Control 
                                onChange={(e) => setSymbol(e.target.value)} 
                                size="lg" 
                                required type="textarea" 
                                placeholder="Symbol" 
                            />
                            

                            <div className="d-grid px-0">
                                <Button onClick={createErc721} variant="primary" size="lg">
                                    Create ERC721
                                </Button>
                            </div>
                                  
                        </Row>
                    :
                        <div className="d-grid px-0">
                            <p variant="primary" size="lg">
                                <b>Contract Deployed:</b> {contractAdd}
                            </p>
                            <div className="d-grid px-0">
                                <Button onClick={createAnother} variant="primary" size="lg">
                                    Create Another
                                </Button>
                            </div>

                        </div>
                    } 
                    </div>
                </main>
            </div>
        </div>
    )
}
export default Create;