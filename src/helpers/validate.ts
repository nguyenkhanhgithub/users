export default class Validate {
    public static regexPhoneNumber(phone: any): boolean {
        const vnf_regex  = /((086|096|097|098|032|033|034|035|036|037|038|039|089|090|093|070|079|077|076|078|088|091|094|083|084|085|081|082|092|056|058)+([0-9]{7})\b)/g;
        if (vnf_regex.test(phone) === false) {
            return false;
        } else {
            return true;
        }
    }
}
