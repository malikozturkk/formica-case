import { formatPrice } from "@/utils/formaters";

const TicketPrice: React.FC<{ amount: number }> = ({ amount }) => {
    return (
        <div className="max-w-fit md:max-w-1/4 w-full md:px-4">
            <div className="md:pr-5">
            <span className="text-[10px] md:text-sm font-bold text-[#8392a7]">Bilet Ücreti</span>
            <p className="text-base md:text-3xl font-bold text-[#444763] my-3 leading-normal">{formatPrice(amount)}</p>
        </div>
        </div>
    );
};

export default TicketPrice;