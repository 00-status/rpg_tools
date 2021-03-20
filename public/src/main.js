import Vue from 'vue';
import { initializeGameState } from './util/initializeGameState';
import Event from './Event.vue';

const { player, items, events } = initializeGameState();

const defaultEvent = events[1];

var app = new Vue({
    el: '#app',
    data: {
        player,
        items,
        events,
        currentEventId: defaultEvent.id
    },
    components: { 'event': Event },
    methods: {
        updatePlayer(perks) {
            perks.forEach(perk => {
                switch (perk.perkType) {
                    case 'ITEM':
                        const item = this.items[perk.itemId] ?? null;

                        if(item) {
                            const newItems = Object.assign({}, this.player.items, { [item.id]: item });
                            this.player.items = newItems;
                        }
                        break;
                    case 'HEALTH':
                        this.player.healthPoints += perk.amount;
                        break;
                    default:
                }
            });
        }
    }
});
