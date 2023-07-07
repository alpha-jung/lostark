<template>
    <div class="card">
        <div class="row">
            <div class="col-sm-6">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-6">
                            <h6>아이템</h6>
                            <h5>{{ profile?.ItemMaxLevel }}</h5>
                        </div>
                        <div class="col-sm-6">
                            <h6>전투</h6>
                            <h5>{{ profile?.CharacterLevel }}</h5>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-sm-6">
                            <p v-for="(data, i) in profile?.Stats" :key="{i}" :style="{ fontSize: '14px' }">
                                {{ data.Type }}
                            </p>
                        </div>
                        <div class="col-sm-6">
                            <p v-for="(data, i) in profile?.Stats" :key="{i}" :style="{ fontSize: '14px' }">
                                {{ data.Value }}
                            </p>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col">
                            <p v-for="(data, i) in engraving?.Effects" :key="{i}">
                                {{ data.Name }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            장비 <br />
                            <div v-for="(data, i) in equipment" :style="{ float: 'left' }" :key="{i}">
                                <img :src="`${data.Icon}`" />
                                <div v-if="data.Quality != -1" class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar" :style="`width: ${data.Quality}%`">{{ data.Quality }}</div>
                                </div>
                                <span class="badge bg-secondary">
                                    {{ data.Type }} {{ data.Level }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col">
                            장신구 <br />
                            <div v-for="(data, i) in accessories" :style="{ float: 'left' }" :key="{i}">
                                <img :src="`${data.Icon}`" />
                                <div v-if="data.Quality != -1" class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar" :style="`width: ${data.Quality}%`">{{ data.Quality }}</div>
                                </div>
                                <div v-if="data.Type == '어빌리티 스톤'" class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar" :style="`width: ${data.StoneEffect}%`">{{ data.StoneEffect }}</div>
                                </div>
                                <div v-if="data.Type == '팔찌'" v-html="data.BraceletOption"></div>
                                <span class="badge bg-secondary">
                                    {{ data.Type }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, toRefs } from 'vue';
import { CharacterInfo, ArmoryProfile, ArmoryEquipment, ArmoryEngraving, ArmoryGem, Gem, ArmorySkills } from 'CharacterInfo';
import { removeTag } from '../../utils'

export default defineComponent({
    name: 'Battle',
    props: {
        data: Object,
    },
    setup(props) {
        let { data } = toRefs(props);
        let characterInfo: Ref<CharacterInfo | undefined> = ref();
        let profile: Ref<ArmoryProfile | undefined> = ref();
        let equipment: Ref<ArmoryEquipment[]> = ref([]);
        let accessories: Ref<ArmoryEquipment[]> = ref([]);
        let engraving: Ref<ArmoryEngraving | undefined> = ref();

        function setArmoryEquipment(data: ArmoryEquipment[]) {
            let equipArr: ArmoryEquipment[] = [];
            let accesArr: ArmoryEquipment[] = [];

            data.map((e: ArmoryEquipment, i: number) => {
                let toolTip = JSON.parse(e.Tooltip);
                let equipQuality = toolTip.Element_001.value.qualityValue;

                e.Quality = equipQuality;

                if (
                    e.Type == '무기'
                    || e.Type == '투구'
                    || e.Type == '상의'
                    || e.Type == '하의'
                    || e.Type == '장갑'
                    || e.Type == '어깨'
                ) {
                    let equipLevel = removeTag(toolTip.Element_000.value).split(" ")[0].replace("+", "");
                    e.Level = equipLevel;

                    equipArr.push(e);
                } else if (
                    e.Type == '목걸이'
                    || e.Type == '귀걸이'
                    || e.Type == '반지'
                    || e.Type == '어빌리티 스톤'
                    || e.Type == '팔찌'
                ) {
                    let stoneEffect = "";
                    let braceletOption = "";

                    if (e.Type == '어빌리티 스톤') {
                        let stoneEffectObj =
                            toolTip.Element_006.value.Element_000.contentStr;

                        for (let key in stoneEffectObj) {
                            let stoneEffectSplit = removeTag(
                                stoneEffectObj[key].contentStr
                            ).split(" ");
                            stoneEffect += stoneEffectSplit[
                                stoneEffectSplit.length - 1
                            ].replace("+", "");
                        }

                        e.StoneEffect = stoneEffect;
                    }

                    if (e.Type == "팔찌") {
                        braceletOption =
                              toolTip.Element_004.value.Element_001;

                        e.BraceletOption = braceletOption;
                    }

                    accesArr.push(e);
                }
            });

            equipment.value = equipArr;
            accessories.value = accesArr;
        }

        onMounted(() => {
            profile.value = data.value?.ArmoryProfile;
            engraving.value = data.value?.ArmoryEngraving;

            setArmoryEquipment(data.value?.ArmoryEquipment);
        })

        return { profile, engraving, equipment, accessories };
    }
})
</script>

<style>

</style>