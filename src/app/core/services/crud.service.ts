import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Http, Headers, RequestOptions } from "@angular/http";
import { constants } from "../../config/constants";
import { apis } from "../../config/apis";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Options } from "selenium-webdriver/opera";

@Injectable({
  providedIn: "root",
})
export class CrudService {
  loggedUser = false;

  constructor(private http: HttpClient) {}

  public post(api, postdata) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        // 'Authorization': 'my-auth-token'
      }),
    };
    return this.http.post(environment.baseUrl + api, postdata, httpOptions);
  }

  public get(api) {
    return this.http.get(environment.baseUrl + api);
  }

  public update(api, data) {
    return this.http.post(environment.baseUrl + api, data);
  }

  public delete(api, data) {
    return this.http.delete(environment.baseUrl + api, data);
  }

  public getToken(api, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=UTF-8",
        // 'Authorization': 'my-auth-token'
      }),
    };
    return this.http.post(
      "https://carter-cors.herokuapp.com/" + environment.baseUrl + api,
      data
    );
  }

  //* For QA
  // **********************************************************
  // public postJson(api, data) {
  //   if (Number(data.no_of_units) === 1) {
  //     var bagToken = "f25e8fd196c8fe47518024f820787ac2";
  //   } else if (Number(data.no_of_units) === 2) {
  //     var bagToken = "82af1272c02bdbbd14b3391ceca50f72";
  //   } else if (Number(data.no_of_units) === 3) {
  //     var bagToken = "c6f1fcf1980e24af3aa972f56a711659";
  //   } else if (Number(data.no_of_units) === 4) {
  //     var bagToken = "72c4c0a25c172ca57e2d7fb0d7eda01a";
  //   } else if (Number(data.no_of_units) === 5) {
  //     var bagToken = "1748e5dda195ea2b5219bb251cfebc18";
  //   } else if (Number(data.no_of_units) === 6) {
  //     var bagToken = "979836948a1f5b5d0a91b1b5befdce8d";
  //   } else if (Number(data.no_of_units) === 7) {
  //     var bagToken = "75a8354e626602d6649441bb5ec978cf";
  //   } else if (Number(data.no_of_units) === 8) {
  //     var bagToken = "670a8b2eae976655d264e07be35badb4";
  //   }
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json; charset=UTF-8",
  //       // 'Authorization': 'my-auth-token'
  //       token: bagToken,
  //     }),
  //   };
  //   return this.http.post(
  //     "https://carter-cors.herokuapp.com/" + environment.baseUrl + api,
  //     data,
  //     httpOptions
  //   );
  // }

  // public postJsonCity(api, data, serviceType) {
  //   if (Number(data.no_of_units) === 1) {
  //     var bagToken = "f25e8fd196c8fe47518024f820787ac2";
  //   } else if (Number(data.no_of_units) === 2) {
  //     var bagToken = "82af1272c02bdbbd14b3391ceca50f72";
  //   } else if (Number(data.no_of_units) === 3) {
  //     var bagToken = "c6f1fcf1980e24af3aa972f56a711659";
  //   } else if (Number(data.no_of_units) === 4) {
  //     var bagToken = "72c4c0a25c172ca57e2d7fb0d7eda01a";
  //   } else if (Number(data.no_of_units) === 5) {
  //     var bagToken = "1748e5dda195ea2b5219bb251cfebc18";
  //   } else if (Number(data.no_of_units) === 6) {
  //     var bagToken = "979836948a1f5b5d0a91b1b5befdce8d";
  //   } else if (Number(data.no_of_units) === 7) {
  //     var bagToken = "75a8354e626602d6649441bb5ec978cf";
  //   } else if (Number(data.no_of_units) === 8) {
  //     var bagToken = "670a8b2eae976655d264e07be35badb4";
  //   }
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json; charset=UTF-8",
  //       // 'Authorization': 'my-auth-token'
  //       token: bagToken,
  //     }),
  //   };
  //   return this.http.post(
  //     "https://carter-cors.herokuapp.com/" + environment.baseUrl + api,
  //     data,
  //     httpOptions
  //   );
  // }

  // public postWithStaticToken(api, data, serviceType) {
  //   if (data.no_of_units === 1) {
  //     var bagToken = "44878386bbb0c774b89bb91d620823d4";
  //   } else if (data.no_of_units === 2) {
  //     var bagToken = "37692b5e1a740e5b518a2d84fa9b28af";
  //   } else if (data.no_of_units === 3) {
  //     var bagToken = "2df9a6d5820d336e51a09fb1bcad5d5d";
  //   } else if (data.no_of_units === 4) {
  //     var bagToken = "b83c9175574142fd70be958ae69d08f6";
  //   } else if (data.no_of_units === 5) {
  //     var bagToken = "13839e56ec623b8981dc002091a55b43";
  //   } else if (data.no_of_units === 6) {
  //     var bagToken = "7b3a8b2f1455f3c5aefb42064ab485cb";
  //   } else if (data.no_of_units === 7) {
  //     var bagToken = "6532e5ccae0fb290bc99af8514a94d14";
  //   } else if (data.no_of_units === 8) {
  //     var bagToken = "d777d4f01d366c7fcd1af841c88528d6";
  //   }
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json",
  //       // token: serviceType === 1 ? bagToken : 'd5f6d2652ec0cb6d19b524822ec01551'
  //       token: bagToken,
  //     }),
  //   };
  //   return this.http.post(
  //     "https://carter-cors.herokuapp.com/" + environment.baseUrl + api,
  //     data,
  //     httpOptions
  //   );
  // }

  // public postWithCorporateToken(api, data, serviceType) {
  //   if (data.no_of_units === 1) {
  //     var bagToken = "44878386bbb0c774b89bb91d620823d4";
  //   } else if (data.no_of_units === 2) {
  //     var bagToken = "37692b5e1a740e5b518a2d84fa9b28af";
  //   } else if (data.no_of_units === 3) {
  //     var bagToken = "2df9a6d5820d336e51a09fb1bcad5d5d";
  //   } else if (data.no_of_units === 4) {
  //     var bagToken = "b83c9175574142fd70be958ae69d08f6";
  //   } else if (data.no_of_units === 5) {
  //     var bagToken = "13839e56ec623b8981dc002091a55b43";
  //   } else if (data.no_of_units === 6) {
  //     var bagToken = "7b3a8b2f1455f3c5aefb42064ab485cb";
  //   } else if (data.no_of_units === 7) {
  //     var bagToken = "6532e5ccae0fb290bc99af8514a94d14";
  //   } else if (data.no_of_units === 8) {
  //     var bagToken = "d777d4f01d366c7fcd1af841c88528d6";
  //   }

  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json",
  //       // token: serviceType === 1 ? bagToken : 'd5f6d2652ec0cb6d19b524822ec01551'
  //       token: bagToken,
  //     }),
  //   };
  //   return this.http.post(
  //     "https://carter-cors.herokuapp.com/" + environment.baseUrl + api,
  //     data,
  //     httpOptions
  //   );
  // }

  // public postWithStaticTokenAirline(
  //   api,
  //   data,
  //   serviceType,
  //   airline,
  //   transfer_type
  // ) {
  //   var bagToken;
  //   if (transfer_type == 2) {
  //     if (data.no_of_units === 1) {
  //       bagToken = "44878386bbb0c774b89bb91d620823d4";
  //     } else if (data.no_of_units === 2) {
  //       bagToken = "37692b5e1a740e5b518a2d84fa9b28af";
  //     } else if (data.no_of_units === 3) {
  //       bagToken = "2df9a6d5820d336e51a09fb1bcad5d5d";
  //     } else if (data.no_of_units === 4) {
  //       bagToken = "b83c9175574142fd70be958ae69d08f6";
  //     } else if (data.no_of_units === 5) {
  //       bagToken = "13839e56ec623b8981dc002091a55b43";
  //     } else if (data.no_of_units === 6) {
  //       bagToken = "7b3a8b2f1455f3c5aefb42064ab485cb";
  //     } else if (data.no_of_units === 7) {
  //       bagToken = "6532e5ccae0fb290bc99af8514a94d14";
  //     } else if (data.no_of_units === 8) {
  //       bagToken = "d777d4f01d366c7fcd1af841c88528d6";
  //     }
  //   } else {
  //     switch (airline) {
  //       case "IndiGo":
  //         switch (data.no_of_units) {
  //           case 1:
  //             bagToken = "d37a1e3d0fdc52cbfc8f876876925ba3";
  //             break;
  //           case 2:
  //             bagToken = "d37a1e3d0fdc52cbfc8f876876925ba3";
  //             break;
  //           case 3:
  //             bagToken = "e1eacd4217cfac41ca45876237b9730b";
  //             break;
  //           case 4:
  //             bagToken = "f519a8dcad9d4183345ee1df49d4f2de";
  //             break;
  //           case 5:
  //             bagToken = "1b135d2e4001b0edfaa0a8f5a9527396";
  //             break;
  //           case 6:
  //             bagToken = "06e8ff61632efe2b11bca3b5cacd5f82";
  //             break;
  //           case 7:
  //             bagToken = "1ae2e6ff9b277cdf21a336c54d07389b";
  //             break;
  //           case 8:
  //             bagToken = "e3ba9c652b275a11920847ca915fdd23";
  //             break;
  //         }
  //         break;
  //       case "Vistara":
  //         switch (data.no_of_units) {
  //           case 1:
  //             bagToken = "d5f6d2652ec0cb6d19b524822ec01551";
  //             break;
  //           case 2:
  //             bagToken = "d5f6d2652ec0cb6d19b524822ec01551";
  //             break;
  //           case 3:
  //             bagToken = "72c69905b5eeed41d39eeb88e5a9e5c4";
  //             break;
  //           case 4:
  //             bagToken = "de5ebad9e09c3b9b73f0addc6fc05735";
  //             break;
  //           case 5:
  //             bagToken = "68ba3d951aed1052a4c107e23f9ef19e";
  //             break;
  //           case 6:
  //             bagToken = "8bd5e7a7f8a61c740be33b1e1ed2e961";
  //             break;
  //           case 7:
  //             bagToken = "ffef040b4e3d33ba3bc0bbb695f43c7d";
  //             break;
  //           case 8:
  //             bagToken = "46c10332d24b8875bbe94e602f6dddfd";
  //             break;
  //         }
  //         break;
  //       case "Akasa Air":
  //         switch (data.no_of_units) {
  //           case 1:
  //             bagToken = "cd69124f0796e1093c813ab5e6a17a2b";
  //             break;
  //           case 2:
  //             bagToken = "d558212041ea3f8d2ff6738541fde0e9";
  //             break;
  //           case 3:
  //             bagToken = "e4b9af343f05692680b4257f1b2a2b10";
  //             break;
  //           case 4:
  //             bagToken = "a3ef60a293cefbd1df13fcaae2072872";
  //             break;
  //           case 5:
  //             bagToken = "7f483b768d50004f04dbba57485a6332";
  //             break;
  //           case 6:
  //             bagToken = "2447cf76743ff4ff2ca278724170de07";
  //             break;
  //           case 7:
  //             bagToken = "248d92b0841185651ef4b2149177f60c";
  //             break;
  //           case 8:
  //             bagToken = "555b9a53262ccc1080de8f91cc323f69";
  //             break;
  //         }
  //         break;
  //       case "Spicejet":
  //         switch (data.no_of_units) {
  //           case 1:
  //             if (data.service_type == 2) {
  //               bagToken = "058d9c2050d252447b9b7b6ecd626e23";
  //             } else {
  //               bagToken = "5632a32eac424bfc5248d8d446e160b5";
  //             }
  //             break;
  //           case 2:
  //             if (data.service_type == 2) {
  //               bagToken = "058d9c2050d252447b9b7b6ecd626e23";
  //             } else {
  //               bagToken = "5632a32eac424bfc5248d8d446e160b5";
  //             }
  //             break;
  //           case 3:
  //             if (data.service_type == 2) {
  //               bagToken = "a0673d1847ed8c762accfbbfc1cdefb0";
  //             } else {
  //               bagToken = "5ea52c0a12e05c1858835e29a8fa48bd";
  //             }
  //             break;
  //           case 4:
  //             if (data.service_type == 2) {
  //               bagToken = "3dce143eb4bbc9f3a3c458dacfb0a43d";
  //             } else {
  //               bagToken = "66899ce52734254aa3a193b96c6f47ec";
  //             }
  //             break;
  //           case 5:
  //             if (data.service_type == 2) {
  //               bagToken = "288dc39b6f68b8d3b0204bc39cc58c13";
  //             } else {
  //               bagToken = "288dc39b6f68b8d3b0204bc39cc58c13";
  //             }
  //             break;
  //           case 6:
  //             if (data.service_type == 2) {
  //               bagToken = "4b84927518ae305a6d4a3596761ba1d2";
  //             } else {
  //               bagToken = "4b84927518ae305a6d4a3596761ba1d2";
  //             }
  //             break;
  //           case 7:
  //             if (data.service_type == 2) {
  //               bagToken = "e036b937acad68debcd368ad81c78291";
  //             } else {
  //               bagToken = "e036b937acad68debcd368ad81c78291";
  //             }
  //             break;
  //           case 8:
  //             if (data.service_type == 2) {
  //               bagToken = "340342eb284a7feac005a7d2603895fd";
  //             } else {
  //               bagToken = "340342eb284a7feac005a7d2603895fd";
  //             }
  //             break;
  //         }
  //         break;
  //       case "AirAsia (India)":
  //         switch (data.no_of_units) {
  //           case 1:
  //             bagToken = "f2760b33d46a55283b650a600e535ca6";
  //             break;
  //           case 2:
  //             bagToken = "f2760b33d46a55283b650a600e535ca6";
  //             break;
  //           case 3:
  //             bagToken = "7ae2239065d1bea96034aaf90b45770d";
  //             break;
  //           case 4:
  //             bagToken = "ec4ae7883967b1752899d766a06a8fb5";
  //             break;
  //           case 5:
  //             bagToken = "82ec8cf901e1325a4d4e504aa74e9da5";
  //             break;
  //           case 6:
  //             bagToken = "66b8d62a515bb67ec1d5d68d747aac08";
  //             break;
  //           case 7:
  //             bagToken = "aa553f64dd9be0039ec4988090c543de";
  //             break;
  //           case 8:
  //             bagToken = "795bc1e63fea358f928e3676ee9f9bc4";
  //             break;
  //         }
  //         break;
  //       case "Other Airlines":
  //         if (data.no_of_units === 1) {
  //           bagToken = "44878386bbb0c774b89bb91d620823d4";
  //         } else if (data.no_of_units === 2) {
  //           bagToken = "37692b5e1a740e5b518a2d84fa9b28af";
  //         } else if (data.no_of_units === 3) {
  //           bagToken = "2df9a6d5820d336e51a09fb1bcad5d5d";
  //         } else if (data.no_of_units === 4) {
  //           bagToken = "b83c9175574142fd70be958ae69d08f6";
  //         } else if (data.no_of_units === 5) {
  //           bagToken = "13839e56ec623b8981dc002091a55b43";
  //         } else if (data.no_of_units === 6) {
  //           bagToken = "7b3a8b2f1455f3c5aefb42064ab485cb";
  //         } else if (data.no_of_units === 7) {
  //           bagToken = "6532e5ccae0fb290bc99af8514a94d14";
  //         } else if (data.no_of_units === 8) {
  //           bagToken = "d777d4f01d366c7fcd1af841c88528d6";
  //         }
  //         break;
  //     }
  //   }

  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json",
  //       // token: serviceType === 1 ? bagToken : 'd5f6d2652ec0cb6d19b524822ec01551'
  //       token: bagToken,
  //     }),
  //   };
  //   return this.http.post(
  //     "https://carter-cors.herokuapp.com/" + environment.baseUrl + api,
  //     data,
  //     httpOptions
  //   );
  // }

  // public postWithCorporateTokenAirline(
  //   api,
  //   data,
  //   serviceType,
  //   airline,
  //   transfer_type
  // ) {
  //   var bagToken;
  //   if (transfer_type == 2) {
  //     if (data.no_of_units === 1) {
  //       bagToken = "44878386bbb0c774b89bb91d620823d4";
  //     } else if (data.no_of_units === 2) {
  //       bagToken = "37692b5e1a740e5b518a2d84fa9b28af";
  //     } else if (data.no_of_units === 3) {
  //       bagToken = "2df9a6d5820d336e51a09fb1bcad5d5d";
  //     } else if (data.no_of_units === 4) {
  //       bagToken = "b83c9175574142fd70be958ae69d08f6";
  //     } else if (data.no_of_units === 5) {
  //       bagToken = "13839e56ec623b8981dc002091a55b43";
  //     } else if (data.no_of_units === 6) {
  //       bagToken = "7b3a8b2f1455f3c5aefb42064ab485cb";
  //     } else if (data.no_of_units === 7) {
  //       bagToken = "6532e5ccae0fb290bc99af8514a94d14";
  //     } else if (data.no_of_units === 8) {
  //       bagToken = "d777d4f01d366c7fcd1af841c88528d6";
  //     }
  //   } else {
  //     switch (airline) {
  //       case "IndiGo":
  //         switch (data.no_of_units) {
  //           case 1:
  //             bagToken = "d37a1e3d0fdc52cbfc8f876876925ba3";
  //             break;
  //           case 2:
  //             bagToken = "d37a1e3d0fdc52cbfc8f876876925ba3";
  //             break;
  //           case 3:
  //             bagToken = "e1eacd4217cfac41ca45876237b9730b";
  //             break;
  //           case 4:
  //             bagToken = "f519a8dcad9d4183345ee1df49d4f2de";
  //             break;
  //           case 5:
  //             bagToken = "1b135d2e4001b0edfaa0a8f5a9527396";
  //             break;
  //           case 6:
  //             bagToken = "06e8ff61632efe2b11bca3b5cacd5f82";
  //             break;
  //           case 7:
  //             bagToken = "1ae2e6ff9b277cdf21a336c54d07389b";
  //             break;
  //           case 8:
  //             bagToken = "e3ba9c652b275a11920847ca915fdd23";
  //             break;
  //         }
  //         break;
  //       case "Vistara":
  //         switch (data.no_of_units) {
  //           case 1:
  //             bagToken = "d5f6d2652ec0cb6d19b524822ec01551";
  //             break;
  //           case 2:
  //             bagToken = "d5f6d2652ec0cb6d19b524822ec01551";
  //             break;
  //           case 3:
  //             bagToken = "72c69905b5eeed41d39eeb88e5a9e5c4";
  //             break;
  //           case 4:
  //             bagToken = "de5ebad9e09c3b9b73f0addc6fc05735";
  //             break;
  //           case 5:
  //             bagToken = "68ba3d951aed1052a4c107e23f9ef19e";
  //             break;
  //           case 6:
  //             bagToken = "8bd5e7a7f8a61c740be33b1e1ed2e961";
  //             break;
  //           case 7:
  //             bagToken = "ffef040b4e3d33ba3bc0bbb695f43c7d";
  //             break;
  //           case 8:
  //             bagToken = "46c10332d24b8875bbe94e602f6dddfd";
  //             break;
  //         }
  //         break;
  //       case "Akasa Air":
  //         switch (data.no_of_units) {
  //           case 1:
  //             bagToken = "cd69124f0796e1093c813ab5e6a17a2b";
  //             break;
  //           case 2:
  //             bagToken = "d558212041ea3f8d2ff6738541fde0e9";
  //             break;
  //           case 3:
  //             bagToken = "e4b9af343f05692680b4257f1b2a2b10";
  //             break;
  //           case 4:
  //             bagToken = "a3ef60a293cefbd1df13fcaae2072872";
  //             break;
  //           case 5:
  //             bagToken = "7f483b768d50004f04dbba57485a6332";
  //             break;
  //           case 6:
  //             bagToken = "2447cf76743ff4ff2ca278724170de07";
  //             break;
  //           case 7:
  //             bagToken = "248d92b0841185651ef4b2149177f60c";
  //             break;
  //           case 8:
  //             bagToken = "555b9a53262ccc1080de8f91cc323f69";
  //             break;
  //         }
  //         break;
  //       case "Spicejet":
  //         switch (data.no_of_units) {
  //           case 1:
  //             if (data.service_type == 2) {
  //               bagToken = "058d9c2050d252447b9b7b6ecd626e23";
  //             } else {
  //               bagToken = "5632a32eac424bfc5248d8d446e160b5";
  //             }
  //             break;
  //           case 2:
  //             if (data.service_type == 2) {
  //               bagToken = "058d9c2050d252447b9b7b6ecd626e23";
  //             } else {
  //               bagToken = "5632a32eac424bfc5248d8d446e160b5";
  //             }
  //             break;
  //           case 3:
  //             if (data.service_type == 2) {
  //               bagToken = "a0673d1847ed8c762accfbbfc1cdefb0";
  //             } else {
  //               bagToken = "5ea52c0a12e05c1858835e29a8fa48bd";
  //             }
  //             break;
  //           case 4:
  //             if (data.service_type == 2) {
  //               bagToken = "3dce143eb4bbc9f3a3c458dacfb0a43d";
  //             } else {
  //               bagToken = "66899ce52734254aa3a193b96c6f47ec";
  //             }
  //             break;
  //           case 5:
  //             if (data.service_type == 2) {
  //               bagToken = "288dc39b6f68b8d3b0204bc39cc58c13";
  //             } else {
  //               bagToken = "288dc39b6f68b8d3b0204bc39cc58c13";
  //             }
  //             break;
  //           case 6:
  //             if (data.service_type == 2) {
  //               bagToken = "4b84927518ae305a6d4a3596761ba1d2";
  //             } else {
  //               bagToken = "4b84927518ae305a6d4a3596761ba1d2";
  //             }
  //             break;
  //           case 7:
  //             if (data.service_type == 2) {
  //               bagToken = "e036b937acad68debcd368ad81c78291";
  //             } else {
  //               bagToken = "e036b937acad68debcd368ad81c78291";
  //             }
  //             break;
  //           case 8:
  //             if (data.service_type == 2) {
  //               bagToken = "340342eb284a7feac005a7d2603895fd";
  //             } else {
  //               bagToken = "340342eb284a7feac005a7d2603895fd";
  //             }
  //             break;
  //         }
  //         break;
  //       case "AirAsia (India)":
  //         switch (data.no_of_units) {
  //           case 1:
  //             bagToken = "f2760b33d46a55283b650a600e535ca6";
  //             break;
  //           case 2:
  //             bagToken = "f2760b33d46a55283b650a600e535ca6";
  //             break;
  //           case 3:
  //             bagToken = "7ae2239065d1bea96034aaf90b45770d";
  //             break;
  //           case 4:
  //             bagToken = "ec4ae7883967b1752899d766a06a8fb5";
  //             break;
  //           case 5:
  //             bagToken = "82ec8cf901e1325a4d4e504aa74e9da5";
  //             break;
  //           case 6:
  //             bagToken = "66b8d62a515bb67ec1d5d68d747aac08";
  //             break;
  //           case 7:
  //             bagToken = "aa553f64dd9be0039ec4988090c543de";
  //             break;
  //           case 8:
  //             bagToken = "795bc1e63fea358f928e3676ee9f9bc4";
  //             break;
  //         }
  //         break;
  //       case "Other Airlines":
  //         if (data.no_of_units === 1) {
  //           bagToken = "44878386bbb0c774b89bb91d620823d4";
  //         } else if (data.no_of_units === 2) {
  //           bagToken = "37692b5e1a740e5b518a2d84fa9b28af";
  //         } else if (data.no_of_units === 3) {
  //           bagToken = "2df9a6d5820d336e51a09fb1bcad5d5d";
  //         } else if (data.no_of_units === 4) {
  //           bagToken = "b83c9175574142fd70be958ae69d08f6";
  //         } else if (data.no_of_units === 5) {
  //           bagToken = "13839e56ec623b8981dc002091a55b43";
  //         } else if (data.no_of_units === 6) {
  //           bagToken = "7b3a8b2f1455f3c5aefb42064ab485cb";
  //         } else if (data.no_of_units === 7) {
  //           bagToken = "6532e5ccae0fb290bc99af8514a94d14";
  //         } else if (data.no_of_units === 8) {
  //           bagToken = "d777d4f01d366c7fcd1af841c88528d6";
  //         }
  //         break;
  //       default:
  //         if (data.no_of_units === 1) {
  //           bagToken = "44878386bbb0c774b89bb91d620823d4";
  //         } else if (data.no_of_units === 2) {
  //           bagToken = "37692b5e1a740e5b518a2d84fa9b28af";
  //         } else if (data.no_of_units === 3) {
  //           bagToken = "2df9a6d5820d336e51a09fb1bcad5d5d";
  //         } else if (data.no_of_units === 4) {
  //           bagToken = "b83c9175574142fd70be958ae69d08f6";
  //         } else if (data.no_of_units === 5) {
  //           bagToken = "13839e56ec623b8981dc002091a55b43";
  //         } else if (data.no_of_units === 6) {
  //           bagToken = "7b3a8b2f1455f3c5aefb42064ab485cb";
  //         } else if (data.no_of_units === 7) {
  //           bagToken = "6532e5ccae0fb290bc99af8514a94d14";
  //         } else if (data.no_of_units === 8) {
  //           bagToken = "d777d4f01d366c7fcd1af841c88528d6";
  //         }
  //         break;
  //     }
  //   }

  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json",
  //       // token: serviceType === 1 ? bagToken : 'd5f6d2652ec0cb6d19b524822ec01551'
  //       token: bagToken,
  //     }),
  //   };
  //   return this.http.post(
  //     "https://carter-cors.herokuapp.com/" + environment.baseUrl + api,
  //     data,
  //     httpOptions
  //   );
  // }

  // **********************************************************

  //* For Production
  // **********************************************************
  public postJson(api, data) {
    if (Number(data.no_of_units) === 1) {
      var bagToken = "f25e8fd196c8fe47518024f820787ac2";
    } else if (Number(data.no_of_units) === 2) {
      var bagToken = "82af1272c02bdbbd14b3391ceca50f72";
    } else if (Number(data.no_of_units) === 3) {
      var bagToken = "c6f1fcf1980e24af3aa972f56a711659";
    } else if (Number(data.no_of_units) === 4) {
      var bagToken = "72c4c0a25c172ca57e2d7fb0d7eda01a";
    } else if (Number(data.no_of_units) === 5) {
      var bagToken = "1748e5dda195ea2b5219bb251cfebc18";
    } else if (Number(data.no_of_units) === 6) {
      var bagToken = "979836948a1f5b5d0a91b1b5befdce8d";
    } else if (Number(data.no_of_units) === 7) {
      var bagToken = "75a8354e626602d6649441bb5ec978cf";
    } else if (Number(data.no_of_units) === 8) {
      var bagToken = "670a8b2eae976655d264e07be35badb4";
    }
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=UTF-8",
        // 'Authorization': 'my-auth-token'
        token: bagToken,
      }),
    };
    return this.http.post(
      "https://carter-cors.herokuapp.com/" + environment.baseUrl + api,
      data,
      httpOptions
    );
  }

  public postJsonCity(api, data, serviceType) {
    if (Number(data.no_of_units) === 1) {
      var bagToken =
        serviceType === 1
          ? "4c6383ba2d782e163aec3e3ba45e9a3a"
          : "8a015c7484ef16bfccac2aaa90bee4fa";
    } else if (Number(data.no_of_units) === 2) {
      var bagToken =
        serviceType === 1
          ? "23f8480884f23eb3f5094b9230245c26"
          : "236be72234b2357cd09eb5a27687fe5d";
    } else if (Number(data.no_of_units) === 3) {
      var bagToken =
        serviceType === 1
          ? "c3108ed69a37eacc1dc46353e1f02645"
          : "991b7d5f8e750db3d6038a38a584eb9b";
    } else if (Number(data.no_of_units) === 4) {
      var bagToken =
        serviceType === 1
          ? "e39f3f25ef89c459a8952789bc7a4ea7"
          : "ef718bc80c6e6a1ff62ffab9674e2d98";
    } else if (Number(data.no_of_units) === 5) {
      var bagToken =
        serviceType === 1
          ? "f8243830eb5aaf8c65425aa011a57ba1"
          : "cbe7da4a5c231e99d152f218bbbcf2b8";
    } else if (Number(data.no_of_units) === 6) {
      var bagToken =
        serviceType === 1
          ? "73992b67aefd7048bc528fe947f85d3a"
          : "ec1352c6006e679234d5597d74e7681c";
    } else if (Number(data.no_of_units) === 7) {
      var bagToken =
        serviceType === 1
          ? "baceb41a6fe86d9380e62efbde0bd1ac"
          : "fad65ac4fc6470611b43ace6fcb6e215";
    } else if (Number(data.no_of_units) === 8) {
      var bagToken =
        serviceType === 1
          ? "eda1de7d0371293f9dfe78de4ab66624"
          : "b7bdf130eca4173cc41edb8ceafe1b24";
    }
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=UTF-8",
        // 'Authorization': 'my-auth-token'
        token: bagToken,
      }),
    };
    return this.http.post(
      "https://carter-cors.herokuapp.com/" + environment.baseUrl + api,
      data,
      httpOptions
    );
  }

  // For Booking
  public postWithStaticToken(api, data, serviceType) {
    if (data.no_of_units === 1) {
      var bagToken =
        serviceType === 1
          ? "cf6b106ea679c56d75b666ccf2204e40"
          : "a4c7c4836c5d331b8789cf455a00284f";
    } else if (data.no_of_units === 2) {
      var bagToken =
        serviceType === 1
          ? "7b053e9914c175d029dc16434b178413"
          : "7cb7091673243d9d6c5d1b68d11656e2";
    } else if (data.no_of_units === 3) {
      var bagToken =
        serviceType === 1
          ? "4fea6a5f933f4e21f5cb9ec3c01f0ec0"
          : "51c2038bbaa2f1de3ea206cf00cf3dd4";
    } else if (data.no_of_units === 4) {
      var bagToken =
        serviceType === 1
          ? "54436781865bf413e48cc0b849320536"
          : "12d260b40278f7d977905a7a97378419";
    } else if (data.no_of_units === 5) {
      var bagToken =
        serviceType === 1
          ? "900b071a7e63e675baaca6b37e7f1275"
          : "46407f11913f240259aebdc01d1fea07";
    } else if (data.no_of_units === 6) {
      var bagToken =
        serviceType === 1
          ? "8aeb15d844d36ba0051557da6a525a54"
          : "eaf4f3286696f9bef0d58d5c83111de2";
    } else if (data.no_of_units === 7) {
      var bagToken =
        serviceType === 1
          ? "be4d28d6d4275c5e1f1140c4955f75e9"
          : "119c9e7b9963211c7fcaffe2672fca1a";
    } else if (data.no_of_units === 8) {
      var bagToken =
        serviceType === 1
          ? "91d0e8e2ece1137af4750d2fcde525d3"
          : "27d615db8cf2d0d173f2a0a9e2437c9d";
    }
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        // token: serviceType === 1 ? bagToken : 'd5f6d2652ec0cb6d19b524822ec01551'
        token: bagToken,
      }),
    };
    return this.http.post(
      "https://carter-cors.herokuapp.com/" + environment.baseUrl + api,
      data,
      httpOptions
    );
  }

  // For Calculation
  public postWithCorporateToken(api, data, serviceType) {
    if (data.no_of_units === 1) {
      var bagToken =
        serviceType === 1
          ? "cf6b106ea679c56d75b666ccf2204e40"
          : "a4c7c4836c5d331b8789cf455a00284f";
    } else if (data.no_of_units === 2) {
      var bagToken =
        serviceType === 1
          ? "7b053e9914c175d029dc16434b178413"
          : "7cb7091673243d9d6c5d1b68d11656e2";
    } else if (data.no_of_units === 3) {
      var bagToken =
        serviceType === 1
          ? "4fea6a5f933f4e21f5cb9ec3c01f0ec0"
          : "51c2038bbaa2f1de3ea206cf00cf3dd4";
    } else if (data.no_of_units === 4) {
      var bagToken =
        serviceType === 1
          ? "54436781865bf413e48cc0b849320536"
          : "12d260b40278f7d977905a7a97378419";
    } else if (data.no_of_units === 5) {
      var bagToken =
        serviceType === 1
          ? "900b071a7e63e675baaca6b37e7f1275"
          : "46407f11913f240259aebdc01d1fea07";
    } else if (data.no_of_units === 6) {
      var bagToken =
        serviceType === 1
          ? "8aeb15d844d36ba0051557da6a525a54"
          : "eaf4f3286696f9bef0d58d5c83111de2";
    } else if (data.no_of_units === 7) {
      var bagToken =
        serviceType === 1
          ? "be4d28d6d4275c5e1f1140c4955f75e9"
          : "119c9e7b9963211c7fcaffe2672fca1a";
    } else if (data.no_of_units === 8) {
      var bagToken =
        serviceType === 1
          ? "91d0e8e2ece1137af4750d2fcde525d3"
          : "27d615db8cf2d0d173f2a0a9e2437c9d";
    }

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        // token: serviceType === 1 ? bagToken : 'd5f6d2652ec0cb6d19b524822ec01551'
        token: bagToken,
      }),
    };
    return this.http.post(
      "https://carter-cors.herokuapp.com/" + environment.baseUrl + api,
      data,
      httpOptions
    );
  }

  // price calculations for airport
  public postWithCorporateTokenAirline(
    api,
    data,
    serviceType,
    airline,
    transfer_type
  ) {
    var bagToken;
    if (transfer_type == 2) {
      switch (data.no_of_units) {
        case 1:
          bagToken =
            data.service_type === 1
              ? "cf6b106ea679c56d75b666ccf2204e40"
              : "a4c7c4836c5d331b8789cf455a00284f";
          break;
        case 2:
          bagToken =
            data.service_type === 1
              ? "7b053e9914c175d029dc16434b178413"
              : "7cb7091673243d9d6c5d1b68d11656e2";
          break;
        case 3:
          bagToken =
            data.service_type === 1
              ? "4fea6a5f933f4e21f5cb9ec3c01f0ec0"
              : "51c2038bbaa2f1de3ea206cf00cf3dd4";
          break;
        case 4:
          bagToken =
            data.service_type === 1
              ? "54436781865bf413e48cc0b849320536"
              : "12d260b40278f7d977905a7a97378419";
          break;
        case 5:
          bagToken =
            data.service_type === 1
              ? "900b071a7e63e675baaca6b37e7f1275"
              : "46407f11913f240259aebdc01d1fea07";
          break;
        case 6:
          bagToken =
            data.service_type === 1
              ? "8aeb15d844d36ba0051557da6a525a54"
              : "eaf4f3286696f9bef0d58d5c83111de2";
          break;
        case 7:
          bagToken =
            data.service_type === 1
              ? "be4d28d6d4275c5e1f1140c4955f75e9"
              : "119c9e7b9963211c7fcaffe2672fca1a";
          break;
        case 8:
          bagToken =
            data.service_type === 1
              ? "91d0e8e2ece1137af4750d2fcde525d3"
              : "27d615db8cf2d0d173f2a0a9e2437c9d";
          break;
      }
    } else {
      switch (airline) {
        case "IndiGo":
          switch (data.no_of_units) {
            case 1:
              bagToken =
                data.service_type == 1
                  ? "d432cbf9786ba6e25f72914d7a276af7"
                  : "cf26d7dcf14618ac675085e2740f5487";
              break;
            case 2:
              bagToken =
                data.service_type == 1
                  ? "c54514fa6eb28a81c54b201362b1bfa4"
                  : "a27f964ddca4ede0f3ae6aa51d9d5c0a";
              break;
            case 3:
              bagToken =
                data.service_type == 1
                  ? "d7da3e66dea351b34fc98221ddb2bfbb"
                  : "9d9086b42fb5f0df427cab4b76da8105";
              break;
            case 4:
              bagToken =
                data.service_type == 1
                  ? "c51ff8cd32b71ee568c6d74d3f68a0a7"
                  : "f3b2622d36f32b8b3cc55d8229bcfcee";
              break;
            case 5:
              bagToken =
                data.service_type == 1
                  ? "fc624decfa3837a17dd0bb5d3dfd7756"
                  : "42f91dcb86af694f61407df98ffa811f";
              break;
            case 6:
              bagToken =
                data.service_type == 1
                  ? "35eb2ac37a892cf28fb80f3ef631f798"
                  : "895006331b0996be63836411db2d0bef";
              break;
            case 7:
              bagToken =
                data.service_type == 1
                  ? "7389189ef63fb9950ab451312a456373"
                  : "4111e4577d97ae35a3df320400ed741b";
              break;
            case 8:
              bagToken =
                data.service_type == 1
                  ? "f2771b675553e32916eecdd069e4032c"
                  : "591d131a2a88c48fc240085840cad05a";
              break;
          }
          break;
        case "Vistara":
          switch (data.no_of_units) {
            case 1:
              bagToken =
                data.service_type == 1
                  ? "32855d9d3193f985697f289a0e7cb657"
                  : "9d73076203afeeb232aacadc7c8c8c33";
              break;
            case 2:
              bagToken =
                data.service_type == 1
                  ? "6cf4f167db3c5bd09f76075e5f076460"
                  : "81038d473553fa88032c4ad6efd110c3";
              break;
            case 3:
              bagToken =
                data.service_type == 1
                  ? "281acf413c27d996bdeaf43b9ea45845"
                  : "35fcdff9e7c0b0fad07d7f500ec25b07";
              break;
            case 4:
              bagToken =
                data.service_type == 1
                  ? "7e4b95c57ec67dda7519ff43e795eae9"
                  : "d778f3f61cb8f1df5deaa2f3d7894eb7";
              break;
            case 5:
              bagToken =
                data.service_type == 1
                  ? "1ad98984de9bfdfca10f76257b1eb74f"
                  : "2b59017b3fab8a763381444420a98403";
              break;
            case 6:
              bagToken =
                data.service_type == 1
                  ? "3837748cc63e6fbddbc7fb5d8e329ea5"
                  : "a14e0411d009f0156a6cbc8e7921e2d7";
              break;
            case 7:
              bagToken =
                data.service_type == 1
                  ? "4b71195e44ddafd61b8b3c6da3ee0a6a"
                  : "38b3192165bef2a2082cd10e21a286c9";
              break;
            case 8:
              bagToken =
                data.service_type == 1
                  ? "35072216690e65179a66b087ecd4ffb9"
                  : "0d702c0a2d4be3ef33d90db2234cd946";
              break;
          }
          break;
        case "Akasa Air":
          switch (data.no_of_units) {
            case 1:
              bagToken =
                data.service_type == 1
                  ? "2ef1c0194c225915b5501d82dad65862"
                  : "ac7b00f3d1529415df7476434a5455ea";
              break;
            case 2:
              bagToken =
                data.service_type == 1
                  ? "1a929e46a04e1ea8181ac25da6cab77e"
                  : "8055a444799bfa71bb510910e9517580";
              break;
            case 3:
              bagToken =
                data.service_type == 1
                  ? "ba52587e9ead666cca96511bdf6e4689"
                  : "da277c4b6ab989d64035d5ce1a149ff4";
              break;
            case 4:
              bagToken =
                data.service_type == 1
                  ? "ba52587e9ead666cca96511bdf6e4689"
                  : "da277c4b6ab989d64035d5ce1a149ff4";
              break;
            case 5:
              bagToken =
                data.service_type == 1
                  ? "a0edaa627dab7bd14af7ce9bc11e73d2"
                  : "42854c88b27bc97be0d25c0050efccaa";
              break;
            case 6:
              bagToken =
                data.service_type == 1
                  ? "a0edaa627dab7bd14af7ce9bc11e73d2"
                  : "42854c88b27bc97be0d25c0050efccaa";
              break;
            case 7:
              bagToken =
                data.service_type == 1
                  ? "14fd7635c43599e88338ebc0489c84fd"
                  : "44a9d674c328b4a1a0bf02eb4ed8607e";
              break;
            case 8:
              bagToken =
                data.service_type == 1
                  ? "14fd7635c43599e88338ebc0489c84fd"
                  : "44a9d674c328b4a1a0bf02eb4ed8607e";
              break;
          }
          break;
        case "Spicejet":
          switch (data.no_of_units) {
            case 1:
              if (data.service_type == 1) {
                bagToken = "779f2a42da4f88ce3320e8720035e43e";
              } else {
                bagToken = "f7fb3e8fc62151b55652ecc097b9fbaf";
              }
              break;
            case 2:
              if (data.service_type == 1) {
                bagToken = "d9b984829f67fabcaa8d0491444a5be6";
              } else {
                bagToken = "0c93591d09c898e50fded14cb23750f1";
              }
              break;
            case 3:
              if (data.service_type == 1) {
                bagToken = "a03d8684ecb837066f04894ab8776e81";
              } else {
                bagToken = "a5b190a40e57bcf3b64bea2650672ee3";
              }
              break;
            case 4:
              if (data.service_type == 1) {
                bagToken = "ea7a098e79750abcd38a37004e8609ce";
              } else {
                bagToken = "72d6b84401db0c7db065abaeb7000d3b";
              }
              break;
            case 5:
              if (data.service_type == 1) {
                bagToken = "98c5f97c5354ac415585d1b1765a487e";
              } else {
                bagToken = "503e98562da82e0eb035001a27e92fb3";
              }
              break;
            case 6:
              if (data.service_type == 1) {
                bagToken = "f9e0c96f16ca9c29644249457e2bb08f";
               } else {
                bagToken = "8501bceea4a2a0a0f1e8c8e28b0fc4b7";
              }
              break;
            case 7:
              if (data.service_type == 1) {
                 bagToken = "0d240687cdad4671a9ef6c8ef816ecbc";
              } else {
                bagToken = "760cbf334b154fc4db7f16646fbe569b";
              }
              break;
            case 8:
              if (data.service_type == 1) {
               bagToken = "935fffeb968df1e2a28877c2a0838cba";
              } else {
                bagToken = "c933e0eea3f48b193b522747e126045a";
              }
              break;
            }
          break;
        case "AirAsia (India)":
          switch (data.no_of_units) {
            case 1:
              bagToken =
                data.service_type === 1
                  ? "3ee669e09fd7a5fca01f34c1749af398"
                  : "3ee669e09fd7a5fca01f34c1749af398";
              break;
            case 2:
              bagToken =
                data.service_type === 1
                  ? "83a390dc9fe9ac3795322397602a8348"
                  : "eed907045110e0935ecdfe50e4aa223a";
              break;
            case 3:
              bagToken =
                data.service_type === 1
                  ? "b8efae28a637989dfaeecff651e28796"
                  : "9e030fa83100e5aa0b8d9444303e4463";
              break;
            case 4:
              bagToken =
                data.service_type === 1
                  ? "cf592918707c4aae8838032fefc80449"
                  : "b2dcbadc78b53167ba7fcd20a6c72bc1";
              break;
            case 5:
               bagToken =
               data.service_type === 1
                  ? "442e7a1ed12df02f9554f2682ab3cc67"
                  : "1e94681feadf26f1fa1cba2ed355e14d";
                 break;
            case 6:
              bagToken =
              data.service_type === 1
                  ? "81f6023bf530fcc74c388533c9a87023"
                  : "5ab15a3c6809782dbba73fe18e0da082";
              break;
            case 7:
              bagToken =
              data.service_type === 1
                ? "422f5b6ca3f010f1d34ef421d0c18d3c"
                : "83d68eda2aa0e48d79c580f673cc921b";
              break;
            case 8:
             bagToken =
             data.service_type === 1
                ? "3aab4323ba5b0285ded65836e99bfafa"
                : "aa5c56b0f1f7aedd0ad7436d2a9a3a88";
            break;
          }
          break;
        case "Other Airlines":
          switch (data.no_of_units) {
            case 1:
              bagToken =
                data.service_type === 1
                  ? "cf6b106ea679c56d75b666ccf2204e40"
                  : "a4c7c4836c5d331b8789cf455a00284f";
              break;
            case 2:
              bagToken =
                data.service_type === 1
                  ? "7b053e9914c175d029dc16434b178413"
                  : "7cb7091673243d9d6c5d1b68d11656e2";
              break;
            case 3:
              bagToken =
                data.service_type === 1
                  ? "4fea6a5f933f4e21f5cb9ec3c01f0ec0"
                  : "51c2038bbaa2f1de3ea206cf00cf3dd4";
              break;
            case 4:
              bagToken =
                data.service_type === 1
                  ? "54436781865bf413e48cc0b849320536"
                  : "12d260b40278f7d977905a7a97378419";
              break;
            case 5:
              bagToken =
                data.service_type === 1
                  ? "900b071a7e63e675baaca6b37e7f1275"
                  : "46407f11913f240259aebdc01d1fea07";
              break;
            case 6:
              bagToken =
                data.service_type === 1
                  ? "8aeb15d844d36ba0051557da6a525a54"
                  : "eaf4f3286696f9bef0d58d5c83111de2";
              break;
            case 7:
              bagToken =
                data.service_type === 1
                  ? "be4d28d6d4275c5e1f1140c4955f75e9"
                  : "119c9e7b9963211c7fcaffe2672fca1a";
              break;
            case 8:
              bagToken =
                data.service_type === 1
                  ? "91d0e8e2ece1137af4750d2fcde525d3"
                  : "27d615db8cf2d0d173f2a0a9e2437c9d";
              break;
          }
          break;
      }
    }

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        // token: serviceType === 1 ? bagToken : 'd5f6d2652ec0cb6d19b524822ec01551'
        token: bagToken,
      }),
    };
    return this.http.post(
      "https://carter-cors.herokuapp.com/" + environment.baseUrl + api,
      data,
      httpOptions
    );
  }

  public postWithStaticTokenAirline(
    api,
    data,
    serviceType,
    airline,
    transfer_type
  ) {
    var bagToken;
    if (transfer_type == 2) {
      switch (data.no_of_units) {
        case 1:
          bagToken =
            data.service_type === 1
              ? "cf6b106ea679c56d75b666ccf2204e40"
              : "a4c7c4836c5d331b8789cf455a00284f";
          break;
        case 2:
          bagToken =
            data.service_type === 1
              ? "7b053e9914c175d029dc16434b178413"
              : "7cb7091673243d9d6c5d1b68d11656e2";
          break;
        case 3:
          bagToken =
            data.service_type === 1
              ? "4fea6a5f933f4e21f5cb9ec3c01f0ec0"
              : "51c2038bbaa2f1de3ea206cf00cf3dd4";
          break;
        case 4:
          bagToken =
            data.service_type === 1
              ? "54436781865bf413e48cc0b849320536"
              : "12d260b40278f7d977905a7a97378419";
        case 5:
          bagToken =
            data.service_type === 1
              ? "900b071a7e63e675baaca6b37e7f1275"
              : "46407f11913f240259aebdc01d1fea07";
          break;
        case 6:
          bagToken =
            data.service_type === 1
              ? "8aeb15d844d36ba0051557da6a525a54"
              : "eaf4f3286696f9bef0d58d5c83111de2";
          break;
        case 7:
          bagToken =
            data.service_type === 1
              ? "be4d28d6d4275c5e1f1140c4955f75e9"
              : "119c9e7b9963211c7fcaffe2672fca1a";
          break;
        case 8:
          bagToken =
            data.service_type === 1
              ? "91d0e8e2ece1137af4750d2fcde525d3"
              : "27d615db8cf2d0d173f2a0a9e2437c9d";
          break;
      }
    } else {
      switch (airline) {
        case "IndiGo":
          switch (data.no_of_units) {
            case 1:
              bagToken =
                data.service_type == 1
                  ? "d432cbf9786ba6e25f72914d7a276af7"
                  : "cf26d7dcf14618ac675085e2740f5487";
              break;
            case 2:
              bagToken =
                data.service_type == 1
                  ? "c54514fa6eb28a81c54b201362b1bfa4"
                  : "a27f964ddca4ede0f3ae6aa51d9d5c0a";
              break;
            case 3:
              bagToken =
                data.service_type == 1
                  ? "d7da3e66dea351b34fc98221ddb2bfbb"
                  : "9d9086b42fb5f0df427cab4b76da8105";
              break;
            case 4:
              bagToken =
                data.service_type == 1
                  ? "c51ff8cd32b71ee568c6d74d3f68a0a7"
                  : "f3b2622d36f32b8b3cc55d8229bcfcee";
              break;
            case 5:
              bagToken =
                data.service_type == 1
                  ? "fc624decfa3837a17dd0bb5d3dfd7756"
                  : "42f91dcb86af694f61407df98ffa811f";
              break;
            case 6:
              bagToken =
                data.service_type == 1
                  ? "35eb2ac37a892cf28fb80f3ef631f798"
                  : "895006331b0996be63836411db2d0bef";
              break;
            case 7:
              bagToken =
                data.service_type == 1
                  ? "7389189ef63fb9950ab451312a456373"
                  : "4111e4577d97ae35a3df320400ed741b";
              break;
            case 8:
              bagToken =
                data.service_type == 1
                  ? "f2771b675553e32916eecdd069e4032c"
                  : "591d131a2a88c48fc240085840cad05a";
              break;
          }
          break;
        case "Vistara":
          switch (data.no_of_units) {
            case 1:
              bagToken =
                data.service_type == 1
                  ? "32855d9d3193f985697f289a0e7cb657"
                  : "9d73076203afeeb232aacadc7c8c8c33";
              break;
            case 2:
              bagToken =
                data.service_type == 1
                  ? "6cf4f167db3c5bd09f76075e5f076460"
                  : "81038d473553fa88032c4ad6efd110c3";
              break;
            case 3:
              bagToken =
                data.service_type == 1
                  ? "281acf413c27d996bdeaf43b9ea45845"
                  : "35fcdff9e7c0b0fad07d7f500ec25b07";
              break;
            case 4:
              bagToken =
                data.service_type == 1
                  ? "7e4b95c57ec67dda7519ff43e795eae9"
                  : "d778f3f61cb8f1df5deaa2f3d7894eb7";
              break;
            case 5:
              bagToken =
                data.service_type == 1
                  ? "1ad98984de9bfdfca10f76257b1eb74f"
                  : "2b59017b3fab8a763381444420a98403";
              break;
            case 6:
              bagToken =
                data.service_type == 1
                  ? "3837748cc63e6fbddbc7fb5d8e329ea5"
                  : "a14e0411d009f0156a6cbc8e7921e2d7";
              break;
            case 7:
              bagToken =
                data.service_type == 1
                  ? "4b71195e44ddafd61b8b3c6da3ee0a6a"
                  : "38b3192165bef2a2082cd10e21a286c9";
              break;
            case 8:
              bagToken =
                data.service_type == 1
                  ? "35072216690e65179a66b087ecd4ffb9"
                  : "0d702c0a2d4be3ef33d90db2234cd946";
              break;
          }
          break;
        case "Akasa Air":
          switch (data.no_of_units) {
            case 1:
              bagToken =
                data.service_type == 1
                  ? "2ef1c0194c225915b5501d82dad65862"
                  : "ac7b00f3d1529415df7476434a5455ea";
              break;
            case 2:
              bagToken =
                data.service_type == 1
                  ? "1a929e46a04e1ea8181ac25da6cab77e"
                  : "8055a444799bfa71bb510910e9517580";
              break;
            case 3:
              bagToken =
                data.service_type == 1
                  ? "ba52587e9ead666cca96511bdf6e4689"
                  : "da277c4b6ab989d64035d5ce1a149ff4";
              break;
            case 4:
              bagToken =
                data.service_type == 1
                  ? "ba52587e9ead666cca96511bdf6e4689"
                  : "da277c4b6ab989d64035d5ce1a149ff4";
              break;
            case 5:
              bagToken =
                data.service_type == 1
                  ? "a0edaa627dab7bd14af7ce9bc11e73d2"
                  : "42854c88b27bc97be0d25c0050efccaa";
              break;
            case 6:
              bagToken =
                data.service_type == 1
                  ? "a0edaa627dab7bd14af7ce9bc11e73d2"
                  : "42854c88b27bc97be0d25c0050efccaa";
              break;
            case 7:
              bagToken =
                data.service_type == 1
                  ? "14fd7635c43599e88338ebc0489c84fd"
                  : "44a9d674c328b4a1a0bf02eb4ed8607e";
              break;
            case 8:
              bagToken =
                data.service_type == 1
                  ? "14fd7635c43599e88338ebc0489c84fd"
                  : "44a9d674c328b4a1a0bf02eb4ed8607e";
              break;
          }
          break;
        case "Spicejet":
          switch (data.no_of_units) {
            case 1:
              if (data.service_type == 1) {
                bagToken = "779f2a42da4f88ce3320e8720035e43e";
              } else {
                bagToken = "f7fb3e8fc62151b55652ecc097b9fbaf";
              }
              break;
            case 2:
              if (data.service_type == 1) {
                bagToken = "d9b984829f67fabcaa8d0491444a5be6";
              } else {
                bagToken = "0c93591d09c898e50fded14cb23750f1";
              }
              break;
            case 3:
              if (data.service_type == 1) {
                bagToken = "a03d8684ecb837066f04894ab8776e81";
              } else {
                bagToken = "a5b190a40e57bcf3b64bea2650672ee3";
              }
              break;
            case 4:
              if (data.service_type == 1) {
                bagToken = "ea7a098e79750abcd38a37004e8609ce";
              } else {
                bagToken = "72d6b84401db0c7db065abaeb7000d3b";
              }
              break;
            case 5:
              if (data.service_type == 1) {
                bagToken = "98c5f97c5354ac415585d1b1765a487e";
              } else {
                bagToken = "503e98562da82e0eb035001a27e92fb3";
              }
              break;
            case 6:
              if (data.service_type == 1) {
                bagToken = "f9e0c96f16ca9c29644249457e2bb08f";
               } else {
                bagToken = "8501bceea4a2a0a0f1e8c8e28b0fc4b7";
              }
              break;
            case 7:
              if (data.service_type == 1) {
                 bagToken = "0d240687cdad4671a9ef6c8ef816ecbc";
              } else {
                bagToken = "760cbf334b154fc4db7f16646fbe569b";
              }
              break;
            case 8:
              if (data.service_type == 1) {
               bagToken = "935fffeb968df1e2a28877c2a0838cba";
              } else {
                bagToken = "c933e0eea3f48b193b522747e126045a";
              }
              break;
            }
          break;
        case "AirAsia (India)":
          switch (data.no_of_units) {
            case 1:
              bagToken =
                data.service_type === 1
                  ? "3ee669e09fd7a5fca01f34c1749af398"
                  : "3ee669e09fd7a5fca01f34c1749af398";
              break;
            case 2:
              bagToken =
                data.service_type === 1
                  ? "83a390dc9fe9ac3795322397602a8348"
                  : "eed907045110e0935ecdfe50e4aa223a";
              break;
            case 3:
              bagToken =
                data.service_type === 1
                  ? "b8efae28a637989dfaeecff651e28796"
                  : "9e030fa83100e5aa0b8d9444303e4463";
              break;
            case 4:
              bagToken =
                data.service_type === 1
                  ? "cf592918707c4aae8838032fefc80449"
                  : "b2dcbadc78b53167ba7fcd20a6c72bc1";
              break;
            case 5:
               bagToken =
               data.service_type === 1
                  ? "442e7a1ed12df02f9554f2682ab3cc67"
                  : "1e94681feadf26f1fa1cba2ed355e14d";
                 break;
            case 6:
              bagToken =
              data.service_type === 1
                  ? "81f6023bf530fcc74c388533c9a87023"
                  : "5ab15a3c6809782dbba73fe18e0da082";
              break;
            case 7:
              bagToken =
              data.service_type === 1
                ? "422f5b6ca3f010f1d34ef421d0c18d3c"
                : "83d68eda2aa0e48d79c580f673cc921b";
              break;
            case 8:
             bagToken =
             data.service_type === 1
                ? "3aab4323ba5b0285ded65836e99bfafa"
                : "aa5c56b0f1f7aedd0ad7436d2a9a3a88";
            break;
          }
          break;
        case "Other Airlines":
          switch (data.no_of_units) {
            case 1:
              bagToken =
                data.service_type === 1
                  ? "cf6b106ea679c56d75b666ccf2204e40"
                  : "a4c7c4836c5d331b8789cf455a00284f";
              break;
            case 2:
              bagToken =
                data.service_type === 1
                  ? "7b053e9914c175d029dc16434b178413"
                  : "7cb7091673243d9d6c5d1b68d11656e2";
              break;
            case 3:
              bagToken =
                data.service_type === 1
                  ? "4fea6a5f933f4e21f5cb9ec3c01f0ec0"
                  : "51c2038bbaa2f1de3ea206cf00cf3dd4";
              break;
            case 4:
              bagToken =
                data.service_type === 1
                  ? "54436781865bf413e48cc0b849320536"
                  : "12d260b40278f7d977905a7a97378419";
              break;
            case 5:
              bagToken =
                data.service_type === 1
                  ? "900b071a7e63e675baaca6b37e7f1275"
                  : "46407f11913f240259aebdc01d1fea07";
              break;
            case 6:
              bagToken =
                data.service_type === 1
                  ? "8aeb15d844d36ba0051557da6a525a54"
                  : "eaf4f3286696f9bef0d58d5c83111de2";
              break;
            case 7:
              bagToken =
                data.service_type === 1
                  ? "be4d28d6d4275c5e1f1140c4955f75e9"
                  : "119c9e7b9963211c7fcaffe2672fca1a";
              break;
            case 8:
              bagToken =
                data.service_type === 1
                  ? "91d0e8e2ece1137af4750d2fcde525d3"
                  : "27d615db8cf2d0d173f2a0a9e2437c9d";
              break;
          }
          break;
      }
    }

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        // token: serviceType === 1 ? bagToken : 'd5f6d2652ec0cb6d19b524822ec01551'
        token: bagToken,
      }),
    };
    return this.http.post(
      "https://carter-cors.herokuapp.com/" + environment.baseUrl + api,
      data,
      httpOptions
    );
  }

  // **********************************************************

  public postFormdata(api, postdata) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "text/html; charset=UTF-8",
        // 'Authorization': 'my-auth-token'
      }),
    };
    return this.http.post(environment.baseUrl + api, postdata, httpOptions);
  }

  public postFormdataUploadImage(api, data) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'multipart/form-data',
    //   })
    // };
    return this.http.post(environment.baseUrl + api, data);
  }

  public postOla(api, data, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        token: token,
      }),
    };
    return this.http.post(
      "https://carter-cors.herokuapp.com/" + environment.baseUrl + api,
      data,
      httpOptions
    );
  }

  public postOlaBooking(api, data, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        token: token,
      }),
    };
    return this.http.post(
      "https://carter-cors.herokuapp.com/" + environment.baseUrl + api,
      data,
      httpOptions
    );
  }

  //////////intertransfer
  public postWithDytnamicToken(api, data, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        token: token,
      }),
    };
    return this.http.post(
      "https://carter-cors.herokuapp.com/" + environment.baseUrl + api,
      data,
      httpOptions
    );
  }

  public postWithCorporateTokenCargo(api, data, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        token: token,
      }),
    };
    return this.http.post(
      "https://carter-cors.herokuapp.com/" + environment.baseUrl + api,
      data,
      httpOptions
    );
  }

  public postWithCorporateTokenCargoAirline(api, data, no_of_bags, type) {
    var token;

    //* For QA
    // **********************************************************
    // switch (no_of_bags) {
    //   case "2 kgs":
    //     switch (type) {
    //       case "Rush Air":
    //         token = `e7c08503c99ed8061ab4c4fac1fb123e`;
    //         break;
    //       case "Rush Surface":
    //         token = `b27bc502ac2651c9f9670e2c185b4470`;
    //         break;
    //       case "Rush AirExpress":
    //         token = `3d17654a73c0e8083e49808005843226`;
    //         break;
    //     }
    //     break;

    //   default:
    //     switch (type) {
    //       case "Rush Air":
    //         token = `b90a58dbbeba8c6c38c44ab40fffb6aa`;
    //         break;
    //       case "Rush Surface":
    //         token = `b72bf82f9293a72d4cde80ab4ba5aaff`;
    //         break;
    //       case "Rush AirExpress":
    //         token = `1679e08ebbd621cdfef473a5af506534`;
    //         break;
    //     }
    //     break;
    // }
    // **********************************************************

    //* For Production
    // **********************************************************
    switch (no_of_bags) {
      case "2 kgs":
        switch (type) {
          case "Rush Air":
            token = `74270889b54d540ded3eb695aff807f7`;
            break;
          case "Rush Surface":
            token = `4c4b38f989db495468044326bb5c56a1`;
            break;
          case "Rush AirExpress":
            token = `aeba8e6ed1a094c6c3e36bea13aef0aa`;
            break;
        }
        break;
      case "5 kgs":
        switch (type) {
          case "Rush Air":
            token = `cc9de4d4d27c0dde21ffffdb21b89417`;
            break;
          case "Rush Surface":
            token = `5ddefaba50d8eb1690d3c37dc6d1a56f`;
            break;
          case "Rush AirExpress":
            token = `c8d2b27d0f4402f40117f31f898bfccb`;
            break;
        }
        break;
      case "7 kgs":
        switch (type) {
          case "Rush Air":
            token = `256ce18d912c4e57df425ec047eb58ad`;
            break;
          case "Rush Surface":
            token = `7ca9a797efc399e51b2d90869108f17b`;
            break;
          case "Rush AirExpress":
            token = `6b9375d765be72443d0c8f47a0639888`;
            break;
          }
        break;
      case "12 kgs":
        switch (type) {
          case "Rush Air":
            token = `9c13289724f6a51f170f84ed88bbe119`;
            break;
          case "Rush Surface":
            token = `ba532dc74ca196b04aeaf764fabcb61f`;
            break;
          case "Rush AirExpress":
            token = `79142d8e87c19a211de3e0b8261f4c6b`;
            break;
        }
        break;
      case "15 kgs":
        switch (type) {
          case "Rush Air":
            token = `551dd3c7742b47e900bc565f681f65d8`;
            break;
          case "Rush Surface":
            token = `6f644f5cc3a55aa0516183d6dc8dd286`;
            break;
          case "Rush AirExpress":
            token = `e99872197082005579d5e4127c4f67de`;
            break;
        }
        break;
      case "20 kgs":
        switch (type) {
          case "Rush Air":
            token = `6d9a48cdf24befef999b74c21a121b40`;
            break;
          case "Rush Surface":
            token = `0d47c23bdd3fa8ea29cfd89c6137dd6c`;
            break;
          case "Rush AirExpress":
            token = `89d34cf4efbc5eb34b86084bfd4394ac`;
            break;
        }
        break;
      case "25 kgs":
        switch (type) {
          case "Rush Air":
            token = `ab6c3fd0bb069d8ac04e9ffa8cb21ca5`;
            break;
          case "Rush Surface":
            token = `8a4eccd0fb71d26b899637866af4c42b`;
            break;
          case "Rush AirExpress":
            token = `c05e8cf8b23836b62ec12da260deeb22`;
            break;
        }
        break;
      case "30 kgs":
        switch (type) {
          case "Rush Air":
            token = `ac31b9187f77b106459933b663520907`;
            break;
          case "Rush Surface":
            token = `33fe1e8547df3daa853d72eb077e7d5e`;
            break;
          case "Rush AirExpress":
            token = `de97981a774fde3bca3956a0e419a3c3`;
            break;
        }
        break;
      case "40 kgs":
        switch (type) {
          case "Rush Air":
            token = `d3a331352cd4df829fb15d519c0459e0`;
            break;
          case "Rush Surface":
            token = `fd36d6125c1831a0220455784b3c46e2`;
            break;
          case "Rush AirExpress":
            token = `065f033981ffbbdca42252500961e651`;
            break;
        }
        break;
     }
    // **********************************************************

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        token: token,
      }),
    };
    return this.http.post(
      "https://carter-cors.herokuapp.com/" + environment.baseUrl + api,
      data,
      httpOptions
    );
  }

  public postWithDytnamicTokenAirline(api, data, no_of_bags, type) {
    var token;
    //* For QA
    // **********************************************************
    // switch (no_of_bags) {
    //   case "2 kgs":
    //     switch (type) {
    //       case "Rush Air":
    //         token = `e7c08503c99ed8061ab4c4fac1fb123e`;
    //         break;
    //       case "Rush Surface":
    //         token = `b27bc502ac2651c9f9670e2c185b4470`;
    //         break;
    //       case "Rush AirExpress":
    //         token = `3d17654a73c0e8083e49808005843226`;
    //         break;
    //     }
    //     break;

    //   default:
    //     switch (type) {
    //       case "Rush Air":
    //         token = `b90a58dbbeba8c6c38c44ab40fffb6aa`;
    //         break;
    //       case "Rush Surface":
    //         token = `b72bf82f9293a72d4cde80ab4ba5aaff`;
    //         break;
    //       case "Rush AirExpress":
    //         token = `1679e08ebbd621cdfef473a5af506534`;
    //         break;
    //     }
    //     break;
    // }
    // **********************************************************

    //* For Production
    // **********************************************************
    switch (no_of_bags) {
      case "2 kgs":
        switch (type) {
          case "Rush Air":
            token = `74270889b54d540ded3eb695aff807f7`;
            break;
          case "Rush Surface":
            token = `4c4b38f989db495468044326bb5c56a1`;
            break;
          case "Rush AirExpress":
            token = `aeba8e6ed1a094c6c3e36bea13aef0aa`;
            break;
        }
        break;
      case "5 kgs":
        switch (type) {
          case "Rush Air":
            token = `cc9de4d4d27c0dde21ffffdb21b89417`;
            break;
          case "Rush Surface":
            token = `5ddefaba50d8eb1690d3c37dc6d1a56f`;
            break;
          case "Rush AirExpress":
            token = `c8d2b27d0f4402f40117f31f898bfccb`;
            break;
        }
        break;
      case "7 kgs":
        switch (type) {
          case "Rush Air":
            token = `256ce18d912c4e57df425ec047eb58ad`;
            break;
          case "Rush Surface":
            token = `7ca9a797efc399e51b2d90869108f17b`;
            break;
          case "Rush AirExpress":
            token = `6b9375d765be72443d0c8f47a0639888`;
            break;
          }
        break;
      case "12 kgs":
        switch (type) {
          case "Rush Air":
            token = `9c13289724f6a51f170f84ed88bbe119`;
            break;
          case "Rush Surface":
            token = `ba532dc74ca196b04aeaf764fabcb61f`;
            break;
          case "Rush AirExpress":
            token = `79142d8e87c19a211de3e0b8261f4c6b`;
            break;
        }
        break;
      case "15 kgs":
        switch (type) {
          case "Rush Air":
            token = `551dd3c7742b47e900bc565f681f65d8`;
            break;
          case "Rush Surface":
            token = `6f644f5cc3a55aa0516183d6dc8dd286`;
            break;
          case "Rush AirExpress":
            token = `e99872197082005579d5e4127c4f67de`;
            break;
        }
        break;
      case "20 kgs":
        switch (type) {
          case "Rush Air":
            token = `6d9a48cdf24befef999b74c21a121b40`;
            break;
          case "Rush Surface":
            token = `0d47c23bdd3fa8ea29cfd89c6137dd6c`;
            break;
          case "Rush AirExpress":
            token = `89d34cf4efbc5eb34b86084bfd4394ac`;
            break;
        }
        break;
      case "25 kgs":
        switch (type) {
          case "Rush Air":
            token = `ab6c3fd0bb069d8ac04e9ffa8cb21ca5`;
            break;
          case "Rush Surface":
            token = `8a4eccd0fb71d26b899637866af4c42b`;
            break;
          case "Rush AirExpress":
            token = `c05e8cf8b23836b62ec12da260deeb22`;
            break;
        }
        break;
      case "30 kgs":
        switch (type) {
          case "Rush Air":
            token = `ac31b9187f77b106459933b663520907`;
            break;
          case "Rush Surface":
            token = `33fe1e8547df3daa853d72eb077e7d5e`;
            break;
          case "Rush AirExpress":
            token = `de97981a774fde3bca3956a0e419a3c3`;
            break;
        }
        break;
      case "40 kgs":
        switch (type) {
          case "Rush Air":
            token = `d3a331352cd4df829fb15d519c0459e0`;
            break;
          case "Rush Surface":
            token = `fd36d6125c1831a0220455784b3c46e2`;
            break;
          case "Rush AirExpress":
            token = `065f033981ffbbdca42252500961e651`;
            break;
        }
        break;
     }
    // **********************************************************

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        token: token,
      }),
    };
    return this.http.post(
      "https://carter-cors.herokuapp.com/" + environment.baseUrl + api,
      data,
      httpOptions
    );
  }
}
// abc
