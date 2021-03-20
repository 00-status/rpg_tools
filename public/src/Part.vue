
<template>
<div>
    <h1>{{ title }}</h1>
    <div>
        <textarea class="description" cols="70" rows="15" readonly>{{description}}</textarea>
    </div>
    <div class="choices">
        <ol class="choices-list">
            <li v-for="choice in visibleChoices" :key="choice.id" v-on:click="changePart(choice)" class="choice-list-item">
                {{choice.title}}
            </li>
        </ol>
    </div>
</div>
</template>

<script>
import { getVisibleChoices } from './util/getVisibleChoices';

export default {
    props: { title: String, description: String, visibleChoices: Array },
    methods: {
        changePart: function (choice) {
            this.$emit('update-part', choice);
        }
    }
};
</script>

<style scoped>
    .description {
        resize: none;
    }

    .choices {
        margin-top: 32px;
    }

    .choices-list {
        padding: 0;
    }

    .choice-list-item {
        list-style-type: none;
        background: rgb(235, 235, 235);
        margin: 12px 0 12px 0;
    }

    .choice-list-item:hover {
        background: rgb(215, 215, 215);
    }
</style>

