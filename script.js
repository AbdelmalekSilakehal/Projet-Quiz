// Utiliser DOMContentLoaded pour executer a chaque fois le Html en premier

document.addEventListener("DOMContentLoaded", function () {

  const quizForm = document.getElementById("quiz-form");
  const alertDiv = document.getElementById("alert");

  // Empecher l'envoi par default du formulaire
  quizForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    // Reinitialiser la couleur de toutes les questions 
    const allQuestionItems = document.querySelectorAll(".question-item");
    allQuestionItems.forEach(function (questionItem) {
      questionItem.style.color = ""; 
    });

    // Reinitialiser la couleur de toutes les reponses
    const allAnswers = document.querySelectorAll(".answer");
    allAnswers.forEach(function (answer) {
      answer.parentElement.style.color = ""; 
    });

    // Verifier les reponses
    const correctAnswers = ["true", "true", "true"]; 
    const userAnswers = [];

    allAnswers.forEach(function (answer) {
      if (answer.checked) {
        userAnswers.push(answer.value);
      }
    });
    
    // Appliquer le style vert ou rouge pour chaque question et toutes les reponses
    const userAnsweredAllQuestions = userAnswers.length === allQuestionItems.length;

    // Verifier qu'on a repondu a toutes le questions
    if(userAnsweredAllQuestions){
      allQuestionItems.forEach(function (questionItem, i) {
        const answer = userAnswers[i];
  
       // Appliquer le style a la question
       questionItem.style.color = answer === correctAnswers[i] ? "green" : "red";
  
       // Appliquer le style a toutes les reponses de la question
       const answerItems = questionItem.querySelectorAll(".answer-item");
       answerItems.forEach(function (answerItem) {
        answerItem.style.color = answer === correctAnswers[i] ? "green" : "red";
       });
      });
    }
    

    if (userAnswers.length > 0) {
      // Afficher le message de felicitations si toutes les reponses sont correctes
      const allCorrect = userAnswers.every(function (answer, i) {
        return answer === correctAnswers[i];
      });
      
      if (userAnswers.length === correctAnswers.length && allCorrect) {
        alertDiv.style.display = "block";
        alertDiv.innerHTML = '<div class="alert-title">Congratulations!!</div>All answers are correct!';
        setTimeout(function () {
          alertDiv.style.display = "none";
        }, 2000);
      }
       else {
        // Masquer le message de felicitations s'il y au mois une reponse incorrecte
        alertDiv.style.display = "none";
      }
    } else {
      // Masquer le message de felicitations si aucune reponse n'est selectionne
      alertDiv.style.display = "none";
    }
  });
});