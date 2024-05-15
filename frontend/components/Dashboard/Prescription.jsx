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
import { ScrollArea } from '../ui/scroll-area'


function Prescription() {
  const [count, setcount] = useState(1)
  const [NumberofDrugs, setNumberofDrugs] = useState(1)
  const [TypeofDrug, setTypeofDrug] = useState('tablet')
  const [SelectedSerialNumber, setSelectedSerialNumber] = useState()
  //INfo

  const [email, setEmail] = useState('')
  const [PhoneNum, setPhoneNum] = useState('')
  const [Duration, setDuration] = useState(1)




  const [SerialNumber, setSerialNumber] = useState([])

  const [fields, setFields] = useState([]); // Initial fields
  const [visibleGroups, setVisibleGroups] = useState([true]);

  const newVisibleGroups = NumberofDrugs.length / 3 > visibleGroups.length
      ? [...visibleGroups, false]
      : visibleGroups.slice(0, NumberofDrugs.length / 3);

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
    handleNumberField()
    
  }
  const handlePrevStep = () => {
    setcount(count - 1)
  }

  const handleNumberField = () => {
    if (NumberofDrugs === 1) {
      setFields(['', '', '']);
    } else if (NumberofDrugs === 2) {
      setFields(['', '', '', '', '', '']);
    }
    else if (NumberofDrugs === 3) {
      setFields(['', '', '', '', '', '', '', '', '',]);
    }
    setVisibleGroups(newVisibleGroups);
  }

  const toggleVisibility = (index) => {
    const newVisibleGroups = [...visibleGroups];
    newVisibleGroups[index] = !newVisibleGroups[index];
    setVisibleGroups(newVisibleGroups);
  };

  
  const handleFieldChange = (index, e) => {
    const newFields = [...fields];
    newFields[index] = e.target.value;
    setFields(newFields);
  
    
  };
  console.log(fields)

  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

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
      <div className='flex flex-col gap-5 mt-10 h-[210px]'>
        {count == 1 && (
          <>
            <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-black text-lg">Number of Medications</Label>
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
              <Label htmlFor="name" className="text-black text-lg">Drug Type</Label>
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
               </Select>):(<p className=''>Dispenser for provided description is not available. Please go back and reselect!</p>)}
              
          </div>
          </div>
          
          </>
        )}
                {count == 3 && (
          <>
          <p>Details of Medications</p>
            <ScrollArea className="h-64">
            {chunkArray(fields, 3).map((chunk, chunkIndex) => (
  <div key={chunkIndex} className="field-group" style={{ marginBottom: '20px' }}>
    <button type='button' className='w-full text-white bg-gray-800 rounded-2xl p-3' onClick={() => toggleVisibility(chunkIndex)}>
      {visibleGroups[chunkIndex] ? '-' : '+'} Group {chunkIndex + 1}
    </button>
    {visibleGroups[chunkIndex] && (
      <ScrollArea >
        {chunk.map((field, index) => {
          const fieldTypes = ['Name', 'Interval', 'Dosage'];
          return (
            <div key={index} style={{ marginBottom: '10px' }}>
             
              <label>
                <p className='my-2'> {fieldTypes[index % 3]}:</p>
               
                <input
                  type="text"
                  name={`${fieldTypes[index % 3]}`}
                  className="InputClass "
                  value={fields[index]}
                  onChange={(e) => handleFieldChange(chunkIndex * 3 + index, e)}
                  placeholder={`Enter ${fieldTypes[index % 3]}`}
                />
              </label>
            </div>
          );
        })}
      </ScrollArea>
    )}
  </div>
))}
            </ScrollArea>
          
          </>
        )}


{count == 4 && (
          <>
          <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-black text-lg">Duration</Label>
              <input className="InputClass " value={Duration} onChange={(e) => {setDuration(e.target.value)}}  type="duration" name="duration" id="duration" placeholder="7" />
              
          </div>
          </div>

          <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-black text-lg">Email</Label>
              <input className="InputClass " value={email} onChange={(e) => {setEmail(e.target.value)}}   type="email" name="email" id="email" placeholder="john@gmail.com" />
              
          </div>
          </div>
          <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-black text-lg">Contact</Label>
              <input className="InputClass " value={PhoneNum} onChange={(e) => {setPhoneNum(e.target.value)}}   type="contact" name="contact" id="contact" placeholder="+234 07000 345672" />
              
          </div>
          </div>
          </>
        )}
        </div>
      

      <div className={`flex  ${count> 1?"items-center justify-between":"items-end justify-end"}  mt-20`}>
      
        {count > 1  && (<Button onClick={handlePrevStep}>Back</Button>)}

        {SerialNumber?.length > 0 &&(<Button className={`${count == 4?'hidden':'block'}`} onClick={handleNextStep}>Next</Button>)}
        
        {count == 1 &&(<Button className={`${SerialNumber?.length > 0?'hidden':'block'}`} onClick={handleNextStep}>Next</Button>)}
        {count == 4&&<Button >Submit</Button>}
        
      
      </div>
    </div>
  )
}

export default Prescription