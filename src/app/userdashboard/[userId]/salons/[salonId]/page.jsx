import React from 'react'
import Cards from '../../commponents/cards'
import AppointmentPieChart from '../../commponents/chart'
import NewBooking from '../../commponents/newBooking'

export default function SalonPage() {
  return (
    <div>
      <div>
            <Cards />
            <div className="flex flex-col lg:flex-row gap-4 mx-6">
              <div className="w-full lg:w-2/3">
                <AppointmentPieChart />
              </div>
              <div className="w-full lg:w-1/3">
                <NewBooking />
                {/* <AvailableStaff/> */}
              </div>
            </div>
          </div>
    </div>
  )
}
