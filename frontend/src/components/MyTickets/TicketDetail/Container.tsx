import React from "react"
import TicketCircles from "./TicketCircles"

const TicketDetailContainer = ({ children }: { children: React.ReactNode }) => {
    return (
          <div className="w-full rounded-3xl flex flex-col gap-8 p-3 md:px-5 md:py-6" style={{ boxShadow: "0 10px 24px 0 rgba(68,60,98,.22)" }}>
            <div className="px-4 md:p-8 text-blue-900 font-bold text-2xl">
                <div className="border-b border-gray-300">
                    <h1 className="border-b-2 border-blue-900 text-center w-full md:w-1/4">Bilet Detay</h1>
                </div>
            </div>
            <div className="w-full bg-blue-900 text-white p-9 md:p-12 rounded-lg shadow-xl relative overflow-hidden">
              {children}
              <TicketCircles side="left" />
              <TicketCircles side="right" />
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-100 to-blue-600" />
              <div className="absolute bottom-0 right-0 w-2 h-full bg-gradient-to-t from-blue-600 to-blue-100" />
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-blue-100" />
              <div className="absolute bottom-0 left-0 w-2 h-full bg-gradient-to-t from-blue-100 to-blue-600" />
            </div>
        </div>
    )
} 

  export default TicketDetailContainer