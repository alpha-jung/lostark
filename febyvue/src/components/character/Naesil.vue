<template>
    <div class="card">
        <div class="row">
            <div class="col-sm-8">
                <div class="row">
                    <div class="col">
                        <div v-for="(data, i) in tendencies" :key="{ i }"
                            :style="{ float: 'left', fontSize: '15px', paddingRight: '20px' }">
                            <p>{{ data.Type }} {{ data.Point }}</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div>생활 항목</div>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div v-for="(data, i) in equipEtc" :key="{ i }" :style="{ textAlign: 'left' }">
                    <img :src="`${data.Icon}`" :style="{ width: '10%' }" />
                    {{ data.Name }}
                </div>
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col">
                수집품 <span class="badge bg-secondary">{{ collectScore.toFixed(3) }}%</span>
            </div>
        </div>
        <br />
        <div class="d-flex align-items-start">
            <div class="row">
                <div class="col-sm-4">
                    <div class="row">
                        <div class="col">
                            <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist"
                                aria-orientation="vertical">

                                <button v-for="(data, i) in collectibles" :key="{i}" :class="{'nav-link': true, 'active': tab == i }" type="button" role="tab" @click="setTab(i)">
                                    <img :src="`${data.Icon}`" :style="{ width: '10%' }" />
                                    {{ data.Type }}
                                    <p>{{ data.Point }} /  {{ data.MaxPoint }}</p>
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8">
                    <div class="tab-content">
                        <div v-for="(data, i) in collectibles" :key="{i}" :class="{ 'tab-pane': true, 'fade': i == tab, 'show': i == tab, 'active': i == tab }" role="tabpanel" tabindex="0">
                            <div :style="{ width: '100%', float: 'left' }" >
                                <div :style="{ float: 'left', margin: '0 auto', padding: '10px' }">
                                    <h5>{{ data.Type }}</h5>
                                </div>
                                <div :style="{ float: 'right', margin: '0 auto', padding: '10px' }">
                                    <h5>{{ data.Point }} / {{ data.MaxPoint }}</h5>
                                </div>
                            </div>
                            <div :style="{ width: '100%', padding: '10px' }">
                                <div v-for="(cp, j) in data.CollectiblePoints" :key="{j}" :style="{ width: '100%', marginBottom: '10px' }">
                                    <span :class="{ 'badge': true, 'bg-secondary': cp.Point != cp.MaxPoint, 'bg-success': cp.Point == cp.MaxPoint }">
                                        {{ j + 1 }}
                                    </span>
                                    {{ cp.PointName }}
                                    <p v-if="data.Type == '모코코 씨앗'">{{ cp.Point }} / {{ cp.MaxPoint }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Ref, defineComponent, onMounted, ref, toRefs } from 'vue';
import { Tendencies, ArmoryEquipment, Collectibles } from 'CharacterInfo';

export default defineComponent({
    name: 'Naesil',
    props: {
        data: Object
    },
    setup(props) {
        let { data } = toRefs(props);
        let tendencies: Ref<Tendencies[]> = ref([]);
        let equipEtc: Ref<ArmoryEquipment[]> = ref([]);
        let collectibles: Ref<Collectibles[]> = ref([]);
        let collectScore: Ref<number> = ref(0);
        let tab: Ref<number> = ref(0);

        function setTab(idx: number) {
            tab.value = idx;
        }

        function setArmoryEquipment(data: ArmoryEquipment[]) {
            let etcArr: ArmoryEquipment[] = [];

            data.map((e: ArmoryEquipment, i: number) => {
                if (e.Type == '나침반' || e.Type == '부적' || e.Type == '문장') {
                    etcArr.push(e);
                }
            });

            equipEtc.value = etcArr;
        }

        function setCollectScorePercent(data: Collectibles[]) {
            let totalCollectScore = 0;
            let currCollectScore = 0;

            data.map((c: Collectibles, i: number) => {
                currCollectScore += c.Point;
                totalCollectScore += c.MaxPoint;
            });

            collectScore.value = ((currCollectScore / totalCollectScore) * 100);
        }

        onMounted(() => {
            tendencies.value = data.value?.ArmoryProfile.Tendencies;

            setArmoryEquipment(data.value?.ArmoryEquipment);

            collectibles.value = data.value?.Collectibles;

            setCollectScorePercent(data.value?.Collectibles);
        });

        return { tab, setTab, tendencies, equipEtc, collectibles, collectScore };
    }
})
</script>

<style>

</style>