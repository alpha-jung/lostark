<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">공지사항</h5>
                        <ul class="list-group">
                            <a :href="`${data.Link}`" v-for="(data, i) in notices" :key="{ i }" :style="{ color: 'black', textDecoration: 'none' }">
                                <li class="list-group-item">
                                    {{ data.Title }} <br />
                                    <span class="badge text-bg-dark">{{ data.Type }}</span>
                                </li>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">이벤트</h5>
                        <ul class="list-group">
                            <a :href="`${data.Link}`" v-for="(data, i) in events" :key="{ i }" :style="{ color: 'black', textDecoration: 'none' }">
                                <li class="list-group-item">
                                    <img :src="`${data.Thumbnail}`" :style="{ width: '100%' }" />
                                    <br />
                                    {{ data.StartDate }} ~ {{ data.EndDate }}
                                </li>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">모험 섬 {{ advIslandsSt }}  {{ advIslandsRt }}</h5>
                        <ul class="list-group">
                            <li class="list-group-item" v-for="(data, i) in advIslands" :key="{i}">
                                <img :src="`${data.ContentsIcon}`" :style="{ width: '10%' }" /> {{ data.ContentsName }} <br />
                                <div v-if="data.RewardItems != null" v-for="(rewardItem, j) in data.RewardItems" :key="{j}">
                                    <img :src="`${rewardItem?.Icon}`" :style="{ width: '10%', float: 'left' }" /> 
                                </div>
                            </li>
                            <li class="list-group-item">
                                필드 보스 {{ fieldBossSt }}  {{ fieldBossRt }}
                            </li>
                            <li class="list-group-item">
                                카오스 게이트 {{ chaosGateSt }}  {{ chaosGateRt }}
                            </li>
                            <li class="list-group-item">
                                유령선 {{ ghostShipSt }}  {{ ghostShipRt }}
                            </li>
                            <li class="list-group-item" v-if="occuWarSt != ''">
                                점령 이벤트 {{ occuWarSt }} {{ occuWarRt }}
                            </li>
                            <li class="list-group-item" v-if="beginningIslandSt != ''">
                                태초의 섬 {{ beginningIslandSt }}  {{ beginningIslandRt }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, ref, onMounted, Ref } from 'vue';
import { Notices, Events } from 'News'
import { Contents, Reward } from 'Contents';

