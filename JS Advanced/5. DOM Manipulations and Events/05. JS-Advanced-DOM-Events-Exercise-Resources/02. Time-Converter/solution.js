function attachEventsListeners() {
    const ratios = {
        days: 1,
        hours: 24,
        minutes: 1440,
        seconds: 86400
    }

    function convert(value, unit) {
        const inDays = value / ratios[unit];

        return {
            days: inDays,
            hours: inDays * ratios.hours,
            minutes: inDays * ratios.minutes,
            seconds: inDays * ratios.seconds
        }
    }

    const inputs = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    }

    window.convert = convert; // прави финкцията глобална

    // const daysInput = document.getElementById('days');
    // const hoursInput = document.getElementById('hours');
    // const minutesInput = document.getElementById('minutes');
    // const secondsInput = document.getElementById('seconds');
    // document.getElementById('daysBtn').addEventListener('click', onConvert);
    // document.getElementById('hoursBtn').addEventListener('click', onConvert);
    // document.getElementById('minutesBtn').addEventListener('click', onConvert);
    // document.getElementById('secondsBtn').addEventListener('click', onConvert);

    document.querySelector('main').addEventListener('click', onConvert);

    function onConvert(event) {
        if (event.target.tagName === 'INPUT' && event.target.type === 'button') {
            const input = event.target.parentElement.querySelector('input[type="text"]');

            const time = convert(Number(input.value), input.id);
            Object.keys(time).forEach(k => inputs[k].value = time[k]);
        }
        // const input = event.target.parentElement.querySelector('input[type="text"]');
        // const time = convert(Number(input.value), input.id);
        // daysInput.value = time.days;
        // hoursInput.value = time.hours;
        // minutesInput.value = time.minutes;
        // secondsInput.value = time.seconds;
    }
}