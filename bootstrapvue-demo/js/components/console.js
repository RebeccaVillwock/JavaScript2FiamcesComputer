(function(){
    // enum for types of logs
    const MSG_TYPE = {LOG: 'log', INFO: 'info', WARN: 'warn', ERROR: 'error'};

    // object constructor for log messages
    function LogMsg(type, message) {
        this.type = type || MSG_TYPE.LOG;
        this.message = message || '';

        this.variant = function () {
            let variants = {};
            variants[MSG_TYPE.LOG] = '';
            variants[MSG_TYPE.INFO] = 'info';
            variants[MSG_TYPE.WARN] = 'warning';
            variants[MSG_TYPE.ERROR] = 'danger';

            return variants[this.type] || '';
        }
    }

    Vue.component('Console', {
        data: function () {
            return {
                log: []
            }
        },

        methods: {
            logIt(type, args) {
                let message = '';

                // convert args to an standard array so we can loop over it
                Array.from(args).map((arg) => {
                    if (typeof arg === 'string') {
                        message += arg + "\n";
                    } else {
                        message += JSON.stringify(arg,

                            // Don't worry about this. This removes circular references
                            // during the JSON.stringify. This is only an issue when
                            // trying to stringify DOM elements or objects that refer
                            // to themselves.
                            // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#examples
                            (() => {
                                const seen = new WeakSet();
                                return (key, value) => {
                                    if (typeof value === "object" && value !== null) {
                                        if (seen.has(value)) {
                                            return;
                                        }
                                        seen.add(value);
                                    }
                                    return value;
                                };
                            })(),

                            2) + "\n";

                        // another, less exciting option
                        //message += arg.toString() + "\n";
                    }
                });

                // add stringified/concatenated message to our log
                this.log.push(new LogMsg(type, message));
            }
        },

        // called after the instance has been mounted,
        mounted: function () {
            // add wrapper function for existing console.log(), .warn(), etc
            for (let type in MSG_TYPE) {
                // create local references to these functions
                let oldLog = console[MSG_TYPE[type]];
                let logIt = this.logIt;

                // provide new console.log function
                console[MSG_TYPE[type]] = function () {
                    logIt(MSG_TYPE[type], arguments);

                    // oldLog.apply(console, Array.from(arguments));
                    oldLog.apply(console, Array.from(arguments));
                };
            }

            // test it
            console.log('standard log msg');
            console.warn('warning msg');
            console.info('info msg');
            console.error('error msg');
            console.log(['one', 'two', 'three']);
            console.log({name: 'Tyler', role: 'Instructor'});
        },

        // called after the DOM is updated with changes
        updated() {
            // scroll to bottom of component (this.$el)
            this.$el.scrollTop = this.$el.scrollHeight;
        },

        template: `
        <b-list-group flush class="console" >
            <b-list-group-item
                v-for="(item, i) in log" :key="i"
                :variant="item.variant()"
            >
                <b-row>
                    <b-col cols="2" class="console-type">
                        <b-badge :variant="item.variant()">{{item.type}}</b-badge>
                    </b-col>
                    <b-col cols="10" class="console-message">
                        <pre>{{item.message}}</pre>
                    </b-col>
                </b-row>
            </b-list-group-item>
        </b-list-group>
    `
    });
})();
