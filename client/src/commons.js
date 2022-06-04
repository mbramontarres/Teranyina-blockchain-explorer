import { BigNumber } from 'bignumber.js'
export default {
    methods: {
        formatAmount(amount) {
            return new BigNumber(amount).div(new BigNumber(10).pow(10)).toFixed(2);
        },
        dateFromNow(timestamp){
            var x = new Date(timestamp)
            var now = Date.now().valueOf();
            var dif = ((now-timestamp)*0.001).toFixed(2);
            var time;
            console.log(dif)
            if (dif >= 86400) {
                dif = Math.floor(dif / 60 / 60 / 24)
                time = 'd'
            } 
            else if (dif >= 3600) {
                dif = Math.floor(dif / 60 / 60)
                time = 'h'
            } 
            else if (dif >= 60) {
                dif = Math.floor(dif / 60)
                time = 'min'
            }
            else time = 'sec'
            return dif + ' ' + time;
        }
    }
}