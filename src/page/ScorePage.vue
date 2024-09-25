<template>
    <section :class="isDark ? 'container__header-score-dark container__header-score' : 'container__header-score'">
        <h2>Quiz completed</h2>
        <h3>You scored...</h3>
    </section>
    <section class="container__info-score">
        <div :class="[ isDark ? 'card card-dark' : 'card']">
            <div :class="[ isDark ? 'card__title-dark card__title' : 'card__title']">            
                <picture :class="colorImg">
                    <img :src="scored.img" alt="icon of the options">
                </picture>
                <p>{{  scored.title }}</p>
            </div>
            <div :class="[isDark ? 'card__scored card__scored-dark': 'card__scored']">
                <p>{{ scored.scored }}</p>
                <span>out of {{ scored.totalQuestion }}</span>
            </div>
        </div>
        <button @click="$router.push(`/`)">Play Again</button>
    </section>
</template>

<script>
export default {
    props: {
        objScored: {
            type: String,
        },
        isDark: {
            type: Boolean,
            default: false,
        },
    },
    data(){
        return{
            scored: {
                scored: 0, 
                totalQuestion: 0,
                title: '',
                img: '',
            },
        }
    },
    computed: {
        colorImg(){
            const classMap = {
                'HTML': 'bg_color--organge',
                'CSS': 'bg_color--cyan',
                'JavaScript': 'bg_color--blue',
                'Accessibility': 'bg_color--violet',
            }
            return classMap[this.scored.title]
        }
    },
    created(){
        try {
            this.scored=  JSON.parse(this.objScored);
        } catch (error) {
            this.$router.push('/');
        }
    }
}
</script>

<style lang="css" scoped>
.container__header-score h2 {
    font-size: 4rem;
    color: #313E51;
    font-weight: 400;
    margin-bottom: .8rem;
}
.container__header-score-dark h2 {
    color: white;
}
.container__header-score h3 {
    font-size: 4rem;
    color: #313E51;
    font-weight: 500;
}
.container__header-score-dark h3 {
    color: white;
}
.container__info-score {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    justify-content: center;
}
.container__info-score button {
    background-color: #A729F5;
    font-size: 1.8rem;
    font-weight: 500;
    border-radius: 1.2rem;
    padding: 1.2rem;
    border: none;
    color: white;
    height: 5.6rem;
}
.card {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    align-items: center;
    text-align: center;
    background-color: white;
    border-radius: 1.2rem;
    padding: 3.2rem;
}
.card-dark {
    background-color: #3B4D66;
}
.card__title {
    display: flex;
    gap: 1.6rem;
    align-items: center;
}
.card__title img {
    border-radius: .4rem;
}
.card__title p {
    font-size: 1.8rem;
    font-weight: 500;
    color: #313E51;
}
.card__title-dark p {
    color: white;
}
.card__scored {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
}
.card__scored p {
    font-size: 8.8rem;
    font-weight: 500;
    color: #313E51;
}
.card__scored-dark p {
    color: white;
}
.card__scored span {
    font-size: 1.8rem;
    color: #626C7F;
}
.card__scored-dark span {
    color: #ABC1E1;
}
@media screen and (min-width: 48rem) {
    .container__info-score {
        gap: 3.2rem;
    }
    .container__info-score button {
        font-size: 2.8rem;
        padding: 3.2rem;
        height: 9.2rem;
    }
    .container__header-score h2 {
        font-size: 6.4rem;
    }
    .container__header-score h3 {
        font-size: 6.4rem;
    }
    .card {
        padding: 4.8rem;
        gap: 4rem;
    }
    .card__title p {
        font-size: 2.8rem;
    }
    .card__scored p {
        font-size: 14.4rem;
    }
    .card__scored span {
        font-size: 2.8rem;
    }
}
@media screen and (min-width: 90rem) {
    .container__header-score {
        width: 46.3rem;
    }
    .container__info-score {
        width: 56.4rem;
    }
}
</style>