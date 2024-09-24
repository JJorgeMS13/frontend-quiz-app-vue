<template>
    <section v-if="questionActual" class="container__question">
        <div :class="[ isDark ? 'question question-dark' : 'question']">
            <p>Question {{ numberQuestion }} of {{ totalQuestions }}</p>
            <h2>{{ questionActual.question }}</h2>
        </div>
        <div :class="[ isDark ? 'progress-bar progress-bar-dark': 'progress-bar']">
            <div class="progress-fill" :style="progressStyle"></div>
        </div>
    </section>
    <section v-if="questionActual" class="container__answer">
        <ul :class="[isDark ? 'dark': '']">
            <li 
              :class="getClassForItem(option.optionLetter)"
              @click="!showTextNext && saveAnswer(option.optionLetter)"
              v-for="option in questionActual.options" 
              :key="option.optionLetter"
              >
                <picture>
                    <p>{{ option.optionLetter }}</p>
                </picture>
                <span>{{ option.option }}</span>
                <span :class="getClassForCorrect(option.optionLetter)"</span>
            </li>
            <button :disabled="showTextSelect" class="btn" @click="nextSubmit">
                <span v-if="showTextSubmit">Submit Answer</span>
                <span v-if="showTextNext">Next Question</span>
            </button>
            <div v-show="showTextSelect" :class="[ isDark ? 'errorText errorText-dark' : 'errorText' ]">
                <span><img src="../../public/assets/images/icon-error.svg" alt="icon error"></span>
                <span>Please select an answer</span>
            </div>
        </ul>
    </section>
</template>

<script>
import axios from "axios";
export default {
    name: 'QuizApp',
    props: {
        option: {
            type: String,
            required: true,
            default: 'HMTL',
        },
        isDark: {
            type: Boolean,
            default: false,
        }
    },
    data(){
        return {
            showTextSubmit: true,
            showTextNext: false,
            showTextSelect: true,
            question: null,
            questionActual: null,
            numberQuestion: 0,
            totalQuestions: 0,
            answerSelected: null,
            answerCorrect: null,
            isAnswerIncorrect: false,
            score: 0,
            arrayLetters: {
                0: 'A',
                1: 'B',
                2: 'C',
                3: 'D',
            },
        }
    },
    computed: {
        progressStyle(){
            return {
                width: `${(this.numberQuestion / this.totalQuestions) * 100}%`
            }
        },
    },
    created(){
        this.getData();
    },
    methods: {
        /* Metodo que controla los diseños de las respuesta dependiendo lo que el usuario elija*/
        getClassForItem(optionSelected){
            if (this.showTextSubmit && this.answerSelected === optionSelected) return 'options';
            if (this.showTextNext && this.answerCorrect === optionSelected && !this.isAnswerIncorrect) return 'correct';
            if (this.showTextNext && this.answerSelected === optionSelected && this.isAnswerIncorrect){
            return 'error__answer';
            } 
            return '';
        },
        /* Metodo que controla cuando poner la img en la respuesta correcta*/
        getClassForCorrect(optionSelected){
            if (this.answerCorrect === optionSelected && this.answerSelected && this.showTextNext) {
                return 'img__insert';
            }
        },
        goToScored(){
           return this.$router.push({ name: 'Scored', params: { 
            objScored: JSON.stringify({ scored: this.score, 
                                        totalQuestion: this.totalQuestions,
                                        title: this.question.title,
                                        img: this.question.icon,
                                    }) }});
        },
        /*Metodo que controla el btn de enviar respuesta y siguiente pregunta*/
        nextSubmit(){
            
            if (this.showTextNext === true) {

                this.answerCorrect === this.answerSelected ? this.score++ : this.score  
                this.clearData();
                this.getClassForItem('');
                if (this.numberQuestion >= this.totalQuestions) {
                  this.goToScored();
                  return;
                } 
            this.getQuestionCurrent();
            }            

            this.showTextNext = !this.showTextNext;
            this.showTextSubmit = !this.showTextSubmit;          
        },
        clearData(){
            this.answerSelected = null;
            this.showTextSelect = true;
        },
        getQuestionCurrent(){
            this.questionActual = this.question.questions[this.numberQuestion];
            const options  = this.questionActual.options.map((data, index) => {
                return {
                    optionLetter: this.arrayLetters[index],
                    option: data,
                }
            });
            this.answerCorrect = options.find(element => element.option === this.questionActual.answer)?.optionLetter;
            
            this.questionActual =  {
                answer:  this.questionActual.answer,
                options: options,
                question: this.questionActual.question
            }        
            this.numberQuestion += 1; 
            this.totalQuestions = this.question.questions.length;
        },
        async getData(){
            try {
                const response = await axios.get('./data.json');
                this.question =  response.data.quizzes.find(option => option.title === this.option);
                if (this.question) {
                    this.getQuestionCurrent();
                }else {
                    this.$router.push('/')
                }
            } catch (error) {
                console.log(error);
            }
        },
        saveAnswer(optionSelected){
            this.showTextSelect = false;
            this.answerSelected = optionSelected;
            this.answerSelected === this.answerCorrect ? this.isAnswerIncorrect = false: this.isAnswerIncorrect = true;

        },
    },
}   
</script>

