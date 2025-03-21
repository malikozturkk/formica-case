import React from "react"
import TicketCircles from "./TicketCircles"

const TicketDetailContainer = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="w-full bg-blue-900 text-white p-9 md:p-12 rounded-lg shadow-xl relative overflow-hidden">
        {children}
        <TicketCircles side="left" />
        <TicketCircles side="right" />
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-100 to-blue-600" />
        <div className="absolute bottom-0 right-0 w-2 h-full bg-gradient-to-t from-blue-600 to-blue-100" />
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-blue-100" />
        <div className="absolute bottom-0 left-0 w-2 h-full bg-gradient-to-t from-blue-100 to-blue-600" />
      </div>
    )
} 

  export default TicketDetailContainer