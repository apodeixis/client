<template>
    <div class="inline-block">
        <CompoundValidator ref="validator">
            <AInput ref="nameInput" v-model="newName" :placeholder="$t('A_NewName')" :validators="nameValidators" />
        </CompoundValidator>
        <div class="flex justify-center">
            <ASubmitButton :value="$t('A_Update')" @click="changeName" />
        </div>
    </div>
</template>

<script>
import ASubmitButton from '../ALib/Buttons/ASubmitButton.vue';
import AInput from '../ALib/Fields/AInput.vue';
import { nameValidators } from '../ALib/Fields/Validators';
import { mapMutations, mapGetters } from 'vuex';
import CompoundValidator from '../ALib/Fields/CompoundValidator.vue';
import axiosClient from '@/axiosClient';

export default {
    components: {
        ASubmitButton,
        AInput,
        CompoundValidator
    },
    data() {
        return {
            nameValidators,
            newName: '',
        }
    },
    methods: {
        ...mapMutations(["setUserData", "updatePosts"]),
        changeName() {
            if (!this.$refs.validator.allFieldsValid())
                return
            if (this.userData.name == this.newName) {
                this.newName = ''
                return
            }

            const payload = {
                data: {
                    attributes: {
                        new_name: this.newName
                    }
                }
            }
            axiosClient.patch('/user', JSON.stringify(payload))
                .then(response => {
                    const tmpUserData = this.userData
                    tmpUserData.name = this.newName
                    this.setUserData(tmpUserData)
                    this.$refs.nameInput.reset()
                    this.updatePosts((post) => {
                        if (post.authorId == this.userData.author_id) {
                            post.name = tmpUserData.name
                            return post
                        }
                    })
                })
        },
    },
    computed: {
        ...mapGetters({
            userData: "getUserData"
        })
    }
}

</script>