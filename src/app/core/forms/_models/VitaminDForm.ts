/**
 * Created by Nathan on 1/10/2020.
 */

export class VitaminDForm1{
    Sample : number;
    collected_date : string;
    Collected_Center : string;
    staff_name : string;
    staff_id : string;
    birth_date : string;
    birth_place : string;
    country : string;
    Mobile_no : string;
    Gender : string;
    MaritalStatus : string;
    Consanguineous_Marriage : string;
    NoOfWives : string;
    NoOfChildren : string;
    Address : string;
    clear() : void{
        this.Sample =0;
        this.collected_date ="";
        this.Collected_Center ="";
        this.staff_name ="";
        this.staff_id ="";
        this.birth_date ="";
        this.birth_place ="";
        this.country ="";
        this.Mobile_no ="";
        this.Gender ="";
        this.MaritalStatus ="";
        this.Consanguineous_Marriage ="";
        this.NoOfWives ="";
        this.NoOfChildren ="";
        this.Address ="";
    }
}


export class VitaminDForm2{
    BodyWeight : string;
    Height : string;
    BodyMass : string;
    Waist : string;
    BloodPressure : string;
    BloodPressurePercentage : string;
    Hypertension : string;
    Dyslipidemia : string;
    Diabetis : string;
    Diabetis_Type : string;
    AgeOf_Diagnosis : string;
   Diseases_Other : string;
    clear() : void{
        this.BodyWeight ="";
        this.Height ="";
        this.BodyMass ="";
        this.Waist ="";
        this.BloodPressure ="";
        this.BloodPressurePercentage ="";
        this.Hypertension ="";
        this.Dyslipidemia ="";
        this.Diabetis ="";
        this.Diabetis_Type="";
        this.AgeOf_Diagnosis ="";
        this.Diseases_Other ="";
    }
}

//export class VitaminDForm2{
//    BodyWeight : string;
//    Height : string;
//    BodyMass : string;
//    Waist : string;
//    BloodPressure : string;
//    BloodPressurePercentage : string;
//    Hypertension : string;
//    Dyslipidemia : string;
//    Diabetis : string;
//    Diabetis_Type : string;
//    AgeOf_Diagnosis : string;
//    Diseases_Other : string;
//    clear() : void{
//        this.BodyWeight ="";
//        this.Height ="";
//        this.BodyMass="";
//        this.Waist ="";
//        this.BloodPressure ="";
//        this.BloodPressurePercentage ="";
//        this.Hypertension ="";
//        this.Dyslipidemia="";
//        this.Diabetis ="";
//        this.Diabetis_Type ="";
//        this.AgeOf_Diagnosis ="";
//        this.Diseases_Other ="";
//    }
//}

export class VitaminDForm3{
    Walk : string;
    Gym : string;
    Diet : string;
    Breakfast : string;
    Happy : string;
    smoking_status : string;
    FastFood : string;
    SoftDrinks : string;
    Satisfied : string;
    Late : string;
    Dinner_Time : string;
    Overweight : string;
    VitaminD_Deficiency : string;
    VitaminD_Supplement : string;
    VitaminD_Supplement_Dose : string;
    LifeStyle_Comments : string;
    clear() : void{
        this.Walk ="";
        this.Gym ="";
        this.Diet ="";
        this.Breakfast ="";
        this.Happy ="";
        this.smoking_status ="";
        this.FastFood="";
        this.SoftDrinks ="";
        this.Satisfied ="";
        this.Late ="";
        this.Dinner_Time ="";
        this.Overweight ="";
        this.VitaminD_Deficiency ="";
        this.VitaminD_Supplement ="";
        this.VitaminD_Supplement_Dose ="";
        this.LifeStyle_Comments ="";
    }
}

export class VitaminDForm4 {
    id:number;
    diabetes_family:string;
    obesity_family:string;
    hypertension_family:string;
    cvd_family:string;
    dyslip_family:string;
    CancerIn_family:string;
    Other_Family:string;
    clear() : void{
        this.id=0;
        this.diabetes_family="";
        this.obesity_family="";
        this.hypertension_family="";
        this.cvd_family="";
        this.dyslip_family="";
        this.CancerIn_family="";
        this.Other_Family="";
    }
}