import React from 'react'
import InputField from './InputField';
import SelectField from './SelectField';
import Group from './Group';
import SwitchField from './SwitchField'
import RadioFields from './RadioFields'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from '@material-tailwind/react';
import { useSelector } from "react-redux";
import { useState } from 'react';

const SchemaForm = ({ schema }) => {

  const [open, setOpen] = useState(false);
  const fields = useSelector((state) => state.form);

  const handleOpen = () => {
    setOpen(!open)
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col gap-y-5 p-5 border-black border-2 rounded overflow-y-auto'>
        {schema.map((ele, index) => {
          {
            return (
              <div key={index} className=' bg-[#fbfdff] border-gray-100 border-2 rounded-md p-3'>
                {ele.uiType === "Input" && (
                  <>
                      <InputField
                        schema={ele}
                        key={schema.sort}
                      />
                  </>
                )}

                {ele.uiType === "Switch" && (
                  <SwitchField
                    schema={ele}
                  />
                )}

                {ele.uiType === "Select" && (
                  <SelectField
                    schema={ele}
                  />
                )}

                {ele.uiType === "Radio" && (
                  <RadioFields
                    schema={ele}
                  />
                )}

                {ele.uiType === "Group" && (
                  <Group
                    schema={ele}
                    subParams={ele.subParameters}
                  />
                )}
              </div>
            )
          }
        })}
        {schema.length > 0 && (
          <div className='flex justify-end gap-x-3'>
            <Button variant='outlined'>Cancel</Button>
            <Button type='submit' disabled={!fields.hasOwnProperty('name')}>Submit</Button>
          </div>
        )}
      </form>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>JSON DATA</DialogHeader>
        <DialogBody>
          {Object?.entries(fields).map(([key, value]) => (
            <Typography key={key} marginTop={2}>
              <strong>{key}: </strong>
              {JSON.stringify(value, null, 2)}
            </Typography>
          ))}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default SchemaForm