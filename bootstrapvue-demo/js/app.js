const app = new Vue({
    el: '#app',

    data: function() {
        return {
            goals: [],
            newGoal: '',
        }
    },

    methods: {
        addGoal(){
            // validate
            if(this.newGoal.length === 0){
                console.error('Invalid goal.');
                return;
            }

            if(this.newGoal.length > 50){
                console.warn('Try to make shorter goals');
            }

            // add to list and log
            this.goals.push(this.newGoal);
            console.info('Added Goal.');
            console.log('Goals list:', this.goals);

            // clear input
            this.newGoal = '';
        },
    },
});
