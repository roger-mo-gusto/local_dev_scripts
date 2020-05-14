(() => {
  createOverlay = () => {
    console.log("Creating Overlay");
    overlay = document.createElement("div");
    overlay.id = 'distraction_delay_overlay';

    ticker = document.createElement('h1');
    ticker.id = 'distraction_delay_ticker';

    overlay.appendChild(ticker);
    document.body.appendChild(overlay);
  }

  tickTimer = () => {
    tickerInterval = setInterval(() => {
      ticker.textContent = `${timeLeft}`;
      if (!document.hidden) {
        timeLeft--;
      }

      if (timeLeft <= -1) {
        ticker.textContent = '';
        clearInterval(tickerInterval);
        overlay.remove();
      }
    }, 1000);
  }



  let ticker;
  let timeLeft = 15;
  let tickerInterval;
  let overlay;
  let pageActive = true;
  createOverlay();
  tickTimer();
})();
