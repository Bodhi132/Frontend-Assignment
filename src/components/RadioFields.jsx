import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateField } from '../FormSlice/slice'


const RadioFields = ({ schema }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    if (schema.hasOwnProperty('validate') && schema.validate.hasOwnProperty('required')) {
      setreq(schema.validate.required)
    }
    else {
      setreq(true)
    }
  }, [])

  const [req, setreq] = useState()
  const [isVisible, setIsVisible] = useState(false);

  const [selectedTab, setSelectedTab] = useState(schema.validate.defaultValue);

  const handleChange = (val) => {
    setSelectedTab(val);
    dispatch(updateField({ field:schema.jsonKey,value: val }))
  };

  return (
    <div className='flex justify-between'>
      {!req &&
        <div>
          <label class="relative inline-flex justify-start items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" onChange={toggleVisibility} />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{isVisible ? 'Hide ' : 'Show '} Advance Fields</span>
          </label>
        </div>
      }
      {isVisible || req &&
        (
          field.validate.options.map((option) => (
          <Button
            key={option.value}
            onClick={() => handleChange(option.value)}
            className={selectedTab === option.value ? ' bg-blue-400' : 'bg-blue-100'}
          >
            {option.label}
          </Button>
        ))
        )
      }
    </div>
  )
}

export default RadioFields