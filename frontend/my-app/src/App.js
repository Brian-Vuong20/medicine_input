import {useState} from 'react'
import Axios from 'axios'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function App() {

  const [medInfo, setMedInfo] = useState({medicine: "", dose: "", unit: "", usage:"", expire: ""})
  const [message, setMessage] = useState('')
  const handleChange = (e) => {
    setMedInfo({...medInfo, [e.target.name]: e.target.value})
    console.log(medInfo)
  }
  const handleSubmit = (e) => {
   e.preventDefault();

    Axios.post('http://localhost:5000/api/input', {
      medicine: medInfo.medicine,
      dose: medInfo.dose,
      unit: medInfo.unit,
      usage: medInfo.usage,
      expiry_date: medInfo.expire  

    }).then(res => {
      setMessage(res.data.success_message)
      setMedInfo({medicine: "", dose: "", unit: "", usage:"", expire: ""})
      toast.success(res.data.success_message, {position: 'top-right'})
    })
    
  }

  return (
    <div>
      <ToastContainer/>
      <Container className="mt-5">
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Medicine</Form.Label>
        <Form.Control type="text" placeholder="Medicine" name="medicine" value={medInfo.medicine} onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Dose</Form.Label>
        <Form.Control type="text" placeholder="Dose" name="dose" value={medInfo.dose} onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Unit</Form.Label>
        <Form.Control type="text" placeholder="Unit" name="unit" value={medInfo.unit} onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Expiry date</Form.Label>
        <Form.Control type="text" placeholder="Expiry date" name="expire" value={medInfo.expire} onChange={handleChange}/>
      </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Usage</Form.Label>
          <Form.Control as="textarea" rows={3} name="usage" value={medInfo.usage} onChange={handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit" >Add medicine</Button>{' '}
      </Form>
      </Container>
    </div>
  );
}

export default App;
