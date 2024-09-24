<template>
    <header>
        <section :class="[ isDark ? 'container__title-img container__title-img-dark': 'container__title-img' ]">
            <picture v-if="urlImg" :class="colorImage">
                <img :src="urlImg" alt="icon of the options">
            </picture>
            
            <p>{{ title }}</p>
        </section>
        <section class="container__options">
            <img v-if="isDark" src="../../public/assets/images/icon-sun-light.svg" alt="icono claro">
            <img v-else src="../../public/assets/images/icon-sun-dark.svg" alt="icono oscuro">
            <button @click="$emit('changeDarkLight')">
                <span :class="[ isDark ? 'switch-check switch-check-dark' : 'switch-check']"></span>
            </button>
            <img v-if="isDark" src="../../public/assets/images/icon-moon-light.svg" alt="">
            <img v-else src="../../public/assets/images/icon-moon-dark.svg" alt="">
        </section>
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: {
        title: {
            type: String,
            default: '',
        },
        urlImg: {
            type: String,
            default: null,
        },
        colorImage: {
            type: String,
            required: true,
        },
        isDark: {
            type: Boolean,
            required: true,
        }

    },
}

</script>

<style lang="css" scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.6rem 2.4rem;
}
section {
    display: flex;
    align-items: center;
}
.container__title-img {
    gap: 1.6rem;
    width: 16.7rem;
}
.container__title-img p {
    color: #313E51;
    font-size: 1.8rem;
    font-weight: 500;
}
.container__title-img-dark p {
    color: white;
}
.container__options {
    width: 8rem;
    height: 2rem;
    gap: .8rem;
}
.container__options img {
    width: 1.6rem;
    height: 1.6rem;
}
.container__options button {
    position: relative;
    background-color: #A729F5;
    border: none;
    border-radius: 99rem;
    width: 3.2rem;
    height: 2rem;
}
.switch-check {
    position: absolute;
    width: 1.2rem;
    height: 1.2rem;
    background-color: white;
    border-radius: 50%;
    top: .4rem;
    right: 1.5rem;
}
.switch-check-dark {
    right: .5rem;
}
@media screen and (min-width: 48rem) {
    header {
        padding: 3.2rem 4.8rem
    }
    .container__title-img p {
        font-size: 2.8rem;
    }
    .container__options {
        width: 12.8rem;
        height: 2.8rem;
    }
    .container__options img {
        width: 2.4rem;
        height: 2.4rem;
    }
    .container__options button {
        width: 4.8rem;
        height: 2.8rem;
    }
    .switch-check {
        width: 2rem;
        height: 2rem;
        right: 2.4rem;
    }
}
@media screen and (min-width: 90rem) {
    header {
        max-width: 116rem;
        margin: 0 auto;
        padding: 9rem 1.8rem
    }
}
</style>