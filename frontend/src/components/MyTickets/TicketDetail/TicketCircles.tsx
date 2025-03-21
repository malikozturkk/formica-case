const TicketCircles = ({ side }: { side: "left" | "right" }) => {
  const positions = ["0", "1/5", "2/5", "3/5", "4/5", "1"];
  return (
    <>
      {positions.map((pos, index) => {
        const size = index === 0 || index === positions.length - 1 ? 5 : 2.5;
        return (
          <div
            key={index}
            className={`absolute bg-white rounded-full z-50 ${side === "right" ? "translate-1/2 -translate-y-1/2" : "-translate-1/2"}`}
            style={{
              top: `calc(${pos} * 100%)`, 
              left: side === "left" ? "100%" : "auto", 
              right: side === "right" ? "100%" : "auto",
              width: `${size}rem`,
              height: `${size}rem`,
            }}
          />
        );
      })}
    </>
  );
};

export default TicketCircles;
// const TicketCircles = ({ side }: { side: "left" | "right" }) => {
//   const positions = ["0", "1/5", "2/5", "3/5", "4/5", "full"];
//   return (
//     <>
//       {positions.map((pos, index) => (
//         <div
//           key={index}
//           className={`z-50 absolute ${side}-full top-${pos} transform ${
//             side === "right" ? "translate-1/2 -translate-y-1/2" : "-translate-1/2"
//           } w-${index === 0 || index === positions.length - 1 ? "20" : "6"} h-${
//             index === 0 || index === positions.length - 1 ? "20" : "6"
//           } bg-white rounded-full`}
//         />
//       ))}
//     </>
//   );
// };

// export default TicketCircles