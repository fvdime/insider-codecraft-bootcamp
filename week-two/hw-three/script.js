let countdown;
let timeLeft;

document.getElementById("startBtn").addEventListener("click", function() {
clearInterval(countdown);
            
timeLeft = parseInt(document.getElementById("timeInput").value, 10);
            
document.getElementById("countdownDisplay").textContent = timeLeft;

if (timeLeft > 0) {
  countdown = setInterval(function() {
  timeLeft--;
  document.getElementById("countdownDisplay").textContent = timeLeft;
                    
  if (timeLeft <= 0) {
    clearInterval(countdown);
    document.getElementById("countdownDisplay").textContent = "Time’s up!";
        }
      }, 1000);
    }
  });

  document.getElementById("resetBtn").addEventListener("click", function() {
  clearInterval(countdown);
  document.getElementById("countdownDisplay").textContent = document.getElementById("timeInput").value;
        
});