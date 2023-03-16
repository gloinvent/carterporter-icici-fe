export var apis = {
  USER_REGISTER: "r=customer-api/register",
  USER_LOGIN: "r=customer-api/login",
  GET_LOGIN_TOKEN: "r=customer-api/gettoken",
  COUNTRY_CODES: "r=customer-api/getcountrycodes",
  VERIFY_OTP: "r=customer-api/verifyotp",
  TIME_SLOTS: "r=order-api/getslots",
  GET_CITY: "r=v2/airport-of-operation-api/region-new",
  GET_STATES_AND_RATES: "r=v3/calculation-api/state",
  GET_AIRPORTS: "v2/airport-of-operation-api/region-new",
  GET_STATE_PINCODE: "r=v3/calculation-api/getstatepincode",
  GET_APPROX_AMOUNT: "r=v3/calculation-api/bookingcalculation",
  GET_LUGGAGE_TYPE: "r=v2/order-api/getluggagetypes",
  PINCODE_AVAILABILITY: "r=v2/order-api/checkpincodeavailabilityv2",
  BOOKING: "r=v2/order-api/booking",
  OUTSTATION_CALCULATION: "r=v3/calculation-api/bookingcalculation",
  OUTSTATION_GETLUGGAGE: "r=v3/order-api/getoutstationluggagetypes",
  BOOKING_OUTSTATION: "r=v3/order-api/booking",
  BOOKING_LOCAL: "r=v2/order-api/booking-new",
  APPLY_COUPON: "r=v2/promocode-api/getpromocodes",
  COUNTRY_CODE: "r=customer-api/getcountrycodes",
  USER_PROFILE: "r=customer-api/ismodified",
  USER_PROFILE_EDIT: "r=customer-api/profile",
  USER_PROFILE_IMAGE: "r=order-api/fileupload",
  CONTACTUS_QUERY: "r=v3/order-api/contact-us",
  CREATE_TICKET: "r=v4/helpassistance-api/createticket",
  GET_TICKET_TOPICS: "r=v4/helpassistance-api/get-ticket-topic",
  FETCH_TICKET_DETAIL: "r=v4/helpassistance-api/fetch-ticket-detail",
  DOWNLOAD_ORDERS:"r=v3/thirdparty-corporate-api/download-orders",
  REMOVE_CSV_FILE:"r=v3/thirdparty-corporate-api/remove-csv-file"
};

export const CORPORATE_APIS = {
  GET_CITY: "r=v2/airport-of-operation-api/region-new",
  GET_APPROX_AMOUNT: "r=v3/thirdparty-corporate-api/calculation",
  GET_APPROX_AMOUNT_CALCULATION: "r=v3/thirdparty-corporate-api/thirdparty-price-calculation",
  BOOKING: "r=v3/thirdparty-corporate-api/booking",
  REDEEMBOOKING : "r=v4/redeembook-api/booking",
};

export const subscription = {
  GET_AIRLINE_DETAIL: "r=v4/redeembook-api/get-airline-details",
  SUBSCRIPTION_LIST: "r=v4/redeembook-api/get-supersubscription",
  VALIDATE_SUBSCRIPTION_ID: "r=v4/redeembook-api/validate-subscription-id",
  VALIDATE_SUBSCRIPTION_NUMBER: "r=v4/redeembook-api/validate-subscription-number",
  OTP_VALIDATE: "r=v4/redeembook-api/verify-subscription-otp",
  RESEND_CODE: "r=v4/redeembook-api/validate-subscription-number",
  PURCHASE_SUBSCRIPTION: "r=v4/redeembook-api/buy-subscription-with-purchase",
  PURCHASE_SUBSCRIPTION_VERIFY_USER: "r=v4/redeembook-api/buy-subcription-by-user",
  VERIFY_USER_NUMBER: "r=v4/redeembook-api/verifyusernumber",
  PICKUP_DROP_ADDRESS: "r=v4/redeembook-api/get-pick-drop-addres",
  FETCH_SUBSCRIBER_DETAILS: "r=v4/redeembook-api/fetch-subscriber-details",
  SENDEMAIL: "r=v4/redeembook-api/sendemail"
};
