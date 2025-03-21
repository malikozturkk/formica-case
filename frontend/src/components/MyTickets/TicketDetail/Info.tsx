const TicketInfo = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex justify-between">
      <span className="opacity-80 truncate">{label}:</span>
      <span className="font-medium truncate">{value}</span>
    </div>
  );

export default TicketInfo