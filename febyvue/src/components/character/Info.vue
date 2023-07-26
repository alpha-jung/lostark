<template>
    <div class="container">
        <Loading v-if="status == 'loading'"></Loading>
        <div v-else>
            <div class="card"
                v-if="typeof characterInfo == 'undefined' || (characterInfo != null && Object.keys(characterInfo).length === 0 && characterInfo.constructor === Object)">
                <h5>해당 이름을 가진 캐릭터가 없습니다.</h5>
            </div>
            <div class="card" v-else>
                <div class="card text-bg-dark">
                    <img :src="`${characterInfo?.ArmoryProfile?.CharacterImage ?? ''}`"
                        :style="{ width: '100%', height: '50vh' }" />
                    <div class="card-img-overlay">
                        <p class="card-text">
                        <div class="row">
                            <div class="col-sm-6">
                                <span class="badge bg-secondary">
                                    {{ characterInfo?.ArmoryProfile?.ServerName ?? '' }}
                                </span>
                                <span class="badge bg-secondary">
                                    {{ characterInfo?.ArmoryProfile?.CharacterClassName ?? '' }}
                                </span>
                                <br />
                                <br />
                                <br />
                                {{ $route.params.name }} <br />
                                {{ characterInfo?.ArmoryProfile?.Title }}
                                <br />
                                <br />
                                <br />
                                아이템 {{ characterInfo?.ArmoryProfile?.ItemMaxLevel }} <br />
                                전투 Lv.{{ characterInfo?.ArmoryProfile?.CharacterLevel }}
                                <br />
                                원정대 Lv.{{ characterInfo?.ArmoryProfile?.ExpeditionLevel }}
                            </div>
                            <div class="col-sm-6" :style="{ textAlign: 'right' }">
                                <br />
                                <br />
                                <br />
                                {{ characterInfo?.ArmoryProfile?.GuildName }}
                                <span class="badge bg-secondary">길드</span> <br />
                                Lv.{{ characterInfo?.ArmoryProfile?.TownLevel }}
                                {{ characterInfo?.ArmoryProfile?.TownName }}
                                <span class="badge bg-secondary">영지</span> <br />
                                {{ characterInfo?.ArmoryProfile?.PvpGradeName }}
                                <span class="badge bg-secondary">PVP</span> <br />
                            </div>
                        </div>
                        </p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <ul class="nav nav-tabs">
                            <li class="nav-item" @click="setTab('battle')">
                                <a :class="{'nav-link': true, 'active': tab === 'battle'}" aria-current="page" href="#">전투</a>
                            </li>
                            <li class="nav-item" @click="setTab('naesil')">
                                <a :class="{'nav-link': true, 'active': tab === 'naesil'}" href="#">내실</a>
                            </li>
                            <li class="nav-item" @click="setTab('avatar')">
                                <a :class="{'nav-link': true, 'active': tab === 'avatar'}" href="#">아바타</a>
                            </li>
                            <li class="nav-item" @click="setTab('stat')">
                                <a :class="{'nav-link': true, 'active': tab === 'stat'}" href="#">통계</a>
                            </li>
                            <li class="nav-item" @click="setTab('characters')">
                                <a :class="{'nav-link': true, 'active': tab === 'characters'}" href="#">보유 캐릭터</a>
                            </li>
                            <li class="nav-item" @click="setTab('guild')">
                                <a :class="{'nav-link': true, 'active': tab === 'guild'}" href="#">길드</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <Battle :data="characterInfo" v-if="tab == 'battle'"></Battle>
                <Naesil :data="characterInfo" v-if="tab == 'naesil'"></Naesil>
                <Avatar :data="characterInfo" v-if="tab == 'avatar'"></Avatar>
                <Characters :data="characterInfo" v-if="tab == 'characters'"></Characters>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, ref, onMounted, Ref } from 'vue';
import { useRoute } from 'vue-router';
import { CharacterInfo } from 'CharacterInfo';
import Loading from '../Loading.vue'
import Battle from './Battle.vue'
import Naesil from './Naesil.vue'
import Avatar from './Avatar.vue'
import Characters from './Characters.vue'

export default defineComponent({
    name: 'CharacterInfo',
    components: {
        Loading: Loading,
        Battle: Battle,
        Naesil: Naesil,
        Avatar: Avatar,
        Characters: Characters
    },
    setup() {
        const token = process.env.VUE_APP_LOA_API_KEY;
        const route = useRoute();
        let name = route.params.name;
        let status: Ref<string> = ref('loading');
        let tab: Ref<string> = ref('battle');
        let characterInfo: Ref<CharacterInfo | undefined> = ref();

        function setTab(type: string) {
            tab.value = type;
        }

        onMounted(() => {
            axios.all(
                [
                    axios.get(`https://developer-lostark.game.onstove.com/armories/characters/${name}`,
                        {
                            params: {},
                            headers: {
                                Authorization: 'bearer ' + token
                            }
                        }
                    ),
                    axios.get(`https://developer-lostark.game.onstove.com/characters/${name}/siblings`,
                        {
                            params: {},
                            headers: {
                                Authorization: 'bearer ' + token
                            }
                        }
                    )
                ]
            )
            .then(
                axios.spread((res1, res2) => {
                    if (res1.data == null && res2.data == null) {
                        return null;
                    } else {
                        let obj: any = new Object();

                        if (res1.data != null) {
                            for (let key in res1.data) {
                                obj[key] = res1.data[key];
                            }
                        }

                        if (res2.data != null) {
                            obj.Characters = res2.data;
                        }

                        characterInfo.value = obj;
                        status.value = 'success';
                    }
                })
            )
            .catch((err) => {
                console.log(err);
                status.value = 'error';
            })
        })

        return { status, characterInfo, tab, setTab }
    }
})
</script>

<style>

</style>