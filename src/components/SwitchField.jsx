import React from 'react'
import { Checkbox } from '@material-tailwind/react'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { updateField } from '../FormSlice/slice'
import Info from './Info';


const SwitchField = ({ schema }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    if (schema.hasOwnProperty('validate') && schema.validate.hasOwnProperty('required')){
      setreq(schema.validate.required)
    }
    else {
      setreq(true)
    }
  }, [])

  const [req, setreq] = useState()

  const [isChecked, setIsChecked] = useState(
    schema.validate.defaultValue
  );

  useEffect(() => {
    dispatch(updateField({ field: schema.jsonKey, value: schema.validate.defaultValue }))
  }, []);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    dispatch(updateField({ field: schema.jsonKey, value: event.target.checked }))
  };

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className='flex items-center'>
      {!req && 
        <div>
          <label className="relative inline-flex justify-start items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" onChange={toggleVisibility} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{req === true ? 'Show ' : 'Hide '} Advance Fields</span>
          </label>
        </div>}
      {isVisible || req &&
        <div className='flex gap-x-2 items-center'>
          <Checkbox
            checked={isChecked}
            onChange={handleChange}
            disabled={schema.validate.immutable}
          />
          <h4 className="block font-sans text-xl leading-snug tracking-normal text-inherit antialiased">
            {schema.label}
          </h4>
          <Info schema={schema}/>
        </div>

      }
    </div>
  )
}

export default SwitchField