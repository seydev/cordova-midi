import Tone  from 'tone';

class Player {
    constructor(params) {

        this.noteHolder = create2DArray(12);

    };

    init() {

        this.settings = {
            playing: false,
            step: 0,
            bpm: 135,
            mapping : ['C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4']
        };
        this.setupChannels();
        this.setupLoop();
        this.bindEvents();

    }

    setupChannels() {

        this.channel = {
            master: new Tone.Gain(0.8),
            treb: new Tone.Gain(0.8),
        };
        this.synths = {
            treb: new Tone.PolySynth(4, Tone.SimpleAM),
        };
        this.channel.master.toMaster();
        this.channel.treb.connect(this.channel.master);
        this.synths.treb.chain(this.channel.treb);
    };

    setupLoop() {

        Tone.Transport.bpm.value = this.settings.bpm;

        Tone.Transport.scheduleRepeat((time) => {

            this.settings.step++;
            if (this.settings.step === Meteor.settings.public.loopLength) this.settings.step = 0;

            // if (this.settings.step % 2 === 0) {

            //     this.synths.treb.triggerAttackRelease('A4', '16n', time);

            // } else {

            //     this.synths.treb.triggerAttackRelease('G4', '16n', time);
            // }

            for (var row = this.noteHolder.length - 1; row >= 0; row--) {
                if(this.noteHolder[row][this.settings.step]) {
                    // console.log('play', row, this.settings.mapping);
                    // console.log('play', this.settings.mapping[row]);
                    this.synths.treb.triggerAttackRelease(this.settings.mapping[row], '16n', time);
                }
            }


        }, '8n');
    }

    bindEvents() {

        this.playButton = document.getElementById('btn-play');
        this.playButton.addEventListener('click', this.togglePlay.bind(this));
        this.playButton.addEventListener('touchstart', Tone.startMobile);

        $('body').on('click', 'table.notes td', e => {
            let cell = $(e.target);
            cell.toggleClass('active');
            this.noteHolder[cell.data('row')][cell.data('column')] = cell.hasClass('active');
        });

    }

    setBPM (bpm) {

        this.settings.bpm = parseInt(bpm);
        Tone.Transport.bpm.value = this.settings.bpm;

    }

    togglePlay() {

        if(this.settings.playing) {

            Tone.Transport.pause();
            this.channel.master.gain.value = 0;
            this.playButton.classList.remove('active');

        } else {

            Tone.Transport.start();
            this.channel.master.gain.value = 1;
            this.playButton.classList.add('active');

        }

        this.settings.playing = !this.settings.playing;
    }
}

const create2DArray = (n) => Array(n).fill(0).map(function(){
    return Array(Meteor.settings.public.loopLength).fill(false);
});

export default Player;