<style lang="css" scoped>
.container__answer .dark li {
    background-color: #3B4D66;
}
.container__answer .dark li span {
    color: white;
}
ul li {
    justify-content: space-between;
}
.container__question {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
}
.question {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}
.question p {
    font-size: 1.4rem;
    font-style: italic;
    color: #626C7F;
}
.question-dark p {
    color: #ABC1E1;
}
.question h2 {
    font-size: 2rem;
    font-weight: 500;
    color: #313E51;
}
.question-dark h2{
    color: white;
}
.progress-bar {
    padding: .4rem;
    background-color: white;
    border-radius: 99.9rem;
    height: 1.6rem;
    width: 100%;
}
.progress-bar-dark {
    background-color: #3B4D66;
}
.progress-fill {
    height: 100%;
    background-color: #A729F5;
    border-radius: 10.4rem;
}
.btn {
    border: none;
    border-radius: 1.2rem;
    padding: 1.2rem;
    background-color: #A729F5;
    height: 5.6rem
}
.btn span {
    font-size: 1.8rem;
    font-weight: 500;
    color: white;
}
.btn:hover {
    background-color: #a729f5b3;
}
ul .options  {
    border: .3rem solid #A729F5;
}
ul .options picture {
    background-color: #A729F5;
}
ul .options picture P {
    color: white;
}
.errorText {
    display: flex;
    gap: .8rem;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: 400;
    color: #EE5454;
}
.errorText-dark {
    color: white;
}
ul .correct  {
    border: .3rem solid #26D782;
}
ul .correct picture {
    background-color: #26D782;
}
ul .correct picture P {
    color: white;
}
.img__insert {
    min-width: 3.2rem;
    height: 3.2rem;
    background-image: url('../../public/assets/images/icon-correct.svg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}

ul .error__answer  {
    border: .3rem solid #EE5454;
}
ul .error__answer picture {
    background-color: #EE5454;
}
ul .error__answer picture P {
    color: white;
}
.error-img__insert {
    width: 3.2rem;
    height: 3.2rem;
    background-image: url('../../public/assets/images/icon-error.svg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
@media screen and (min-width: 48rem) {
    .question p {
        font-size: 2rem;
    }
    .question h2 {
        font-size: 3.6rem;
    }
    .errorText {
        font-size: 2.4rem;
    }
    .btn {
        border-radius: 2.4rem;
        padding: 3.2rem;
        height: 9.2rem;
    }
    .btn span {
        font-size: 2.8rem;
    }
}
@media screen and (min-width: 90rem) {
    .container__question {
        width: 46.5rem;
        height: 45.2rem;
        justify-content: space-between;
    }
}
</style>