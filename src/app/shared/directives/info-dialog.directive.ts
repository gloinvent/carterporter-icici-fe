import { Directive, Input, HostListener } from '@angular/core';
import { infoDialogData, PopUpComponent } from '../modals/pop-up/pop-up.component';
import { MatDialog } from '@angular/material';

const INFO_OPTIONS: { [type: string]: infoDialogData } = {


  'Airport Transfer Local': {
    notes: [
      {
        paragraph: `City and Urban localities from the airport of service will be serviceable under airport transfer local.
         If the pincode is in another state or outside city limits check Airport transfer Outstation for the rates.
          Carterporter is a 24/7 service at each airport.
         Check airport available service at each airport for more details.`

      }
    ]
  },

  'Airport Transfer Outstation': {
    notes: [
      {
        paragraph: `Outstation/Interstate localities from the airport of service will be serviceable under airport transfer Outstation.
         Outstation deliveries will be attempted to be made within 72 hours. Outstation pick up will have to be booked 72 prior to departure.
          If the pincode is within the  city limits check Airport transfer Local for the rates. Carterporter is a 24/7 service at each airport.
         Check airport available service at each airport for more details.`

      }
    ]
  },
  /* 
 Pick city:
 ----------------
 */
  '2-1-Pick City': {
    notes: [
      {
        paragraph: ``
      }
    ]
  },
  '2-2-Pick City': {
    notes: [
      {
        paragraph: ``
      }
    ]
  },

  /* 
 Drop city:
 ----------------
 LOCAL: Input fields For Towards the airport page Local 
 */
  '1-1-Drop City': {
    notes: [
      {
        paragraph: ``
      }
    ]
  },
  '1-2-Drop City': {
    notes: [
      {
        paragraph: ``
      }
    ]
  },
  /* 
  Pick up Date i:
  ----------------
  LOCAL: Input fields For Towards the airport page Local 
  */

  '1-1-Select Date': {
    notes: [
      {
        paragraph: `The date of service. The date of service cannot be changed once order is confirmed`
      }
    ]
  },

  '1-2-Select Date': {
    notes: [
      {
        paragraph: `The date of service to arrive at your outstation door step to pick luggage. 
        Date of service to pick your luggage should be at least 3 Days prior to departure .
          The date of service/departure cannot be changed once order is confirmed. `
      }
    ]
  },

  '2-1-Select Date': {
    notes: [
      {
        paragraph: `The date of service is the same day as Arrival date. The date of service cannot be changed once order is confirmed. `
      }
    ]
  },

  '2-2-Select Date': {
    notes: [
      {
        paragraph: `The date of service is the same day as Arrival date. The date of service cannot be changed once order is confirmed. The delivery will be made based on realistic time, connectivity via surface transportation and proximity of your location from the airport.`
      }
    ]
  },


  /* 
  Drop Airport i:
  ----------------
  Input fields For Towards the airport page Local 
  */

  '1-1-Drop Airport': {
    notes: [
      {
        paragraph: `Check airport services available for Departure delivery services to deliver at airport check in counters and luggage storage and interterminal transfers.
       This information cannot be changed once the order is confirmed`
      }
    ],
  },

  '1-2-Drop Airport': {
    notes: [
      {
        paragraph: `Select the airport of your departure. Check airport services available for Departure services to deliver at airport check in counters and luggage storage and interterminal transfers.
       This information cannot be changed once the order is confirmed. `
      }
    ],
  },

  '2-1-Pick Airport': {
    notes: [
      {
        paragraph: `Select the airport of your Arrival. Check airport services available for arrival services and luggage storage and interterminal transfers. 
      This information cannot be changed once the order is confirmed. `
      }
    ],
  },

  '2-2-Pick Airport': {
    notes: [
      {
        paragraph: `Select the airport of your Arrival. Check airport services available for Arrival services to assist on luggage belts and luggage storage and interterminal transfers.
       This information cannot be changed once the order is confirmed. `
      }
    ],
  },

  /* 
   Pin Code i:
   ----------------
   Input fields For Towards the airport page Local 
   */
  '1-1-Pin Code': {
    notes: [
      {
        paragraph: ``
      }
    ],
  },

  '1-2-Pin Code': {
    notes: [
      {
        paragraph: ``
      }
    ],
  },

  '2-1-Pin Code': {
    notes: [
      {
        paragraph: `Enter the exact location pincode that luggage needs to be picked from. 
        The pincode needs to be 6 digits only and match the state selected.  Booking will be cancelled if state and pincode do not match without refund.
          Inconvenience is regretted if the pincode selected is unavailable for service. This information cannot be changed once the order is confirmed.
         Use Airport Local Transfers for pick up within the city limits of the airport selected.`
      }
    ],
  },

  '2-2-Pin Code': {
    notes: [
      {
        paragraph: `Enter the exact location pincode that luggage needs to be delivered to. 
        The pincode needs to be 6 digits only and match the state selected.
         Booking will be cancelled if state and pincode do not match without refund. 
           Inconvenience is regretted if the pincode selected is unavailable for service. 
           This information cannot be changed once the order is confirmed. Use Airport Local Transfers for drop is within the city limits of the airport selected.`
      }
    ],
  },

  /* 
 Luggage Count i:
 ----------------
 Input fields For Towards the airport page Local 
 */

  '1-1-Luggage Count': {
    notes: [
      {
        paragraph: `The number of pieces/items that needs to carried or carted.
       The maximum of 08 pieces/items can be booked per order.
        CarterPorter will be able to add/subtract luggage count on pick up at your location.
       Check airport services available for departure delivery services and luggage storage and interterminal transfers.`
      }
    ],
  },


  '1-2-Luggage Count': {
    notes: [
      {
        paragraph: `The number of pieces/items that needs to carried or carted.
       The maximum of 08 pieces/items can be booked per order.
       CarterPorter will be able to add/subtract luggage count on pick up at your location.`
      }
    ],
  },

  '2-1-Luggage Count': {
    notes: [
      {
        paragraph: `The number of pieces/items that needs to carried or carted.
         The maximum of 08 pieces/items can be booked per order. CarterPorter will be able to add/subtract luggage count on pick up at the airport on your arrival.
         Check airport services available for arrival services and luggage storage and interterminal transfers.`
      }
    ],
  },


  '2-2-Luggage Count': {
    notes: [
      {
        paragraph: `The number of pieces/items that needs to carried or carted.
         The maximum of 08 pieces/items can be booked per order.
         CarterPorter will be able to add/subtract luggage count on pick up at your location.`
      }
    ],
  },

  '1-1-Luggage Detail': {
    notes: [
      {
        paragraph: ``
      }
    ],
  },




  /* 
Pick State i:
----------------
Input fields For Towards the airport page Local 
*/


  '1-2-Pick State': {
    notes: [
      {
        paragraph: `Select the state where the pick up location is situated.
       This information cannot be changed once the order is confirmed.
        Inconvenience is regretted if your state is not available for selection.
       We are expanding our services constantly and we request to check again on your next travel itinerary`
      }
    ],
  },

  '2-2-Drop State': {
    notes: [
      {
        paragraph: `Select the state where the drop location is situated.
       This information cannot be changed once the order is confirmed.
        Inconvenience is regretted if your state is not available for selection.
       We are expanding our services constantly and we request to check again on your next travel itinerary.`
      }
    ],
  },


  /* 
Select Slot i:
----------------
Input fields For Towards the airport page Local 
*/

  '1-1-Select Slot': {
    notes: [
      {
        paragraph: `Luggage will be picked up by Carterporter within the slot time selected.
        Luggage will be available at the airport at the time indicated but delivery will be made only on given time of meeting CarterX at the airport.
         Slot time cannot be changed once order is confirmed. `
      }
    ],
  },

  '1-2-Select Slot': {
    notes: [
      {
        paragraph: `Luggage will be picked up by Carterporter within the slot time selected.  
        Luggage will be delivered only on given time of meeting CarterX at the airport. 
        Slot time cannot be changed once order is confirmed.`
      }
    ],
  },

  '2-1-Select Slot': {
    notes: [
      {
        paragraph: `The slot time is based on flight arrival time.
         Luggage will be delivered by Carterporter at the delivery location given within the slot time selected.
         Slot time cannot be changed once order is confirmed. `
      }
    ],
  },

  '2-2-Select Slot': {
    notes: [
      {
        paragraph: `The slot time is based on flight arrival time.
         Luggage will be delivered by Carterporter at the delivery location given within the slot time selected.
         Slot time cannot be changed once order is confirmed. `
      }
    ],
  },

    /* 
Otp i:
----------------
Otp info popup
*/
'Otp info': {
  notes: [
    {
      paragraph: `The slot time is based on flight arrival time.
       Luggage will be delivered by Carterporter at the delivery location given within the slot time selected.
       Slot time cannot be changed once order is confirmed OTP. `
    }
  ],
},

  'block': {
    title: 'block',
    notes: []
  }
}



@Directive({
  selector: '[InfoDialog]'
})

export class InfoDialogDirective {

  data: infoDialogData;

  @Input('InfoDialog')
  set appInfoDialog(type: string) {
    if (type == '1-1-Pick State' || type == '2-1-Drop State') {
      this.data = INFO_OPTIONS['block']
    }
    else
      this.data = INFO_OPTIONS[type];
  }

  @HostListener('click')
  shhowPop() {
    if (this.data.title != 'block') {
      console.log(this.data.title)
      if (screen.width > 400) {
        this.matDialog.open(PopUpComponent, {
          width: '350px',
          panelClass: 'custom-modalbox',
          data: this.data
        });
      }
      else {
        this.matDialog.open(PopUpComponent, {
          width: '300px',
          panelClass: 'custom-modalbox',
          data: this.data
        });
      }
    }
  }

  constructor(private matDialog: MatDialog) {
  }


}
