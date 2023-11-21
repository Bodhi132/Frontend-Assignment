import React from 'react'
import { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import SwitchField from './SwitchField'
import { Button } from '@material-tailwind/react';
import { updateField } from '../FormSlice/slice';

const Group = ({ subParams, schema }) => {

  const [selectedTab, setSelectedTab] = useState(
    schema.subParameters[0].validate.defaultValue
  );

  const handleChange = (val) => {
    setSelectedTab(val);
    dispatch(updateField({ field:schema.jsonKey,value: val }))
  };

  const handleRadio = (field) => {
    if (field.uiType === "Radio") {
      return (
        <div className='flex justify-between'>
          {
            field.validate.options.map((option) => (
              <Button
                key={option.value}
                onClick={() => handleChange(option.value)}
                className={selectedTab === option.value ? ' bg-blue-400' : 'bg-blue-100'}
              >
                {option.label}
              </Button>
            ))
          }
        </div>
      )
    }
  }

  return (
    <>
          <div className='flex flex-col gap-y-5'>
            <h1 className=' text-start'>{schema.label}</h1>
            <hr className="h-px my-1 bg-gray-300 border-0"></hr>
            {schema.subParameters.map((field) => handleRadio(field))}
            {subParams.map((elem) => {
              if (elem.uiType === "Ignore") {
                if (
                  elem.conditions.some(
                    (condition) =>
                      condition.jsonKey === `pizza_type.type` &&
                      condition.op === "==" &&
                      condition.value === selectedTab &&
                      condition.action === "enable"
                  )
                ) {
                  return elem.subParameters.map((ele) => {
                    if (ele.uiType === "Select") {
                      return <SelectField schema={ele} />;
                    } else if (ele.uiType === "Input") {
                      return <InputField schema={ele} />;
                    } else if (ele.uiType === "Switch") {
                      return <SwitchField schema={ele} />;
                    }
                  })
                }
              }
              else {
                if (elem.uiType === "Select") {
                  return <SelectField schema={elem} />;
                } else if (elem.uiType === "Input") {
                  return <InputField schema={elem} />;
                } else if (elem.uiType === "Switch") {
                  return <SwitchField schema={elem} />;
                }
              }
            })
            }
          </div>
    </>
  )
}

export default Group