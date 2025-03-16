
// import the utility functions "decodeHtml" and "shuffle"
import { decodeHtml, shuffle } from './utils.js' 

// get the elements from the DOM
const questionElement = document.querySelector('#question')
const answersElement = document.querySelector('#answers')
const nextQuestionElement = document.querySelector('#nextQuestion')

// IIFE (so we can use async/await)
;(async () => {

	// todo: create your "getNextQuestion" function (done)



	//I'm gonna need to practice this much more over the next couple weeks so I don't fall behind. I had to look at the pokemon API assignment and basically 
	// redid that code to fit this exam, I prefer to just know how to do stuff without using references but I had to for this exam
	const getNextQuestion = async() => {
		const url = 'https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple'
		const response = await fetch(url)
		const json = await response.json()
		const { question, correct_answer: correct, incorrect_answers: incorrect } = json.results[0]
		const answers = shuffle([ ...incorrect, correct ])
		return {question, answers, correct }
	}


	//console.log(await getNextQuestion())  For whatever reason this line was causing the first question to not pop up 


	// todo: create your "renderQuestion" function (done)

	const renderQuestion = ({ question, answers, correct }) => {

		//this first line right here messed me up for a while because I just had this line of code and it kept saying that
		//question was undefined and I couldn't figure out why, so I just continued with the script and it eventually fixed itself, still not sure why
		//maybe because the output for the previous function wasn't called as input yet in this function? 
		questionElement.textContent = decodeHtml(question)
		answersElement.innerHTML = ''
	  
		

		//I'm still struggling with this as well, this portion took me the longest until I realized I had to use "button" because that's what your code already had
		//for the event listener. It took me an embarrassingly long time to realize that's was why it wasn't working 
		//I also kept trying to use the class in the div element until I realized from your code that you just created a new class so that's what I did as well and it worked
		answers.forEach((answer) => {
		  const button = document.createElement('button')
		  button.textContent = decodeHtml(answer)
		  button.classList.add('answerButtons')
		  answersElement.append(button)
	  
		  


			// this part was easy, just added an eventlistener to your code that you provided



		  button.addEventListener('click', () => {
			if (answer === correct) {
			  button.classList.add('correct')
			  answersElement.querySelectorAll('button').forEach(b => b.disabled = true)
			  alert('Correct!')
			  return
			}
	  
			button.disabled = true
			alert('Incorrect!')
		  })
		})
	  }




	// todo: add the event listener to the "nextQuestion" button (done)

	//same with this portion, just added an event listener to the code you provided

	nextQuestionElement.addEventListener('click', async() => {
		renderQuestion(await getNextQuestion())
		nextQuestionElement.disabled = true
		setTimeout(() => nextQuestionElement.disabled = false, 10000)
	  })

})()


// mimic a click on the "nextQuestion" button to show the first question
nextQuestionElement.click()
