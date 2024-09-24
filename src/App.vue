<template>
  <div :class="[ isdark ? 'container body-dark': 'container']">
    <Header 
      :title="title" 
      :urlImg="iconTitle" 
      :colorImage="colorImage" 
      :isDark="isdark"
      @change-dark-light="toggleDarkLight"/>
  
  <main class="container__main">
        <RouterView :isDark="isdark"></RouterView>
        <section v-if="showMenu && optionQuizzes" class="container__main--options">
            <ul :class="[ isdark ? 'dark-list': '']">
                <li v-for="option in optionQuizzes" @click="navigateToPage(option)">
                    <picture :class="option.class">
                        <img :src="option.icon" alt="icon of Html">
                    </picture>
                    <span>{{ option.title }}</span></li>
            </ul>
        </section>
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue'

import axios from "axios";

export default {
  name: 'App',
  components: {
    Header,
  },
  data(){
    return {
      title: '',
      iconTitle: '',
      showMenu: true,
      optionQuizzes: [],
      colorImage: '',
      isdark: false,
    }
  },
  methods: {
    toggleDarkLight(){
      this.isdark = !this.isdark;
    },
    menuVisibility(route){
      this.showMenu = route.name === 'home';
    },
    async getData(){

      try {
        const response = await axios.get('./data.json');        
        const jsonData = response.data;

        this.optionQuizzes = jsonData.quizzes.map(quiz => {
          let className = '';
          switch (quiz.title) {
            case 'HTML':
              className = 'bg_color--organge';
              break;
            case 'CSS':
              className = 'bg_color--cyan';
              break;
            case 'JavaScript':
              className = 'bg_color--blue';
              break;
            case 'Accessibility':
              className = 'bg_color--violet';
              break;
          
            default:
              break;
          }
          return {
            icon: quiz.icon,
            title: quiz.title,
            class: className,
          }
        });
        
      } catch (error) {
        console.log(error);
      }
    },
    navigateToPage(option){   
      this.menuVisibility(this.$route);
      switch (option.title) {
        case 'HTML':
          this.title = option.title;
          this.iconTitle = option.icon;
          this.colorImage = option.class;
          this.$router.push('/quiz/HTML');
          break;
        case 'CSS':
          this.title = option.title;
          this.iconTitle = option.icon;
          this.colorImage = option.class;
          this.$router.push('/quiz/CSS');
          break;
        case 'JavaScript':
          this.title = option.title;
          this.iconTitle = option.icon;
          this.colorImage = option.class;
          this.$router.push('/quiz/JavaScript');
          break;
        case 'Accessibility':
          this.title = option.title;
          this.iconTitle = option.icon;
          this.colorImage = option.class;
          this.$router.push('/quiz/Accessibility');
          break;
        default:
          this.$router.push('/');
          break;
      }
    }
  },
  watch: {
    $route(to){
      this.menuVisibility(to);      
    }
  },
  created(){    
    this.getData();
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
:root {
    font-size: 62.5%;
}
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
#app {
  height: 100vh;
}
.container {
  height: 100vh;
  font-family: "Rubik", sans-serif;
  font-size: 1.6rem;
  background-color: #F4F6FA;
  background-image: url('../public/assets/images/pattern-background-mobile-light.svg');
  background-repeat: no-repeat;
  height: 100vh;
}
.body-dark {
  background-color: #313E51;
  background-image: url('../public/assets/images/pattern-background-mobile-dark.svg');
}
ul {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  list-style-type: none;
}
ul li {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  background-color: white;
  border-radius: 1.2rem;
  min-height: 6.4rem;
  padding: 1.2rem;
}
.dark-list li {
  background-color: #3B4D66;
  color: white;
}
.dark-list li span {
  color: white;
}
ul li picture p {
    color: #313E51;
    font-size: 1.8rem;
    font-weight: 500;
  }
picture {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: .6rem;
  background-color: #F4F6FA;
}
picture img {
  width: 2.857rem;
  height: 2.857rem;
}
ul li span {
  font-size: 1.8rem;
  font-weight: 500;
  color: #313E51;
}
.container__main {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding: 3.2rem 2.4rem 0 2.4rem;
    width: 100vw;
}
.bg_color--organge {
    background-color: #FFF1E9;
}
.bg_color--cyan {
    background-color: #E0FDEF;
}
.bg_color--blue {
    background-color: #EBF0FF;
}
.bg_color--violet {
    background-color: #F6E7FF;
}
@media screen and (min-width: 48rem) {
  .container {
    background-image: url('../public/assets/images/pattern-background-tablet-light.svg');
    background-position: 0 -38px;
  }
  .body-dark {
    background-image: url('../public/assets/images/pattern-background-tablet-dark.svg');
  }
  .container__main {
    padding: 3.2rem 2.4rem;
    width: 64rem;
    gap: 6.4rem;
    margin: 0 auto;
  }
  ul {
    gap: 2.4rem;
  }
  ul li {
    border-radius: 2.4rem;
    min-height: 8rem;
    gap: 3.2rem;
  }
  ul li picture p {
    font-size: 2.8rem;
  }
  picture {
    width: 5.6rem;
    height: 5.6rem;
  }
  picture img {
    width: 4rem;
    height: 4rem;
  }
  ul li span {
    font-size: 2.8rem;
  }
}
@media screen and (min-width: 90rem) {
  .container {
    background-image: url('../public/assets/images/pattern-background-desktop-light.svg');
    background-position: 0 0;
  }
  .body-dark {
    background-image: url('../public/assets/images/pattern-background-desktop-dark.svg');
  }
  .container__main {
    flex-direction: row;
    padding: 0;
    width: 116rem;
    justify-content: space-between;
  }
  .container__main--title {
    max-width: 46.5rem;
  }
  .container__main--options {
    max-width: 56.4rem;
  }
  ul {
    min-width: 56.4rem;
  }
  ul li {
    min-height: 9.6rem;
    padding: 2rem
  }
}
</style>
