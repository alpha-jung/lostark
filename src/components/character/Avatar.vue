<template>
    <div class="card">
        <div class="row">
            <div class="col-sm-9">
                <img :src="`${profile?.CharacterImage ?? ''}`" :style="{ width: '100%' }" />
            </div>
            <div class="col-sm-3">
                <div v-for="(data, i) in avatars" :key="{i}" :style="{ paddingBottom: '20px' }">
                    <div :style="{ width: '20%', float: 'left' }">
                        <img :src="`${data.Icon}`" :style="{ width: '100%' }" />
                    </div>
                    <div :style="{ width: '80%', fontSize: '5px' }">
                        <p>{{ data.Type }}</p>
                        <p>{{ data.Name }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Ref, defineComponent, onMounted, ref, toRefs } from 'vue';
import { ArmoryProfile, ArmoryAvatars } from 'CharacterInfo';

export default defineComponent({
    name: 'Avatar',
    props: {
        data: Object
    },
    setup(props) {
        let { data } = toRefs(props);
        let profile: Ref<ArmoryProfile | undefined> = ref();
        let avatars: Ref<ArmoryAvatars[]> = ref([]);

        function setArmoryAvatars(data: ArmoryAvatars[]) {
            data.map((avatar: ArmoryAvatars, i: number) => {
                if (!avatar.IsInner && avatar.Type.indexOf('얼굴') < 0 && avatar.Type.indexOf('악기') < 0) {
                    if (avatar.Type != '') {
                        let type = avatar.Type.split(' ');
                        avatar.Type = type[0] + ' 덧입기 ' + type[1];
                        return avatar;
                    } else {
                        avatar.Type = '발자국 아바타';
                        return avatar;
                    }

                }
            });

            avatars.value = data;
        }

        onMounted(() => {
            profile.value = data.value?.ArmoryProfile;
            setArmoryAvatars(data.value?.ArmoryAvatars);
        })

        return { profile, avatars };
    }
})
</script>

<style>

</style>