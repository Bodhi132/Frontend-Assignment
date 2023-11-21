import { useState } from 'react'
import SchemaForm from './components/SchemaForm.jsx'


import './App.css'

function App() {

  const [formValue, setFormValue] = useState()
  const [schema, setSchema] = useState([])


  const handleInputChange = (e) => {
    setFormValue(e.target.value);
    const parsedSchema = JSON.parse(e.target.value);

    if (Array.isArray(parsedSchema)) {
      setSchema(parsedSchema)
    }
  }

  return (
    <>
      <div className="flex gap-x-2 justify-center w-full">
        <div className='w-1/2'>
          <textarea
            className='border-2 border-black rounded-md h-[40rem] w-full p-3'
            placeholder="Enter UI schema ...."
            value={formValue}
            onChange={handleInputChange}
          >
          </textarea>
        </div>
        <div className='w-1/2'>
          {
            schema.length > 0 && (
              <SchemaForm schema={schema} />
            )
          }
        </div>
      </div>
    </>
  )
}

export default App
