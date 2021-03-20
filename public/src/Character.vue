
<template>
<div class="character-info">
    <p>Character Info</p>
    <p>
        Health: <b>{{health}}</b>
    </p>
    <p>Items:</p>
    <ul>
        <li v-for="item in itemsToArray(playerItems)" :key="item.id">
            {{ item.name }}
        </li>
    </ul>
</div>
</template>

<script>
export default {
    props: { playerItems: Object, health: Number },
    methods: {
        itemsToArray() {
            const itemIds = Object.keys(this.playerItems);

            if (itemIds.length <= 0) {
                return [];
            }

            return itemIds.map(itemId => this.playerItems[itemId]);
        }
    }
};
</script>
