<template>
<div class="flex flex-col items-center">
    <section id="title">
      <h1 class="font-courgette text-4xl">All about time</h1>
    </section>
    <section id="description" class="mb-8">
      <p class="font-berkshire text-red-800">
        View and manipulate time values.
      </p>
    </section>
    <section id="mainArea" class="flex flex-wrap font-ubuntu w-screen px-8 space-x-2">
      <section id="left" class="flex-grow items-center text-center mb-2">
        <div class="flex flex-col items-center border-2 border-red-100 p-2">
          <button class="p-2 px-4 rounded-lg bg-green-200 hover:bg-green-600 hover:text-white"
                  @click="epoch = 'unix'">Show Milliseconds since Unix Epoch</button>
          <div class="mt-4 w-96">
            <p class="font-bold">Zero time point for Unix</p>
            <p class="font-bold">[ 1970 Jan 01, 12:00:00 AM ]</p>
            <br/>
            <p>
              "Historically, the origin of UNIX system time was referred to as "00:00:00 GMT, January 1, 1970". 
              Greenwich Mean Time is actually not a term acknowledged by the international standards community; 
              therefore, this term, "Epoch", is used to abbreviate the reference to the actual standard, 
              Coordinated Universal Time."
            </p>
            <br/>
            <a href="https://pubs.opengroup.org/onlinepubs/9699919799/xrat/V4_xbd_chap03.html#tag_21_03_00_20"
               class="underline" target="blank">Ref:opengroup.org</a>
          </div>
        </div>
      </section>
      <section id="middle" class="flex-grow items-center text-center space-y-2 mb-2">
        <div id="timeDisplay" class="flex flex-col items-center border-2 border-red-100 p-2">
          <p class="p-2 font-bold">{{timeDisplay}}</p>
          <button class="p-2 px-4 rounded-lg bg-green-200 hover:bg-green-600 w-48"
                  @click="playPause">Play/Pause</button>
        </div>
        <div id="msToDate" class="flex flex-col items-center border-2 border-red-100 p-2">
          <input v-model="timeToConvertMillis" class="border-2 border-teal-400 p-2 rounded-lg text-center" 
                 type="text" @keyup="convertTime">
          <p class="font-bold mt-4">{{timeToConvertStr}}</p>
        </div>
        <div id="timeDelta" class="flex flex-col items-center border-2 border-red-100 p-2 space-y-2">
          <input v-model="timeDeltaArg1" class="border-2 border-teal-400 p-2 rounded-lg text-center mt-2" 
                 type="text" @keyup="timeDelta">
          <p class="font-bold">-</p>
          <input v-model="timeDeltaArg2" class="border-2 border-teal-400 p-2 rounded-lg text-center" 
                 type="text" @keyup="timeDelta">
          <p class="font-bold">=</p>
          <p class="font-bold mt-4">{{timeDeltaStr}}</p>
        </div>
      </section>
      <section id="right" class="flex-grow items-center text-center">
        <div class="flex flex-col items-center border-2 border-red-100 p-2">
          <button class="p-2 px-4 rounded-lg bg-green-200 hover:bg-green-600 hover:text-white"
                  @click="epoch = 'gps'">Show Milliseconds since GPS Epoch</button>
          <div class="mt-4 w-96">
            <p class="font-bold">Zero time point for GPS</p>
            <p class="font-bold">[ 1980 Jan 06, 12:00:00 AM ]</p>
            <br/>
            <p>
              "GPS time is established by the Control Segment and is referenced to Coordinated Universal Time (UTC) 
              as maintained by the U.S. Naval Observatory (UTC (USNO)) zero time-point defined as midnight on the 
              night of January 5, 1980/morning of January 6, 1980. The largest unit used in stating GPS time is one 
              week defined as 604,800 seconds. GPS time may differ from UTC because GPS time shall be a continuous 
              time scale, while UTC is corrected periodically with an integer number of leap seconds."
            </p>
            <br/>
            <a href="https://www.gps.gov/technical/icwg/IS-GPS-200G.pdf"
               class="underline" target="blank">Ref:gps.gov</a>
          </div>
        </div>
      </section>
    </section>
</div>
</template>
<script>
export default {
  data() {
    return {
      timeDisplay: '',
      epoch: 'unix',
      updateTimeDisplayEnabled: true,
      timeToConvertMillis: Date.now(),
      timeToConvertStr: '',
      timeDeltaStr: '',
      timeDeltaArg1: Date.now(),
      timeDeltaArg2: Date.now() - 3661000,
    }
  },
  created() {
    setInterval(_ => {
      this.updateTimeDisplay();
    }, 100);
    this.convertTime();
    this.timeDelta();
  },
  methods: {
    updateTimeDisplay() {
      if (this.updateTimeDisplayEnabled) {
        if (this.epoch === 'unix') {
          this.timeDisplay = Date.now() + ' Milliseconds since Unix Epoch';
        } else if (this.epoch === 'gps') {
          const epochDelta = Date.UTC(1980, 0, 6) - Date.UTC(1970, 0, 1);
          this.timeDisplay = (Date.now() - epochDelta) + ' Milliseconds since GPS Epoch';
        }
      }
    },
    playPause() {
      this.updateTimeDisplayEnabled = !this.updateTimeDisplayEnabled;
    },
    convertTime() {
      const d = new Date(parseInt(this.timeToConvertMillis));
      this.timeToConvertStr = d.toString();
    },
    timeDelta() {
      let delta = new Date(parseInt(this.timeDeltaArg1)) - new Date(parseInt(this.timeDeltaArg2));
      delta = delta / 1000;
      const deltaDays = Math.floor(delta / 3600 / 24);
      delta -= deltaDays * 3600 * 24;
      const deltaHours = Math.floor(delta / 3600);
      delta -= deltaHours * 3600;
      const deltaMinutes = Math.floor(delta / 60);
      delta -= deltaMinutes * 60;
      this.timeDeltaStr = `${deltaDays} Days, ${deltaHours} Hours, ${deltaMinutes} Minutes, ${delta} Seconds.`;
    }
  },
}
</script>