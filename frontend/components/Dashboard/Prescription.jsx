import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Button } from '../ui/button'

function Prescription() {
  return (
    <div>
      <Card >
          <CardContent className="space-y-2 mt-4">
          Hi there! You don't have any prescription pleae click on the button to create a prescription
          </CardContent>
          <CardFooter>
            <Button>Create a new prescription</Button>
          </CardFooter>
        </Card>
    </div>
  )
}

export default Prescription