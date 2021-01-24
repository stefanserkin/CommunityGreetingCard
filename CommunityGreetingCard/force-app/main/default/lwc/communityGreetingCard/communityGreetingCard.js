import { LightningElement, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import MEMBER_ICON from '@salesforce/resourceUrl/jccsfMemberBadge';
import USER_ID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.First_Name__c';
import MEMBER_SINCE_FIELD from '@salesforce/schema/User.Fitness_Member_Since__c';
import ISMEMBER_FIELD from '@salesforce/schema/User.Active_Fitness_Member__c';

export default class UserGreetingCommunity extends LightningElement {
    @track error;
    @track name;
    @track memberSince;
    @track Active_Fitness_Member__c;

    jccsfMemberBadge = MEMBER_ICON;

    @wire(getRecord, {
        recordId: USER_ID,
        fields: [NAME_FIELD, 
                 MEMBER_SINCE_FIELD, 
                 ISMEMBER_FIELD]
    }) wireuser({
        error,
        data
    }) {
        if (error) {
           this.error = error ; 
        } else if (data) {
            this.name = data.fields.First_Name__c.value;
            this.memberSince = data.fields.Fitness_Member_Since__c.value;
            this.isMember = data.fields.Active_Fitness_Member__c.value;
        }
    }

}