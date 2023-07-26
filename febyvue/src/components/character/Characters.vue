<template>
    <div class="card">
        <div class="row">
            <div v-for="(data, i) in characters" :key="{i}" class="col-sm-6">
                <div :style="{ width: '100%' }">
                    <div :style="{ float: 'left', width: '100%' }">
                        <img :src="`${data.Icon}`" :style="{ width: '20%' }" />
                    </div>
                    <div :style="{ width: '80%' }">
                        <p>{{ data.CharacterName }}</p>
                        <div>
                            <p :style="{ float: 'left' }">{{ data.CharacterClassName }} | </p>
                            <p :style="{ float: 'left' }"> Lv.{{ data.CharacterLevel }} | </p>
                            <p> {{ data.ItemMaxLevel }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Ref, defineComponent, onMounted, ref, toRefs } from 'vue';
import { Characters } from 'CharacterInfo';

export default defineComponent({
    name: 'Characters',
    props: {
        data: Object
    },
    setup(props) {
        let { data } = toRefs(props);
        let characters: Ref<Characters[]> = ref([]);
        let imgInfo = [
            { name: '워로드', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/warlord.png' },
            { name: '버서커', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/berserker.png' },
            { name: '디스트로이어', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/destroyer.png' },
            { name: '홀리나이트', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/holyknight.png' },
            { name: '슬레이어', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/berserker_female.png' },
            { name: '배틀마스터', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/battle_master.png' },
            { name: '인파이터', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/infighter.png' },
            { name: '기공사', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/force_master.png' },
            { name: '창술사', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/lance_master.png' },
            { name: '스트라이커', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/battle_master_male.png' },
            { name: '서머너', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/summoner.png' },
            { name: '아르카나', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/arcana.png' },
            { name: '소서리스', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/elemental_master.png' },
            { name: '바드', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/bard.png' },
            { name: '데빌헌터', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/devil_hunter.png' },
            { name: '블래스터', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/blaster.png' },
            { name: '호크아이', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/hawk_eye.png' },
            { name: '스카우터', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/scouter.png' },
            { name: '건슬링어', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/devil_hunter_female.png' },
            { name: '데모닉', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/demonic.png' },
            { name: '블레이드', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/blade.png' },
            { name: '리퍼', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/reaper.png' },
            { name: '도화가', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/yinyangshi.png' },
            { name: '기상술사', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/weather_artist.png' },
        ]

        onMounted(() => {
            data.value?.Characters.sort((a: Characters, b: Characters) => {
                let ml1 = parseInt(a.ItemMaxLevel.replace(',', ''));
                let ml2 = parseInt(b.ItemMaxLevel.replace(',', ''));

                return ml2 - ml1;
            })

            data.value?.Characters.map((data: Characters, i: number) => {
                for(let i = 0; i < imgInfo.length; i++) {
                    if(imgInfo[i].name == data.CharacterClassName) {
                        data.Icon = imgInfo[i].src;
                        break;
                    }
                }

                return data;
            })

            characters.value = data.value?.Characters;
        })

        return { characters };
    }
})
</script>

<style>

</style>