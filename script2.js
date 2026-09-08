const qs = (selector) => document.querySelector(selector);

const question = qs(".question");
const gif = qs(".gif");
const yesBtn = qs(".yes-btn");
const noBtn = qs(".no-btn");

const handleYesClick = () => {
  question.innerHTML = "Yaaaaay! ❤️ When is our date?";
  gif.src = "https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif";

  // Remove No button
  noBtn.removeEventListener("mouseover", handleNoMouseOver);
  noBtn.remove();

  // Create date input
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.style.padding = "10px";
  dateInput.style.fontSize = "24px";
  dateInput.style.margin = "10px";
  dateInput.style.marginLeft = "-300px";

  // Create date confirmation button
  const confirmDateBtn = document.createElement("button");
  confirmDateBtn.textContent = "Set our date ❤️";
  confirmDateBtn.classList.add("letsgo-btn");

  // Replace Yes button with date picker
  yesBtn.replaceWith(dateInput);
  dateInput.insertAdjacentElement("afterend", confirmDateBtn);

  // After choosing the date
  confirmDateBtn.addEventListener("click", () => {
    if (!dateInput.value) {
      alert("Please choose a date first babe");
      return;
    }

    // Format selected date
    const selectedDate = new Date(
      dateInput.value + "T00:00:00"
    ).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Remove date picker
    dateInput.remove();
    confirmDateBtn.remove();

    // Ask what kind of date
    question.innerHTML = `Perfect! ❤️ Our date is on ${selectedDate}.<br><br>What kind of date would you like?`;

    // Date choices
    const dateIdeas = [
      "Movie marathon night at home 🎬",
      "Date in the park 🌳",
      "Art Museum 🎨",
      "Zoo 🦁",
      "Cooking sesh 👩‍🍳❤️"
    ];

    // Create a container for choices
    const choicesContainer = document.createElement("div");
    choicesContainer.classList.add("date-choices");

    // Create a button for each choice
    dateIdeas.forEach((idea) => {
      const choiceBtn = document.createElement("btn");

      choiceBtn.textContent = idea;
      choiceBtn.classList.add("date-choice-btn");


      // When a date type is selected
      choiceBtn.addEventListener("click", () => {
         // STORE THE DATA
        localStorage.setItem('selectedDate', selectedDate);
        localStorage.setItem('selectedIdea', idea);
        localStorage.setItem('dateSet', 'true');
        localStorage.setItem('timestamp', new Date().toISOString());
        
        // Also store in sessionStorage as backup
        sessionStorage.setItem('selectedDate', selectedDate);
        sessionStorage.setItem('selectedIdea', idea);
        
        question.innerHTML = `
          YAYYYYY! ❤️<br><br>
          Our date is set for:<br>
          📅 ${selectedDate}<br><br>
          💕 ${idea}
        `;

        // Remove all choices
        choicesContainer.remove();
      });

      choicesContainer.appendChild(choiceBtn);
    });

    // Add choices below the question
    question.insertAdjacentElement("afterend", choicesContainer);
  });
};

const handleNoMouseOver = () => {
  const { width, height } = noBtn.getBoundingClientRect();

  const maxX = window.innerWidth - width;
  const maxY = window.innerHeight - height;

  noBtn.style.left = `${Math.floor(Math.random() * maxX)}px`;
  noBtn.style.top = `${Math.floor(Math.random() * maxY)}px`;
};

yesBtn.addEventListener("click", handleYesClick);
noBtn.addEventListener("mouseover", handleNoMouseOver);