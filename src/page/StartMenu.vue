<template>
    <section :class="[isDark ? 'container__main--title container__main--title-dark': 'container__main--title']">
        <h1>Welcome to the <span>Frontend Quiz!</span></h1>
        <p>Pick a subject to get started.</p>
    </section>
</template>

<script>
export default {
    name: 'MenuHeader',
    props: {
        isDark: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style lang="css" scoped>
.container__main--title h1 {
    line-height: 1.3;
    font-size: 4rem;
    font-weight: 400;
    color: #313E51;
    margin-bottom: 1.6rem;
}
.container__main--title-dark h1 {
    color: white;
}
.container__main--title h1 span {
    font-weight: 500;
}
.container__main--title p {
    font-size: 1.4rem;
    font-style: italic;
    color: #626C7F;
}
.container__main--title-dark p {
    color: #ABC1E1;
}
@media screen and (min-width: 48rem) {
    .container__main--title h1 {
        font-size: 6.4rem;
        line-height: 1.2;
    }
    .container__main--title p {
        font-size: 2rem;
    }
}
@media screen and (min-width: 90rem) {
    .container__main--title h1 {
        margin-bottom: 4.8rem;
    }
}
</style>