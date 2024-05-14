'use client'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

function Prescription() {
  const [count, setcount] = useState(1)
  const [NumberofDrugs, setNumberofDrugs] = useState(1)
  const [TypeofDrug, setTypeofDrug] = useState('tablet')
  const [SelectedSerialNumber, setSelectedSerialNumber] = useState()
  const [SerialNumber, setSerialNumber] = useState([])

  const handleNumberOfDrug = (value) => {
    setNumberofDrugs(value)
  }
  const handleTypeOfDrug = (value) => {
    setTypeofDrug(value)
  }
  const handleSelectedSerialNumber = (value) => {
    setSelectedSerialNumber(value)
  }
  const handleNextStep = () => {
    setcount(count + 1)
    fetchSerial()
    
  }
  const handlePrevStep = () => {
    setcount(count - 1)
  }

  // useEffect(() => {
  //   if(count === 2){
  //     const fetchSerial = async () => {
  //       const token = Cookies.get('user')
  //       try {
  //         const response = await fetch(`https://doseguardianapi.onrender.com/dispensers/search?layers=${NumberofDrugs}&drugType=${TypeofDrug}`, {
  //           method: 'GET',
  //           headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  //         })
  //         const data = await response.json()
  //         setSerialNumber(data.dispensers)
  //         console.log(data)
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //     fetchSerial()
  //   }
  // }, [])
  const fetchSerial = async () => {
    const token = Cookies.get('user')
    try {
      const response = await fetch(`https://doseguardianapi.onrender.com/dispensers/search?layers=${NumberofDrugs}&drugType=${TypeofDrug}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      })
      const data = await response.json()
      setSerialNumber(data.dispensers)
      console.log(SerialNumber)
    } catch (error) {
      console.log(error)
    }
  }
 
  return (
    <div className=''>
      <div className='flex flex-col gap-5 mt-10 h-[200px]'>
        {count == 1 && (
          <>
            <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-black text-lg">How many drug do you have to use?</Label>
              <Select  value={NumberofDrugs} onValueChange={handleNumberOfDrug}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select how many drugs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup >
                      {/* <SelectLabel>How many drug do you have to use?</SelectLabel> */}
                      <SelectItem value={1}>1</SelectItem>
                      <SelectItem value={2}>2</SelectItem>
                      <SelectItem value={3}>3</SelectItem>
                      <SelectItem value={4}>4</SelectItem>
                      <SelectItem value={5}>5</SelectItem>
                      <SelectItem value={6}>6</SelectItem>
                    </SelectGroup>
                  </SelectContent>
               </Select>
          </div>
          </div>
  
          <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-black text-lg">What type of drug</Label>
              <Select value={TypeofDrug} onValueChange={handleTypeOfDrug}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Type of Drug" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel>What type is Drug?</SelectLabel> */}
                      <SelectItem value="liquid">Liquid</SelectItem>
                      <SelectItem value="capsule">Capsule</SelectItem>
                      <SelectItem value="tablet">Tablet</SelectItem>
                    </SelectGroup>
                  </SelectContent>
               </Select>
          </div>
          </div>
          
          </>
        
        )}
        {count == 2 && (
          <><div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-black text-lg">Dispenser Serial Number</Label>
              {SerialNumber?.length>0?(<Select value={SelectedSerialNumber} onValueChange={handleSelectedSerialNumber}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel>What type is Drug?</SelectLabel> */}
                      {SerialNumber?.map((no) => (
                        <SelectItem key={no.serialNumber} value={no.serialNumber}>{no.serialNumber}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
               </Select>):(<p className=''>We do not have a Dispenser.Please go back and  select again</p>)}
              
          </div>
          </div>
          
          </>
        )}
        </div>
      

      <div className={`flex  ${count> 1?"items-center justify-between":"items-end justify-end"}  mt-20`}>
      
        {count > 1 && (<Button onClick={handlePrevStep}>Back</Button>)}
        <Button onClick={handleNextStep}>Next</Button>
      
      </div>
    </div>
  )
}

export default Prescription