'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import SerialLoading from '../SerialLoading'
import { useRouter } from 'next/navigation'

import { Circles } from 'react-loader-spinner'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Swal from 'sweetalert2';

function Prescription() {
  const router = useRouter()
  const [count, setCount] = useState(1)
  const [NumberofDrugs, setNumberofDrugs] = useState(2)
  const [TypeofDrug, setTypeofDrug] = useState('tablet')
  const [SelectedSerialNumber, setSelectedSerialNumber] = useState()
  const [email, setEmail] = useState('')
  const [PhoneNum, setPhoneNum] = useState('')
  const [Duration, setDuration] = useState(1)
  const [SerialNumber, setSerialNumber] = useState([])
  const [fields, setFields] = useState([{ box_no: 1, name: "", dosage: 0, interval: 0 }])
  const [loading, setIsLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setFields(Array(NumberofDrugs).fill().map((_, index) => ({ box_no: index + 1, name: "", dosage: 0, interval: 0 })))
  }, [NumberofDrugs])

  const handleNumberOfDrug = (value) => {
    setNumberofDrugs(value)
  }
  
  const handleTypeOfDrug = (value) => {
    setTypeofDrug(value)
  }
  
  const handleSelectedSerialNumber = (value) => {
    setSelectedSerialNumber(value)
  }

  const handleNextStep = async () => {
    if (count === 1) {
      setSearching(true)
      await fetchSerial()
      setSearching(false)
    }
    setCount(count + 1)
  }
  
  const handlePrevStep = () => {
    setCount(count - 1)
  }

  const handleFieldChange = (index, field, value) => {
    const newFields = [...fields]
    newFields[index][field] = value
    setFields(newFields)
  }

  const isMedicationDetailsFilled = (index) => {
    const field = fields[index]
    return field.name && field.dosage > 0 && field.interval > 0
  }

  const handleSubmit = async () => {
    const token = Cookies.get('user')
    const payload = fields.map(item => ({
      box_no: item.box_no,
      name: item.name,
      dosage: item.dosage,
      interval: item.interval
    }))
    const contact = {
      email,
      phoneNumber: PhoneNum
    }
    setSubmitting(true)
    try {
      console.log({ medications: payload, duration: Duration, dispenserSerialNumber: SelectedSerialNumber, contact })
      const response = await fetch(`https://doseguardianapi.onrender.com/prescription`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ medications: payload, duration: Duration, dispenserSerialNumber: SelectedSerialNumber, contact })
      })
      const data = await response.json()
      setSubmitting(false)
      if (data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Prescription created successfully!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          router.push('Dashboard/Prescription')
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong!',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#202123'
        })
      }
    } catch (error) {
      setSubmitting(false)
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong!',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#202123'
      })
      console.log(error)
    }
  }

  const fetchSerial = async () => {
    const token = Cookies.get('user')
    setIsLoading(true)
    try {
      const response = await fetch(`https://doseguardianapi.onrender.com/dispensers/search?layers=${NumberofDrugs}&drugType=${TypeofDrug}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      })
      const data = await response.json()
      setSerialNumber(data.dispensers)
      setIsLoading(false)
      console.log(SerialNumber)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=''>
      <div className='flex flex-col gap-5 mt-10 h-[210px]'>
        {count === 1 && (
          <>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-black text-lg">Number of Medications</Label>
                <Select value={NumberofDrugs} onValueChange={handleNumberOfDrug}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="How many drugs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectItem value={1}>1</SelectItem> */}
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
        {count === 2 && (
          <>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                {loading ? (
                  <SerialLoading />
                ) : (
                  <>
                    <Label htmlFor="name" className="text-black text-lg">Dispenser Serial Number</Label>
                    {SerialNumber?.length > 0 ? (
                      <Select value={SelectedSerialNumber} onValueChange={handleSelectedSerialNumber}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {SerialNumber?.map((no) => (
                              <SelectItem key={no.serialNumber} value={no.serialNumber}>{no.serialNumber}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className=''>Dispenser for provided description is not available. Please go back and reselect!</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
        {count > 2 && count <= 2 + NumberofDrugs && (
          <>
            <p>Medication Details - Catridge {count - 2}</p>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor={`name-${count - 3}`} className="text-black text-lg">Drug Name</Label>
                <input
                  id={`name-${count - 3}`}
                  className="w-full p-2 border rounded"
                  type="text"
                  value={fields[count - 3]?.name || ""}
                  onChange={(e) => handleFieldChange(count - 3, "name", e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor={`dosage-${count - 3}`} className="text-black text-lg">Dosage</Label>
                <input
                  id={`dosage-${count - 3}`}
                  className="w-full p-2 border rounded"
                  type="number"
                  value={fields[count - 3]?.dosage || 0}
                  onChange={(e) => handleFieldChange(count - 3, "dosage", e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor={`interval-${count - 3}`} className="text-black text-lg">Interval (in hours)</Label>
                <input
                  id={`interval-${count - 3}`}
                  className="w-full p-2 border rounded"
                  type="number"
                  value={fields[count - 3]?.interval || 0}
                  onChange={(e) => handleFieldChange(count - 3, "interval", e.target.value)}
                />
              </div>
            </div>
          </>
        )}
        {count === 3 + NumberofDrugs && (
          <>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="duration" className="text-black text-lg">Duration of Prescription (in days)</Label>
                <input
                  id="duration"
                  className="w-full p-2 border rounded"
                  type="number"
                  value={Duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-black text-lg">Patient&apos;s Email Address</Label>
                <input
                  id="email"
                  className="w-full p-2 border rounded"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone" className="text-black text-lg">Patient&apos;s Phone Number</Label>
                <input
                  id="phone"
                  className="w-full p-2 border rounded"
                  type="text"
                  value={PhoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div className='absolute bottom-0 left-0 flex justify-between w-full p-10'>
        {count > 1 && (
          <Button className='hover:bg-[#222] hover:text-white' onClick={handlePrevStep}>
            Previous
          </Button>
        )}
        {count < 3 + NumberofDrugs && (
          <>
            {count === 2 && SerialNumber?.length === 0 ? null : (
              <Button
                disabled={count === 2 && !SelectedSerialNumber || (count > 2 && count <= 2 + NumberofDrugs && !isMedicationDetailsFilled(count - 3))}
                className='hover:bg-[#222] hover:text-white'
                onClick={handleNextStep}
              >
                {count === 1 ? (searching ? <Circles height="20" width="20" color="white" ariaLabel="circles-loading" wrapperStyle={{}} wrapperClass="" visible={true} /> : 'Search Serial Number') : 'Next'}
              </Button>
            )}
          </>
        )}
        {count === 3 + NumberofDrugs && (
          <Button className='hover:bg-[#222] hover:text-white' onClick={handleSubmit}>
            {submitting ? <Circles height="20" width="20" color="white" ariaLabel="circles-loading" wrapperStyle={{}} wrapperClass="" visible={true} /> : 'Submit'}
          </Button>
        )}
      </div>
    </div>
  )
}

export default Prescription
