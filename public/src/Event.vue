
<template>
<div class="row">
    <character :playerItems="items" :health="healthPoints"></character>
    <part
        :visibleChoices="visibleChoices"
        :title="currentPart.title"
        :description="currentPart.description"
        v-on:update-part="changePart">
    </part>
</div>
</template>

<script>
import Character from './Character.vue';
import Part from './Part.vue';
import { getVisibleChoices } from './util/getVisibleChoices';

export default {
    components: { 'character': Character, 'part': Part },
    props: { event: Object, healthPoints: Number, items: Object },
    data: function () {
        return { currentPart: null, visibleChoices: [] };
    },
    created: function () {
        const initialPart = this.event.parts[0];
        const visibleChoices = getVisibleChoices(initialPart.choices, this.items);

        this.visibleChoices = visibleChoices;
        this.currentPart = initialPart;
    },
    methods: {
        changePart: function (choice) {
            if(choice.perks.length >= 1) {
                this.$emit('update-player', choice.perks);
            }

            const newPart = this.event.parts.find(part => part.id === choice.leadingPartId);
            const visibleChoices = getVisibleChoices(newPart.choices, this.items);

            this.currentPart = newPart;
            this.visibleChoices = visibleChoices;
        }
    }
};
</script>

<style scoped>
    .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .character-info {
        margin-right: 32px;
    }
</style>
