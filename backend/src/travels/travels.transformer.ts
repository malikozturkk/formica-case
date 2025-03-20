export class TravelsTransformer {
    static transform(travel: any) {
      return {
        ...travel,
        duration: this.calculateDuration(travel.departureTime, travel.arrivalTime),
      };
    }
  
    private static calculateDuration(departureTime: Date, arrivalTime: Date): { hours: number; minutes: number } {
      const diff = arrivalTime.getTime() - departureTime.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return { hours, minutes };
    }
  }
  