export default defineComponent({
    name: 'Main',
    data() {
        return {
        }
    },
    setup() {
        const token = process.env.VUE_APP_LOA_API_KEY;

        let notices: Ref<Notices[]> = ref([]);
        let events: Ref<Events[]> = ref([]);

        let advIslands: Ref<Contents[]> = ref([]);
        let advIslandsSt: Ref<string> = ref('');
        let advIslandsRt: Ref<string> = ref(''); 

        let fieldBossSt: Ref<string> = ref('');
        let fieldBossRt: Ref<string> = ref('');

        let chaosGateSt: Ref<string> = ref('');
        let chaosGateRt: Ref<string> = ref('');

        let ghostShipSt: Ref<string> = ref('');
        let ghostShipRt: Ref<string> = ref('');    

        let occuWarStimes: string[] = [];
        let occuWarSt: Ref<string> = ref('');
        let occuWarRt: Ref<string> = ref('');

        let beginningIslandSt: Ref<string> = ref('');
        let beginningIslandRt: Ref<string> = ref('');
            
        let intervalId :number;

        function fmtDateYmd(str: string) {
            let date = new Date(str);
            return date.getFullYear() + '-' + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1)) + "-" + (date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate().toString());
        }

        function fmtDateMd(str: string) {
            let date = new Date(str);
            return ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1)) + "-" + (date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate().toString());
        }

        function fmtDateHm(str: string) {
            let date = new Date(str);
            return date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        }

        function calcRemainTime(str: string) {
            let isStart = false;
            let now = new Date();
            let eventSt = new Date(str);
            let diff = (eventSt.getTime() - now.getTime()) / 1000;
            let result: string = '';
            let returnArr = new Array();

            if (diff <= 0) {
                isStart = true;
                returnArr.push(isStart);
                returnArr.push(result);
                return returnArr;
            }

            let hour = Math.floor(diff / 3600);
            let minute = Math.floor((diff / 60) % 60);
            let seconds = Math.floor(diff % 60);

            result = (hour < 10 ? '0' + hour : hour).toString() + ':' + (minute < 10 ? '0' + minute : minute).toString() + ':' + (seconds < 10 ? '0' + seconds : seconds).toString();

            returnArr.push(isStart);
            returnArr.push(result);
            return returnArr;
        }

        function showNotices(data: Notices[]) {
            data.map((data, i) => {
                data.Date = fmtDateYmd(data.Date);
                return data;
            });

            notices.value = data;
        }

        function showEvents(data: Events[]) {
            data.map((data: Events, i: number) => {
                data.StartDate = fmtDateMd(data.StartDate);
                data.EndDate = fmtDateMd(data.EndDate);
                return data;
            });

            events.value = data;
        }

        function showContents(arr: Contents[]) {
            let islandsArr: Contents[] = [];
            let fieldBossArr: Contents[] = [];
            let chaosGateArr: Contents[] = [];
            let ghostShipArr: Contents[] = [];
            let beginningIslandArr: Contents[] = [];

            let now = new Date();

            if (now.getDay() == 0 || now.getDay() == 6) {
                occuWarStimes = [
                    "12:30",
                    "16:30",
                    "18:30",
                    "19:30",
                    "22:30",
                    "23:30",
                ];
            }

            if (occuWarStimes.length != 0) {
                let nowTime = fmtDateHm(now.toString());

                for (let i = 0; i < occuWarStimes.length; i++) {
                    if (occuWarStimes[i] > nowTime) {
                        occuWarSt.value = occuWarStimes[i];
                        break;
                    }
                }
            }

            // console.log(occuWarSt);

            islandsArr = [...arr].filter((data: Contents, i: number) => {
                return data.CategoryName == '모험 섬';
            });

            beginningIslandArr = [...arr].filter((data: Contents, i: number) => {
                return data.CategoryName == '태초의 섬';
            });

            beginningIslandArr = beginningIslandArr.filter((data: Contents, i: number) => {
                if (data.StartTimes != null) {
                    data.StartTimes = data.StartTimes.filter((startTime: string, j: number) => {
                        let stToDate = new Date(startTime);
                        return (now.getTime() <= stToDate.getTime());
                    });

                    data.StartTimes = data.StartTimes.slice(0, 1);
                }

                return data;
            });
            
            fieldBossArr = [...arr].filter((data: Contents, i: number) => {
                return data.CategoryName == '필드보스';
            }).slice(0, 1);

            fieldBossArr = fieldBossArr.filter((data: Contents, i: number) => {
                if (data.StartTimes != null) {
                    data.StartTimes = data.StartTimes.filter((startTime: string, j: number) => {
                        let stToDate = new Date(startTime);
                        return (now.getTime() <= stToDate.getTime());
                    });

                    data.StartTimes = data.StartTimes.slice(0, 1);
                }

                return data;
            });

            chaosGateArr = [...arr].filter((data: Contents, i: number) => {
                return data.CategoryName == '카오스게이트' && data.MinItemLevel == 1520;
            }).slice(0, 1);

            chaosGateArr = chaosGateArr.filter((data: Contents, i: number) => {
                if (data.StartTimes != null) {
                    data.StartTimes = data.StartTimes.filter((startTime: string, j: number) => {
                        let stToDate = new Date(startTime);
                        return (now.getTime() <= stToDate.getTime());
                    });

                    data.StartTimes = data.StartTimes.slice(0, 1);
                }

                return data;
            });

            ghostShipArr = [...arr].filter((data: Contents, i: number) => {
                return data.CategoryName == '유령선';
            }).slice(0, 1);

            ghostShipArr = ghostShipArr.filter((data: Contents, i: number) => {
                if (data.StartTimes != null) {
                    data.StartTimes = data.StartTimes.filter((startTime: string, j: number) => {
                        let stToDate = new Date(startTime);
                        return (now.getTime() <= stToDate.getTime());
                    });

                    data.StartTimes = data.StartTimes.slice(0, 1);
                }

                return data;
            });

            islandsArr = islandsArr.filter((data: Contents, i: number) => {
                if (data.StartTimes != null) {
                    let startTimes = data.StartTimes.filter((startTime: string, j: number) => {
                        let stToDate = new Date(startTime);

                        // return (now.getTime() <= stToDate.getTime()) && (fmtDateYmd(stToDate.toDateString()) == fmtDateYmd(now.toDateString()));
                        return (now.getTime() <= stToDate.getTime());
                    });

                    data.StartTimes = startTimes;
                }

                if (data.RewardItems != null) {
                    data.RewardItems = data.RewardItems.filter((rewardItem: Reward, j: number) => {
                        if (rewardItem != null && rewardItem.StartTimes) {
                            rewardItem.StartTimes = rewardItem.StartTimes.filter((startTime: string, k: number) => {
                                let stToDate = new Date(startTime);
                                return (now.getTime() <= stToDate.getTime()) && (fmtDateYmd(startTime) == fmtDateYmd(now.toDateString()));
                            });

                            if (rewardItem.StartTimes.length > 0) {
                                rewardItem.StartTimes = rewardItem.StartTimes.slice(0, 1);
                            } else {
                                rewardItem = null;
                            }
                        }

                        if (rewardItem) {
                            return rewardItem;
                        }
                    });

                    data.RewardItems = data.RewardItems.filter((rewardItem: Reward, j: number) => {
                        if (data.RewardItems != null) {
                            return (
                                data.RewardItems.findIndex((rewardItem2: Reward, k: number) => {
                                    if (rewardItem != null && rewardItem2 != null) {
                                        return rewardItem.Name === rewardItem2.Name;
                                    }
                                }) === j
                            )
                        }
                    });
                }

                if (data.StartTimes && data.StartTimes.length > 0) {
                    data.StartTimes = data.StartTimes.slice(0, 1);
                    return data;
                }
            });

            islandsArr.sort((a: any, b: any) => {
                if (a.StartTimes[0] > b.StartTimes[0]) {
                    return 1;
                } else {
                    return -1;
                }
            });

            islandsArr = islandsArr.slice(0, 3);

            if (chaosGateArr[0].StartTimes != null && chaosGateArr[0].StartTimes.length == 0) {
                let nextChaosGateSt = new Date();
                nextChaosGateSt.setDate(nextChaosGateSt.getDate() + 2);
                nextChaosGateSt.setHours(11);
                nextChaosGateSt.setMinutes(0);
                nextChaosGateSt.setSeconds(0);

                chaosGateArr[0].StartTimes[0] = nextChaosGateSt.toDateString();
            }

            if (islandsArr != null && islandsArr[0].StartTimes != null) {
                advIslandsSt.value = fmtDateHm(islandsArr[0].StartTimes[0]);
            }

            advIslands.value = islandsArr;

            if (fieldBossArr != null && fieldBossArr[0].StartTimes != null) {
                fieldBossSt.value = fmtDateHm(fieldBossArr[0].StartTimes[0]);
            }

            if (chaosGateArr != null && chaosGateArr[0].StartTimes != null) {
                chaosGateSt.value = fmtDateHm(chaosGateArr[0].StartTimes[0]);
            }

            if (ghostShipArr != null && ghostShipArr[0].StartTimes) {
                ghostShipSt.value = fmtDateHm(ghostShipArr[0].StartTimes[0]);
            }

            if(beginningIslandArr != null && beginningIslandArr[0].StartTimes) {
                beginningIslandSt.value = fmtDateHm(beginningIslandArr[0].StartTimes[0]);
            }

            intervalId = window.setInterval(function () {

                let [islandStart, islandCrt] = calcRemainTime(islandsArr[0]?.StartTimes[0]);
                let [fieldBossStart, fieldBossCrt] = calcRemainTime(fieldBossArr[0]?.StartTimes[0]);
                let [chaosGateStart, chaosGateCrt] = calcRemainTime(chaosGateArr[0]?.StartTimes[0]);
                let [ghostShipStart, ghostShipCrt] = calcRemainTime(ghostShipArr[0]?.StartTimes[0]);
                let [beginningIslandStart, beginningIslandCrt] = calcRemainTime(beginningIslandArr[0]?.StartTimes[0]);
                let [occuWarStart, occuWarCrt] = [false, ''];

                if (occuWarStimes.length != 0) {
                    let occuWarStSplit = occuWarSt.value.split(":");
                    let occuWarStHour = parseInt(occuWarStSplit[0]);
                    let occuWarStMinute = parseInt(occuWarStSplit[1]);
                    let occuWarDate = new Date();
                    occuWarDate.setHours(occuWarStHour);
                    occuWarDate.setMinutes(occuWarStMinute);
                    occuWarDate.setSeconds(0);

                    // console.log(occuWarDate);

                    [occuWarStart, occuWarCrt] = calcRemainTime(occuWarDate.toString());
                    occuWarRt.value = occuWarCrt;
                }

                advIslandsRt.value = islandCrt;
                fieldBossRt.value = fieldBossCrt;
                chaosGateRt.value = chaosGateCrt;
                ghostShipRt.value = ghostShipCrt;
                beginningIslandRt.value = beginningIslandCrt;

                if (islandStart || fieldBossStart || chaosGateStart || ghostShipStart || occuWarStart || beginningIslandStart) {
                    window.clearInterval(intervalId);

                    axios.get(
                        "https://developer-lostark.game.onstove.com/gamecontents/Contents",
                        {
                            params: {
                                // type: '공지'
                            },
                            headers: {
                                Authorization: "bearer " + token,
                            },
                        }
                    )
                        .then(res => {
                            showContents(res.data);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            }, 1000);
        }

        onMounted(() => {
            let getNotices = axios.get('https://developer-lostark.game.onstove.com/news/notices', {
                params: {
                    // type: '공지'
                },
                headers: {
                    Authorization: 'bearer ' + token
                }
            });

            let getEvents = axios.get('https://developer-lostark.game.onstove.com/news/events', {
                params: {
                    // type: '공지'
                },
                headers: {
                    Authorization: 'bearer ' + token
                }
            });

            let getAdvIslands = axios.get('https://developer-lostark.game.onstove.com/gamecontents/calendar', {
                params: {
                    // type: '공지'
                },
                headers: {
                    Authorization: 'bearer ' + token
                }
            });

            axios.all([getNotices, getEvents, getAdvIslands])
            .then(
                axios.spread((res1, res2, res3) => {
                  let tmpNotices = res1.data.slice(0, 5);
                  showNotices(tmpNotices);

                  let tmpEvents = res2.data.slice(0, 3);
                  showEvents(tmpEvents);

                  let tmpContents = res3.data;
                  showContents(tmpContents);
                })
            )
            .catch((err) => {
                console.log(err);
            });
        })

        return { notices, events, advIslands, advIslandsRt, advIslandsSt, fieldBossSt, fieldBossRt, chaosGateSt, chaosGateRt, ghostShipSt, ghostShipRt, occuWarSt, occuWarRt, beginningIslandSt, beginningIslandRt };
    }
})
</script>

<style>

</style>

