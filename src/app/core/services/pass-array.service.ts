import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root' 
})
export class PassArrayService {
  private _subject = new Subject<any>();
  private _subjectForLoginComp = new Subject<any>();
  private arraySource = new BehaviorSubject('');
  currentArray = this.arraySource.asObservable();

  private gstSource = new BehaviorSubject('');
  currentGst = this.gstSource.asObservable();

  private tokenSource = new BehaviorSubject('');
  currentToken = this.tokenSource.asObservable();

  private buttonFlagSource = new BehaviorSubject('');
  currentButtonStatus = this.buttonFlagSource.asObservable();

  private flagButtonSource = new BehaviorSubject('');
  currentStatusButton = this.flagButtonSource.asObservable();

  private flagLoaderSource = new BehaviorSubject(false);
  currentLoaderFlag = this.flagLoaderSource.asObservable();

  private flagLoginSource = new BehaviorSubject(false);
  currentLoginFlag = this.flagLoginSource.asObservable();

  private flagLogoutSource = new BehaviorSubject(localStorage.accessToken);
  currentLogoutFlag = this.flagLogoutSource.asObservable();

  private luggageCountSource = new BehaviorSubject('');
  currentLuggageCount = this.luggageCountSource.asObservable();

  private luggagesCount = new BehaviorSubject('');
  currentluggagesCount = this.luggagesCount.asObservable();

  private luggagesCountWeight = new BehaviorSubject('');
  luggagescountWeight = this.luggagesCountWeight.asObservable();


  private luggageSource = new BehaviorSubject('');
  currentLuggage = this.luggageSource.asObservable();

  private dateSource = new BehaviorSubject('');
  currentDate = this.dateSource.asObservable();

  private carterxType = new BehaviorSubject('');
  carterxtype = this.carterxType.asObservable();

  private contentSource = new BehaviorSubject([]);
  currentContent = this.contentSource.asObservable();

  private luggageDetSource = new BehaviorSubject([]);
  currentluggageDet = this.luggageDetSource.asObservable();

  private currentTotalAmount = new BehaviorSubject('');
  currentTotalAmounts = this.currentTotalAmount.asObservable();

  private passOustationdetails = new BehaviorSubject({});
  outstaionDet = this.passOustationdetails.asObservable();

  private cancelSource = new BehaviorSubject('');
  currentCancel = this.cancelSource.asObservable();

  private fromAirportSelectTime = new BehaviorSubject('');
  fromAirportSelectTimeShow = this.fromAirportSelectTime.asObservable();

  private fromAirportSelectTimeMin = new BehaviorSubject('');
  fromAirportSelectTimeMinShow = this.fromAirportSelectTimeMin.asObservable();

  private getNameOFuser = new BehaviorSubject('');
  getNameOFUser = this.getNameOFuser.asObservable();

  private Errorhandle = new BehaviorSubject('');
  currentError = this.Errorhandle.asObservable();
  constructor() { }

  changeArray(array) {
    this.arraySource.next(array);
  }
  gstAfterDeletion(gst) {
    this.gstSource.next(gst);
  }
  passToken(token) {
    this.tokenSource.next(token);
  }
  passButtonFlag(buttonFlag) {
    this.buttonFlagSource.next(buttonFlag);
  }
  passFlagButton(buttonFlag) {
    this.flagButtonSource.next(buttonFlag);
  }
  passLoaderFlag(loaderFlag) {
    this.flagLoaderSource.next(loaderFlag);
  }
  passLoginFlag(loginFlag) {
    this.flagLoginSource.next(loginFlag);
  }
  passLogoutFlag(logoutFlag) {
    this.flagLogoutSource.next(logoutFlag);
  }
  passLuggageCount(luggageCount) {
    this.luggageCountSource.next(luggageCount);
  }

  passluggageCount(luggageCount) {
    this.luggagesCount.next(luggageCount);
  }

  passluggageCountWeight(luggageCountWeight) {
    this.luggagesCountWeight.next(luggageCountWeight);
  }

  passLuggage(luggage) {
    this.luggageSource.next(luggage);
  }

  passLuggageDet(luggage) {
    this.luggageDetSource.next(luggage);
  }

  currentAmount(amount){
    this.currentTotalAmount.next(amount);
  }

  
  passOustationdet(oustattiondetails){
    this.passOustationdetails.next(oustattiondetails);

  }

  passDate(date) {
    this.dateSource.next(date);
  }

  passCarterXType(num) {
    this.carterxType.next(num);
  }

  passContent(content) {
    this.contentSource.next(content);
  }

  passCancelFlag(cancelFlag) {
    this.cancelSource.next(cancelFlag);
  }


  passTime(time) {
    this.fromAirportSelectTime.next(time);
  }

  passTimeMin(time) {
    this.fromAirportSelectTimeMin.next(time);
  }

  passUserName(name) {
    this.getNameOFuser.next(name);
  }
  
  newEvent(event) {
    this._subject.next(event);
  }
  newEventFordata(event){
     this._subjectForLoginComp.next(event);
  }

  public get events$ () {
    return this._subject.asObservable();
  }

  public get eventsForGetUserDetails$ () {
    return this._subjectForLoginComp.asObservable();
  }

}
